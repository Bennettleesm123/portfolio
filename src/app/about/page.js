import Section from "../section";

export const metadata = {
  title: "About — Bennett Lee",
  description: "About Bennett Lee.",
};

export default function AboutPage() {
  return (
    <Section title="About">
      <div className="mt-8 flex gap-3">
        <img src="/bennett.jpg" alt="Bennett Lee" className="h-28 w-28 object-cover" />
        <img src="/bennett-2.jpg" alt="One of my bonsai" className="h-28 w-28 object-cover" />
      </div>
      <div className="mt-6 max-w-xl space-y-3 text-sm leading-relaxed text-muted">
        <p>I&apos;m from Singapore, and I study computer science and statistics at the University of Michigan.</p>
        <p>Most of my time goes to training language models and building agents.</p>
        <p>Away from that I play soccer and volleyball, run, and wind down with the saxophone, bonsai, and history.</p>
      </div>
      <p className="mt-8 text-sm text-muted">
        <a href="mailto:bennettleesm@gmail.com" className="text-ink underline underline-offset-4">
          bennettleesm@gmail.com
        </a>
        <span className="text-faint">  ·  </span>
        <a href="/Bennett_Resume_PM.pdf" target="_blank" rel="noopener noreferrer" className="text-ink underline underline-offset-4">
          Resume
        </a>
      </p>
    </Section>
  );
}
