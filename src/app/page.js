// personal portfolio, single page. sections stubbed for now, filled in later phases.

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">

      {/* hero: name, positioning, links (phase 3) */}
      <section className="max-w-3xl mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold">Bennett Lee</h1>
        <p className="mt-4 text-slate-600">[ positioning line goes here ]</p>
      </section>

      {/* projects: the core, two-layer cards (phase 4) */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-semibold mb-6">Projects</h2>
        <p className="text-slate-400">[ project cards go here ]</p>
      </section>

      {/* about + commando + photos (phase 5) */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-semibold mb-6">About</h2>
        <p className="text-slate-400">[ about content goes here ]</p>
      </section>

      {/* contact (phase 5) */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-semibold mb-6">Contact</h2>
        <p className="text-slate-400">[ contact + links go here ]</p>
      </section>

    </main>
  );
}
