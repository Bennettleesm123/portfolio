// Hidden-layer field. Positions are seeded so the picture is stable.
// Labeled nodes are scattered, not grouped. Blank dots fill the mass.

export const LABELS = [
  "soccer",
  "lego",
  "history",
  "geopolitics",
  "military history",
  "philosophy",
  "army",
  "v1",
  "ktp",
  "michigan",
  "hwa chong",
  "phoenix",
  "htx",
  "saxophone",
  "bonsai",
  "volleyball",
  "singapore",
  "cooking",
  "yapping",
  "llm",
  "medicine",
  "badminton",
  "roblox",
  "duolingo",
  "french",
  "mandarin",
  "interstellar",
  "meditations",
  "stoicism",
  "deep movies",
  "documentaries",
];

// The field was seeded with this set. New words reuse those dots so the picture stays put.
const PLACED = [
  "soccer",
  "lego",
  "history",
  "geopolitics",
  "military history",
  "philosophy",
  "documentaries",
  "army",
  "v1",
  "ktp",
  "michigan",
  "hwa chong",
  "phoenix",
  "htx",
  "saxophone",
  "bonsai",
  "volleyball",
  "singapore",
  "cooking",
  "yapping",
  "llm",
  "medicine",
  "badminton",
  "roblox",
  "duolingo",
  "french",
  "mandarin",
];

export const FIELD = { x: 62, y: 22, w: 176, h: 196 };

export const INPUTS = [
  { id: "in-i", label: "i", x: 24, y: 58 },
  { id: "in-train", label: "train", x: 24, y: 118 },
  { id: "in-models", label: "models", x: 24, y: 178 },
];

export const OUTPUT = { x: 286, y: 64 };

export const BAG = { x: 252, y: 92, w: 96, h: 118 };

export const SLOTS = [0, 1, 2].map((index) => ({
  x: BAG.x + BAG.w / 2,
  y: BAG.y + 18 + index * 34,
}));

function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function dist(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function place(rng, count, bounds, minDist, avoid) {
  const points = [];
  let guard = 0;
  while (points.length < count && guard < 12000) {
    guard += 1;
    const point = {
      x: bounds.x + rng() * bounds.w,
      y: bounds.y + rng() * bounds.h,
    };
    const clear = points.every((other) => dist(other, point) >= minDist) && avoid.every((other) => dist(other, point) >= minDist);
    if (clear) points.push(point);
  }
  if (points.length < count) throw new Error(`placed ${points.length} of ${count}`);
  return points;
}

const rng = mulberry32(0x51a7);
const longLabels = PLACED.filter((label) => label.length > 10);
const shortLabels = PLACED.filter((label) => label.length <= 10);
const longSpots = place(rng, longLabels.length, { x: 96, y: 46, w: 108, h: 150 }, 20, []);
const shortSpots = place(rng, shortLabels.length, { x: 72, y: 30, w: 156, h: 180 }, 16, longSpots);

const labeled = [
  ...longLabels.map((label, index) => ({ id: `w-${label}`, label, ...longSpots[index] })),
  ...shortLabels.map((label, index) => ({ id: `w-${label}`, label, ...shortSpots[index] })),
];

const blanks = place(rng, 68, FIELD, 8, labeled).map((point, index) => ({
  id: `d-${index}`,
  label: "",
  ...point,
}));

const nodes = [...blanks, ...labeled];

function pick(list, count) {
  const copy = [...list];
  const chosen = [];
  while (chosen.length < count && copy.length) {
    const index = Math.floor(rng() * copy.length);
    chosen.push(copy.splice(index, 1)[0]);
  }
  return chosen;
}

export const EDGES = [
  ...INPUTS.flatMap((input) =>
    pick(nodes, 4).map((node) => ({
      key: `${input.id}-${node.id}`,
      x1: input.x,
      y1: input.y,
      x2: node.x,
      y2: node.y,
    })),
  ),
  ...pick(nodes, 8).map((node) => ({
    key: `${node.id}-out`,
    x1: node.x,
    y1: node.y,
    x2: OUTPUT.x,
    y2: OUTPUT.y,
  })),
];

function clearOfBag(point) {
  const x = Math.max(BAG.x, Math.min(point.x, BAG.x + BAG.w));
  const y = Math.max(BAG.y, Math.min(point.y, BAG.y + BAG.h));
  return Math.hypot(point.x - x, point.y - y) > 24;
}

const open = blanks.filter(
  (node) => node.x > 88 && node.x < 210 && node.y > 48 && node.y < 190 && clearOfBag(node) && INPUTS.every((input) => dist(input, node) > 36),
);

for (const label of ["interstellar", "meditations", "stoicism", "deep movies"]) {
  let best = null;
  let bestScore = -1;
  for (const node of open) {
    if (node.label) continue;
    const nearest = Math.min(...nodes.filter((other) => other.label).map((other) => dist(other, node)));
    if (nearest > bestScore) {
      bestScore = nearest;
      best = node;
    }
  }
  best.label = label;
  best.id = `w-${label}`;
}

export const HIDDEN = [...nodes.filter((node) => !node.label), ...nodes.filter((node) => node.label)];

export function insideBag(point) {
  return point.x >= BAG.x && point.x <= BAG.x + BAG.w && point.y >= BAG.y && point.y <= BAG.y + BAG.h;
}
