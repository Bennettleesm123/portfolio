import SiteNav from "./site-nav";

export default function Section({ title, children }) {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <SiteNav />
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-xs uppercase tracking-[0.18em] text-faint">{title}</h1>
        {children}
      </div>
    </main>
  );
}
