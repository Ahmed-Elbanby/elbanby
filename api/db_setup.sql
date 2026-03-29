-- ============================================================
-- elbanby.com — Database Setup
-- Run this file ONCE in phpMyAdmin (SQL tab) or via CLI:
--   mysql -u root -p < api/db_setup.sql
--
-- Steps:
--   1. Open phpMyAdmin (http://localhost/phpmyadmin)
--   2. Click the "SQL" tab at the top
--   3. Paste this entire file and click "Go"
-- ============================================================

-- Create database (skip if it already exists)
CREATE DATABASE IF NOT EXISTS `elbanby_db`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `elbanby_db`;

-- ── contact_submissions table ────────────────────────────────
-- Stores every contact form submission.
-- Columns:
--   id          — auto-increment primary key
--   name        — sender's full name (max 100 chars)
--   email       — sender's email address (max 255 chars)
--   phone       — optional phone number (max 30 chars)
--   service     — selected service from dropdown (max 100 chars)
--   message     — message body (up to 5000 chars)
--   ip          — sender's IP address (for rate limiting)
--   user_agent  — browser user-agent string (max 512 chars)
--   created_at  — timestamp of submission (UTC)
--   is_read     — 0 = unread, 1 = read (admin marks manually in phpMyAdmin)

CREATE TABLE IF NOT EXISTS `contact_submissions` (
  `id`          INT UNSIGNED    NOT NULL AUTO_INCREMENT,
  `name`        VARCHAR(100)    NOT NULL,
  `email`       VARCHAR(255)    NOT NULL,
  `phone`       VARCHAR(30)     NOT NULL DEFAULT '',
  `service`     VARCHAR(100)    NOT NULL DEFAULT '',
  `message`     TEXT            NOT NULL,
  `ip`          VARCHAR(45)     NOT NULL DEFAULT '',   -- supports IPv6
  `user_agent`  VARCHAR(512)    NOT NULL DEFAULT '',
  `created_at`  DATETIME        NOT NULL,
  `is_read`     TINYINT(1)      NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  INDEX `idx_email`      (`email`),
  INDEX `idx_ip`         (`ip`),
  INDEX `idx_created_at` (`created_at`),
  INDEX `idx_is_read`    (`is_read`)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

-- ── Verify setup ─────────────────────────────────────────────
-- After running, you should see the table in phpMyAdmin.
-- To view all submissions, run:
--   SELECT id, name, email, service, LEFT(message, 80) AS preview,
--          ip, created_at, is_read
--   FROM contact_submissions
--   ORDER BY created_at DESC;
--
-- To mark a row as read:
--   UPDATE contact_submissions SET is_read = 1 WHERE id = <id>;
-- ============================================================
