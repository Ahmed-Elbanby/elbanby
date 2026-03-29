<?php
/**
 * elbanby.com — api/contact.php
 * Contact form endpoint. Accepts GET (returns CSRF token)
 * and POST (validates + saves submission).
 *
 * Security: CSRF (PHP sessions), honeypot, rate limiting,
 *           input sanitization, PDO prepared statements.
 * No mail() — admin reviews submissions in phpMyAdmin.
 */

declare(strict_types=1);

/* ── Bootstrap ─────────────────────────────────────────────── */
require_once __DIR__ . '/config.php';   // Returns: $pdo (PDO), ADMIN_EMAIL const

session_start();

header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');

// Only allow GET and POST
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
if (!in_array($method, ['GET', 'POST'], true)) {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit;
}

/* ── GET: return a fresh CSRF token ────────────────────────── */
if ($method === 'GET') {
    $token = bin2hex(random_bytes(32));
    $_SESSION['csrf_token'] = $token;
    echo json_encode(['csrf_token' => $token]);
    exit;
}

/* ── POST: handle form submission ──────────────────────────── */

// ── 1. Parse JSON body ──────────────────────────────────────
$raw  = file_get_contents('php://input');
$body = json_decode($raw, true);

if (!is_array($body)) {
    respond(false, 'Invalid request format.', 400);
}

// ── 2. CSRF validation ──────────────────────────────────────
$submittedToken = trim($body['csrf_token'] ?? '');
$sessionToken   = $_SESSION['csrf_token'] ?? '';

if (
    empty($submittedToken) ||
    empty($sessionToken) ||
    !hash_equals($sessionToken, $submittedToken)
) {
    respond(false, 'Security token mismatch. Please refresh and try again.', 403);
}

// Regenerate CSRF token after successful validation
$_SESSION['csrf_token'] = bin2hex(random_bytes(32));

// ── 3. Honeypot check ───────────────────────────────────────
// If the hidden "website" field is filled, it's a bot.
// Return success silently to not reveal the trap.
if (!empty($body['website'])) {
    respond(true, 'Thank you! Your message has been received.');
}

// ── 4. Sanitize & validate inputs ──────────────────────────
$name    = sanitizeString($body['name']    ?? '');
$email   = sanitizeString($body['email']   ?? '');
$phone   = sanitizeString($body['phone']   ?? '');
$service = sanitizeString($body['service'] ?? '');
$message = sanitizeString($body['message'] ?? '');

// Required fields
if (empty($name) || empty($email) || empty($message)) {
    respond(false, 'Please fill in all required fields.', 422);
}

// Name length
if (mb_strlen($name) > 100) {
    respond(false, 'Name is too long.', 422);
}

// Email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(false, 'Please enter a valid email address.', 422);
}

// Message length
if (mb_strlen($message) < 10) {
    respond(false, 'Message is too short. Please provide more detail.', 422);
}

if (mb_strlen($message) > 5000) {
    respond(false, 'Message is too long (max 5000 characters).', 422);
}

// Allowed services whitelist
$allowedServices = [
    'Web Development', 'Mobile App Development', 'UI/UX Design',
    'API / Backend', 'E-Commerce', 'Desktop Application', 'Other', '',
];
if (!in_array($service, $allowedServices, true)) {
    $service = 'Other';
}

// ── 5. Rate limiting ────────────────────────────────────────
$ip         = getClientIp();
$userAgent  = mb_substr($_SERVER['HTTP_USER_AGENT'] ?? '', 0, 512);

try {
    // Max 3 submissions from same IP in 60 minutes
    $stmtIp = $pdo->prepare(
        'SELECT COUNT(*) FROM contact_submissions
         WHERE ip = :ip AND created_at > DATE_SUB(NOW(), INTERVAL 60 MINUTE)'
    );
    $stmtIp->execute([':ip' => $ip]);
    $ipCount = (int) $stmtIp->fetchColumn();

    if ($ipCount >= 3) {
        respond(false, 'Too many submissions from your connection. Please wait before trying again.', 429);
    }

    // Max 5 submissions from same email in 24 hours
    $stmtEmail = $pdo->prepare(
        'SELECT COUNT(*) FROM contact_submissions
         WHERE email = :email AND created_at > DATE_SUB(NOW(), INTERVAL 24 HOUR)'
    );
    $stmtEmail->execute([':email' => $email]);
    $emailCount = (int) $stmtEmail->fetchColumn();

    if ($emailCount >= 5) {
        respond(false, 'Too many submissions from this email address. Please try again tomorrow.', 429);
    }

    // ── 6. Insert into database ─────────────────────────────
    $stmt = $pdo->prepare(
        'INSERT INTO contact_submissions
            (name, email, phone, service, message, ip, user_agent, created_at, is_read)
         VALUES
            (:name, :email, :phone, :service, :message, :ip, :user_agent, NOW(), 0)'
    );
    $stmt->execute([
        ':name'       => $name,
        ':email'      => $email,
        ':phone'      => $phone,
        ':service'    => $service,
        ':message'    => $message,
        ':ip'         => $ip,
        ':user_agent' => $userAgent,
    ]);

} catch (PDOException $e) {
    // Do not expose DB error details to client
    error_log('[elbanby contact] DB error: ' . $e->getMessage());
    respond(false, 'A server error occurred. Please try again later.', 500);
}

respond(true, "Thank you! Your message has been received. We'll get back to you within 1 business day.");


/* ── Helper functions ──────────────────────────────────────── */

/**
 * Sanitize a string input.
 * Strips tags and encodes HTML entities.
 */
function sanitizeString(string $value): string
{
    $value = strip_tags($value);
    $value = htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    return trim($value);
}

/**
 * Get the real client IP, accounting for common proxy headers.
 * Note: X-Forwarded-For can be spoofed — used only for rate limiting,
 * not for security-critical purposes.
 */
function getClientIp(): string
{
    $candidates = [
        'HTTP_X_FORWARDED_FOR',
        'HTTP_X_REAL_IP',
        'REMOTE_ADDR',
    ];
    foreach ($candidates as $key) {
        if (!empty($_SERVER[$key])) {
            // X-Forwarded-For may be a comma-separated list — take first
            $ip = trim(explode(',', $_SERVER[$key])[0]);
            if (filter_var($ip, FILTER_VALIDATE_IP)) {
                return $ip;
            }
        }
    }
    return '0.0.0.0';
}

/**
 * Emit a JSON response and exit.
 */
function respond(bool $success, string $message, int $httpCode = 200): never
{
    if ($httpCode !== 200) {
        http_response_code($httpCode);
    }
    echo json_encode([
        'success' => $success,
        'message' => $message,
    ], JSON_UNESCAPED_UNICODE);
    exit;
}
