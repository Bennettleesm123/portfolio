// Two attention layers over the tokens i, train, models.
// Value vectors are the basis, so a layer-1 output equals that row of A1.
// No residual: each output is only the weighted sum of the previous vectors.
//
// A1 rows (i, train, models), tenths, each sums to 10:
//   i      7 2 1
//   train  5 4 1   → [0.50, 0.40, 0.10], so train already carries i
//   models 2 6 2   → [0.20, 0.60, 0.20], mostly train, only 0.20 on i
//
// A2 attends over those layer-1 outputs, not over the original values:
//   i      3 5 2
//   train  1 3 6
//   models 0 8 2
// models on layer 2 = 0.8 * [0.50, 0.40, 0.10] + 0.2 * [0.20, 0.60, 0.20]
//                   = [0.40, 0.32, 0.08] + [0.04, 0.12, 0.04]
//                   = [0.44, 0.44, 0.12]
// The leading 0.40 is 0.8 * 0.50: i inside train's mix. The other 0.04 is
// models' own layer-1 vector. The direct weight on i is 0.

function rows(tenths) {
  return tenths.map((row) => row.map((n) => n / 10));
}

export const TOKENS = ["i", "train", "models"];

export const VALUES = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
];

export const LAYER1 = rows([
  [7, 2, 1],
  [5, 4, 1],
  [2, 6, 2],
]);

export const LAYER2 = rows([
  [3, 5, 2],
  [1, 3, 6],
  [0, 8, 2],
]);

export function mix(weights, vectors) {
  const dim = vectors[0].length;
  const out = Array.from({ length: dim }, () => 0);
  for (let i = 0; i < weights.length; i += 1) {
    for (let d = 0; d < dim; d += 1) out[d] += weights[i] * vectors[i][d];
  }
  return out;
}

export const LAYER1_OUT = LAYER1.map((row) => mix(row, VALUES));
export const LAYER2_OUT = LAYER2.map((row) => mix(row, LAYER1_OUT));

export const LAYERS = [LAYER1, LAYER2];
export const OUTPUTS = [LAYER1_OUT, LAYER2_OUT];

// i-component of train's layer-1 vector. This is the second hop, not an A2 weight.
export const CARRY = LAYER1_OUT[1][0];
