"use client";

import { useEffect, useRef, useState } from "react";
import { CARRY, LAYERS, OUTPUTS, TOKENS } from "./attention-data";

const EASE_MS = 280;
const NODES = [
  { x: 48, y: 78 },
  { x: 160, y: 78 },
  { x: 274, y: 78 },
];

const INITIAL = {
  focus: 2,
  layer: 0,
  weights: LAYERS[0][2].slice(),
  origin: { ...NODES[2] },
  hop: 0,
  output: OUTPUTS[0][2].slice(),
};

function prefersReduced() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function easeOut(t) {
  return 1 - (1 - t) ** 3;
}

function edgeLook(weight) {
  const visible = Math.max(0, Math.min(1, weight));
  return {
    width: 0.75 + visible * 3.4,
    opacity: visible < 0.015 ? 0 : 0.18 + visible * 0.82,
    label: Math.min(1, visible / 0.1),
  };
}

function edgePath(x1, y1, x2, y2) {
  const dist = Math.hypot(x2 - x1, y2 - y1);
  const loop = Math.max(0, 1 - dist / 56);
  const arch = 1 - loop;
  const ax = (x1 + x2) / 2;
  const ay = (y1 + y2) / 2 - (34 + dist * 0.12);
  const side = x2 < 120 ? -1 : x2 > 220 ? 1 : 0;
  const lx = x2 + side * 16;
  const c1x = ax * arch + (lx - 18) * loop;
  const c1y = ay * arch + (y2 - 40) * loop;
  const c2x = ax * arch + (lx + 18) * loop;
  const c2y = ay * arch + (y2 - 40) * loop;
  const start = { x: x1, y: y1 - 8 * loop };
  const end = { x: x2, y: y2 - 8 * loop };
  const label = {
    x: 0.125 * start.x + 0.375 * c1x + 0.375 * c2x + 0.125 * end.x,
    y: 0.125 * start.y + 0.375 * c1y + 0.375 * c2y + 0.125 * end.y - 7,
  };
  return {
    d: `M ${start.x} ${start.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${end.x} ${end.y}`,
    label,
  };
}

export default function Attention() {
  const [view, setView] = useState(INITIAL);
  const shown = useRef(INITIAL);
  const frame = useRef(0);

  useEffect(() => {
    return () => cancelAnimationFrame(frame.current);
  }, []);

  function commit(next) {
    shown.current = next;
    setView(next);
  }

  function move(partial) {
    const current = shown.current;
    const focus = partial.focus ?? current.focus;
    const layer = partial.layer ?? current.layer;
    const target = {
      focus,
      layer,
      weights: LAYERS[layer][focus].slice(),
      origin: { ...NODES[focus] },
      hop: layer === 1 && focus === 2 ? 1 : 0,
      output: OUTPUTS[layer][focus].slice(),
    };
    const same =
      focus === current.focus &&
      layer === current.layer &&
      Math.abs(current.hop - target.hop) < 0.001 &&
      current.weights.every((weight, index) => Math.abs(weight - target.weights[index]) < 0.001);
    if (same) return;

    cancelAnimationFrame(frame.current);
    if (prefersReduced()) {
      commit(target);
      return;
    }

    const from = current;
    const step = (now) => {
      step.start ??= now;
      const t = Math.min(1, (now - step.start) / EASE_MS);
      const e = easeOut(t);
      const next = {
        focus,
        layer,
        weights: from.weights.map((weight, index) => weight + (target.weights[index] - weight) * e),
        origin: {
          x: from.origin.x + (target.origin.x - from.origin.x) * e,
          y: from.origin.y + (target.origin.y - from.origin.y) * e,
        },
        hop: from.hop + (target.hop - from.hop) * e,
        output: from.output.map((value, index) => value + (target.output[index] - value) * e),
      };
      if (t >= 1) {
        commit(target);
        return;
      }
      commit(next);
      frame.current = requestAnimationFrame(step);
    };
    frame.current = requestAnimationFrame(step);
  }

  const hopLook = edgeLook(CARRY);

  return (
    <div className="flex w-full max-w-xl flex-col items-center overflow-x-hidden" data-layer={view.layer + 1} data-focus={TOKENS[view.focus]}>
      <svg viewBox="0 0 320 124" className="h-auto w-full max-w-sm overflow-visible font-mono" role="img" aria-label="Attention over i, train, and models">
        {(() => {
          const hop = edgePath(NODES[1].x, NODES[1].y, NODES[0].x, NODES[0].y);
          return (
            <g aria-hidden={view.hop < 0.05}>
              <path
                d={hop.d}
                fill="none"
                stroke="#8a8a8a"
                strokeWidth={hopLook.width}
                strokeOpacity={hopLook.opacity * view.hop * 0.45}
                strokeLinecap="round"
              />
              <text x={hop.label.x} y={hop.label.y - 6} textAnchor="middle" fill="#8a8a8a" fontSize="11" fillOpacity={view.hop}>
                carries i {CARRY.toFixed(2)}
              </text>
            </g>
          );
        })()}
        {TOKENS.map((token, index) => {
          const path = edgePath(view.origin.x, view.origin.y, NODES[index].x, NODES[index].y);
          const look = edgeLook(view.weights[index]);
          return (
            <g key={token}>
              <path
                d={path.d}
                data-edge={token}
                fill="none"
                stroke="#111"
                strokeWidth={look.width}
                strokeOpacity={look.opacity}
                strokeLinecap="round"
              />
              <text x={path.label.x} y={path.label.y} textAnchor="middle" fill="#111" fontSize="11" fillOpacity={look.label}>
                {view.weights[index].toFixed(2)}
              </text>
            </g>
          );
        })}
        {TOKENS.map((token, index) => {
          const node = NODES[index];
          const focused = view.focus === index;
          return (
            <g
              key={token}
              role="button"
              tabIndex={0}
              data-token={token}
              aria-pressed={focused}
              aria-label={token}
              className="cursor-pointer"
              onClick={() => move({ focus: index })}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  move({ focus: index });
                }
              }}
            >
              <circle cx={node.x} cy={node.y} r="22" fill="transparent" />
              <circle className="attn-node" cx={node.x} cy={node.y} r="6" fill={focused ? "#111" : "#fff"} stroke="#111" strokeWidth="1.25" />
              <text x={node.x} y={node.y + 24} textAnchor="middle" fill="#111" fontSize="13">
                {token}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="mt-2 flex items-center justify-center gap-8 font-mono text-sm">
        {[0, 1].map((layer) => (
          <button
            key={layer}
            type="button"
            data-layer={layer + 1}
            aria-pressed={view.layer === layer}
            onClick={() => move({ layer })}
            className={`attn-layer min-h-11 touch-manipulation border-b px-1 ${view.layer === layer ? "border-ink text-ink" : "border-transparent text-faint"}`}
          >
            layer {layer + 1}
          </button>
        ))}
      </div>
      <p className="mt-3 font-mono text-xs text-faint" data-testid="attn-out">
        {TOKENS[view.focus]} [{view.output.map((value) => value.toFixed(2)).join(" ")}]
      </p>
      <p className="mt-4 max-w-full whitespace-nowrap text-center text-[11px] leading-snug text-faint sm:text-xs">
        layer 2 attends over layer 1, so models reaches i through train.
      </p>
    </div>
  );
}
