"use client";

import { useEffect, useSyncExternalStore } from "react";
import { DEFAULT_SCHEME, SCHEME_STORAGE_KEY, SCHEMES } from "./schemes";

const listeners = new Set();
let currentScheme = DEFAULT_SCHEME;

function readStoredScheme() {
  try {
    const saved = window.localStorage.getItem(SCHEME_STORAGE_KEY);
    return SCHEMES.some((item) => item.id === saved) ? saved : DEFAULT_SCHEME;
  } catch {
    return DEFAULT_SCHEME;
  }
}

if (typeof window !== "undefined") {
  currentScheme = readStoredScheme();
}

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return currentScheme;
}

function getServerSnapshot() {
  return DEFAULT_SCHEME;
}

function applyScheme(id) {
  document.documentElement.dataset.scheme = id;
}

function chooseScheme(id) {
  currentScheme = id;
  applyScheme(id);
  window.localStorage.setItem(SCHEME_STORAGE_KEY, id);
  listeners.forEach((listener) => listener());
}

export default function SchemeSwitcher() {
  const scheme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const active = SCHEMES.find((item) => item.id === scheme) ?? SCHEMES[0];

  useEffect(() => {
    applyScheme(scheme);
  }, [scheme]);

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-surface/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-3xl flex-col gap-2 px-4 py-3">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-xs font-medium uppercase tracking-wide text-faint">Color prototype</p>
          <p className="text-xs text-muted">{active.note}</p>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1" role="radiogroup" aria-label="Color scheme">
          {SCHEMES.map((item) => {
            const selected = item.id === scheme;
            return (
              <button
                key={item.id}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => chooseScheme(item.id)}
                className={`flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-colors ${
                  selected
                    ? "border-ink bg-ink text-on-accent"
                    : "border-line bg-base text-ink hover:border-ink"
                }`}
              >
                <span
                  className="h-2.5 w-2.5 rounded-full border border-black/10"
                  style={{ backgroundColor: item.swatch }}
                  aria-hidden="true"
                />
                {item.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
