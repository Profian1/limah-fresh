<?php
/**
 * Limah Fresh — Email API Endpoint
 *
 * Handles contact form and quote request submissions.
 * Sends emails via PHPMailer + SMTP.
 */

// Error reporting — log but don't display
error_reporting(E_ALL);
ini_set('display_errors', '0');
ini_set('log_errors', '1');

// CORS headers
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$config = require __DIR__ . '/../config/config.php';
$allowedOrigins = $config['allowed_origins'];

if (in_array($origin, $allowedOrigins, true)) {
    header("Access-Control-Allow-Origin: $origin");
}
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Only POST allowed
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit;
}

// Rate limiting (file-based)
$ip = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$ip = trim(explode(',', $ip)[0]);
$rateFile = sys_get_temp_dir() . '/lf_rate_' . md5($ip) . '.json';
$window = $config['rate_limit_window'];
$maxRequests = $config['rate_limit_max'];

$rateData = ['count' => 0, 'start' => time()];
if (file_exists($rateFile)) {
    $stored = json_decode(file_get_contents($rateFile), true);
    if ($stored && (time() - $stored['start']) < $window) {
        $rateData = $stored;
    }
}

if ($rateData['count'] >= $maxRequests) {
    http_response_code(429);
    echo json_encode(['success' => false, 'message' => 'Too many requests. Please wait a moment before trying again.']);
    exit;
}

$rateData['count']++;
file_put_contents($rateFile, json_encode($rateData));

// Read and parse JSON body
$rawBody = file_get_contents('php://input');
if (strlen($rawBody) > 16384) {
    http_response_code(413);
    echo json_encode(['success' => false, 'message' => 'Request body too large.']);
    exit;
}

$data = json_decode($rawBody, true);
if (!$data || !is_array($data)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid JSON.']);
    exit;
}

// Honeypot check
if (!empty($data['_website'])) {
    echo json_encode(['success' => true]);
    exit;
}

// Sanitize helper
function sanitize($value) {
    $value = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/', '', $value);
    $value = preg_replace('/\s+/', ' ', $value);
    return trim($value);
}

function escapeHtml($value) {
    return htmlspecialchars($value, ENT_QUOTES | ENT_HTML5, 'UTF-8');
}

// Determine email type
$type = sanitize($data['type'] ?? 'contact');

if ($type === 'contact') {
    handleContact($data, $config);
} elseif ($type === 'quote') {
    handleQuote($data, $config);
} else {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid submission type.']);
}

// ─── Contact Form Handler ───────────────────────────────────────────────────

function handleContact($data, $config) {
    // Validate required fields
    $name = sanitize($data['name'] ?? '');
    $email = sanitize($data['email'] ?? '');
    $phone = sanitize($data['phone'] ?? '');
    $subject = sanitize($data['subject'] ?? '');
    $message = sanitize($data['message'] ?? '');

    $errors = [];
    if (strlen($name) < 2) $errors[] = 'Please enter your name.';
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Please enter a valid email address.';
    if (strlen($subject) < 2) $errors[] = 'Please enter a subject.';
    if (strlen($message) < 5) $errors[] = 'Please write a short message.';

    if (!empty($errors)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => $errors[0]]);
        return;
    }

    // Prevent header injection
    if (preg_match('/[\r\n]/', $name) || preg_match('/[\r\n]/', $email)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Invalid submission.']);
        return;
    }

    $timestamp = date('l, F j, Y \a\t g:i A');

    // Admin notification
    $adminSubject = 'New Contact Form Submission';
    $adminHtml = buildContactAdminHtml($name, $email, $phone, $subject, $message, $timestamp);
    $adminText = buildContactAdminText($name, $email, $phone, $subject, $message, $timestamp);

    // Customer confirmation
    $customerSubject = 'Thank You for Contacting Limah Fresh';
    $customerHtml = buildConfirmationHtml($name, 'contact');
    $customerText = buildConfirmationText($name, 'contact');

    $result = sendDualEmail(
        $config,
        $config['admin_email'],
        $adminSubject,
        $adminHtml,
        $adminText,
        $email,
        $customerSubject,
        $customerHtml,
        $customerText
    );

    if ($result) {
        echo json_encode(['success' => true, 'message' => 'Your message has been sent successfully.']);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Unable to send your message. Please try again later.']);
    }
}

