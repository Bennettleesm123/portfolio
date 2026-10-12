// Three short trees. Every branch ends in a full lowercase sentence.
// Probabilities at each step sum to 1. The heavier branch can finish as
// one of the three lines already used on the typewriter home.

export const SENTENCES = [
  {
    stem: "i",
    choices: [
      {
        token: "train",
        p: 0.56,
        choices: [
          { token: "models", p: 0.64 },
          {
            token: "systems",
            p: 0.22,
            choices: [
              { token: "quietly", p: 0.46 },
              { token: "at night", p: 0.34 },
              { token: "from scratch", p: 0.2 },
            ],
          },
          {
            token: "networks",
            p: 0.14,
            choices: [
              { token: "slowly", p: 0.4 },
              { token: "carefully", p: 0.35 },
              { token: "from scratch", p: 0.25 },
            ],
          },
        ],
      },
      {
        token: "study",
        p: 0.26,
        choices: [
          {
            token: "statistics",
            p: 0.46,
            choices: [
              { token: "for fun", p: 0.4 },
              { token: "at night", p: 0.35 },
              { token: "here", p: 0.25 },
            ],
          },
          {
            token: "models",
            p: 0.32,
            choices: [
              { token: "too", p: 0.45 },
              { token: "carefully", p: 0.3 },
              { token: "at night", p: 0.25 },
            ],
          },
          {
            token: "papers",
            p: 0.22,
            choices: [
              { token: "slowly", p: 0.4 },
              { token: "sometimes", p: 0.35 },
              { token: "for fun", p: 0.25 },
            ],
          },
        ],
      },
      {
        token: "write",
        p: 0.18,
        choices: [
          {
            token: "code",
            p: 0.5,
            choices: [
              { token: "daily", p: 0.45 },
              { token: "at night", p: 0.3 },
              { token: "for fun", p: 0.25 },
            ],
          },
          {
            token: "notes",
            p: 0.3,
            choices: [
              { token: "by hand", p: 0.45 },
              { token: "at night", p: 0.3 },
              { token: "carefully", p: 0.25 },
            ],
          },
          {
            token: "papers",
            p: 0.2,
            choices: [
              { token: "sometimes", p: 0.4 },
              { token: "slowly", p: 0.35 },
              { token: "for class", p: 0.25 },
            ],
          },
        ],
      },
    ],
  },
  {
    stem: "i",
    choices: [
      {
        token: "build",
        p: 0.58,
        choices: [
          { token: "agents", p: 0.66 },
          {
            token: "tools",
            p: 0.2,
            choices: [
              { token: "for myself", p: 0.42 },
              { token: "at night", p: 0.33 },
              { token: "slowly", p: 0.25 },
            ],
          },
          {
            token: "systems",
            p: 0.14,
            choices: [
              { token: "from scratch", p: 0.45 },
              { token: "carefully", p: 0.3 },
              { token: "at night", p: 0.25 },
            ],
          },
        ],
      },
      {
        token: "make",
        p: 0.24,
        choices: [
          {
            token: "agents",
            p: 0.42,
            choices: [
              { token: "too", p: 0.4 },
              { token: "sometimes", p: 0.35 },
              { token: "for fun", p: 0.25 },
            ],
          },
          {
            token: "tools",
            p: 0.34,
            choices: [
              { token: "for fun", p: 0.45 },
              { token: "at night", p: 0.3 },
              { token: "slowly", p: 0.25 },
            ],
          },
          {
            token: "notes",
            p: 0.24,
            choices: [
              { token: "by hand", p: 0.4 },
              { token: "while i work", p: 0.35 },
              { token: "at night", p: 0.25 },
            ],
          },
        ],
      },
      {
        token: "train",
        p: 0.18,
        choices: [
          {
            token: "models",
            p: 0.5,
            choices: [
              { token: "too", p: 0.45 },
              { token: "quietly", p: 0.3 },
              { token: "daily", p: 0.25 },
            ],
          },
          {
            token: "agents",
            p: 0.28,
            choices: [
              { token: "sometimes", p: 0.4 },
              { token: "carefully", p: 0.35 },
              { token: "for fun", p: 0.25 },
            ],
          },
          {
            token: "systems",
            p: 0.22,
            choices: [
              { token: "slowly", p: 0.4 },
              { token: "at night", p: 0.35 },
              { token: "from scratch", p: 0.25 },
            ],
          },
        ],
      },
    ],
  },
  {
    stem: "i",
    choices: [
      {
        token: "love",
        p: 0.55,
        choices: [
          {
            token: "machine",
            p: 0.6,
            choices: [
              { token: "learning", p: 0.7 },
              { token: "vision", p: 0.18 },
              { token: "translation", p: 0.12 },
            ],
          },
          {
            token: "quiet",
            p: 0.24,
            choices: [
              { token: "work", p: 0.45 },
              { token: "mornings", p: 0.32 },
              { token: "hours", p: 0.23 },
            ],
          },
          {
            token: "this",
            p: 0.16,
            choices: [
              { token: "work", p: 0.46 },
              { token: "problem", p: 0.32 },
              { token: "question", p: 0.22 },
            ],
          },
        ],
      },
      {
        token: "like",
        p: 0.27,
        choices: [
          {
            token: "machine",
            p: 0.4,
            choices: [
              { token: "learning", p: 0.68 },
              { token: "vision", p: 0.2 },
              { token: "translation", p: 0.12 },
            ],
          },
          {
            token: "building",
            p: 0.36,
            choices: [
              { token: "agents", p: 0.5 },
              { token: "tools", p: 0.3 },
              { token: "systems", p: 0.2 },
            ],
          },
          {
            token: "hard",
            p: 0.24,
            choices: [
              { token: "problems", p: 0.48 },
              { token: "questions", p: 0.32 },
              { token: "work", p: 0.2 },
            ],
          },
        ],
      },
      {
        token: "study",
        p: 0.18,
        choices: [
          {
            token: "machine",
            p: 0.46,
            choices: [
              { token: "learning", p: 0.7 },
              { token: "vision", p: 0.18 },
              { token: "translation", p: 0.12 },
            ],
          },
          {
            token: "statistics",
            p: 0.32,
            choices: [
              { token: "for fun", p: 0.4 },
              { token: "at night", p: 0.35 },
              { token: "slowly", p: 0.25 },
            ],
          },
          {
            token: "models",
            p: 0.22,
            choices: [
              { token: "closely", p: 0.42 },
              { token: "at night", p: 0.33 },
              { token: "carefully", p: 0.25 },
            ],
          },
        ],
      },
    ],
  },
];

