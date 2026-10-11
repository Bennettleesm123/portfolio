/**
 * Canonical facts about Bennett Lee.
 * The About chatbot and the public site copy both read this module.
 *
 * Quantified claims that conflict across resumes, or that appear on only
 * one resume and were not confirmed, are intentionally absent. See the
 * audit note at the bottom of this file.
 */

const HTX_ROLE = "Machine Learning Engineer / Machine Learning Intern";

export const aboutParagraphs = [
  "I'm from Singapore, and I study computer science and statistics at the University of Michigan.",
  "Most of my time goes to training language models and building agents.",
  "Away from that I play soccer and volleyball, run, and wind down with the saxophone, bonsai, and history.",
];

export const experience = [
  {
    place: "University of Michigan — Otolaryngology & Translational Oncology Lab",
    role: "Computational Researcher",
  },
  {
    place: "Home Team Science and Technology Agency (HTX)",
    role: HTX_ROLE,
  },
  {
    place: "University of Michigan — Computational Vascular Biomechanics Lab",
    role: "Machine Learning Researcher",
  },
  {
    place: "Singapore Armed Forces",
    role: "Army Commando Officer",
  },
  {
    place: "Cisco Systems",
    role: "Project Intern",
  },
];

export const projects = [
  {
    title: "HTX Phoenix — Post-Training Research",
    summary:
      "Experiments on domain post-training and catastrophic forgetting within HTX's broader public-sector AI effort, using a 24B Mistral model as a controlled study.",
  },
  {
    title: "KTP Life App",
    summary:
      "Pledge-class overview for Kappa Theta Pi's app: a points ring, leaderboard, activity log, and strikes tracker for rushees and members.",
  },
  {
    title: "Agent Orchestrator",
    summary:
      "A multi-agent system that breaks a request into subtasks and routes each one to a specialist for research, web search, email, or sandboxed code.",
    link: "https://github.com/Bennettleesm123/agent-orchestrator",
  },
  {
    title: "Agent Reliability Harness",
    summary:
      "A harness for making LLM agents reliable on a specific job, with validated tools, human approval, tracing, and replay.",
    link: "https://github.com/Bennettleesm123/agent-reliability-harness",
  },
  {
    title: "Caregiver Portal",
    summary:
      "A free tool that helps Singaporean families find the eldercare subsidies they qualify for, using official eligibility rules.",
  },
  {
    title: "RAG Knowledge Assistant",
    summary:
      "An assistant that reads PDFs, web pages, and YouTube transcripts and answers with source citations.",
  },
  {
    title: "Autonomous Logistics Trolley",
    summary:
      "An autonomous trolley for school laboratories, built for the Singapore Science and Engineering Fair.",
  },
];

export const skills = [
  {
    label: "AI/ML",
    items: [
      "PyTorch",
      "Hugging Face Transformers",
      "Axolotl",
      "LangGraph",
      "Arize Phoenix",
      "Qdrant",
      "ChromaDB",
      "Ollama",
    ],
  },
  {
    label: "Programming/Systems",
    items: [
      "Python",
      "C++",
      "SQL",
      "Git",
      "Linux",
      "Docker",
      "NumPy",
      "Pandas",
      "Google Cloud Platform",
    ],
  },
];

