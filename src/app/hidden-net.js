"use client";

import { useEffect, useRef, useState } from "react";
import { BAG, EDGES, HIDDEN, INPUTS, OUTPUT, SLOTS, insideBag } from "./hidden-net-data";

const EASE_MS = 280;
const HOLD_MS = 1400;
const LENS_R = 34;

function prefersReduced() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function easeOut(t) {
  return 1 - (1 - t) ** 3;
}

function lensScale(node, pointer, nearestId) {
  if (!pointer) return 1;
  const distance = Math.hypot(node.x - pointer.x, node.y - pointer.y);
  if (distance >= LENS_R) return 1;
  const falloff = (1 - distance / LENS_R) ** 2;
  if (node.label && node.id === nearestId) return 1 + 5.4 * falloff;
  return 1 + 0.7 * falloff;
}

export default function HiddenNet() {
  const svgRef = useRef(null);
  const bagRef = useRef([]);
  const dragRef = useRef(null);
  const heldRef = useRef(new Set());
  const busyRef = useRef(false);
  const timers = useRef(new Set());
  const frames = useRef(new Set());
  const [pointer, setPointer] = useState(null);
  const [reduced, setReduced] = useState(false);
  const [bag, setBag] = useState([]);
  const [drag, setDrag] = useState(null);
  const [flying, setFlying] = useState([]);
  const [lit, setLit] = useState(false);

  useEffect(() => {
    const pendingTimers = timers.current;
    const pendingFrames = frames.current;
    return () => {
      for (const id of pendingTimers) clearTimeout(id);
      for (const id of pendingFrames) cancelAnimationFrame(id);
    };
  }, []);

  function later(fn, ms) {
    const id = window.setTimeout(() => {
      timers.current.delete(id);
      fn();
    }, ms);
    timers.current.add(id);
  }

  function trackFrame(step) {
    const id = requestAnimationFrame((now) => {
      frames.current.delete(id);
      step(now);
    });
    frames.current.add(id);
  }

  function pointFrom(event) {
    const svg = svgRef.current;
    const matrix = svg.getScreenCTM();
    if (!matrix) return { x: 0, y: 0 };
    const point = svg.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;
    const local = point.matrixTransform(matrix.inverse());
    return { x: local.x, y: local.y };
  }

  function rememberBag(next) {
    bagRef.current = next;
    setBag(next);
  }

  function fly(from, to, onDone) {
    if (prefersReduced()) {
      onDone();
      return;
    }
    const step = (now) => {
      step.start ??= now;
      const t = Math.min(1, (now - step.start) / EASE_MS);
      const e = easeOut(t);
      setFlying([{ label: from.label, x: from.x + (to.x - from.x) * e, y: from.y + (to.y - from.y) * e }]);
      if (t < 1) trackFrame(step);
      else onDone();
    };
    trackFrame(step);
  }

  function flyBack(words) {
    const from = words.map((label, index) => ({ label, ...SLOTS[index] }));
    const to = from.map((item) => {
      const node = HIDDEN.find((candidate) => candidate.label === item.label);
      return { label: item.label, x: node.x, y: node.y - 5 };
    });
    rememberBag([]);
    heldRef.current.clear();
    setLit(false);
    if (prefersReduced()) {
      setFlying([]);
      busyRef.current = false;
      return;
    }
    setFlying(from);
    const step = (now) => {
      step.start ??= now;
      const t = Math.min(1, (now - step.start) / EASE_MS);
      const e = easeOut(t);
      setFlying(
        from.map((item, index) => ({
          label: item.label,
          x: item.x + (to[index].x - item.x) * e,
          y: item.y + (to[index].y - item.y) * e,
        })),
      );
      if (t < 1) trackFrame(step);
      else {
        setFlying([]);
        busyRef.current = false;
      }
    };
    trackFrame(step);
  }

  function complete(words) {
    setLit(true);
    later(() => flyBack(words), HOLD_MS);
  }

  function onMove(event) {
    const reducedNow = prefersReduced();
    setReduced(reducedNow);
    const point = pointFrom(event);
    if (dragRef.current) {
      const next = { ...dragRef.current, x: point.x, y: point.y };
      dragRef.current = next;
      setDrag(next);
      return;
    }
    setPointer(point);
  }

  function onLeave() {
    if (dragRef.current) return;
    setPointer(null);
  }

  function onDown(event) {
    if (busyRef.current || dragRef.current) return;
    if (event.button != null && event.button !== 0) return;
    const point = pointFrom(event);
    let label = null;
    let nearest = LENS_R;
    for (const node of HIDDEN) {
      if (!node.label || bagRef.current.includes(node.label) || heldRef.current.has(node.label)) continue;
      const distance = Math.hypot(node.x - point.x, node.y - point.y);
      if (distance < nearest) {
        nearest = distance;
        label = node.label;
      }
    }
    if (!label) return;
    event.preventDefault();
    const reducedNow = prefersReduced();
    const node = HIDDEN.find((candidate) => candidate.label === label);
    const fromScale = reducedNow ? 1 : Math.max(0.85, (2.7 * lensScale(node, point, node.id)) / 11);
    const next = { label, x: point.x, y: point.y, fromScale };
    heldRef.current.add(label);
    dragRef.current = next;
    setDrag(next);
    setPointer(point);
    setReduced(reducedNow);
    svgRef.current?.setPointerCapture?.(event.pointerId);
  }

  function onUp(event) {
    const current = dragRef.current;
    if (!current) {
      setPointer(null);
      return;
    }
    const point = pointFrom(event);
    const node = HIDDEN.find((candidate) => candidate.label === current.label);
    dragRef.current = null;
    setDrag(null);
    setPointer(null);
    const taken = bagRef.current;
    if (taken.includes(current.label)) return;
    const dropped = insideBag(point) && taken.length < 3;
    const dest = dropped ? SLOTS[taken.length] : { x: node.x, y: node.y - 5 };
    const nextBag = dropped ? [...taken, current.label] : taken;
    if (dropped && nextBag.length === 3) busyRef.current = true;
    fly({ label: current.label, x: point.x, y: point.y }, dest, () => {
      setFlying([]);
      if (!dropped) {
        heldRef.current.delete(current.label);
        return;
      }
      rememberBag(nextBag);
      if (nextBag.length === 3) complete(nextBag);
    });
  }

  const away = new Set([...bag, ...flying.map((item) => item.label), ...(drag ? [drag.label] : [])]);
  let nearestId = null;
  let nearest = Infinity;
  if (pointer && !drag) {
    for (const node of HIDDEN) {
      if (!node.label || away.has(node.label)) continue;
      const distance = Math.hypot(node.x - pointer.x, node.y - pointer.y);
      if (distance < nearest && distance < LENS_R) {
        nearest = distance;
        nearestId = node.id;
      }
    }
  }

  return (
    <div className="flex w-full max-w-2xl flex-col items-center overflow-x-hidden" data-bag-count={bag.length} data-lit={lit ? "1" : "0"}>
      <svg
        ref={svgRef}
        viewBox="0 0 360 236"
        className="h-auto w-full touch-none select-none font-mono"
        role="img"
        aria-label="A network with a few inputs, a dense hidden layer, and one output"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        {EDGES.map((edge) => (
          <line key={edge.key} x1={edge.x1} y1={edge.y1} x2={edge.x2} y2={edge.y2} stroke="#111" strokeWidth="1" strokeOpacity="0.16" />
        ))}
        {HIDDEN.map((node) => {
          const gone = node.label && away.has(node.label);
          const scale = reduced || gone ? 1 : lensScale(node, pointer, nearestId);
          const showWord = Boolean(node.label) && !gone && !reduced && node.id === nearestId && scale > 2.1;
          const dotScale = showWord ? 1 + (scale - 1) * 0.22 : scale;
          return (
            <g key={node.id} transform={`translate(${node.x} ${node.y})`} data-label={node.label || undefined}>
              <g className="lens-node" style={{ transform: `scale(${dotScale})` }}>
                <circle r={node.label ? 2.15 : 1.65} fill="#111" opacity={gone ? 0.22 : 0.9} />
              </g>
              {node.label ? (
                <text
                  className="lens-label"
                  y="-8"
                  textAnchor="middle"
                  fill="#111"
                  fontSize="2.7"
                  opacity={showWord ? 1 : 0}
                  style={{ transform: `scale(${showWord ? scale : 1})`, transition: gone ? "none" : undefined }}
                >
                  {node.label}
                </text>
              ) : null}
              {reduced && node.label && !gone && node.id === nearestId ? (
                <text y="-12" textAnchor="middle" fill="#111" fontSize="11">
                  {node.label}
                </text>
              ) : null}
            </g>
          );
        })}
        {INPUTS.map((input) => (
          <g key={input.id} transform={`translate(${input.x} ${input.y})`}>
            <circle r="5" fill="#fff" stroke="#111" strokeWidth="1.25" />
            <text y="16" textAnchor="middle" fill="#111" fontSize="8">
              {input.label}
            </text>
          </g>
        ))}
        <circle className="attn-node" cx={OUTPUT.x} cy={OUTPUT.y} r="6.5" fill={lit ? "#111" : "#fff"} stroke="#111" strokeWidth="1.25" />
        <g data-bag="1">
          {SLOTS.map((slot, index) => (
            <line key={index} x1={BAG.x + 10} x2={BAG.x + BAG.w - 8} y1={slot.y + 8} y2={slot.y + 8} stroke="#111" strokeOpacity="0.28" />
          ))}
          {bag.map((label, index) => (
            <text key={label} x={SLOTS[index].x} y={SLOTS[index].y} textAnchor="middle" fill="#111" fontSize="10" data-slot={label}>
              {label}
            </text>
          ))}
        </g>
        {flying.map((item) => (
          <text key={item.label} x={item.x} y={item.y} textAnchor="middle" fill="#111" fontSize="10">
            {item.label}
          </text>
        ))}
        {drag ? (
          <text className="drag-word" x={drag.x} y={drag.y - 8} textAnchor="middle" fill="#111" fontSize="11" style={{ "--drag-from": drag.fromScale }}>
            {drag.label}
          </text>
        ) : null}
      </svg>
      <p className="mt-4 max-w-full whitespace-nowrap text-center text-[11px] leading-snug text-faint sm:text-xs">
        place the cursor to zoom and find the hidden states.
      </p>
    </div>
  );
}
