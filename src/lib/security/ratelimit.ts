interface RateEntry {
  count: number;
  windowStart: number;
}

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;

const store = new Map<string, RateEntry>();

function cleanExpired() {
  const now = Date.now();
  for (const [key, entry] of store) {
    if (now - entry.windowStart >= WINDOW_MS) store.delete(key);
  }
}

setInterval(cleanExpired, 60_000);

export function checkRateLimit(ip: string): {
  allowed: boolean;
  remaining: number;
} {
  const now = Date.now();
  const entry = store.get(ip);

  if (!entry || now - entry.windowStart >= WINDOW_MS) {
    store.set(ip, { count: 1, windowStart: now });
    return { allowed: true, remaining: MAX_REQUESTS - 1 };
  }

  entry.count += 1;
  if (entry.count > MAX_REQUESTS) {
    return { allowed: false, remaining: 0 };
  }

  return { allowed: true, remaining: MAX_REQUESTS - entry.count };
}
