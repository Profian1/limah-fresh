<?php
/**
 * Limah Fresh — SMTP Configuration
 *
 * EDIT THIS FILE: Replace the placeholder values below with your actual
 * cPanel email credentials. Ask your hosting provider if unsure.
 */

return [
    'smtp_host'     => 'mail.limahfresh.co.ke',       // ← Your SMTP host
    'smtp_port'     => 465,                            // ← 465 for SSL, 587 for TLS
    'smtp_username' => 'info@limahfresh.co.ke',        // ← Your email address
    'smtp_password' => 'YOUR_SMTP_PASSWORD_HERE',      // ← Your email password
    'smtp_from'     => 'Limah Fresh <info@limahfresh.co.ke>',
    'smtp_reply_to' => 'info@limahfresh.co.ke',
    'admin_email'   => 'info@limahfresh.co.ke',        // ← Where form submissions go

    'allowed_origins' => [
        'https://limahfresh.co.ke',
        'https://www.limahfresh.co.ke',
        'http://localhost:5173',
    ],

    'rate_limit_window' => 900,
    'rate_limit_max'    => 5,
];
