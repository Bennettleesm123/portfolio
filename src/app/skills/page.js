import Section from "../section";
import { skills } from "../content";

export const metadata = {
  title: "Skills — Bennett Lee",
  description: "Skills of Bennett Lee.",
};

export default function SkillsPage() {
  return (
    <Section title="Skills">
      <dl className="mt-8 border-t border-line">
        {skills.map((group) => (
          <div key={group.label} className="border-b border-line py-5">
            <dt className="text-xs uppercase tracking-[0.14em] text-faint">{group.label}</dt>
            <dd className="mt-2 text-sm leading-relaxed">{group.items.join("  ·  ")}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