export const profile = {
  identity: {
    name: "Bennett Lee",
    from: "Singapore",
    based: "Ann Arbor, Michigan",
    email: "bennettleesm@gmail.com",
    phone: "(734) 882-5725",
    site: "bennettlee.dev",
    github: "https://github.com/Bennettleesm123",
    github_handle: "Bennettleesm123",
    linkedin: "https://www.linkedin.com/in/bennettleesm/",
  },
  education: {
    school: "University of Michigan College of Engineering",
    degree: "B.S.E. in Computer Science",
    minor: "Statistics",
    expected: "May 2028",
    record: [
      "He studies computer science at the University of Michigan College of Engineering and is also pursuing a Statistics minor.",
      "Resumes record a B.S.E. in Computer Science expected May 2028, GPA 3.89/4.0, honors, Dean's Honor List, and the William J. Branstrom Freshman Prize.",
      "Do not invent additional majors, minors, concentrations, or academic affiliations.",
      "Resume versions list overlapping but not identical coursework. Data structures, discrete mathematics, and linear algebra appear across versions. Do not recite a merged course list as if one resume stated every course.",
    ],
  },
  interests: {
    technical: ["machine learning", "LLMs", "AI agents", "applied AI", "systems for reliable AI"],
    time: "Most of his time goes to training language models and building agents.",
    hobbies: ["soccer", "volleyball", "running", "saxophone", "bonsai", "history"],
  },
  htx: {
    organization: [
      "Machine Learning Engineer / Machine Learning intern at the Home Team Science and Technology Agency (HTX) in Singapore, summer 2026 (June 2026 to August 2026).",
      "He worked with the Q Team. Say 'worked with,' not that he belonged to the Q Team or owned its systems.",
      "Working with the Q Team does not mean the Q Team owned Phoenix, owned deployment, or owned production systems.",
    ],
    phoenix_context: [
      "Phoenix is HTX's broader sovereign / public-sector AI and LLM effort for Singapore and Home Team use cases. It is not a legal model.",
      "Bennett's internship work was related to Phoenix. He did not create Phoenix. He did not train the entire production Phoenix model.",
      "Phoenix is not a legal fine-tuned model, and it is not only about Singapore law. Legal-domain training experiments were one research component inside that broader effort.",
      "Do not describe Phoenix itself as the experimental model he personally trained.",
    ],
    personal_research: [
      "His main internship research focused on domain post-training and catastrophic forgetting.",
      "Research question, approximately: how much Singapore legal/statute-domain supervised fine-tuning data can be introduced before improvements in domain capability begin causing unacceptable degradation in general model capabilities?",
      "The experimental work included supervised fine-tuning (SFT); studying different mixtures and budgets of legal-domain data and replay/general-domain data; evaluating catastrophic forgetting; evaluating domain capability versus general capability; and, later, policy distillation / the later post-training stage.",
      "Legal/domain data consisted of Singapore statute-related QA / legal-domain data. Replay or general-domain data was mixed in to preserve broader capabilities.",
    ],
    experimental_model: [
      "The controlled experimental setup for that post-training study was a 24B-parameter Mistral model, and that experimental model was not the Phoenix production model.",
      "It was used to study post-training behavior and tradeoffs.",
      "Resumes separately describe experiments on a 24B-parameter LLM across SFT and RL/post-training. Do not treat that resume line as a claim that he trained production Phoenix, and do not collapse it with the legal-mixture study into one production training run.",
    ],
    engineering: [
      "Separate from the legal-mixture research, he worked with larger-scale LLM training infrastructure.",
      "He worked with an 8× H100 training setup and with distributed training optimizations including FSDP2, sequence packing, and fused kernels.",
      "The profile does not establish that the 24B Mistral legal experiments ran on those 8× H100 GPUs. Do not combine them into 'he trained Phoenix on 8 H100s.'",
      "He also worked with smaller 8B and 3B models and with agentic AI systems for public-security use cases. Those are separate from the 24B Mistral study and from production Phoenix.",
    ],
    evaluation: [
      "Evaluation included both domain-specific and general benchmarks. Examples include Singapore / legal-domain benchmarks, MMLU, MMLU-Pro, IFEval, Belebele, and LAMBADA / perplexity-style evaluation. These are examples, not a claim that the list is exhaustive.",
    ],
    results: [
      "Qualitative result of the mixture study: increasing the useful legal-data budget improved Singapore legal-domain performance while preserving most general capability. A legal-only or heavily domain-only setup caused noticeably more degradation to general capabilities. That supported using replay/general-domain data rather than only domain data.",
      "Every HTX resume states that legal-domain performance improved by 12.7%. State that only as a resume-recorded legal-domain result of the HTX post-training work. Do not attribute 12.7% to the production Phoenix model, and do not assign it to a specific parameter count the resumes do not name.",
      "He subsequently worked with policy distillation, described as the later post-training stage. Do not describe policy distillation as training the production Phoenix model.",
    ],
  },
  medical_research: {
    separate_from: "Separate from HTX, Phoenix, sovereign AI, and the independent agent projects.",
    vascular: [
      "Machine Learning Researcher at the University of Michigan, Computational Vascular Biomechanics Lab, August 2025 to June 2026.",
      "One major project: 3D microscopy, coronary / microvascular vessel segmentation, an expert-annotated dataset, nnU-Net, and automated vessel reconstruction.",
      "Resumes record approximately 20 expert-annotated samples, about 83% overlap with expert annotations on validation volumes, and approximately 24 hours of manual reconstruction time saved per sample. State these as resume-recorded approximations.",
    ],
    oncology: [
      "Computational Researcher at the University of Michigan — Otolaryngology & Translational Oncology Lab, from August 2026. The published resume and the site both name this lab.",
      "This work is precision-cancer-related computational analysis: Python pipelines for mutation and copy-number analysis on tumor-normal sequencing, QC workflows that catch contamination, and standardized genomic summaries for oncology studies.",
      "Do not merge this lab with the vascular biomechanics project.",
    ],
  },
  agent_orchestrator: {
    relationship: "Independent project. Not part of HTX and not part of HTX Phoenix.",
    summary: [
      "Python and LangGraph. Automates multi-step research workflows: web and arXiv retrieval, tool use, Gmail actions, and sandboxed code execution, with memory, caching, and routing.",
      "Uses Arize Phoenix, the open-source AI observability / tracing / evaluation tool, for tracing and observability. Arize Phoenix is unrelated to HTX Phoenix.",
      "Resumes also list SQL task memory, semantic caching, Docker, and Streamlit on this project.",
      "GitHub: https://github.com/Bennettleesm123/agent-orchestrator",
    ],
  },
  agent_reliability: {
    relationship: "A separate independent project. Do not merge it with Agent Orchestrator except when discussing a broader interest in agent systems. Not part of HTX.",
    summary: [
      "Schema-validated tools, permission gating, human approval, persistent tracing, deterministic replay, failure reproduction, and regression testing.",
      "Resumes list Python, Docker, and Ollama. The published resume also lists Pydantic.",
      "GitHub: https://github.com/Bennettleesm123/agent-reliability-harness",
    ],
  },
  other_projects: [
    {
      name: "KTP Life App",
      facts: [
        "Pledge-class overview for Kappa Theta Pi: a points ring, leaderboard, activity log, and strikes tracker.",
        "The published resume lists React, TypeScript, Firebase/Firestore, and Figma for this app, and lists Kappa Theta Pi as a professional fraternity.",
        "Not an HTX project.",
      ],
    },
    {
      name: "Caregiver Portal",
      facts: [
        "Described on the site as a free tool that helps Singaporean families find eldercare subsidies they qualify for, using official eligibility rules.",
        "Not an HTX project. Do not add details beyond that description.",
      ],
    },
    {
      name: "RAG Knowledge Assistant",
      facts: [
        "Reads PDFs, web pages, and YouTube transcripts and answers with citations. The project writeups list Qdrant, ChromaDB, and Ollama.",
        "Not an HTX project.",
      ],
    },
    {
      name: "Autonomous Logistics Trolley",
      facts: [
        "An autonomous trolley for school laboratories, built for the Singapore Science and Engineering Fair.",
        "Resumes that include the project record a top 5% ranking among 500 or more national STEM projects, a bronze award, and a special award.",
        "Not an HTX project.",
      ],
    },
  ],
  military: {
    organization: "Singapore Armed Forces",
    role: "Commando Officer (resume title: Army Commando Officer), January 2024 to July 2025.",
    facts: [
      "Commanded an approximately 18-person unit.",
      "Environments involving airborne, jungle, operational, logistical, and safety responsibilities. Resumes record coordination involving about 400 or more personnel.",
      "Built an air-gapped logistics / equipment-readiness system that reduced deployment preparation time.",
      "Do not invent combat deployments, missions, ranks, awards, or operational details beyond these facts.",
    ],
  },
  cisco: {
    role: "Project internship with Cisco in Singapore, October 2021 to December 2021.",
    facts: [
      "Prototyped a digital-learning platform related to Singapore's Ministry of Education.",
      "Resumes record that the work covered 300 or more schools and involved SD-WAN and cloud architectures.",
      "Separate from his later machine-learning and AI work.",
    ],
  },
  skills: {
    published_on_site: skills,
    name_collision:
      "The skill named Arize Phoenix is the open-source observability tool. It is not HTX Phoenix and was not used to build HTX Phoenix.",
  },
  do_not_infer: [
    "Do not infer employers, technologies, responsibilities, model architectures, training methods, results, timelines, or relationships between projects from adjacent facts.",
    "Do not say Bennett created Phoenix, built Phoenix himself, or trained the complete production Phoenix model.",
    "Do not say Phoenix is a legal model or that all of Phoenix is Singapore law.",
    "Do not say the 24B Mistral model is the production Phoenix model, and do not give the production Phoenix model a parameter count.",
    "Do not say the 24B legal experiments used the 8× H100 setup or FSDP2. Do not assign that study a training method the profile does not name.",
    "Do not say Arize Phoenix was used to train or build HTX Phoenix, that Arize Phoenix is an HTX product, or that Agent Orchestrator is part of HTX.",
    "Do not merge Agent Orchestrator with the Agent Reliability Harness.",
    "Do not merge Michigan medical research with HTX or with the agent projects.",
    "Do not answer who owned HTX deployment. Q Team is who he worked with, not established ownership of deployment.",
    "Do not guess databases, production parameter counts, deployment architecture, inference cost, or internal ownership.",
    "Do not move a tool, metric, or result from one project onto another.",
    "Personal contribution is not the same as the broader organization's product. Experimental research is not a production system.",
  ],
};

