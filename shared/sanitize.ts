const MAX_TEXT_LENGTH = 500;

/**
 * Sanitize text input by removing HTML tags and trimming whitespace
 */
export function sanitizeText(input: string): string {
  // Remove HTML tags
  let sanitized = input.replace(/<[^>]*>/g, '');

  // Decode HTML entities
  sanitized = sanitized
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, '/');

  // Trim whitespace and normalize multiple spaces
  sanitized = sanitized.trim().replace(/\s+/g, ' ');

  // Truncate to max length
  if (sanitized.length > MAX_TEXT_LENGTH) {
    sanitized = sanitized.slice(0, MAX_TEXT_LENGTH);
  }

  return sanitized;
}

/**
 * Check if task text is valid (non-empty and within length limit).
 * Expects already-sanitized input.
 */
export function isValidTaskText(text: string): boolean {
  return text.length > 0 && text.length <= MAX_TEXT_LENGTH;
}
