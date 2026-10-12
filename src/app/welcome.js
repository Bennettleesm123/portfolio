"use client";

import { useEffect, useState } from "react";
import HiddenNet from "./hidden-net";

const FACADES = ["i train models", "i love machine learning", "i build agents"];

const INPUT_Y = [32, 84, 136];
const HIDDEN_Y = [18, 62, 106, 150];
const OUTPUT = { x: 248, y: 84 };
const X = { input: 28, hidden: 138 };

const HIDDEN_ON = [
  [true, false, true, false],
  [false, true, false, true],
  [true, true, false, true],
];

function Node({ x, y, lit, hot, label, onEnter, onLeave }) {
  return (
    <g onMouseEnter={onEnter} onMouseLeave={onLeave} className="cursor-pointer">
      <circle cx={x} cy={y} r={hot ? 8 : 6} fill={lit || hot ? "#111" : "#fff"} stroke="#111" strokeWidth="1.25" />
      <title>{label}</title>
    </g>
  );
}

export default function Welcome() {
  const [text, setText] = useState(FACADES[0]);
  const [phrase, setPhrase] = useState(0);
  const [hover, setHover] = useState(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return undefined;

    let index = 0;
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
      const full = FACADES[index];
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
          index = (index + 1) % FACADES.length;
          setPhrase(index);
          mode = "type";
          queue(420);
          return;
        }
        setText(full.slice(0, count));
        queue(28);
        return;
      }
      const next = FACADES[index];
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

  const full = FACADES[phrase];
  const progress = full.length === 0 ? 0 : text.length / full.length;
  const inputOn = [progress > 0.05, progress > 0.34, progress > 0.62];
  const hiddenOn = HIDDEN_ON[phrase].map((used, i) => used && progress > 0.42 + i * 0.06);
  const outputOn = progress > 0.9;

  const edges = [];
  INPUT_Y.forEach((y, i) => {
    HIDDEN_Y.forEach((hy, h) => {
      const hot = hover === `i${i}` || hover === `h${h}`;
      const lit = inputOn[i] && hiddenOn[h];
      edges.push({
        key: `i${i}-h${h}`,
        x1: X.input,
        y1: y,
        x2: X.hidden,
        y2: hy,
        opacity: hot ? 0.95 : lit ? 0.8 : inputOn[i] || hiddenOn[h] ? 0.22 : 0.1,
      });
    });
  });
  HIDDEN_Y.forEach((y, h) => {
    const hot = hover === `h${h}` || hover === "o";
    const lit = hiddenOn[h] && outputOn;
    edges.push({
      key: `h${h}-o`,
      x1: X.hidden,
      y1: y,
      x2: OUTPUT.x,
      y2: OUTPUT.y,
      opacity: hot ? 0.95 : lit ? 0.85 : hiddenOn[h] || outputOn ? 0.22 : 0.1,
    });
  });

  return (
    <div className="flex w-full max-w-3xl flex-col items-center md:flex-row md:items-start md:justify-center md:gap-12">
      <p className="sr-only">{FACADES.join(". ")}</p>
      <p aria-hidden="true" className="mb-8 min-h-[1.6em] text-center font-mono text-xl tracking-tight text-ink md:order-2 md:mb-0 md:min-w-[18ch] md:pt-16 md:text-left md:text-2xl">
        {text}
        <span className="type-cursor">▌</span>
      </p>
      <div className="flex w-full max-w-md flex-col items-center md:order-1">
      <svg viewBox="0 0 300 200" className="h-auto w-full" role="img" aria-label="A network with an input layer, a hidden layer, and an output layer">
        {edges.map((edge) => (
          <line
            key={edge.key}
            x1={edge.x1}
            y1={edge.y1}
            x2={edge.x2}
            y2={edge.y2}
            stroke="#111"
            strokeWidth={edge.opacity > 0.7 ? 1.25 : 1}
            strokeOpacity={edge.opacity}
          />
        ))}
        <line
          x1={OUTPUT.x}
          y1={OUTPUT.y}
          x2="300"
          y2={OUTPUT.y}
          stroke="#111"
          strokeOpacity={outputOn ? 0.9 : 0.15}
        />
        {INPUT_Y.map((y, i) => (
          <Node
            key={`i${i}`}
            x={X.input}
            y={y}
            lit={inputOn[i]}
            hot={hover === `i${i}`}
            label={`Input ${i + 1}`}
            onEnter={() => setHover(`i${i}`)}
            onLeave={() => setHover(null)}
          />
        ))}
        {HIDDEN_Y.map((y, i) => (
          <Node
            key={`h${i}`}
            x={X.hidden}
            y={y}
            lit={hiddenOn[i]}
            hot={hover === `h${i}`}
            label={`Hidden ${i + 1}`}
            onEnter={() => setHover(`h${i}`)}
            onLeave={() => setHover(null)}
          />
        ))}
        <Node
          x={OUTPUT.x}
          y={OUTPUT.y}
          lit={outputOn}
          hot={hover === "o"}
          label="Output"
          onEnter={() => setHover("o")}
          onLeave={() => setHover(null)}
        />
        <text x={X.input} y="180" textAnchor="middle" fill="#8a8a8a" fontSize="10" fontFamily="inherit">
          input
        </text>
        <text x={X.hidden} y="180" textAnchor="middle" fill="#8a8a8a" fontSize="10" fontFamily="inherit">
          hidden
        </text>
        <text x={OUTPUT.x} y="180" textAnchor="middle" fill="#8a8a8a" fontSize="10" fontFamily="inherit">
          output
        </text>
      </svg>
      <HiddenNet />
      </div>
    </div>
  );
}
