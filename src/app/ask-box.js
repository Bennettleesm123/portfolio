"use client";

import { useEffect, useState } from "react";

const MOODS = [
  { id: "cheerful", label: "cheerful" },
  { id: "frustrated", label: "frustrated" },
  { id: "bored", label: "bored" },
];

export default function AskBox() {
  const [configured, setConfigured] = useState(null);
  const [mood, setMood] = useState("cheerful");
  const [question, setQuestion] = useState("");
  const [turns, setTurns] = useState([]);
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
        body: JSON.stringify({ question: text, mood }),
      });
      const data = await response.json();
      const reply = typeof data.reply === "string" && data.reply.trim() ? data.reply.trim() : data.error;
      setTurns((current) => [...current, { question: text, reply: reply || "Couldn't answer that just now." }]);
    } catch {
      setTurns((current) => [...current, { question: text, reply: "Couldn't answer that just now." }]);
    } finally {
      setSending(false);
    }
  }

  const ready = configured === true;

  return (
    <div className="mt-10 max-w-xl">
      <div className="flex gap-4 font-mono text-xs" role="group" aria-label="Mood">
        {MOODS.map((item) => {
          const active = mood === item.id;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={active}
              onClick={() => setMood(item.id)}
              className={active ? "text-ink underline underline-offset-4" : "text-faint hover:text-ink"}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      <form onSubmit={onSubmit} className="mt-3 flex items-baseline gap-4 border-b border-line font-mono">
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
      {configured === false ? <p className="mt-3 font-mono text-xs text-faint">Not configured.</p> : null}
      {turns.length > 0 ? (
        <div className="mt-2 border-t border-line font-mono text-sm">
          {turns.map((turn, index) => (
            <div key={`${turn.question}-${index}`} className="border-b border-line py-3">
              <p className="text-faint">{turn.question}</p>
              <p className="mt-1 text-ink">{turn.reply}</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
