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

export default function Home() {
  return (
    <main className="min-h-screen bg-base pb-28 text-ink">

      <section className="max-w-3xl mx-auto px-6 pt-20 pb-8">
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">Bennett Lee</h1>
        <p className="mt-4 text-lg text-muted leading-relaxed max-w-2xl">
          I build and train AI systems for the real world, healthcare, public safety, and finance, and I care about making them genuinely useful to people.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="https://github.com/Bennettleesm123" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg bg-accent text-on-accent text-sm font-medium shadow-sm hover:bg-accent-hover hover:shadow-md hover:-translate-y-0.5 transition-all duration-150">GitHub</a>
          <a href="https://www.linkedin.com/in/bennettleesm/" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg bg-accent text-on-accent text-sm font-medium shadow-sm hover:bg-accent-hover hover:shadow-md hover:-translate-y-0.5 transition-all duration-150">LinkedIn</a>
          <a href="mailto:bennettleesm@gmail.com" className="px-4 py-2 rounded-lg bg-accent text-on-accent text-sm font-medium shadow-sm hover:bg-accent-hover hover:shadow-md hover:-translate-y-0.5 transition-all duration-150">Email</a>
          <a href="/Bennett_Resume_PM.pdf" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg bg-accent text-on-accent text-sm font-medium shadow-sm hover:bg-accent-hover hover:shadow-md hover:-translate-y-0.5 transition-all duration-150">Resume</a>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 pt-6 pb-8">
        <h2 className="font-display text-2xl font-semibold mb-4">Projects</h2>
        <div className="space-y-5">
          {projects.map((p) => (
            <article key={p.title} className="rounded-2xl border border-line bg-surface p-6 shadow-sm hover:shadow-md hover:border-accent/40 transition-all duration-150">
              {p.image ? (
                <div className="mb-5 rounded-xl bg-chip flex justify-center py-6">
                  <img src={p.image} alt={p.title} className="max-h-96 w-auto object-contain rounded-lg" />
                </div>
              ) : null}
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-lg font-semibold">{p.title}</h3>
                <span className="shrink-0 rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-ink">{p.status}</span>
              </div>
              {p.metric ? <p className="mt-2 text-sm font-medium text-accent">{p.metric}</p> : null}
              <p className="mt-3 text-muted leading-relaxed">{p.impact}</p>
              <p className="mt-3 text-sm text-faint leading-relaxed">{p.technical}</p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="rounded-md bg-chip px-2.5 py-1 text-xs text-muted">{t}</span>
                ))}
                {p.link ? <a href={p.link} target="_blank" rel="noopener noreferrer" className="ml-auto text-sm font-medium text-accent hover:text-accent-hover transition-colors">View on GitHub →</a> : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 pt-6 pb-8">
        <h2 className="font-display text-2xl font-semibold mb-4">Research</h2>
        <div className="space-y-4">
          <div className="rounded-xl border border-line bg-surface p-5">
            <h3 className="font-display font-semibold">Otolaryngology &amp; Translational Oncology Lab, Michigan</h3>
            <p className="mt-2 text-sm text-muted leading-relaxed">Python pipelines for mutation and copy-number analysis across tumor-normal sequencing samples, plus QC workflows that catch contamination before it reaches downstream genomic analysis.</p>
          </div>
          <div className="rounded-xl border border-line bg-surface p-5">
            <h3 className="font-display font-semibold">Computational Vascular Biomechanics Lab, Michigan</h3>
            <p className="mt-2 text-sm text-muted leading-relaxed">Helped train an nnU-Net 3D segmentation model to reconstruct coronary microvasculature from expert-annotated microscopy data, reaching about 83% overlap with expert annotations.</p>
          </div>
        </div>
      </section>

              <section className="max-w-3xl mx-auto px-6 pt-10 pb-8">
        <h2 className="font-display text-2xl font-semibold mb-6">About</h2>
        <div className="flex gap-4 mb-8">
          <img src="/bennett.jpg" alt="Bennett Lee" className="w-1/2 rounded-2xl object-cover" />
          <img src="/bennett-2.jpg" alt="One of my bonsai" className="w-1/2 rounded-2xl object-cover" />
        </div>
        <h3 className="font-display text-3xl font-bold tracking-tight mb-5">Hi, I&apos;m Bennett</h3>
        <div className="space-y-4 text-muted leading-relaxed">
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

      <section className="max-w-3xl mx-auto px-6 pt-6 pb-20">
        <h2 className="font-display text-2xl font-semibold mb-4">Contact</h2>
                <p className="text-muted leading-relaxed max-w-2xl">
          Feel free to reach out at <a href="mailto:bennettleesm@gmail.com" className="text-accent hover:text-accent-hover underline underline-offset-2 transition-colors">bennettleesm@gmail.com</a> if you&apos;re down to chat about anything!
        </p>
        <div className="flex flex-wrap gap-3">
        </div>
      </section>

    </main>
  );
}