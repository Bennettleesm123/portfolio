const MAX_ENTRIES = 200;

const replies = new Map();

export function cacheKey(question, mood) {
  return `${mood}\n${question.trim().toLowerCase()}`;
}

export function getCachedReply(question, mood) {
  const key = cacheKey(question, mood);
  if (!replies.has(key)) return null;
  const reply = replies.get(key);
  replies.delete(key);
  replies.set(key, reply);
  return reply;
}

export function setCachedReply(question, mood, reply) {
  const key = cacheKey(question, mood);
  if (replies.has(key)) replies.delete(key);
  replies.set(key, reply);
  while (replies.size > MAX_ENTRIES) {
    const oldest = replies.keys().next().value;
    replies.delete(oldest);
  }
}
