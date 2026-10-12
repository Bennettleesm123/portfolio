"use client";

import { useSyncExternalStore } from "react";

const WIDTH = 64;
const FRAME_MS = 1100;
const WATER_END = 44;
const REFLECTIONS = new Set([12, 13, 20, 21, 28, 29]);
const RIPPLE = [" ", " ", "░", " ", "▒", " "];

const STILL = [
  "                                                         ░      ",
  "                                                ░      ░        ",
  "    ██████████████████████████████████                          ",
  "    █░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░█                          ",
  "    ██████████████████████████████████                          ",
  "           ████    ████    ████                █                ",
  "           ████    ████    ████               ███               ",
  "           ████    ████    ████         ▄█▄  ████               ",
  "           █▓▓█    █▓▓█    █▓▓█        ████  ████               ",
  "   ▗▄▄▖    ████    ████    ████        ████  █░██    ▄█▄        ",
  "  ▗██████▖ ████    ████    ████        █▓▓█  ████   ███   ▄█    ",
  "▄████████▄ ████    ████    ████        ████  █▓██   █▓█   ██    ",
  "██████████ ████    ████    ████        ████  ████   ███   ██  █ ",
  "────────────────────────────────────────────────────────────────",
  "  ░     ░   ▒▒  ░   ▒▒  ░   ▒▒    ░   ░   ░                     ",
  "      ░     ░░    ░ ░░      ░░  ░       ░       ░     ░     ░   ",
  "────────────────────────────────────────────────────────────────"
];

const LIGHTS = [[3, 7], [3, 10], [3, 13], [3, 16], [3, 19], [3, 22], [3, 25], [3, 28], [3, 31], [3, 34], [8, 12], [8, 13], [8, 20], [8, 21], [8, 28], [8, 29], [9, 46], [10, 40], [11, 46], [11, 53]];

let tick = 0;
let interval = 0;
const listeners = new Set();
let motionQuery;

function emit() {
  listeners.forEach((listener) => listener());
}

function motionReduced() {
  return motionQuery ? motionQuery.matches : false;
}

function syncClock() {
  if (typeof window === "undefined") return;
  if (listeners.size === 0 || motionReduced()) {
    if (interval) {
      window.clearInterval(interval);
      interval = 0;
    }
    return;
  }
  if (!interval) {
    interval = window.setInterval(() => {
      tick += 1;
      emit();
    }, FRAME_MS);
  }
}

function subscribe(listener) {
  listeners.add(listener);
  if (!motionQuery) {
    motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    motionQuery.addEventListener("change", () => {
      if (motionReduced()) tick = 0;
      syncClock();
      emit();
    });
  }
  syncClock();
  return () => {
    listeners.delete(listener);
    syncClock();
  };
}

function getSnapshot() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return 0;
  return tick;
}

function getServerSnapshot() {
  return 0;
}

function frame(step) {
  const rows = STILL.map((row) => row.padEnd(WIDTH, " ").split(""));
  if (step === 0) return rows;

  const phase = step % RIPPLE.length;
  for (let x = 0; x < WATER_END; x += 1) {
    if (REFLECTIONS.has(x)) continue;
    rows[14][x] = RIPPLE[(x + phase) % RIPPLE.length];
    rows[15][x] = RIPPLE[(x + phase + 2) % RIPPLE.length];
  }

  if (step % 4 === 0) {
    const [y, x] = LIGHTS[Math.floor(step / 4) % LIGHTS.length];
    const current = rows[y][x];
    rows[y][x] = current === "░" ? " " : current === "▓" ? "░" : "▒";
  }

  return rows;
}

function isFaint(y, x, ch) {
  if (y >= 13 || x >= 58) return true;
  return y <= 1 && ch === "░";
}

function segments(row, y) {
  const parts = [];
  let text = "";
  let faint = false;
  for (let x = 0; x < row.length; x += 1) {
    const next = isFaint(y, x, row[x]);
    if (text && next !== faint) {
      parts.push({ faint, text });
      text = "";
    }
    faint = next;
    text += row[x];
  }
  if (text) parts.push({ faint, text });
  return parts;
}

export default function MarinaBay() {
  const step = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const rows = frame(step);

  return (
    <div
      className="mt-8 w-full max-w-xl overflow-x-hidden"
      style={{ containerType: "inline-size" }}
      data-skyline-motion={step === 0 ? "still" : "live"}
      role="img"
      aria-label="Marina Bay, Singapore"
    >
      <pre
        className="m-0 text-ink"
        style={{
          fontFamily: "var(--font-mono), ui-monospace, monospace",
          fontSize: "calc(100cqw / 38.4)",
          lineHeight: 0.8,
          letterSpacing: 0,
          whiteSpace: "pre",
        }}
      >
        {rows.map((row, y) => (
          <span key={y}>
            {segments(row, y).map((part, index) =>
              part.faint ? (
                <span key={index} className="text-faint">
                  {part.text}
                </span>
              ) : (
                <span key={index}>{part.text}</span>
              ),
            )}
            {y < rows.length - 1 ? "\n" : null}
          </span>
        ))}
      </pre>
    </div>
  );
}