function linesOf(value) {
  if (Array.isArray(value)) return value.flatMap(linesOf);
  if (value && typeof value === "object") return Object.values(value).flatMap(linesOf);
  if (typeof value === "string" && value.trim()) return [value.trim()];
  return [];
}

function section(title, value) {
  const lines = linesOf(value);
  return [`${title}`, ...lines.map((line) => `- ${line}`)].join("\n");
}

export function canonicalProfileText() {
  const { identity: id } = profile;
  const contact = `${id.name} is from ${id.from} and is based in ${id.based}. Email: ${id.email}. Phone: ${id.phone}. Site: ${id.site}. GitHub: ${id.github}. LinkedIn: ${id.linkedin}.`;
  const skillLine = profile.skills.published_on_site
    .map((group) => `${group.label}: ${group.items.join(", ")}`)
    .join(". ");

  return [
    contact,
    section("EDUCATION", profile.education.record),
    section("INTERESTS", [profile.interests.time, `Technical interests: ${profile.interests.technical.join(", ")}.`, `Hobbies: ${profile.interests.hobbies.join(", ")}.`]),
    section("HTX — ORGANIZATION", profile.htx.organization),
    section("HTX — PHOENIX (THE BROADER EFFORT, NOT HIS MODEL)", profile.htx.phoenix_context),
    section("HTX — PERSONAL RESEARCH", profile.htx.personal_research),
    section("HTX — EXPERIMENTAL MODEL", profile.htx.experimental_model),
    section("HTX — BROADER ENGINEERING (SEPARATE BULLETS)", profile.htx.engineering),
    section("HTX — EVALUATION", profile.htx.evaluation),
    section("HTX — RESULTS", profile.htx.results),
    section("MICHIGAN MEDICAL RESEARCH", [profile.medical_research.separate_from, ...profile.medical_research.vascular, ...profile.medical_research.oncology]),
    section("AGENT ORCHESTRATOR (INDEPENDENT)", [profile.agent_orchestrator.relationship, ...profile.agent_orchestrator.summary]),
    section("AGENT RELIABILITY HARNESS (INDEPENDENT, SEPARATE PROJECT)", [profile.agent_reliability.relationship, ...profile.agent_reliability.summary]),
    section(
      "OTHER PROJECTS",
      profile.other_projects.flatMap((project) => [`${project.name}.`, ...project.facts]),
    ),
    section("MILITARY", [profile.military.organization, profile.military.role, ...profile.military.facts]),
    section("CISCO", [profile.cisco.role, ...profile.cisco.facts]),
    section("SKILLS PUBLISHED ON THE SITE", [`${skillLine}.`, profile.skills.name_collision]),
    section("DO NOT INFER", profile.do_not_infer),
  ].join("\n\n");
}

