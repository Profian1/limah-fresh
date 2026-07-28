export function sanitize(input: string): string {
  return input
    .replace(/<[^>]*>/g, "")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, "/")
    .replace(/\s+/g, " ")
    .trim();
}

export function sanitizeOptional(
  input: string | null | undefined,
): string | null | undefined {
  if (input === null || input === undefined || input === "") return input;
  return sanitize(input);
}
