interface RateEntry {
  count: number;
  windowStart: number;
}

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;
const MAX_ENTRIES = 20_000;

const store = new Map<string, RateEntry>();

function cleanExpired(now = Date.now()) {
  for (const [key, entry] of store) {
    if (now - entry.windowStart >= WINDOW_MS) store.delete(key);
  }
}

function pruneOldestIfNeeded() {
  if (store.size <= MAX_ENTRIES) return;

  const sorted = [...store.entries()].sort(
    ([, a], [, b]) => a.windowStart - b.windowStart,
  );

  const overflow = store.size - MAX_ENTRIES;
  for (let i = 0; i < overflow; i++) {
    const key = sorted[i]?.[0];
    if (key) store.delete(key);
  }
}

setInterval(() => {
  cleanExpired();
  pruneOldestIfNeeded();
}, 60_000);

export function checkRateLimit(ip: string): {
  allowed: boolean;
  remaining: number;
} {
  const key = ip || "unknown";
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now - entry.windowStart >= WINDOW_MS) {
    store.set(key, { count: 1, windowStart: now });
    return { allowed: true, remaining: MAX_REQUESTS - 1 };
  }

  entry.count += 1;
  if (entry.count > MAX_REQUESTS) {
    return { allowed: false, remaining: 0 };
  }

  return { allowed: true, remaining: MAX_REQUESTS - entry.count };
}
