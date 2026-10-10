"use client";

import { useState } from "react";

const START = ["we"];

const STEPS = [
  [
    { token: "train", p: 0.57 },
    { token: "build", p: 0.23 },
    { token: "test", p: 0.13 },
    { token: "ship", p: 0.07 },
  ],
  [
    { token: "models", p: 0.48 },
    { token: "agents", p: 0.27 },
    { token: "systems", p: 0.16 },
    { token: "code", p: 0.09 },
  ],
  [
    { token: "to", p: 0.51 },
    { token: "that", p: 0.27 },
    { token: "and", p: 0.14 },
    { token: "then", p: 0.08 },
  ],
  [
    { token: "read", p: 0.47 },
    { token: "answer", p: 0.26 },
    { token: "search", p: 0.17 },
    { token: "stop", p: 0.1 },
  ],
];

export default function NextTokens() {
  const [words, setWords] = useState(START);
  const step = words.length - START.length;
  const options = STEPS[step];

  return (
    <div className="w-full max-w-md font-mono">
      <p className="text-xs leading-relaxed text-faint">the model scores possible next tokens, then one is chosen.</p>
      <p className="mt-4 text-sm tracking-tight text-ink">{words.join(" ")}</p>
      {options ? (
        <ul className="mt-3" aria-label="Next token probabilities">
          {options.map((option) => (
            <li key={option.token}>
              <button
                type="button"
                onClick={() => setWords((current) => [...current, option.token])}
                className="flex w-full items-center gap-3 py-1.5 text-left text-sm text-ink"
              >
                <span className="w-[7ch] shrink-0">{option.token}</span>
                <span className="relative h-px flex-1 bg-line" aria-hidden="true">
                  <span className="absolute top-1/2 left-0 h-0.5 -translate-y-1/2 bg-ink" style={{ width: `${option.p * 100}%` }} />
                </span>
                <span className="w-[4ch] shrink-0 text-right text-xs text-faint">{option.p.toFixed(2)}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-xs text-faint">end of this chain.</p>
      )}
      <button type="button" onClick={() => setWords(START)} className="mt-4 text-xs text-faint hover:text-ink">
        reset
      </button>
    </div>
  );
}
