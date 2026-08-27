<?php
/**
 * Limah Fresh — SMTP Configuration
 *
 * Copy this file to config.php and fill in your actual credentials.
 * NEVER commit config.php with real passwords to version control.
 */

return [
    'smtp_host'     => getenv('SMTP_HOST')     ?: 'smtp.yourdomain.co.ke',
    'smtp_port'     => (int) (getenv('SMTP_PORT')     ?: 465),
    'smtp_username' => getenv('SMTP_USERNAME') ?: 'info@limahfresh.co.ke',
    'smtp_password' => getenv('SMTP_PASSWORD') ?: '',
    'smtp_from'     => getenv('SMTP_FROM')     ?: 'Limah Fresh <info@limahfresh.co.ke>',
    'smtp_reply_to' => getenv('SMTP_REPLY_TO') ?: 'info@limahfresh.co.ke',
    'admin_email'   => getenv('ADMIN_EMAIL')   ?: 'info@limahfresh.co.ke',

    // Allowed origins for CORS
    'allowed_origins' => [
        'https://limahfresh.co.ke',
        'https://www.limahfresh.co.ke',
        'http://localhost:5173',
        'http://localhost:4173',
    ],

    // Rate limiting
    'rate_limit_window' => 900,  // 15 minutes in seconds
    'rate_limit_max'    => 5,    // max requests per window
];
