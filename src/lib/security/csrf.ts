import { randomUUID } from "crypto";

interface TokenEntry {
  token: string;
  expiresAt: number;
}

const TTL_MS = 10 * 60 * 1000;

const tokens = new Map<string, TokenEntry>();

function cleanExpiredTokens() {
  const now = Date.now();
  for (const [key, entry] of tokens) {
    if (entry.expiresAt <= now) tokens.delete(key);
  }
}

setInterval(cleanExpiredTokens, 60_000);

export function generateToken(): string {
  const token = randomUUID();
  tokens.set(token, { token, expiresAt: Date.now() + TTL_MS });
  return token;
}

export function validateToken(token: string): boolean {
  const entry = tokens.get(token);
  if (!entry) return false;
  if (Date.now() > entry.expiresAt) {
    tokens.delete(token);
    return false;
  }
  tokens.delete(token);
  return true;
}
