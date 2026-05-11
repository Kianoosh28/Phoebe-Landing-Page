"use client";

import { motion } from "motion/react";
import { Download, ExternalLink, Brain } from "lucide-react";
import Link from "next/link";

const PAPERS = [
  {
    citation:
      "Navajas J, Niella T, Garbulsky G, Bahrami B, Sigman M. Aggregated knowledge from a small number of debates outperforms the wisdom of large crowds. Nat Hum Behav 2, 126–132 (2018).",
    title:
      "Aggregated knowledge from a small number of debates outperforms the wisdom of large crowds.",
    venue: "Nature Human Behaviour · 2018",
    doi: "https://doi.org/10.1038/s41562-017-0273-4",
  },
  {
    citation:
      "Dezecache, G., Dockendorff, M., Ferreiro, D. N., Deroy, O., & Bahrami, B. (2022). Democratic forecast: Small groups predict the future better than individuals and crowds. Journal of Experimental Psychology: Applied, 28(3), 525–537.",
    title:
      "Democratic forecast: Small groups predict the future better than individuals and crowds.",
    venue: "Journal of Experimental Psychology: Applied · 2022",
    doi: "https://doi.org/10.1037/xap0000424",
  },
];

const GRANTS = [
  { name: "ERC", role: "European Research Council" },
  { name: "PEPR eNSEMBLE", role: "France 2030 program" },
  { name: "France 2030", role: "National investment plan" },
  { name: "French Tech", role: "Startup ecosystem" },
];

export function Science() {
  return (
    <section className="relative py-12 sm:py-20 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-0 top-1/3 h-[420px] w-[640px] rounded-full bg-amethyst/8 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16">
          {/* Left: positioning */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-mute-2 mb-5">
              <Brain size={12} className="text-amethyst" />
              The Science Behind Phoebe
            </div>
            <h2 className="font-display glitch-reveal text-4xl sm:text-5xl lg:text-[56px] font-semibold tracking-[-0.025em] leading-[1.02] text-white text-balance">
              The Neuro-Edge:{" "}
              <span className="bg-gradient-to-br from-cyan-soft via-cyan to-amethyst bg-clip-text text-transparent">
                cognitive AI architecture.
              </span>
            </h2>
            <p className="mt-5 text-[16px] leading-[1.55] text-mute-2 text-balance">
              Phoebe is a human-in-the-loop design built on peer-reviewed
              cognitive science. Structured deliberation neutralises the
              bandwagon effect; merit-weighted aggregation compounds the signal
              of small, expert debates over noisy crowds.
            </p>

            <div className="mt-8 text-[11px] uppercase tracking-[0.18em] text-mute mb-3">
              Backed by
            </div>
            <div className="flex flex-wrap gap-2">
              {GRANTS.map((g) => (
                <div
                  key={g.name}
                  className="rounded-lg border border-line bg-white/[0.025] px-3 py-2"
                >
                  <div className="text-[12.5px] text-white">{g.name}</div>
                  <div className="text-[10.5px] text-mute font-mono">{g.role}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: papers */}
          <div className="space-y-4">
            {PAPERS.map((p, i) => (
              <motion.div
                key={p.doi}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="group rounded-2xl border border-line bg-gradient-to-b from-white/[0.025] to-transparent p-6 sm:p-7 hover:border-line-strong transition-colors"
              >
                <div className="flex items-center gap-2 mb-3 text-[11px] uppercase tracking-[0.16em] text-mute font-mono">
                  <span className="h-1 w-1 rounded-full bg-cyan" />
                  Peer-Reviewed Paper · 0{i + 1}
                </div>
                <h3 className="font-display text-[20px] sm:text-[22px] font-semibold text-white tracking-[-0.015em] leading-[1.25] mb-2 text-balance">
                  {p.title}
                </h3>
                <div className="text-[12.5px] text-mute-2 mb-4">{p.venue}</div>
                <p className="text-[12.5px] leading-[1.6] text-mute font-mono mb-5 line-clamp-3">
                  {p.citation}
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    href={p.doi}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-white/[0.04] px-4 py-2 text-[13px] text-white hover:border-cyan/50 hover:text-cyan transition-colors"
                  >
                    <Download size={14} />
                    Download PDF
                  </Link>
                  <Link
                    href={p.doi}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[12.5px] text-mute-2 hover:text-white transition-colors"
                  >
                    DOI
                    <ExternalLink size={12} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
