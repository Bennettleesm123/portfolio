export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">

      <section className="max-w-3xl mx-auto px-6 pt-24 pb-16">
        <p className="text-lg text-slate-500 mb-2">Hey, I&apos;m Bennett</p>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Bennett Lee</h1>
        <p className="mt-5 text-lg text-slate-600 leading-relaxed max-w-2xl">
          I build and train AI systems for the real world, healthcare, public safety, and finance, and I care about making them genuinely useful to people.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="https://github.com/Bennettleesm123" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-700 transition-colors">GitHub</a>
          <a href="https://www.linkedin.com/in/bennettleesm/" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-100 transition-colors">LinkedIn</a>
          <a href="mailto:bennettleesm@gmail.com" className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-100 transition-colors">Email</a>
          <a href="/Bennett_Resume_PM.pdf" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-100 transition-colors">Resume</a>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-semibold mb-6">Projects</h2>
        <p className="text-slate-400">[ project cards go here ]</p>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-semibold mb-6">About</h2>
        <p className="text-slate-400">[ about content goes here ]</p>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-semibold mb-6">Contact</h2>
        <p className="text-slate-400">[ contact + links go here ]</p>
      </section>

    </main>
  );
}