"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const pages = [
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/about", label: "About" },
  { href: "/hidden", label: ":hidden" },
];

export default function SiteNav({ heading = false }) {
  const pathname = usePathname();
  const name = (
    <Link href="/" className="tracking-tight text-ink">
      Bennett Lee
    </Link>
  );

  return (
    <header className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-6 pt-8 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
      {heading ? <h1 className="text-sm">{name}</h1> : <p className="text-sm">{name}</p>}
      <nav aria-label="Pages" className="flex flex-wrap gap-x-5 border-b border-line text-sm sm:gap-x-6">
        {pages.map((page) => {
          const active = pathname === page.href;
          return (
            <Link
              key={page.href}
              href={page.href}
              aria-current={active ? "page" : undefined}
              className={
                active
                  ? "-mb-px border-b border-ink pb-2 text-ink"
                  : "border-b border-transparent pb-2 text-faint hover:text-ink"
              }
            >
              {page.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