/*
Audit exclusions (not injected into the chatbot):

Conflicting, so omitted:
- General-capability side of the 12.7% bullet: published resume says degradation
  on general-purpose tasks stayed within 3%; Monaco and AMD resumes say
  instruction-following and reasoning recovered by 21%.
- Personnel reach: published resume says deployed AI tooling for 10,000+
  personnel; Monaco and AMD say public-security systems serving 30,000+
  officers. The attached ~20% workflow/efficiency claim rides on that
  disagreement, so it is omitted too.
- Training methods on the 24B line: published resume says LoRA, CPT, and
  full-parameter SFT; Monaco and AMD say SFT and RL. LoRA is omitted entirely.
  SFT stays because every source agrees. RL/post-training stays only as the
  resume's description of 24B experiments, not as a production claim.

Present on some resumes only, so omitted:
- ~30% shorter training turnaround (Monaco, AMD; absent from the published resume).
- ~50% faster military deployment preparation (Monaco, AMD; absent from the published resume).
- Agent Orchestrator: 68% lower p99 latency and 30% fewer model/tool calls (Monaco, AMD; absent from the published resume).
- Agent Reliability Harness: 12+ failure modes, 100+ runs, ~40% faster diagnosis (Monaco, AMD; absent from the published resume).
- RAG top-5 hit rate 72% to 90% (Monaco only).
- Trolley 3× lower noise and 2× stability (AMD only).
- KTP "20+ pledges and 200+ members" (published resume only).
- William J. Branstrom prize "top 5% of cohort" (published resume only; that resume also misspells the prize "Brainstorm").
- Public Service Commission Scholarship and Michigan Research and Discovery Scholars (published resume only).
- lm-eval-harness / "eval-harness" as a named tool (published resume only).
*/
