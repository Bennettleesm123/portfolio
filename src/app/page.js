import Typewriter from "./typewriter";

const projects = [
  {
    title: "Phoenix — LLM Post-Training at HTX",
    status: "Shipped",
    image: "/phoenix.png",
    metric: "12.7% domain gain · 10,000+ personnel · ~20% workflow improvement",
    impact: "Fine-tuned a large language model for legal work at Singapore's Home Team Science and Technology Agency. The models went into AI tooling deployed to over 10,000 public-safety personnel, improving tested workflows by around 20%.",
    technical: "Investigated catastrophic forgetting across LoRA, CPT, and full-parameter SFT, lifting legal-domain performance 12.7% while holding general-capability loss under 3%. Trained across 8× H100s with FSDP2, sequence packing, and fused kernels.",
    tags: ["PyTorch", "FSDP2", "LoRA/PEFT", "lm-eval-harness"],
    link: null,
  },
  {
    title: "KTP Life App",
    status: "Shipped",
    image: "/ktp-app.png",
    metric: "20+ pledges · 200+ members",
    impact: "Helped develop the pledge-class overview for Kappa Theta Pi's app, Michigan's premier technology fraternity: a live points ring, leaderboard, activity log, and strikes tracker. The app is used by rushees and over 200 members for everything to do with the fraternity.",
    technical: "Designed the UI in Figma, built it in React and TypeScript, and migrated the feature off hardcoded demo data onto Firestore so class progress syncs across users in real time.",
    tags: ["React", "TypeScript", "Firebase", "Figma"],
    link: null,
  },
  {
    title: "Agent Orchestrator",
    status: "Shipped",
    image: null,
    metric: null,
    impact: "A multi-agent system that takes a complex request, breaks it into subtasks, and routes each one to the right specialist agent, research, web search, email, or sandboxed code execution.",
    technical: "LangGraph orchestration with SQL task memory, semantic caching over embeddings, Arize Phoenix tracing, and network-isolated ephemeral Docker containers for running model-generated code safely.",
    tags: ["Python", "LangGraph", "Docker", "Arize Phoenix"],
    link: "https://github.com/Bennettleesm123/agent-orchestrator",
  },
  {
    title: "Agent Reliability Harness",
    status: "Shipped",
    image: null,
    metric: null,
    impact: "A harness that makes LLM agents trustworthy, reliable, and useful for the specific jobs you point them at.",
    technical: "Framework-free, with schema-validated tools, permission gating and human approval, persistent tracing, deterministic replay, failure injection, and automated regression evaluation across runs.",
    tags: ["Python", "Pydantic", "Docker", "Ollama"],
    link: "https://github.com/Bennettleesm123/agent-reliability-harness",
  },
  {
    title: "Caregiver Portal",
    status: "In progress",
    image: null,
    metric: null,
    impact: "A free tool helping Singaporean families find the eldercare subsidies they qualify for. Nearly half of caregivers report not knowing what support exists, while the schemes themselves sit behind a maze of overlapping eligibility rules.",
    technical: "A deterministic rules engine over a hand-curated dataset of official schemes. Chose plain logic over an LLM so eligibility guidance stays accurate, explainable, and traceable to the official source.",
    tags: ["Next.js", "React", "Tailwind"],
    link: null,
  },
];

const linkClass = "text-sm text-ink underline-offset-4 hover:underline";

