import SiteNav from "./site-nav";

export default function Section({ title, before = null, children }) {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <SiteNav />
      <div className="mx-auto max-w-3xl px-6 py-16">
        {before}
        <h1 className={before ? "mt-10 text-xs uppercase tracking-[0.18em] text-faint" : "text-xs uppercase tracking-[0.18em] text-faint"}>{title}</h1>
        {children}
      </div>
    </main>
  );
}
