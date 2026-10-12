import Attention from "./attention";
import NextToken from "./next-token";
import SiteNav from "./site-nav";
import Welcome from "./welcome";

// attention, next-token, and typewriter stay switchable.
// typewriter is the network home. The hidden label opens the bubble field in place.
const home = "typewriter";

const iconClass = "text-ink transition-opacity hover:opacity-45";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-paper text-ink">
      <SiteNav heading />
      <div className="flex flex-1 items-center justify-center px-6 py-16">
        {home === "next-token" ? (
          <NextToken />
        ) : home === "attention" ? (
          <Attention />
        ) : (
          <Welcome />
        )}
      </div>
      <footer className="flex items-center justify-center gap-8 pb-10">
        <a href="https://github.com/Bennettleesm123" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={iconClass}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.38-.01 2.49-.01 2.83 0 .26.18.59.69.48A10.04 10.04 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
          </svg>
        </a>
        <a href="https://www.linkedin.com/in/bennettleesm/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={iconClass}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V24h-4V8.5zM8.5 8.5h3.8v2.1h.05c.53-1 1.82-2.1 3.75-2.1 4.01 0 4.75 2.64 4.75 6.07V24h-4v-7.7c0-1.84-.03-4.2-2.56-4.2-2.56 0-2.95 2-2.95 4.06V24h-4V8.5z" />
          </svg>
        </a>
        <a href="mailto:bennettleesm@gmail.com" aria-label="Email" className={iconClass}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="1.5" />
            <path d="M4 7l8 6 8-6" />
          </svg>
        </a>
      </footer>
    </main>
  );
}
