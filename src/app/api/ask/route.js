import { getCachedReply, setCachedReply } from "./cache";
import {
  DECLINE_HEAVY,
  isHeavyAsk,
  MAX_OUTPUT_TOKENS,
  MAX_QUESTION_CHARS,
  MODEL,
  systemPrompt,
} from "./facts";
import { allowQuestion, clientIp } from "./limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const LIMIT_LINE = "You've used this hour's questions.";
const UNCONFIGURED_LINE = "Not configured.";

export async function GET() {
  return Response.json({ configured: Boolean(process.env.XAI_API_KEY) });
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Ask a short question." }, { status: 400 });
  }

  const question = typeof body?.question === "string" ? body.question.trim() : "";
  if (!question) {
    return Response.json({ error: "Ask a short question." }, { status: 400 });
  }
  if (question.length > MAX_QUESTION_CHARS) {
    return Response.json({ error: "Ask a shorter question." }, { status: 400 });
  }

  if (isHeavyAsk(question)) {
    return Response.json({ reply: DECLINE_HEAVY });
  }

  const cached = getCachedReply(question);
  if (cached) {
    return Response.json({ reply: cached });
  }

  if (!allowQuestion(clientIp(request))) {
    return Response.json({ error: LIMIT_LINE }, { status: 429 });
  }

  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey) {
    return Response.json({ configured: false, error: UNCONFIGURED_LINE }, { status: 503 });
  }

  try {
    const response = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        reasoning_effort: "none",
        max_tokens: MAX_OUTPUT_TOKENS,
        temperature: 0.2,
        messages: [
          { role: "system", content: systemPrompt() },
          { role: "user", content: question },
        ],
      }),
      signal: AbortSignal.timeout(20000),
    });

    if (!response.ok) {
      return Response.json({ error: "Couldn't answer that just now." }, { status: 502 });
    }

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content;
    if (typeof reply !== "string" || !reply.trim()) {
      return Response.json({ error: "Couldn't answer that just now." }, { status: 502 });
    }

    const text = reply.trim();
    setCachedReply(question, text);
    return Response.json({ reply: text });
  } catch {
    return Response.json({ error: "Couldn't answer that just now." }, { status: 502 });
  }
}
