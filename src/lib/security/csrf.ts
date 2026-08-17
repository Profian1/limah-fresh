import { randomBytes } from "crypto";

interface TokenEntry {
  token: string;
  expiresAt: number;
}

const TTL_MS = 10 * 60 * 1000;
const MAX_TOKENS = 10_000;

const tokens = new Map<string, TokenEntry>();

function cleanExpiredTokens(now = Date.now()) {
  for (const [key, entry] of tokens) {
    if (entry.expiresAt <= now) tokens.delete(key);
  }
}

function pruneOldestIfNeeded() {
  if (tokens.size <= MAX_TOKENS) return;

  const sorted = [...tokens.entries()].sort(
    ([, a], [, b]) => a.expiresAt - b.expiresAt,
  );

  const overflow = tokens.size - MAX_TOKENS;
  for (let i = 0; i < overflow; i++) {
    const key = sorted[i]?.[0];
    if (key) tokens.delete(key);
  }
}

setInterval(() => {
  cleanExpiredTokens();
  pruneOldestIfNeeded();
}, 60_000);

export function generateToken(): string {
  cleanExpiredTokens();
  pruneOldestIfNeeded();
  const token = randomBytes(32).toString("hex");
  tokens.set(token, { token, expiresAt: Date.now() + TTL_MS });
  return token;
}

export function validateToken(token: string): boolean {
  if (!token || token.length > 128) return false;
  const entry = tokens.get(token);
  if (!entry) return false;
  if (Date.now() > entry.expiresAt) {
    tokens.delete(token);
    return false;
  }
  tokens.delete(token);
  return true;
}