export default function Home() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <header className="mx-auto max-w-3xl px-6 pt-8">
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
          <h1 className="text-4xl tracking-tight sm:text-5xl">Bennett Lee</h1>
          <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Contact links">
            <a href="https://github.com/Bennettleesm123" target="_blank" rel="noopener noreferrer" className={linkClass}>GitHub</a>
            <a href="https://www.linkedin.com/in/bennettleesm/" target="_blank" rel="noopener noreferrer" className={linkClass}>LinkedIn</a>
            <a href="mailto:bennettleesm@gmail.com" className={linkClass}>Email</a>
            <a href="/Bennett_Resume_PM.pdf" target="_blank" rel="noopener noreferrer" className={linkClass}>Resume</a>
          </nav>
        </div>

        <div className="relative mt-20 pb-16">
          <div className="hero-dots pointer-events-none absolute -inset-x-6 -top-10 h-48" aria-hidden="true" />
          <Typewriter />
        </div>
      </header>

      <section className="mx-auto max-w-3xl border-t border-line px-6 py-14">
        <h2 className="text-xs uppercase tracking-[0.18em] text-faint">Projects</h2>
        <div>
          {projects.map((project) => (
            <article key={project.title} className="border-b border-line py-10">
              {project.image ? (
                <img src={project.image} alt={project.title} className="mb-6 max-h-80 w-full object-contain" />
              ) : null}
              <div className="flex items-baseline justify-between gap-6">
                <h3 className="text-xl tracking-tight">{project.title}</h3>
                <p className="shrink-0 text-xs uppercase tracking-[0.14em] text-faint">{project.status}</p>
              </div>
              {project.metric ? <p className="mt-3 font-mono text-sm text-ink">{project.metric}</p> : null}
              <p className="mt-4 leading-relaxed text-muted">{project.impact}</p>
              <p className="mt-3 text-sm leading-relaxed text-faint">{project.technical}</p>
              <p className="mt-4 font-mono text-xs text-faint">{project.tags.join("  ·  ")}</p>
              {project.link ? (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className={`${linkClass} mt-4 inline-block`}>
                  View on GitHub
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl border-b border-line px-6 py-14">
        <h2 className="text-xs uppercase tracking-[0.18em] text-faint">Research</h2>
        <div className="mt-8 space-y-8">
          <div>
            <h3 className="text-lg tracking-tight">Otolaryngology &amp; Translational Oncology Lab, Michigan</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">Python pipelines for mutation and copy-number analysis across tumor-normal sequencing samples, plus QC workflows that catch contamination before it reaches downstream genomic analysis.</p>
          </div>
          <div>
            <h3 className="text-lg tracking-tight">Computational Vascular Biomechanics Lab, Michigan</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">Helped train an nnU-Net 3D segmentation model to reconstruct coronary microvasculature from expert-annotated microscopy data, reaching about 83% overlap with expert annotations.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl border-b border-line px-6 py-14">
        <h2 className="text-xs uppercase tracking-[0.18em] text-faint">About</h2>
        <div className="mt-8 flex gap-3">
          <img src="/bennett.jpg" alt="Bennett Lee" className="h-56 w-1/2 object-cover sm:h-72" />
          <img src="/bennett-2.jpg" alt="One of my bonsai" className="h-56 w-1/2 object-cover sm:h-72" />
        </div>
        <h3 className="mt-8 text-3xl tracking-tight">Hi, I&apos;m Bennett</h3>
        <div className="mt-5 space-y-4 leading-relaxed text-muted">
          <p>
            I&apos;m from Singapore and I study CS and statistics at Michigan. I spent a year and a half in the Singapore army before that.
          </p>
          <p>
            These days I mostly work on large language model training and deployment. I did post-training and evaluation at the Home Team Science and Technology Agency in Singapore over a summer, I build agent infrastructure in my own time, and I&apos;ve worked in two labs at Michigan Medicine applying ML to genomics and medical imaging.
          </p>
          <p>
            I got into machine learning partly because I found it fascinating that so much of it comes down to linear algebra. A lot of what looks like magic is matrices being multiplied, and I like that. It is also the bedrock behind artificial intelligence, and I think it has the potential to do a lot of good across healthcare, finance, technology, public services, and plenty of other sectors.
          </p>
          <p>
            In my free time I play soccer and volleyball, run, and wind down with the saxophone, growing bonsai, and reading about history and geopolitics.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-14">
        <h2 className="text-xs uppercase tracking-[0.18em] text-faint">Contact</h2>
        <p className="mt-6 max-w-2xl leading-relaxed text-muted">
          Feel free to reach out at <a href="mailto:bennettleesm@gmail.com" className="text-ink underline underline-offset-4">bennettleesm@gmail.com</a> if you&apos;re down to chat about anything.
        </p>
      </section>
    </main>
  );
}
