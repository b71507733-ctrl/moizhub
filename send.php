<?php
/* =========================================================
   MOIZHUB — CONTACT FORM HANDLER
   Validates the contact form (server-side, core PHP) then
   redirects the visitor to WhatsApp with a pre-filled message.
   No API keys, no cost — the visitor just taps "Send" in WhatsApp.
   ========================================================= */
declare(strict_types=1);

// ---------------------------------------------------------
// CONFIG — your WhatsApp number in international format
// (no +, no spaces, no leading 0). Pakistani 0330-1250824
// becomes 92 330 1250824 below.
// ---------------------------------------------------------
const WHATSAPP_NUMBER = '923301250824';
const REDIRECT_BACK   = 'index.php';

function backTo(string $sentValue, ?string $reason = null): never
{
    $url = REDIRECT_BACK . '?sent=' . urlencode($sentValue);
    if ($reason !== null) {
        $url .= '&reason=' . urlencode($reason);
    }
    header('Location: ' . $url, true, 303);
    exit;
}

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    backTo('0', 'method');
}

// ---------------------------------------------------------
// Collect + sanitize input
// ---------------------------------------------------------
$name    = trim((string)($_POST['name'] ?? ''));
$email   = trim((string)($_POST['email'] ?? ''));
$message = trim((string)($_POST['message'] ?? ''));

// Strip anything that isn't plain text (basic hardening)
$name    = strip_tags($name);
$message = strip_tags($message);

// ---------------------------------------------------------
// Validate
// ---------------------------------------------------------
if ($name === '' || $email === '' || $message === '') {
    backTo('0', 'fields');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    backTo('0', 'email');
}

// Basic length guards (avoid absurdly long WhatsApp URLs).
// Uses mbstring when available, falls back to substr otherwise
// so this still works on hosts without the mbstring extension.
function safeSubstr(string $str, int $length): string
{
    return function_exists('mb_substr')
        ? mb_substr($str, 0, $length)
        : substr($str, 0, $length);
}

$name    = safeSubstr($name, 100);
$message = safeSubstr($message, 1000);

// ---------------------------------------------------------
// Build the WhatsApp message + redirect
// ---------------------------------------------------------
$waText = "New enquiry from MoizHub\n\n"
    . "Name: {$name}\n"
    . "Email: {$email}\n\n"
    . "Message:\n{$message}";

$waUrl = 'https://wa.me/' . WHATSAPP_NUMBER . '?text=' . rawurlencode($waText);

header('Location: ' . $waUrl, true, 303);
exit;
