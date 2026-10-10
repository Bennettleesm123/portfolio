import Section from "../section";
import { projects } from "../content";

export const metadata = {
  title: "Projects — Bennett Lee",
  description: "Projects by Bennett Lee.",
};

export default function ProjectsPage() {
  return (
    <Section title="Projects">
      <div className="mt-8 border-t border-line">
        {projects.map((project) => (
          <article key={project.title} className="border-b border-line py-5">
            <h2 className="tracking-tight">{project.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{project.summary}</p>
            {project.link ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm text-ink underline-offset-4 hover:underline"
              >
                GitHub
              </a>
            ) : null}
          </article>
        ))}
      </div>
    </Section>
  );
}
