import Section from "../section";
import { experience } from "../../data/profile";

export const metadata = {
  title: "Experience — Bennett Lee",
  description: "Experience of Bennett Lee.",
};

export default function ExperiencePage() {
  return (
    <Section title="Experience">
      <ul className="mt-8 border-t border-line">
        {experience.map((item) => (
          <li
            key={item.place}
            className="flex flex-col gap-1 border-b border-line py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-10"
          >
            <p className="tracking-tight">{item.place}</p>
            <p className="shrink-0 text-sm text-muted">{item.role}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
