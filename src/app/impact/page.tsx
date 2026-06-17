import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Phoebe — Sovereign Foresight Engine",
  description:
    "Phoebe combines adaptive-weighted AI with deep human collective intelligence to map behavioral friction and forecast systemic policy, health, and climate transitions before they unfold.",
  metadataBase: new URL("https://impact.phoebeapp.io"),
  openGraph: {
    title: "Phoebe — Sovereign Foresight Engine",
    description:
      "Map exactly where human behavior is going next. Predictive intelligence for policy, infrastructure, and climate risk.",
    url: "https://impact.phoebeapp.io",
    siteName: "Phoebe",
    type: "website",
  },
};

// Amethyst accent — used exclusively for crisp borders / status indicators.
const ACCENT = "#9966CC";

const SCENARIOS = [
  {
    id: "01",
    title: "Public Policy & Mobility",
    body: "Simulating actual commuter compliance thresholds, retail economic impacts, public pushback vectors, and behavioral friction on urban mobility and environmental restriction policies months before final votes land.",
  },
  {
    id: "02",
    title: "Health & Infrastructure",
    body: "Quantifying healthcare capability shortfalls, hidden psychological friction points, and artisan supply-chain bottlenecks inside social housing, senior care, and multi-generational public infrastructure initiatives.",
  },
  {
    id: "03",
    title: "Climate & Resource Risk",
    body: "Forecasting agrarian land-use shifts, critical industrial supply-chain constraints, and complex legal or civil escalation risks surrounding regional environmental resource caps and legislative transitions.",
  },
];

export default function ImpactPage() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-black text-zinc-100 font-sans">
      {/* Subtle dashboard grid backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-bg opacity-60" />

      <div className="relative mx-auto w-full max-w-6xl px-6 sm:px-8">
        {/* 2 · HEADER NAV PANEL */}
        <header className="flex items-center justify-between gap-4 border-b border-zinc-800 py-5">
          <span className="font-mono text-[10px] tracking-[0.28em] text-zinc-400 sm:text-xs">
            PHOEBE // SOVEREIGN FORESIGHT ENGINE
          </span>
          <span
            className="inline-flex items-center gap-2 border px-3 py-1.5 font-mono text-[10px] tracking-[0.22em] text-zinc-300"
            style={{ borderColor: `${ACCENT}66` }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: ACCENT, boxShadow: `0 0 8px ${ACCENT}` }}
            />
            STATUS: ACTIVE LENS
          </span>
        </header>

        {/* 3 · HERO */}
        <section className="border-b border-zinc-800 py-20 sm:py-28">
          <p
            className="font-mono text-xs tracking-[0.38em] uppercase"
            style={{ color: ACCENT }}
          >
            Systemic Behavioral Lens
          </p>
          <h1 className="mt-6 font-display text-5xl font-extrabold leading-[1.02] tracking-tight text-balance sm:text-6xl">
            Stop Guessing the Future.{" "}
            <span style={{ color: ACCENT }}>Forecast It.</span>
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-zinc-400 sm:text-xl">
            Legacy risk models miscalculate systemic transitions because they
            rely on backward-looking data training loops. At the same time,
            traditional market research and conventional opinion polling fail
            under structural rule changes&mdash;crippled by systemic social
            desirability bias and participant satisficing, where fatigued
            respondents pick random shortcuts just to finish a survey. Phoebe
            combines adaptive-weighted artificial intelligence with deep human
            collective intelligence to filter out noise, identify conviction
            limits, and map out behavioral friction long before crisis events
            unfold.
          </p>
        </section>

        {/* 4 · CORE SCENARIOS MATRIX */}
        <section className="py-16 sm:py-20">
          <div className="mb-8 flex items-center gap-3 font-mono text-xs tracking-[0.28em] text-zinc-500">
            <span>CORE SCENARIOS MATRIX</span>
            <span className="h-px flex-1 bg-zinc-800" />
            <span>03 ACTIVE MODULES</span>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {SCENARIOS.map((s) => (
              <article
                key={s.id}
                className="relative overflow-hidden border border-zinc-800 bg-zinc-900/50 p-6"
              >
                {/* elegant thin amethyst top border accent */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px"
                  style={{ backgroundColor: ACCENT }}
                />
                <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.22em] text-zinc-500">
                  <span>MODULE {s.id}</span>
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: ACCENT }}
                  />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold tracking-tight text-zinc-50">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  {s.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* 5 · PLATFORM MECHANICS COMPARISON */}
        <section className="py-16 sm:py-20">
          <div className="mb-8 flex items-center gap-3 font-mono text-xs tracking-[0.28em] text-zinc-500">
            <span>PLATFORM MECHANICS</span>
            <span className="h-px flex-1 bg-zinc-800" />
          </div>

          <div className="border border-zinc-800 bg-zinc-900/50 font-mono">
            <div className="grid grid-cols-1 divide-y divide-zinc-800 md:grid-cols-2 md:divide-x md:divide-y-0">
              <div className="p-6 sm:p-8">
                <div className="text-[11px] tracking-[0.24em] text-zinc-500">
                  // TRAINING METHOD
                </div>
                <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                  Traditional data frameworks assume a static future, capturing
                  surface-level metrics of where the world was.
                </p>
              </div>
              <div className="p-6 sm:p-8">
                <div
                  className="text-[11px] tracking-[0.24em]"
                  style={{ color: ACCENT }}
                >
                  // PHOEBE METHOD
                </div>
                <p className="mt-4 text-sm leading-relaxed text-zinc-200">
                  Adaptive intelligence architecture designed to map exactly
                  where human behavior is going next.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 6 · CONVERSION FOOTER */}
        <section className="border-t border-zinc-800 py-20 text-center">
          <h2
            className="font-mono text-sm tracking-[0.32em]"
            style={{ color: ACCENT }}
          >
            ENGAGE PREDICTIVE PILOT
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-zinc-500">
            Request access to the engine. Deploy a private forecasting pilot
            scoped to your sector.
          </p>

          <form className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              placeholder="name@organization.gov"
              aria-label="Work email"
              className="flex-1 border border-zinc-800 bg-black px-4 py-3 font-mono text-sm text-zinc-100 placeholder:text-zinc-600 outline-none transition-colors focus:border-[#9966CC]"
            />
            <button
              type="submit"
              className="border border-transparent px-6 py-3 font-mono text-sm font-bold tracking-[0.12em] text-black transition-opacity hover:opacity-90"
              style={{ backgroundColor: ACCENT }}
            >
              REQUEST ENGINE ACCESS
            </button>
          </form>
        </section>

        {/* Footer branding row */}
        <footer className="flex flex-col items-center justify-between gap-3 border-t border-zinc-800 py-6 font-mono text-xs text-zinc-600 sm:flex-row">
          <span>&copy; 2026 Phoebe. All rights reserved.</span>
          <a
            href="https://impact.phoebeapp.io"
            className="tracking-[0.22em] text-zinc-400 transition-colors hover:text-[#9966CC]"
          >
            impact.phoebeapp.io
          </a>
        </footer>
      </div>
    </div>
  );
}
