import Link from "next/link";
import { Brain, Download, ExternalLink, Quote } from "lucide-react";

const PAPERS = [
  {
    title:
      "Aggregated knowledge from a small number of debates outperforms the wisdom of large crowds.",
    citation:
      "Navajas J, Niella T, Garbulsky G, Bahrami B, Sigman M. Nat Hum Behav 2, 126–132 (2018).",
    abstract:
      "A core finding underwriting Phoebe: small, structured debates aggregated to consensus systematically outperform large unstructured crowds. The cognitive bandwidth of deliberation beats the raw sample size of polling.",
    doi: "https://doi.org/10.1038/s41562-017-0273-4",
    year: 2018,
    venue: "Nature Human Behaviour",
  },
  {
    title:
      "Democratic forecast: Small groups predict the future better than individuals and crowds.",
    citation:
      "Dezecache, G., Dockendorff, M., Ferreiro, D. N., Deroy, O., & Bahrami, B. (2022). Journal of Experimental Psychology: Applied, 28(3), 525–537.",
    abstract:
      "Replicates and extends the small-group advantage across forecast horizons: aggregated micro-deliberations beat both lone experts and unstructured crowds. The basis for Phoebe's circle topology.",
    doi: "https://doi.org/10.1037/xap0000424",
    year: 2022,
    venue: "JEPA",
  },
];

const PRINCIPLES = [
  {
    n: "01",
    title: "Calibrated certainty over binary signal",
    body: "Every prediction is graded on conviction. Forecasters who say 90% must be right 90% of the time — calibration becomes part of merit weighting.",
  },
  {
    n: "02",
    title: "Structured deliberation over unstructured crowds",
    body: "Phoebe enforces blind and semi-blind phases inside social circles. Forecasters commit before peers reveal — neutralising bandwagon contagion.",
  },
  {
    n: "03",
    title: "Merit weighting over equal voice",
    body: "Historical accuracy, calibration quality, and argument density compound into a per-forecaster weight applied to each contribution.",
  },
  {
    n: "04",
    title: "Atomic arguments over opaque scores",
    body: "Every aggregated forecast is reconstructible from its atomic arguments — making Phoebe's outputs auditable in a way market scores never are.",
  },
];

export default function ScienceLibrary() {
  return (
    <div className="pt-32 pb-12">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-mute-2 mb-5">
            <Brain size={12} className="text-amethyst" />
            Science Library
          </div>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-[72px] font-semibold tracking-[-0.025em] leading-[0.98] text-white text-balance">
            Phoebe&apos;s{" "}
            <span className="bg-gradient-to-br from-cyan to-amethyst bg-clip-text text-transparent">
              Neuro-Edge
            </span>{" "}
            is peer-reviewed.
          </h1>
          <p className="mt-6 text-[17px] leading-[1.55] text-mute-2 text-balance max-w-2xl">
            The aggregation, calibration, and deliberation mechanics that power
            the Intelligence Engine sit on a foundation of published cognitive
            science from CSO Bahador Bahrami and collaborators.
          </p>
        </div>

        {/* Principles */}
        <div className="mb-20">
          <div className="text-[11px] uppercase tracking-[0.18em] text-mute font-mono mb-5">
            Four operating principles
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PRINCIPLES.map((p) => (
              <div
                key={p.n}
                className="rounded-2xl border border-line bg-gradient-to-b from-white/[0.025] to-transparent p-6"
              >
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="font-mono text-[12px] text-cyan tracking-widest">
                    {p.n}
                  </span>
                  <h3 className="font-display text-[19px] font-semibold text-white tracking-[-0.015em] leading-[1.2] text-balance">
                    {p.title}
                  </h3>
                </div>
                <p className="text-[14px] leading-[1.55] text-mute-2">{p.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Papers */}
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-mute font-mono mb-5">
            Peer-reviewed papers
          </div>
          <div className="space-y-5">
            {PAPERS.map((p, i) => (
              <article
                key={p.doi}
                className="rounded-2xl border border-line bg-gradient-to-b from-white/[0.025] to-transparent p-6 sm:p-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">
                    Paper · 0{i + 1}
                  </span>
                  <span className="text-[11px] text-mute">·</span>
                  <span className="text-[12px] text-white">{p.venue}</span>
                  <span className="text-[11px] text-mute">·</span>
                  <span className="text-[12px] text-mute-2 font-mono">{p.year}</span>
                </div>
                <h2 className="font-display text-[22px] sm:text-[26px] font-semibold text-white tracking-[-0.015em] leading-[1.2] text-balance mb-4">
                  {p.title}
                </h2>
                <div className="flex items-start gap-3 rounded-xl border border-line bg-obsidian-100/60 p-4 mb-5">
                  <Quote size={16} className="text-cyan/70 shrink-0 mt-0.5" />
                  <p className="text-[14px] leading-[1.6] text-mute-2 text-balance">
                    {p.abstract}
                  </p>
                </div>
                <div className="text-[12px] text-mute font-mono mb-5 leading-relaxed">
                  {p.citation}
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    href={p.doi}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-cyan/10 border border-cyan/40 px-4 py-2 text-[13px] text-cyan hover:bg-cyan/15 transition-colors"
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
                    View DOI
                    <ExternalLink size={12} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
