"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const pages = [
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
];

export default function SiteNav({ heading = false }) {
  const pathname = usePathname();
  const name = (
    <Link href="/" className="tracking-tight text-ink">
      Bennett Lee
    </Link>
  );

  return (
    <header className="mx-auto flex w-full max-w-5xl items-center justify-between gap-6 px-6 pt-8">
      {heading ? <h1 className="text-sm">{name}</h1> : <p className="text-sm">{name}</p>}
      <nav className="flex gap-6 text-sm" aria-label="Pages">
        {pages.map((page) => {
          const active = pathname === page.href;
          return (
            <Link
              key={page.href}
              href={page.href}
              aria-current={active ? "page" : undefined}
              className={active ? "text-ink underline underline-offset-4" : "text-faint hover:text-ink"}
            >
              {page.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
