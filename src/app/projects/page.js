import SiteNav from "../site-nav";
import { projects } from "../content";

export const metadata = {
  title: "Projects — Bennett Lee",
  description: "Projects by Bennett Lee.",
};

const linkClass = "text-sm text-ink underline-offset-4 hover:underline";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <SiteNav />
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-xs uppercase tracking-[0.18em] text-faint">Projects</h1>
        <div>
          {projects.map((project) => (
            <article key={project.title} className="border-b border-line py-10">
              {project.image ? (
                <img src={project.image} alt={project.title} className="mb-6 max-h-80 w-full object-contain" />
              ) : null}
              <div className="flex items-baseline justify-between gap-6">
                <h2 className="text-xl tracking-tight">{project.title}</h2>
                <p className="shrink-0 text-xs uppercase tracking-[0.14em] text-faint">{project.status}</p>
              </div>
              {project.metric ? <p className="mt-3 font-mono text-sm">{project.metric}</p> : null}
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
      </div>
    </main>
  );
}
