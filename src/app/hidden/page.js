import HiddenNet from "../hidden-net";
import SiteNav from "../site-nav";

export const metadata = {
  title: ":hidden — Bennett Lee",
  description: "Hidden states.",
};

export default function HiddenPage() {
  return (
    <main className="flex min-h-screen flex-col bg-paper text-ink">
      <SiteNav />
      <div className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="w-full max-w-3xl">
          <HiddenNet />
        </div>
      </div>
    </main>
  );
}