// ─── Quote Form Handler ─────────────────────────────────────────────────────

function handleQuote($data, $config) {
    $serviceTypes = ['bowser', 'dispenser_maintenance', 'delivery_contract', 'bulk_bottled', 'branded_water', 'general'];

    $serviceType = sanitize($data['serviceType'] ?? '');
    $name = sanitize($data['name'] ?? '');
    $company = sanitize($data['company'] ?? '');
    $phone = sanitize($data['phone'] ?? '');
    $email = sanitize($data['email'] ?? '');
    $location = sanitize($data['location'] ?? '');
    $volume = sanitize($data['volume'] ?? '');
    $deliveryDate = sanitize($data['deliveryDate'] ?? '');
    $message = sanitize($data['message'] ?? '');

    $errors = [];
    if (!in_array($serviceType, $serviceTypes)) $errors[] = 'Please choose a valid service type.';
    if (strlen($name) < 2) $errors[] = 'Please enter your name.';
    if (strlen($phone) < 7) $errors[] = 'Please enter a valid phone number.';
    if ($email && !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Please enter a valid email.';

    if (!empty($errors)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => $errors[0]]);
        return;
    }

    // Prevent header injection
    if (preg_match('/[\r\n]/', $name) || preg_match('/[\r\n]/', $email)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Invalid submission.']);
        return;
    }

    $reference = 'LF-' . strtoupper(substr(bin2hex(random_bytes(4)), 0, 8));
    $timestamp = date('l, F j, Y \a\t g:i A');

    $serviceLabels = [
        'bowser' => 'Bulk Water Bowser (Limah Soft Water)',
        'dispenser_maintenance' => 'Dispenser Maintenance & Sanitization',
        'delivery_contract' => 'Home / Office Delivery Contract',
        'bulk_bottled' => 'Bulk Bottled Water Order',
        'branded_water' => 'Custom Branded Water Bottles',
        'general' => 'General Inquiry',
    ];
    $serviceLabel = $serviceLabels[$serviceType] ?? 'General Inquiry';

    // Admin notification
    $adminSubject = "New Quote Request — $reference";
    $adminHtml = buildQuoteAdminHtml($reference, $serviceLabel, $name, $company, $phone, $email, $location, $volume, $deliveryDate, $message, $timestamp);
    $adminText = buildQuoteAdminText($reference, $serviceLabel, $name, $company, $phone, $email, $location, $volume, $deliveryDate, $message, $timestamp);

    // Customer confirmation
    $customerSubject = 'Thank You for Your Quote Request — Limah Fresh';
    $customerHtml = buildConfirmationHtml($name, 'quote');
    $customerText = buildConfirmationText($name, 'quote');

    $result = sendDualEmail(
        $config,
        $config['admin_email'],
        $adminSubject,
        $adminHtml,
        $adminText,
        $email,
        $customerSubject,
        $customerHtml,
        $customerText
    );

    // Build WhatsApp summary
    $lines = [
        "Hello Limah Fresh, I just submitted quote request $reference on your website.",
        '',
        "• Service: $serviceLabel",
        "• Name: $name" . ($company ? " ($company)" : ''),
        "• Phone: $phone",
    ];
    if ($location) $lines[] = "• Location: $location";
    if ($volume) $lines[] = "• Volume: $volume";
    if ($deliveryDate) $lines[] = "• Preferred date: $deliveryDate";
    if ($message) $lines[] = "• Notes: $message";

    if ($result) {
        echo json_encode([
            'success' => true,
            'message' => 'Your quote request has been sent successfully.',
            'reference' => $reference,
            'whatsAppSummary' => implode("\n", $lines),
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Unable to send your request. Please try again later.']);
    }
}

// ─── Email Sending ──────────────────────────────────────────────────────────

function sendDualEmail($config, $adminTo, $adminSubject, $adminHtml, $adminText, $customerEmail, $customerSubject, $customerHtml, $customerText) {
    // Load PHPMailer
    $autoloadPaths = [
        __DIR__ . '/../vendor/autoload.php',
        __DIR__ . '/../src/PHPMailer/vendor/autoload.php',
    ];

    $loaded = false;
    foreach ($autoloadPaths as $path) {
        if (file_exists($path)) {
            require_once $path;
            $loaded = true;
            break;
        }
    }

    if (!$loaded) {
        error_log('[Limah Fresh] PHPMailer autoload not found. Check composer install.');
        return false;
    }

    $adminSent = sendSingleEmail($config, $adminTo, $adminSubject, $adminHtml, $adminText);

    $customerSent = false;
    if ($customerEmail && filter_var($customerEmail, FILTER_VALIDATE_EMAIL)) {
        $customerSent = sendSingleEmail($config, $customerEmail, $customerSubject, $customerHtml, $customerText);
    }

    return $adminSent;
}

function sendSingleEmail($config, $to, $subject, $html, $text) {
    try {
        $mail = new PHPMailer\PHPMailer\PHPMailer(true);

        $mail->isSMTP();
        $mail->Host       = $config['smtp_host'];
        $mail->SMTPAuth   = true;
        $mail->Username   = $config['smtp_username'];
        $mail->Password   = $config['smtp_password'];
        $mail->SMTPSecure = $config['smtp_port'] == 465 ? PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_SMTPS : PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = $config['smtp_port'];
        $mail->CharSet    = 'UTF-8';

        $mail->setFrom($config['smtp_username'], 'Limah Fresh');
        if (!empty($config['smtp_reply_to'])) {
            $mail->addReplyTo($config['smtp_reply_to'], 'Limah Fresh');
        }
        $mail->addAddress($to);
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = $html;
        $mail->AltBody = $text;

        $mail->send();
        return true;
    } catch (Exception $e) {
        error_log('[Limah Fresh] Email send failed: ' . $e->getMessage());
        return false;
    }
}

// ─── Email Templates ────────────────────────────────────────────────────────

function emailShell($title, $preheader, $content) {
    $brandBlue = '#0077b6';
    $navy = '#023e8a';
    $white = '#ffffff';
    $bodyBg = '#f4f8fb';
    $text = '#0b2239';
    $muted = '#64748b';

    return "<!DOCTYPE html>
<html lang=\"en\">
<head>
  <meta charset=\"UTF-8\" />
  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />
  <title>" . escapeHtml($title) . "</title>
</head>
<body style=\"margin:0;padding:0;background-color:$bodyBg;font-family:system-ui,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;\">
  <span style=\"display:none;font-size:1px;color:$bodyBg;max-height:0;overflow:hidden;\">" . escapeHtml($preheader) . "</span>
  <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" style=\"background-color:$bodyBg;\">
    <tr><td align=\"center\" style=\"padding:24px 16px 40px;\">
      <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" style=\"max-width:600px;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.06);\">
        <tr><td bgcolor=\"$brandBlue\" style=\"background:linear-gradient(135deg,$brandBlue 0%,$navy 100%);padding:28px 32px;text-align:center;border-radius:12px 12px 0 0;\">
          <p style=\"margin:0;font-size:22px;font-weight:700;color:$white;letter-spacing:0.5px;\">Limah Fresh</p>
          <p style=\"margin:4px 0 0;font-size:13px;color:#caf0f8;font-weight:500;\">Pure Drinking Water</p>
        </td></tr>
        <tr><td bgcolor=\"$white\" style=\"padding:32px;background-color:$white;\">$content</td></tr>
        <tr><td bgcolor=\"#eef5fa\" style=\"padding:24px 32px;text-align:center;background-color:#eef5fa;border-radius:0 0 12px 12px;\">
          <table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" style=\"margin:0 auto 16px;\">
            <tr>
              <td style=\"padding:0 10px;\"><a href=\"https://www.tiktok.com/@limah.fresh.water\" style=\"color:$text;text-decoration:none;font-size:13px;font-weight:600;\">TikTok</a></td>
              <td style=\"padding:0 10px;\"><a href=\"https://www.instagram.com/limah_fresh_water_company\" style=\"color:$text;text-decoration:none;font-size:13px;font-weight:600;\">Instagram</a></td>
              <td style=\"padding:0 10px;\"><a href=\"https://www.facebook.com/limahfresh/\" style=\"color:$text;text-decoration:none;font-size:13px;font-weight:600;\">Facebook</a></td>
            </tr>
          </table>
          <p style=\"margin:0 0 4px;font-size:12px;color:$muted;\"><a href=\"https://limahfresh.co.ke\" style=\"color:$brandBlue;text-decoration:none;font-weight:600;\">limahfresh.co.ke</a></p>
          <p style=\"margin:0;font-size:12px;color:$muted;line-height:1.6;\">Clean Water. Reliable Service.<br /><strong style=\"color:$text;\">The Limah Fresh Team</strong></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>";
}

function fieldRow($label, $value) {
    $display = $value ? escapeHtml($value) : '—';
    $text = '#0b2239';
    return "<tr>
      <td style=\"padding:8px 0;border-bottom:1px solid #e2e8f0;font-size:13px;font-weight:700;color:$text;vertical-align:top;width:130px;\">" . escapeHtml($label) . "</td>
      <td style=\"padding:8px 0;border-bottom:1px solid #e2e8f0;font-size:14px;color:$text;line-height:1.5;\">$display</td>
    </tr>";
}

function buildContactAdminHtml($name, $email, $phone, $subject, $message, $timestamp) {
    $fields = [
        ['Name', $name], ['Email', $email], ['Phone', $phone],
        ['Subject', $subject], ['Message', $message], ['Submitted', $timestamp],
    ];
    $rows = '';
    foreach ($fields as $f) { $rows .= fieldRow($f[0], $f[1]); }

    $replyHref = 'mailto:' . rawurlencode($email) . '?subject=Re:%20' . rawurlencode($subject);
    $text = '#0b2239';

    $content = "<h2 style=\"margin:0 0 16px;font-size:18px;font-weight:700;color:$text;\">New Contact Form Submission</h2>
<table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"margin-bottom:8px;\">$rows</table>
<table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" style=\"margin-top:20px;\"><tr><td align=\"center\" bgcolor=\"#0077b6\" style=\"border-radius:8px;\"><a href=\"" . escapeHtml($replyHref) . "\" target=\"_blank\" style=\"display:inline-block;padding:12px 28px;font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:8px;\">Reply to " . escapeHtml($name) . "</a></td></tr></table>";

    return emailShell('New Contact Form Submission — Limah Fresh', "New message from $name — $subject", $content);
}

function buildContactAdminText($name, $email, $phone, $subject, $message, $timestamp) {
    return "New Contact Form Submission — Limah Fresh\n\nName: $name\nEmail: $email\nPhone: $phone\nSubject: $subject\nMessage: $message\nSubmitted: $timestamp";
}

function buildQuoteAdminHtml($reference, $serviceLabel, $name, $company, $phone, $email, $location, $volume, $deliveryDate, $message, $timestamp) {
    $fields = [
        ['Reference', $reference], ['Service', $serviceLabel], ['Name', $name],
        ['Company', $company], ['Phone', $phone], ['Email', $email],
        ['Location', $location], ['Volume', $volume], ['Delivery Date', $deliveryDate],
        ['Message', $message], ['Submitted', $timestamp],
    ];
    $rows = '';
    foreach ($fields as $f) { $rows .= fieldRow($f[0], $f[1]); }

    $replyHref = $email
        ? 'mailto:' . rawurlencode($email) . '?subject=Re:%20Quote%20' . rawurlencode($reference)
        : 'mailto:info@limahfresh.co.ke?subject=Re:%20Quote%20' . rawurlencode($reference);
    $text = '#0b2239';
    $brandBlue = '#0077b6';

    $content = "<div style=\"border-left:4px solid $brandBlue;padding-left:20px;margin-bottom:8px;\">
  <h2 style=\"margin:0 0 4px;font-size:18px;font-weight:700;color:$text;\">New Quote Request</h2>
  <p style=\"margin:0;font-size:13px;color:$brandBlue;font-weight:600;\">" . escapeHtml($reference) . "</p>
</div>
<table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"margin-bottom:8px;\">$rows</table>
<table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" style=\"margin-top:20px;\"><tr><td align=\"center\" bgcolor=\"#0077b6\" style=\"border-radius:8px;\"><a href=\"" . escapeHtml($replyHref) . "\" target=\"_blank\" style=\"display:inline-block;padding:12px 28px;font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:8px;\">Reply to " . escapeHtml($name) . "</a></td></tr></table>";

    return emailShell("New Quote Request — $reference — Limah Fresh", "Quote request $reference from $name — $serviceLabel", $content);
}

function buildQuoteAdminText($reference, $serviceLabel, $name, $company, $phone, $email, $location, $volume, $deliveryDate, $message, $timestamp) {
    return "New Quote Request — $reference — Limah Fresh\n\nReference: $reference\nService: $serviceLabel\nName: $name\nCompany: $company\nPhone: $phone\nEmail: $email\nLocation: $location\nVolume: $volume\nDelivery Date: $deliveryDate\nMessage: $message\nSubmitted: $timestamp";
}

function buildConfirmationHtml($name, $type) {
    $brandBlue = '#0077b6';
    $text = '#0b2239';
    $muted = '#475569';

    $greeting = $type === 'quote'
        ? 'We have successfully received your quote request.'
        : 'We have successfully received your message.';

    $content = "<h2 style=\"margin:0 0 12px;font-size:18px;font-weight:700;color:$text;\">Hello " . escapeHtml($name) . ",</h2>
<p style=\"margin:0 0 8px;font-size:15px;color:$muted;line-height:1.6;\">Thank you for contacting <strong style=\"color:$text;\">Limah Fresh</strong>.</p>
<p style=\"margin:0 0 8px;font-size:15px;color:$muted;line-height:1.6;\">$greeting Our team is currently reviewing your submission, and a member of our customer service team will contact you shortly.</p>

<div style=\"margin:24px 0;padding:16px 20px;background-color:#f0f7fb;border-radius:10px;border:1px solid #caf0f8;\">
  <p style=\"margin:0 0 8px;font-size:13px;font-weight:700;color:$text;\">If your request is urgent, please call:</p>
  <p style=\"margin:0;font-size:20px;font-weight:700;color:$brandBlue;\">
    <a href=\"tel:+254718013391\" style=\"color:$brandBlue;text-decoration:none;\">0718 013 391</a>
  </p>
  <p style=\"margin:4px 0 0;font-size:14px;color:$muted;\">or <a href=\"tel:+254742336747\" style=\"color:$brandBlue;text-decoration:none;\">0742 336 747</a></p>
</div>

<div style=\"margin:24px 0;\">
  <h3 style=\"margin:0 0 8px;font-size:14px;font-weight:700;color:$text;\">Business Hours</h3>
  <table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" style=\"font-size:14px;color:$muted;line-height:1.8;\">
    <tr><td style=\"padding-right:20px;font-weight:600;color:$text;\">Monday – Saturday</td><td>8:00 AM – 6:00 PM</td></tr>
  </table>
</div>

<p style=\"margin:24px 0 0;font-size:14px;color:$muted;line-height:1.6;\">Thank you for trusting <strong style=\"color:$text;\">Limah Fresh</strong>.</p>
<p style=\"margin:4px 0 0;font-size:14px;color:$text;font-weight:500;line-height:1.6;\">Clean Water. Reliable Service.</p>";

    $subject = $type === 'quote'
        ? 'Thank You for Your Quote Request — Limah Fresh'
        : 'Thank You for Contacting Limah Fresh';

    return emailShell($subject, "Thank you for reaching out, $name. The Limah Fresh team will be in touch shortly.", $content);
}

function buildConfirmationText($name, $type) {
    $greeting = $type === 'quote'
        ? 'We have successfully received your quote request.'
        : 'We have successfully received your message.';

    return "Hello $name,\n\nThank you for contacting Limah Fresh. $greeting Our team is reviewing your submission and a member of our customer service team will contact you shortly.\n\nIf your request is urgent, please call:\n0718 013 391 or 0742 336 747\n\nBusiness Hours\nMonday – Saturday: 8:00 AM – 6:00 PM\n\nClean Water. Reliable Service.\nThe Limah Fresh Team";
}
