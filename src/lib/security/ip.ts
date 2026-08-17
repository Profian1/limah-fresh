const IPV4_RE = /^\d{1,3}(\.\d{1,3}){3}$/;
const IPV6_RE = /^[0-9a-f:]+$/i;

export function extractIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first && (IPV4_RE.test(first) || IPV6_RE.test(first))) {
      return first;
    }
  }
  return "unknown";
}
