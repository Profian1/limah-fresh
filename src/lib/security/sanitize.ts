const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

/**
 * Normalizes untrusted text for storage/transport. This deliberately does NOT
 * interpret or unescape HTML entities, so a submitted value such as
 * `&lt;img src=x onerror=alert(1)&gt;` remains harmless literal text.
 */
export function normalizeText(input: string): string {
  return input.replace(CONTROL_CHARS, "").replace(/\s+/g, " ").trim();
}

export function sanitize(input: string): string {
  return normalizeText(input);
}

export function sanitizeOptional(
  input: string | null | undefined,
): string | null | undefined {
  if (input === null || input === undefined || input === "") return input;
  return sanitize(input);
}

/**
 * Escapes user-controlled text for safe insertion into HTML email templates.
 * Always call this at the point where data is placed into HTML.
 */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
