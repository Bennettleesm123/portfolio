import SiteNav from "../site-nav";

export const metadata = {
  title: "About — Bennett Lee",
  description: "About Bennett Lee.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <SiteNav />
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-xs uppercase tracking-[0.18em] text-faint">About</h1>
        <div className="mt-8 flex gap-3">
          <img src="/bennett.jpg" alt="Bennett Lee" className="h-56 w-1/2 object-cover sm:h-72" />
          <img src="/bennett-2.jpg" alt="One of my bonsai" className="h-56 w-1/2 object-cover sm:h-72" />
        </div>
        <h2 className="mt-8 text-3xl tracking-tight">Hi, I&apos;m Bennett</h2>
        <div className="mt-5 space-y-4 leading-relaxed text-muted">
          <p>
            I&apos;m from Singapore and I study CS and statistics at Michigan. I spent a year and a half in the Singapore army before that.
          </p>
          <p>
            These days I mostly work on large language model training and deployment. I did post-training and evaluation at the Home Team Science and Technology Agency in Singapore over a summer, I build agent infrastructure in my own time, and I&apos;ve worked in two labs at Michigan Medicine applying ML to genomics and medical imaging.
          </p>
          <p>
            I got into machine learning partly because I found it fascinating that so much of it comes down to linear algebra. A lot of what looks like magic is matrices being multiplied, and I like that. It is also the bedrock behind artificial intelligence, and I think it has the potential to do a lot of good across healthcare, finance, technology, public services, and plenty of other sectors.
          </p>
          <p>
            In my free time I play soccer and volleyball, run, and wind down with the saxophone, growing bonsai, and reading about history and geopolitics.
          </p>
        </div>

        <h2 className="mt-16 text-xs uppercase tracking-[0.18em] text-faint">Research</h2>
        <div className="mt-8 space-y-8 border-t border-line pt-8">
          <div>
            <h3 className="text-lg tracking-tight">Otolaryngology &amp; Translational Oncology Lab, Michigan</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">Python pipelines for mutation and copy-number analysis across tumor-normal sequencing samples, plus QC workflows that catch contamination before it reaches downstream genomic analysis.</p>
          </div>
          <div>
            <h3 className="text-lg tracking-tight">Computational Vascular Biomechanics Lab, Michigan</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">Helped train an nnU-Net 3D segmentation model to reconstruct coronary microvasculature from expert-annotated microscopy data, reaching about 83% overlap with expert annotations.</p>
          </div>
        </div>

        <p className="mt-16 leading-relaxed text-muted">
          Feel free to reach out at <a href="mailto:bennettleesm@gmail.com" className="text-ink underline underline-offset-4">bennettleesm@gmail.com</a>, or read the <a href="/Bennett_Resume_PM.pdf" target="_blank" rel="noopener noreferrer" className="text-ink underline underline-offset-4">resume</a>.
        </p>
      </div>
    </main>
  );
}
