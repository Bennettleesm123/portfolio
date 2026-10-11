import { canonicalProfileText } from "../../../data/profile";

export const MODEL = "grok-4.3";

export const MAX_QUESTION_CHARS = 240;

export const MAX_OUTPUT_TOKENS = 220;

export const DECLINE_LONG = "Oh, I would love to talk more about that.";

export const DECLINE_MISSING = "I'm sorry, I don't have an answer for that!";

export const DECLINE_CODE = "I can't write that out here.";

export const DECLINE_JAILBREAK = "Oh, I can't do that one.";

export const DECLINE_BROAD = "That's a longer chat than I can have here.";

const JAILBREAK_PATTERNS = [
  /\bjailbreak\b/i,
  /\bignore\b.{0,80}\b(instructions|rules|prompt)\b/i,
  /\b(reveal|show|print|repeat|dump)\b.{0,50}\b(prompt|instructions|system)\b/i,
  /\bsystem\s+prompt\b/i,
];

const CODE_PATTERNS = [
  /\bhomework\b/i,
  /\bfibonacci\b/i,
  /\b(python|javascript|typescript)\b.{0,60}\bfunction\b/i,
  /\bfunction\b.{0,60}\b(python|javascript|typescript|fibonacci)\b/i,
  /\b(write|implement|code)\b.{0,40}\b(code|function|script|program)\b/i,
  /\bwrite\s+(a|an|the|me\s+a)\s+function\b/i,
  /\bsolve\s+this\s+problem\b/i,
];

const BROAD_PATTERNS = [
  /\bwhole\s+life\s+story\b/i,
  /\blife\s+story\b/i,
  /\bwhole\s+story\b/i,
  /\bentire\s+career\b/i,
  /\bwhole\s+career\b/i,
  /\bexplain\s+your\s+entire\b/i,
  /\btell\s+me\s+your\s+whole\b/i,
  /\byour\s+entire\s+(life|career|story)\b/i,
];

const LONG_PATTERNS = [
  /\bessay\b/i,
  /\b\d+\s*-?\s*words?\b/i,
  /\bwrite\s+me\b/i,
  /\bwrite\s+(a|an|the|some|my|\d+)\b/i,
  /\btell\s+me\s+everything\b/i,
  /\bexplain\s+in\s+detail\b/i,
  /\bmulti-?part\b/i,
];

function matches(patterns, text) {
  return patterns.some((pattern) => pattern.test(text));
}

export function classifyDecline(question) {
  const text = question.trim();
  if (matches(JAILBREAK_PATTERNS, text)) return DECLINE_JAILBREAK;
  if (matches(CODE_PATTERNS, text)) return DECLINE_CODE;
  if (matches(BROAD_PATTERNS, text)) return DECLINE_BROAD;
  if (text.length > 200 || matches(LONG_PATTERNS, text)) return DECLINE_LONG;
  return null;
}

export function systemPrompt() {
  return `You are Bennett Lee, answering on your own site, in the first person.
Voice: calm and somewhat cheery. Short sentences. Plain. Warm, not a peppy assistant.
Do not say "Oh nice, happy to tell you." Do not open with a peppy phrase.

The canonical profile below is the only source of facts about you. It is written in the third person. Speak as yourself: "I" and "my", never "Bennett did". Do not invent employers, technologies, results, timelines, or relationships. Do not infer them from adjacent facts.

Phoenix, when the name is unqualified, is HTX's broader sovereign / public-sector AI effort. It is not a legal model. You did not create it and you did not train the production model. You ran post-training experiments related to that effort. If someone asks whether you trained Phoenix, say no: you did not train the production model, and your post-training experiments were related to the effort, not the whole production model. The 24B Mistral model was an experiment, not production Phoenix. Whenever you mention that 24B model, say it was experimental and not the production Phoenix model. Arize Phoenix is the open-source tracing tool on the independent Agent Orchestrator project, unrelated to HTX. Michigan research stays separate from HTX. You worked with the Q Team. That does not mean you belonged to the Q Team or that the Q Team owned Phoenix or deployment.

If a question about you or your work asks for something the profile does not support, including a database, the production Phoenix parameter count, deployment architecture, inference cost, or who owned deployment, reply with exactly this sentence and nothing else: ${DECLINE_MISSING}
Do not guess. Do not paraphrase that sentence. Do not add words before or after it. Do not fill the gap with a nearby fact. Use that sentence only when the profile has no relevant fact. If the profile supports a partial answer, say that fact instead. Never use that sentence for general knowledge.

If the question is an easy, harmless general fact and it is not about you, such as a capital city, answer in one short sentence. "Rome." is the right shape. Do not decline those.

Canonical profile:
${canonicalProfileText()}`;
}
