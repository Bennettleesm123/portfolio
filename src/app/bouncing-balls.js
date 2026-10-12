"use client";

import { useSyncExternalStore } from "react";
import { createScene } from "./bouncing-balls-sim";

const FRAME_MS = 1000 / 30;
const scene = createScene();

let frame = scene.still;
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
    let last = performance.now();
    interval = window.setInterval(() => {
      const now = performance.now();
      frame = scene.advance((now - last) / 1000);
      last = now;
      emit();
    }, FRAME_MS);
  }
}

function subscribe(listener) {
  listeners.add(listener);
  if (!motionQuery) {
    motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    motionQuery.addEventListener("change", () => {
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
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return scene.still;
  return frame;
}

function getServerSnapshot() {
  return scene.still;
}

export default function BouncingBalls() {
  const text = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const lines = text.split("\n");

  return (
    <div
      className="w-full max-w-xl overflow-x-hidden"
      style={{ containerType: "inline-size" }}
      data-balls-motion={text === scene.still ? "still" : "live"}
      role="img"
      aria-label="Bouncing balls"
    >
      <pre
        className="m-0 text-ink"
        style={{
          fontFamily: "var(--font-mono), ui-monospace, monospace",
          fontSize: "calc(100cqw / 38.4)",
          lineHeight: 1.2,
          letterSpacing: 0,
          whiteSpace: "pre",
        }}
      >
        {lines.map((line, index) => (
          <span key={index} className={index === lines.length - 1 ? "text-faint" : undefined}>
            {line}
            {index < lines.length - 1 ? "\n" : null}
          </span>
        ))}
      </pre>
    </div>
  );
}
