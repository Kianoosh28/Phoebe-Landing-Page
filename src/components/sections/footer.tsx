import Link from "next/link";
import { Wordmark } from "@/components/logo";

const COLS = [
  {
    title: "Engine",
    links: [
      { href: "/#argument-graph", label: "Argument Graph" },
      { href: "/#pilot", label: "Request a Pilot" },
      { href: "/science", label: "Science" },
      { href: "/ecosystem", label: "Ecosystem" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "mailto:tech_admin@phoebeapp.io", label: "Contact" },
      { href: "/ecosystem#compliance", label: "Compliance" },
      { href: "/ecosystem#legal", label: "Legal" },
    ],
  },
  {
    title: "Research",
    links: [
      { href: "https://doi.org/10.1038/s41562-017-0273-4", label: "Nat Hum Behav · 2018" },
      { href: "https://doi.org/10.1037/xap0000424", label: "JEPA · 2022" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-obsidian">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-14">
        <div className="grid grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 lg:gap-12">
          <div className="col-span-2 lg:col-span-1">
            <Wordmark />
            <p className="mt-4 text-[13.5px] leading-[1.55] text-mute-2 max-w-xs">
              The Sovereign Intelligence Engine. Neuroscientific deliberation
              meets merit-weighted AI.
            </p>
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <div className="text-[11px] uppercase tracking-[0.18em] text-mute mb-4 font-mono">
                {col.title}
              </div>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link
                      href={l.href}
                      className="text-[13.5px] text-white/80 hover:text-cyan transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="hairline mt-12" />

        <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[12px] text-mute">
          <div>© {new Date().getFullYear()} Phoebe. All rights reserved.</div>
          <div className="font-mono text-[10.5px] uppercase tracking-[0.18em]">
            v0.1 · The Intelligence Engine
          </div>
        </div>
      </div>
    </footer>
  );
}