export function auditSentences(sentences = SENTENCES) {
  const problems = [];
  const endings = [];

  function walk(node, words) {
    const choices = node.choices;
    if (!choices) {
      endings.push(words.join(" "));
      if (words.length < 3) problems.push(`short: ${words.join(" ")}`);
      return;
    }
    if (choices.length < 3 || choices.length > 4) {
      problems.push(`arity ${choices.length} at "${words.join(" ")}"`);
    }
    const sum = choices.reduce((total, choice) => total + choice.p, 0);
    if (Math.abs(sum - 1) > 0.001) {
      problems.push(`sum ${sum.toFixed(4)} at "${words.join(" ")}"`);
    }
    const seen = new Set();
    for (const choice of choices) {
      if (!choice.token || choice.token !== choice.token.toLowerCase()) {
        problems.push(`token case: ${choice.token}`);
      }
      if (seen.has(choice.token)) problems.push(`duplicate ${choice.token}`);
      seen.add(choice.token);
      if (choice.choices && choice.choices.length === 0) {
        problems.push(`empty choices after ${choice.token}`);
      }
      walk(choice, [...words, choice.token]);
    }
  }

  sentences.forEach((sentence, index) => walk(sentence, [sentence.stem || `sentence ${index}`]));
  return { problems, endings };
}
