import { aboutParagraphs } from "../../data/profile";
import AskBox from "../ask-box";
import MarinaBay from "../marina-bay";
import Section from "../section";

export const metadata = {
  title: "About — Bennett Lee",
  description: "About Bennett Lee.",
};

export default function AboutPage() {
  return (
    <Section title="About">
      <div className="mt-8 max-w-xl space-y-3 text-sm leading-relaxed text-muted">
        {aboutParagraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <MarinaBay />
      <AskBox />
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
