"use client";

import { useEffect, useState } from "react";

const FACADES = [
  "i train language models.",
  "i love machine learning.",
  "i build agents.",
  "i study statistics.",
  "i grow bonsai.",
  "i play the saxophone.",
];

export default function Typewriter() {
  const [text, setText] = useState(FACADES[0]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return undefined;

    let phrase = 0;
    let count = FACADES[0].length;
    let mode = "hold";
    let timeoutId = 0;
    let cancelled = false;

    const queue = (delay) => {
      timeoutId = window.setTimeout(() => {
        if (!cancelled) step();
      }, delay);
    };

    const step = () => {
      const full = FACADES[phrase];
      if (mode === "hold") {
        mode = "delete";
        queue(30);
        return;
      }
      if (mode === "delete") {
        count -= 1;
        if (count <= 0) {
          count = 0;
          setText("");
          phrase = (phrase + 1) % FACADES.length;
          mode = "type";
          queue(420);
          return;
        }
        setText(full.slice(0, count));
        queue(28);
        return;
      }
      const next = FACADES[phrase];
      count += 1;
      setText(next.slice(0, count));
      if (count >= next.length) {
        mode = "hold";
        queue(1800);
        return;
      }
      const typed = next[count - 1];
      queue(typed === " " ? 110 : 42 + Math.random() * 70);
    };

    queue(1600);
    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div>
      <p className="sr-only">{FACADES.join(" ")}</p>
      <p aria-hidden="true" className="min-h-[1.5em] font-mono text-xl tracking-tight text-ink sm:text-2xl">
        {text}
        <span className="type-cursor">▌</span>
      </p>
    </div>
  );
}
