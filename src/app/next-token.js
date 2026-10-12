"use client";

import { useEffect, useRef, useState } from "react";
import { SENTENCES } from "./next-token-data";

// Keep these aligned with the keyframe durations in globals.css.
const JOIN_MS = 280;
const HOLD_MS = 1400;

function prefersReduced() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function NextToken() {
  const [index, setIndex] = useState(0);
  const [path, setPath] = useState([]);
  const [phase, setPhase] = useState("idle");
  const [menu, setMenu] = useState(SENTENCES[0].choices);
  const [menuKey, setMenuKey] = useState(0);
  const [joined, setJoined] = useState(false);
  const timers = useRef(new Set());

  useEffect(() => {
    const pending = timers.current;
    return () => {
      for (const id of pending) clearTimeout(id);
      pending.clear();
    };
  }, []);

  function later(fn, ms) {
    const id = window.setTimeout(() => {
      timers.current.delete(id);
      fn();
    }, ms);
    timers.current.add(id);
  }

  function showSentence(nextIndex) {
    setIndex(nextIndex);
    setPath([]);
    setJoined(false);
    setMenu(SENTENCES[nextIndex].choices);
    setMenuKey((key) => key + 1);
  }

  function resetToNext(fromIndex) {
    const nextIndex = (fromIndex + 1) % SENTENCES.length;
    if (prefersReduced()) {
      showSentence(nextIndex);
      setPhase("idle");
      return;
    }
    setPhase("clearing");
    later(() => {
      showSentence(nextIndex);
      setPhase("enter");
      later(() => setPhase("idle"), JOIN_MS);
    }, JOIN_MS);
  }

  function pick(choice) {
    if (phase !== "idle") return;
    const fromIndex = index;
    const nextPath = [...path, choice.token];
    const terminal = !choice.choices;
    const following = choice.choices ?? [];

    setPath(nextPath);
    setJoined(true);

    if (prefersReduced()) {
      setJoined(false);
      if (terminal) {
        setMenu([]);
        setPhase("hold");
        later(() => resetToNext(fromIndex), HOLD_MS);
      } else {
        setMenu(following);
        setMenuKey((key) => key + 1);
      }
      return;
    }

    setPhase("out");
    later(() => {
      setJoined(false);
      if (terminal) {
        setMenu([]);
        setPhase("hold");
        later(() => resetToNext(fromIndex), HOLD_MS);
      } else {
        setMenu(following);
        setMenuKey((key) => key + 1);
        setPhase("enter");
        later(() => setPhase("idle"), JOIN_MS);
      }
    }, JOIN_MS);
  }

  const sentence = SENTENCES[index];
  const words = [sentence.stem, ...path];
  const menuMotion = phase === "out" ? "choices-out" : phase === "enter" ? "choices-in" : "";
  const sentenceMotion =
    phase === "clearing" ? "sentence-clear" : phase === "enter" && path.length === 0 ? "sentence-in" : "";

  return (
    <div className="flex w-full max-w-xl flex-col items-center gap-8 overflow-x-hidden" data-phase={phase} style={{ "--join-ms": `${JOIN_MS}ms` }}>
      <p
        data-testid="sentence"
        aria-live="polite"
        className={`max-w-full text-center font-mono text-xl leading-snug tracking-tight text-ink sm:text-2xl ${sentenceMotion}`}
      >
        {words.map((word, wordIndex) => (
          <span key={`${index}-${wordIndex}`} className={joined && wordIndex === words.length - 1 ? "token-join" : undefined}>
            {wordIndex === 0 ? word : ` ${word}`}
          </span>
        ))}
      </p>
      <div className={`choice-slot w-full max-w-sm ${menu.length === 0 ? "is-collapsed" : ""}`} aria-hidden={menu.length === 0}>
        <div key={menuKey} className={`flex flex-col border-t border-line ${menuMotion} ${menu.length === 0 ? "border-transparent" : ""}`}>
          {menu.map((choice) => (
            <button
              key={choice.token}
              type="button"
              data-token={choice.token}
              disabled={phase !== "idle"}
              onClick={() => pick(choice)}
              className="flex min-h-12 touch-manipulation items-center justify-between gap-4 border-b border-line px-1 font-mono text-base text-ink disabled:opacity-100"
            >
              <span>{choice.token}</span>
              <span className="text-faint tabular-nums">{choice.p.toFixed(2)}</span>
            </button>
          ))}
        </div>
      </div>
      <p className="max-w-full whitespace-nowrap text-center text-[11px] leading-snug text-faint sm:text-xs">pick the next token. the sentence resets, then another starts.</p>
    </div>
  );
}
