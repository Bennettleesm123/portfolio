"use client";

import { useEffect, useState } from "react";

const EXAMPLES = [
  { label: "where he goes to school", question: "Where does Bennett go to school?" },
  { label: "what Phoenix is", question: "What is Phoenix?" },
  { label: "the capital of Italy", question: "What's the capital of Italy?" },
];

export default function AskBox() {
  const [configured, setConfigured] = useState(null);
  const [question, setQuestion] = useState("");
  const [latest, setLatest] = useState(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/ask")
      .then((response) => response.json())
      .then((data) => {
        if (!cancelled) setConfigured(Boolean(data.configured));
      })
      .catch(() => {
        if (!cancelled) setConfigured(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function onSubmit(event) {
    event.preventDefault();
    const text = question.trim();
    if (!text || sending || configured === false) return;

    setSending(true);
    setQuestion("");
    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: text }),
      });
      const data = await response.json();
      const reply = typeof data.reply === "string" && data.reply.trim() ? data.reply.trim() : data.error;
      setLatest({ reply: reply || "Couldn't answer that just now." });
    } catch {
      setLatest({ reply: "Couldn't answer that just now." });
    } finally {
      setSending(false);
    }
  }

  const ready = configured === true;

  return (
    <div className="mt-10 max-w-xl">
      <form onSubmit={onSubmit} className="flex items-baseline gap-4 border-b border-line font-mono">
        <label className="sr-only" htmlFor="ask-bennett">
          Ask about Bennett
        </label>
        <input
          id="ask-bennett"
          value={question}
          maxLength={240}
          disabled={!ready || sending}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder={ready ? "ask about bennett" : ""}
          className="w-full bg-transparent py-2 text-sm text-ink outline-none placeholder:text-faint disabled:text-faint"
        />
        <button type="submit" disabled={!ready || sending || !question.trim()} className="shrink-0 text-xs text-faint hover:text-ink disabled:hover:text-faint">
          ask
        </button>
      </form>
      <p className="mt-3 font-mono text-xs text-faint">
        you can ask{" "}
        {EXAMPLES.map((example, index) => (
          <span key={example.question}>
            {index > 0 ? " · " : null}
            <button
              type="button"
              onClick={() => setQuestion(example.question)}
              disabled={!ready || sending}
              className="hover:text-ink disabled:hover:text-faint"
            >
              {example.label}
            </button>
          </span>
        ))}
      </p>
      {configured === false ? <p className="mt-3 font-mono text-xs text-faint">Not configured.</p> : null}
      {latest ? (
        <div className="mt-2 border-t border-line font-mono text-sm">
          <div className="border-b border-line py-3">
            <p className="text-ink">{latest.reply}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
