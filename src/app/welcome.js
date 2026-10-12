"use client";

import { useEffect, useRef, useState } from "react";
import HiddenNet from "./hidden-net";
import { bindHomeCollapse } from "./home-reset";

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

const OPEN_MS = 280;

export default function Welcome() {
  const [text, setText] = useState(FACADES[0]);
  const [phrase, setPhrase] = useState(0);
  const [hover, setHover] = useState(null);
  const [phase, setPhase] = useState("network");
  const [freeze, setFreeze] = useState(null);
  const [flight, setFlight] = useState(null);
  const heroRef = useRef(null);
  const fieldRef = useRef(null);
  const labelRef = useRef(null);
  const alive = useRef(true);
  const timer = useRef(0);
  const frames = useRef([]);

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

  useEffect(() => {
    alive.current = true;
    const pending = frames.current;
    return () => {
      alive.current = false;
      window.clearTimeout(timer.current);
      for (const id of pending) cancelAnimationFrame(id);
    };
  }, []);

  const showNet = phase !== "field";
  const showField = phase !== "network";

  const later = (fn) => {
    const first = requestAnimationFrame(() => {
      const second = requestAnimationFrame(() => {
        if (alive.current) fn();
      });
      frames.current.push(second);
    });
    frames.current.push(first);
  };

  const finish = (next) => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      if (!alive.current) return;
      setFlight(null);
      setFreeze(null);
      setPhase(next);
    }, OPEN_MS);
  };

  const openHidden = () => {
    if (phase !== "network" || !heroRef.current || !labelRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("field");
      return;
    }
    const heroBox = heroRef.current.getBoundingClientRect();
    const labelBox = labelRef.current.getBoundingClientRect();
    const labelPoint = {
      x: labelBox.left + labelBox.width / 2,
      y: labelBox.top + labelBox.height / 2,
    };
    setFreeze({
      top: heroBox.top,
      left: heroBox.left,
      width: heroBox.width,
      height: heroBox.height,
      ox: labelPoint.x - heroBox.left,
      oy: labelPoint.y - heroBox.top,
    });
    setPhase("opening");
    later(() => {
      const field = fieldRef.current;
      if (!field) {
        setFreeze(null);
        setPhase("field");
        return;
      }
      const box = field.getBoundingClientRect();
      setFlight({
        dx: labelPoint.x - (box.left + box.width / 2),
        dy: labelPoint.y - (box.top + box.height / 2),
      });
      finish("field");
    });
  };

  const closeHidden = () => {
    if (phase !== "field" || !fieldRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("network");
      return;
    }
    const fieldBox = fieldRef.current.getBoundingClientRect();
    setFreeze({
      top: fieldBox.top,
      left: fieldBox.left,
      width: fieldBox.width,
      height: fieldBox.height,
    });
    setPhase("closing");
    later(() => {
      const label = labelRef.current;
      const hero = heroRef.current;
      if (!label || !hero) {
        setFreeze(null);
        setPhase("network");
        return;
      }
      const labelBox = label.getBoundingClientRect();
      const heroBox = hero.getBoundingClientRect();
      const labelPoint = {
        x: labelBox.left + labelBox.width / 2,
        y: labelBox.top + labelBox.height / 2,
      };
      setFlight({
        dx: labelPoint.x - (fieldBox.left + fieldBox.width / 2),
        dy: labelPoint.y - (fieldBox.top + fieldBox.height / 2),
        ox: labelPoint.x - heroBox.left,
        oy: labelPoint.y - heroBox.top,
      });
      finish("network");
    });
  };

  useEffect(() => {
    bindHomeCollapse(closeHidden);
    return () => bindHomeCollapse(() => {});
  });

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

  const heroMotion = phase === "opening" ? "layer-shut pointer-events-none" : phase === "closing" ? (flight ? "layer-return" : "opacity-0") : "";
  const fieldMotion = phase === "opening" ? (flight ? "layer-open" : "opacity-0") : phase === "closing" ? (flight ? "layer-shut-back pointer-events-none" : "pointer-events-none") : "";
  const heroStyle = phase === "opening" && freeze
    ? {
        position: "fixed",
        top: freeze.top,
        left: freeze.left,
        width: freeze.width,
        height: freeze.height,
        zIndex: 1,
        transformOrigin: `${freeze.ox}px ${freeze.oy}px`,
      }
    : phase === "closing"
      ? { zIndex: 1, transformOrigin: flight ? `${flight.ox}px ${flight.oy}px` : "24% 42%" }
      : undefined;
  const fieldStyle = phase === "closing" && freeze
    ? {
        position: "fixed",
        top: freeze.top,
        left: freeze.left,
        width: freeze.width,
        zIndex: 2,
        "--dx": flight ? `${flight.dx}px` : "0px",
        "--dy": flight ? `${flight.dy}px` : "0px",
      }
    : {
        position: "relative",
        zIndex: 2,
        "--dx": flight ? `${flight.dx}px` : "0px",
        "--dy": flight ? `${flight.dy}px` : "0px",
      };

  return (
    <div className="relative w-full max-w-3xl" data-home-view={phase}>
      {showNet ? (
    <div ref={heroRef} className={`flex w-full flex-col items-center gap-8 md:flex-row md:items-center md:justify-center md:gap-8 ${heroMotion}`} style={heroStyle}>
      <p className="sr-only">{FACADES.join(". ")}</p>
      <svg viewBox="0 0 300 200" className="h-auto w-full max-w-[320px] shrink-0" role="img" aria-label="A network with an input layer, a hidden layer, and an output layer">
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
        <g
          ref={labelRef}
          role="button"
          tabIndex={0}
          aria-label="hidden"
          aria-expanded={showField}
          className="cursor-pointer"
          onClick={openHidden}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              openHidden();
            }
          }}
        >
          <rect x={X.hidden - 42} y="166" width="84" height="34" fill="transparent" />
          <text x={X.hidden} y="180" textAnchor="middle" fill="#8a8a8a" fontSize="10" fontFamily="inherit">
            hidden
          </text>
          <text x={X.hidden} y="194" textAnchor="middle" fill="#8a8a8a" fontSize="8" fontFamily="inherit">
            click here!
          </text>
        </g>
        <text x={OUTPUT.x} y="180" textAnchor="middle" fill="#8a8a8a" fontSize="10" fontFamily="inherit">
          output
        </text>
      </svg>
      {/* 15.74px lifts the x-height onto the output stroke, which sits above the svg center. */}
      <p aria-hidden="true" className="min-h-[1.6em] text-center font-mono text-xl tracking-tight text-ink md:min-w-[18ch] md:-translate-y-[15.74px] md:text-left md:text-2xl">
        {text}
        <span className="type-cursor">▌</span>
      </p>
    </div>
      ) : null}
      {showField ? (
        <div ref={fieldRef} className={`flex w-full flex-col items-center ${fieldMotion}`} style={fieldStyle}>
          <HiddenNet />
          <button type="button" onClick={closeHidden} className="mt-6 cursor-pointer border-0 bg-transparent p-0 text-[10px] text-faint">
            back
          </button>
        </div>
      ) : null}
    </div>
  );
}
