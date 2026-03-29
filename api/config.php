<?php
/**
 * elbanby.com — api/config.php
 *
 * Database configuration and PDO connection.
 * This file is blocked from direct web access via .htaccess.
 *
 * REQUIRED SETUP:
 *   1. Fill in your actual DB credentials below.
 *   2. Run api/db_setup.sql once in phpMyAdmin.
 *   3. Confirm .htaccess has: deny from all  for this file.
 */

declare(strict_types=1);

/* ── Database Credentials ──────────────────────────────────── */
// Replace these placeholder values with your actual credentials.
define('DB_HOST',    'localhost');
define('DB_PORT',    '3306');
define('DB_NAME',    'elbanby_db');
define('DB_USER',    'root');          // change to your MySQL username
define('DB_PASS',    '');             // change to your MySQL password
define('DB_CHARSET', 'utf8mb4');

/* ── PDO Connection ────────────────────────────────────────── */
try {
    $dsn = sprintf(
        'mysql:host=%s;port=%s;dbname=%s;charset=%s',
        DB_HOST,
        DB_PORT,
        DB_NAME,
        DB_CHARSET
    );

    $pdo = new PDO($dsn, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,  // use real prepared statements
    ]);

} catch (PDOException $e) {
    // Log internally — never expose credentials or DB errors to the client
    error_log('[elbanby config] DB connection failed: ' . $e->getMessage());

    header('Content-Type: application/json; charset=UTF-8');
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Service temporarily unavailable. Please try again later.',
    ]);
    exit;
}
