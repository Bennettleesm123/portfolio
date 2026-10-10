const HOUR_MS = 60 * 60 * 1000;
export const QUESTION_LIMIT = 8;

const buckets = new Map();

export function clientIp(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0].trim();
    if (first) return first;
  }
  const real = request.headers.get("x-real-ip");
  if (real && real.trim()) return real.trim();
  return "local";
}

export function allowQuestion(ip, now = Date.now()) {
  const current = buckets.get(ip);
  if (!current || now - current.start >= HOUR_MS) {
    buckets.set(ip, { start: now, count: 1 });
    return true;
  }
  if (current.count >= QUESTION_LIMIT) return false;
  current.count += 1;
  return true;
}
