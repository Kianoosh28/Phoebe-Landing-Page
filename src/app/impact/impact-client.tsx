"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Download, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Wordmark } from "@/components/logo";
import { ImpactPilotProvider, useImpactPilot } from "./impact-pilot";
import {
  ForesightNetworkProvider,
  useForesightNetwork,
} from "./foresight-network";

/* Electric cyan technical palette — the impact subdomain's primary color. */
const A = "#00F0FF";
const AG = "#5CF6FF";

/* Brand amethyst highlights — the Foresight Network (community) accent. */
const M = "#9966CC";
const MG = "#B692DB";

const SCENARIOS = [
  {
    id: "MODULE_01",
    title: "Public Policy & Mobility",
    radar: "SIMULATED: REGIONAL EMISSION CAPS // FREQUENCY: REALTIME",
    intel:
      "Simulating actual commuter compliance thresholds, retail economic impacts, public pushback vectors, and behavioral friction on urban mobility and environmental restriction policies months before final votes land.",
  },
  {
    id: "MODULE_02",
    title: "Health & Infrastructure",
    radar: "SIMULATED: RE-ALIGNMENT FRICTION // FREQUENCY: REALTIME",
    intel:
      "Quantifying healthcare capability shortfalls, hidden psychological friction points, and artisan supply-chain bottlenecks inside social housing, senior care, and multi-generational public infrastructure initiatives.",
  },
  {
    id: "MODULE_03",
    title: "Climate & Resource Risk",
    radar: "SIMULATED: AGRARIAN SHIFTS // FREQUENCY: REALTIME",
    intel:
      "Forecasting agrarian land-use shifts, critical industrial supply-chain constraints, and complex legal or civil escalation risks surrounding regional environmental resource caps and legislative transitions.",
  },
];

const MOAT_CARDS = [
  {
    n: "01",
    eyebrow: "CERTAINTY-WEIGHTED PROBABILITY",
    title: 'We don’t ask "Yes or No." We ask "How sure are you?"',
    body: "Every prediction is graded on conviction, not just direction — turning binary noise into calibrated signal.",
  },
  {
    n: "02",
    eyebrow: "MERIT-WEIGHTED AGGREGATION",
    title: "Not all voices are equal. Superforecasters compound.",
    body: "Phoebe weights predictions by historical accuracy and the quality of deliberation — so signal compounds while noise decays.",
  },
  {
    n: "03",
    eyebrow: "STRUCTURED DELIBERATION",
    title: "Blind circles eliminate the bandwagon effect.",
    body: "Forecasts cluster in semi-blind circles before peer exposure — Bahrami's neuroscience prevents groupthink from poisoning the signal.",
  },
];

const PAPERS = [
  {
    n: "01",
    title:
      "Aggregated knowledge from a small number of debates outperforms the wisdom of large crowds.",
    venue: "Nature Human Behaviour · 2018",
    citation:
      "Navajas J, Niella T, Garbulsky G, Bahrami B, Sigman M. Nat Hum Behav 2, 126–132 (2018).",
    doi: "https://doi.org/10.1038/s41562-017-0273-4",
  },
  {
    n: "02",
    title:
      "Democratic forecast: Small groups predict the future better than individuals and crowds.",
    venue: "Journal of Experimental Psychology: Applied · 2022",
    citation:
      "Dezecache G, Dockendorff M, Ferreiro D N, Deroy O, Bahrami B. JEPA 28(3), 525–537 (2022).",
    doi: "https://doi.org/10.1037/xap0000424",
  },
];

const GRANTS = [
  { src: "/ERC.png", alt: "European Research Council" },
  { src: "/France2030.png", alt: "France 2030" },
  { src: "/FrenchTech.png", alt: "French Tech" },
];

const FOUNDERS = [
  {
    photo: "/Paran.jpg",
    name: "Paran Tanzifi",
    role: "Co-Founder & CEO",
    bio: "Visionary with a decade of experience in IT and gaming startups. Owns Phoebe's business and marketing strategy.",
    tag: "Business · Marketing",
    linkedin: "https://linkedin.com/in/paran-tanzifi",
  },
  {
    photo: "/Kianoosh.jpg",
    name: "Kianoosh Kani",
    role: "Co-Founder & COO",
    bio: "Serial founder across tech and gaming. Drives Phoebe's operating system and product surface through rigorous design-thinking.",
    tag: "Design Thinking · Ops",
    linkedin: "https://linkedin.com/in/kianoosh-kani",
  },
  {
    photo: "/Bahador.jpg",
    name: "Bahador Bahrami",
    role: "Co-Founder & CSO",
    bio: "Neuroscientist whose published work on crowd wisdom and structured deliberation underpins Phoebe's methodological moat.",
    tag: "Neuroscience · Deliberation",
    linkedin: "https://linkedin.com/in/bahador-bahrami",
  },
  {
    photo: "/Bernard.png",
    name: "Bernard Okwampah",
    role: "Co-Founder & CTO",
    bio: "AI engineer with deep cybersecurity expertise. Architects Phoebe's merit-weighting algorithms and the platform's trust layer.",
    tag: "AI · Cybersecurity",
    linkedin: "https://linkedin.com/in/okwampahbernard",
  },
];

/* Deterministic seed so SSR and first client render match (no hydration drift). */
function seed(i: number) {
  return ((i * 1103515245 + 12345) >>> 8) % 256;
}

function LinkedInIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.37 4.28 5.47v6.27zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function SystemClock() {
  const [t, setT] = useState("00:00:00");
  useEffect(() => {
    const tick = () => setT(new Date().toISOString().slice(11, 19));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="font-mono tabular-nums" style={{ color: AG }}>
      {t} UTC
    </span>
  );
}

function HexStream({ cols = 28, intervalMs = 110 }: { cols?: number; intervalMs?: number }) {
  const [row, setRow] = useState<string>(() =>
    Array.from({ length: cols }, (_, c) => seed(c).toString(16).padStart(2, "0")).join(" "),
  );
  useEffect(() => {
    const id = setInterval(() => {
      setRow(
        Array.from({ length: cols }, () =>
          Math.floor(Math.random() * 256).toString(16).padStart(2, "0"),
        ).join(" "),
      );
    }, intervalMs);
    return () => clearInterval(id);
  }, [cols, intervalMs]);
  return (
    <div className="overflow-hidden whitespace-nowrap font-mono text-[10px] tracking-wider text-zinc-600">
      {row}
    </div>
  );
}

function MemoryChart({ bars = 26 }: { bars?: number }) {
  const [vals, setVals] = useState<number[]>(() =>
    Array.from({ length: bars }, (_, i) => 18 + (seed(i) % 70)),
  );
  useEffect(() => {
    const id = setInterval(() => {
      setVals((p) => [...p.slice(1), 14 + Math.floor(Math.random() * 82)]);
    }, 600);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="flex h-7 items-end gap-[2px]">
      {vals.map((v, i) => (
        <span
          key={i}
          className="w-[3px] rounded-[1px]"
          style={{ height: `${v}%`, backgroundColor: i === vals.length - 1 ? AG : `${A}99` }}
        />
      ))}
    </div>
  );
}

function IndicatorMatrix({ rows = 4, cols = 9 }: { rows?: number; cols?: number }) {
  const cells = rows * cols;
  return (
    <div className="grid gap-[3px]" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))` }}>
      {Array.from({ length: cells }).map((_, i) => {
        const on = seed(i) % 4 === 0;
        return (
          <span
            key={i}
            className="h-1.5 w-1.5 rounded-[1px] impact-blink"
            style={{
              backgroundColor: on ? A : "#1f1f23",
              boxShadow: on ? `0 0 6px ${A}` : "none",
              animationDelay: `${(i % 9) * 0.16}s`,
            }}
          />
        );
      })}
    </div>
  );
}

/* Consistent section header used across every block. */
function SectionHead({
  eyebrow,
  title,
  sub,
  right,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  right?: string;
}) {
  return (
    <div className="mb-12">
      <div className="mb-5 flex items-center gap-3 font-mono text-xs tracking-[0.26em] text-zinc-500">
        <span style={{ color: A }}>//</span> {eyebrow}
        <span className="h-px flex-1 bg-zinc-800" />
        {right && <span>{right}</span>}
      </div>
      <h2 className="max-w-3xl font-display text-balance text-3xl font-bold leading-[1.05] tracking-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {sub && (
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-400">{sub}</p>
      )}
    </div>
  );
}

/* Shared brutalist card frame with cyan top accent. */
function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("relative flex flex-col overflow-hidden border border-zinc-800 bg-black/40", className)}>
      <span aria-hidden className="absolute inset-x-0 top-0 h-[2px]" style={{ backgroundColor: A }} />
      {children}
    </div>
  );
}

function Panel({ s, index }: { s: (typeof SCENARIOS)[number]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Card className="h-full">
        <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-3">
          <span className="font-mono text-[11px] tracking-[0.16em]" style={{ color: AG }}>
            [ {s.id} ]
          </span>
          <span className="h-1.5 w-1.5 rounded-full impact-blink" style={{ backgroundColor: A, boxShadow: `0 0 8px ${A}` }} />
        </div>
        <div className="px-5 pt-4">
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.12em] text-zinc-500">
            <span className="inline-block h-1 w-1 rounded-full" style={{ backgroundColor: A }} />
            HEADER RADAR
          </div>
          <div className="mt-2 border border-zinc-800 bg-black px-3 py-2 font-mono text-[10.5px] leading-relaxed text-zinc-400">
            {s.radar}
          </div>
          <div className="mt-2">
            <HexStream cols={20} intervalMs={130 + index * 30} />
          </div>
        </div>
        <div className="flex flex-1 flex-col px-5 pb-6 pt-5">
          <h3 className="font-display text-xl font-bold tracking-tight text-zinc-50">{s.title}</h3>
          <div className="mt-2 mb-3 font-mono text-[10px] tracking-[0.18em] text-zinc-600">// CORE INTEL</div>
          <p className="text-sm leading-relaxed text-zinc-400">{s.intel}</p>
        </div>
      </Card>
    </motion.div>
  );
}

function ImpactNav() {
  const [scrolled, setScrolled] = useState(false);
  const { open } = useImpactPilot();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "border-b border-line bg-obsidian/70 backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/impact" className="flex items-center" aria-label="Phoebe Impact home">
          <Wordmark />
        </Link>
        <button
          type="button"
          onClick={open}
          className="impact-cta inline-flex items-center px-5 py-2.5 font-mono text-xs font-bold tracking-[0.12em] text-black"
          style={{ backgroundColor: A }}
        >
          REQUEST ENGINE ACCESS
        </button>
      </div>
    </header>
  );
}

export function ImpactDashboard() {
  return (
    <ImpactPilotProvider>
      <ForesightNetworkProvider>
        <DashboardInner />
      </ForesightNetworkProvider>
    </ImpactPilotProvider>
  );
}

function DashboardInner() {
  const { open: openPilot } = useImpactPilot();
  const { open: openNetwork } = useForesightNetwork();

  return (
    <div className="font-sans text-zinc-100">
      <style>{`
        @keyframes impactBlink { 0%,100%{opacity:1} 50%{opacity:.35} }
        .impact-blink { animation: impactBlink 1.8s ease-in-out infinite; }
        @keyframes impactScan { 0%{transform:translateY(-100%)} 100%{transform:translateY(900%)} }
        .impact-scan { animation: impactScan 3.4s linear infinite; }
        .impact-cta { transition: box-shadow .2s ease, opacity .2s ease; }
        .impact-cta:hover { box-shadow: 0 0 0 1px ${AG}, 0 0 26px -4px ${A}; opacity: .95; }
        .impact-cta-amethyst { transition: box-shadow .2s ease, color .2s ease, background-color .2s ease, border-color .2s ease; }
        .impact-cta-amethyst:hover { background-color: ${M}1f; border-color: ${MG}; color: #fff; box-shadow: 0 0 0 1px ${MG}, 0 0 28px -4px ${M}; }
        .impact-cta-amethyst:focus-visible { outline: none; box-shadow: 0 0 0 2px ${MG}, 0 0 28px -4px ${M}; }
        .foresight-field:hover { border-color: ${MG} !important; }
        .foresight-field:focus { border-color: ${M} !important; box-shadow: 0 0 0 2px ${M}40; }
      `}</style>

      <ImpactNav />

      {/* HERO — deep obsidian */}
      <section className="relative overflow-hidden bg-[#050505] pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 grid-bg opacity-50" />
          <div
            className="absolute left-1/2 top-0 h-[460px] w-[760px] -translate-x-1/2 rounded-full blur-3xl"
            style={{ background: `radial-gradient(ellipse at center, ${A}22, transparent 70%)` }}
          />
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div
              className="mb-6 inline-flex items-center gap-2 border px-3 py-1.5 font-mono text-[10px] tracking-[0.2em] text-zinc-200"
              style={{ borderColor: `${A}66` }}
            >
              <span className="h-1.5 w-1.5 rounded-full impact-blink" style={{ backgroundColor: AG, boxShadow: `0 0 8px ${AG}` }} />
              CORE LENS: ACTIVE
            </div>

            <p className="font-mono text-xs tracking-[0.32em]" style={{ color: A }}>
              [ SYSTEMIC RISK FORESIGHT CORE // DEPLOYED ]
            </p>
            <h1 className="mt-6 font-display glitch-reveal text-balance text-[46px] font-bold leading-[0.98] tracking-[-0.03em] text-white sm:text-[64px] sm:leading-[0.95] lg:text-[72px]">
              Stop guessing the future.{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${AG}, ${A})` }}>
                Forecast it.
              </span>
            </h1>

            <div className="mt-7 max-w-2xl space-y-4 text-[16.5px] leading-[1.6] text-zinc-400 sm:text-lg">
              <p>
                Legacy models struggle when the rules change. Standard AI is
                limited by backward-looking training data, while traditional
                surveys are distorted by social desirability bias and
                satisficing, when respondents rush to finish instead of
                answering thoughtfully.
              </p>
              <p>
                Phoebe helps ESG directors, policymakers, and risk managers
                filter out noise and map out real-world behavioral frictions. By
                combining adaptive AI weighting with human probabilistic
                judgment, it supports better decisions where social impact
                matters most.
              </p>
            </div>

            {/* Dual-vector hero CTA — full flex runway so both buttons sit side-by-side. */}
            <div className="mt-8 flex w-full max-w-2xl flex-col gap-4 sm:flex-row sm:items-start">
              {/* Pilot vector — enterprise access (cyan). */}
              <button
                type="button"
                onClick={openPilot}
                className="impact-cta inline-flex flex-1 items-center justify-center border border-transparent px-7 py-3.5 font-mono text-sm font-bold tracking-[0.12em] text-black"
                style={{ backgroundColor: A }}
              >
                REQUEST PRIVATE ENGINE ACCESS
              </button>

              {/* Forecaster vector — community intake (amethyst). */}
              <div className="flex flex-1 flex-col">
                <button
                  type="button"
                  onClick={openNetwork}
                  title="Great foresight cannot be built in isolation. Every perspective holds a critical piece of the structural puzzle. We fuse distributed human wisdom to filter out data noise and uncover systemic truth."
                  className="impact-cta-amethyst inline-flex w-full items-center justify-center border px-7 py-3.5 font-mono text-sm font-bold tracking-[0.12em]"
                  style={{ borderColor: M, color: MG }}
                >
                  BUILD THE GREATER WISDOM
                </button>
                <p className="mt-2 font-mono text-[11px] tracking-[0.16em]" style={{ color: MG }}>
                  [ YOUR INSIGHT IS PRICELESS ]
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden border border-zinc-800 bg-zinc-900/50"
            style={{ boxShadow: `0 0 0 1px ${A}22, 0 30px 80px -40px ${A}` }}
          >
            <span aria-hidden className="absolute inset-x-0 top-0 h-[2px]" style={{ backgroundColor: A }} />
            <span
              aria-hidden
              className="impact-scan pointer-events-none absolute inset-x-0 top-0 h-12 opacity-30"
              style={{ background: `linear-gradient(to bottom, transparent, ${A}55, transparent)` }}
            />
            <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2.5 font-mono text-[10px] tracking-[0.18em] text-zinc-500">
              <span style={{ color: AG }}>FORESIGHT_STREAM.live</span>
              <SystemClock />
            </div>
            <div className="space-y-3 p-4">
              <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.14em] text-zinc-500">
                <span>CONVICTION INDEX</span>
                <span style={{ color: AG }}>NOMINAL</span>
              </div>
              <IndicatorMatrix rows={4} cols={12} />
              <HexStream cols={26} />
              <div className="flex items-center justify-between pt-1 font-mono text-[10px] tracking-[0.14em] text-zinc-500">
                <span>SIGNAL / NOISE</span>
                <span style={{ color: AG }}>+18.4 dB</span>
              </div>
              <MemoryChart bars={40} />
              <HexStream cols={26} intervalMs={170} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FORWARD SCENARIOS SIMULATOR — lighter slate */}
      <section className="relative bg-[#16161E] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHead
            eyebrow="FORWARD SCENARIOS SIMULATOR"
            title="Three live foresight modules."
            sub="Each module continuously simulates the behavioral and structural variables that legacy models miss."
            right="03 MODULES ONLINE"
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {SCENARIOS.map((s, i) => (
              <Panel key={s.id} s={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* THE METHODOLOGICAL MOAT — deep obsidian */}
      <section className="relative bg-[#050505] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHead
            eyebrow="THE METHODOLOGICAL MOAT"
            title="Why Phoebe beats prediction markets, by design."
            sub="Markets ask the crowd binary questions. Phoebe asks how sure they are, and weights every voice by earned merit."
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {MOAT_CARDS.map((m, i) => (
              <Card key={m.n} className="h-full p-6">
                <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.16em]" style={{ color: AG }}>
                  <span>{m.n} — {m.eyebrow}</span>
                  <span className="h-1.5 w-1.5 rounded-full impact-blink" style={{ backgroundColor: A, boxShadow: `0 0 8px ${A}` }} />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold tracking-tight text-zinc-50">{m.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400">{m.body}</p>
                <div className="mt-5">
                  <IndicatorMatrix rows={2} cols={14} />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* DATA CONTRAST ENGINE — lighter slate */}
      <section className="relative bg-[#16161E] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHead eyebrow="DATA CONTRAST ENGINE" title="Backward-looking vs. forward-mapping." />
          <Card className="overflow-hidden">
            <div aria-hidden className="absolute inset-0 grid-bg opacity-40" />
            <div className="relative grid grid-cols-1 divide-y divide-zinc-800 md:grid-cols-2 md:divide-x md:divide-y-0">
              <div className="p-6 sm:p-8">
                <div className="font-mono text-[11px] tracking-[0.22em] text-zinc-500">// LEGACY METRICS</div>
                <p className="mt-4 text-sm leading-relaxed text-zinc-500">
                  Capturing surface-level data points of where the world was.
                  Vulnerable to survey fatigue, noise, and historic inertia
                  biases.
                </p>
                <div className="mt-5 opacity-50">
                  <HexStream cols={22} intervalMs={260} />
                </div>
              </div>
              <div className="relative p-6 sm:p-8">
                <span aria-hidden className="absolute inset-y-0 left-0 w-[2px]" style={{ backgroundColor: A }} />
                <div className="font-mono text-[11px] tracking-[0.22em]" style={{ color: AG }}>
                  // PHOEBE ARCHITECTURE
                </div>
                <p className="mt-4 text-sm leading-relaxed text-zinc-200">
                  Calibrating merit-weighted conviction thresholds to map
                  exactly where human behavior is going next.
                </p>
                <div className="mt-5">
                  <IndicatorMatrix rows={3} cols={16} />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* THE SCIENCE BEHIND PHOEBE — deep obsidian */}
      <section className="relative bg-[#050505] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHead
            eyebrow="THE SCIENCE BEHIND PHOEBE"
            title="The Neuro-Edge: cognitive AI architecture."
            sub="A human-in-the-loop design built on peer-reviewed cognitive science. Structured deliberation neutralises the bandwagon effect; merit-weighted aggregation compounds the signal of small, expert debates over noisy crowds."
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {PAPERS.map((p) => (
              <Card key={p.doi} className="h-full p-6 sm:p-7">
                <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.16em]" style={{ color: AG }}>
                  <span className="h-1 w-1 rounded-full" style={{ backgroundColor: A }} />
                  PEER-REVIEWED PAPER · {p.n}
                </div>
                <h3 className="mt-4 font-display text-lg font-bold leading-snug tracking-tight text-zinc-50">{p.title}</h3>
                <div className="mt-2 text-[12.5px] text-zinc-500">{p.venue}</div>
                <p className="mt-4 flex-1 font-mono text-[11.5px] leading-relaxed text-zinc-500">{p.citation}</p>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <Link
                    href={p.doi}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-zinc-700 px-4 py-2 font-mono text-[12px] tracking-[0.08em] text-zinc-200 transition-colors hover:border-[#00F0FF]/60 hover:text-[#5CF6FF]"
                  >
                    <Download size={14} /> DOWNLOAD PDF
                  </Link>
                  <Link
                    href={p.doi}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-[12px] text-zinc-500 transition-colors hover:text-white"
                  >
                    DOI <ExternalLink size={12} />
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-10">
            <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">// BACKED BY</div>
            <div className="flex flex-wrap items-center gap-4">
              {GRANTS.map((g) => (
                <div
                  key={g.alt}
                  title={g.alt}
                  className="relative h-[96px] w-[96px] overflow-hidden rounded-full border border-zinc-800"
                >
                  <Image src={g.src} alt={g.alt} width={244} height={244} className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* THE FOUNDERS' MOAT — lighter slate */}
      <section className="relative bg-[#16161E] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHead eyebrow="THE FOUNDERS' MOAT" title="Four disciplines. One forecasting engine." />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {FOUNDERS.map((f) => (
              <Card key={f.name} className="group h-full p-6 sm:p-7">
                <div className="flex items-start gap-5">
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden border border-[#00F0FF]/50 bg-black/40">
                    <Image
                      src={f.photo}
                      alt={f.name}
                      fill
                      sizes="96px"
                      className="object-cover object-center grayscale transition-[filter,transform] duration-500 ease-out group-hover:grayscale-0 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="truncate font-display text-[19px] font-semibold tracking-tight text-white">{f.name}</h3>
                        <div className="mt-0.5 truncate text-[12.5px] text-zinc-400">{f.role}</div>
                      </div>
                      <a
                        href={f.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${f.name} on LinkedIn`}
                        className="inline-flex h-8 w-8 shrink-0 items-center justify-center border border-zinc-800 text-zinc-400 transition-colors hover:border-[#00F0FF]/50 hover:text-[#5CF6FF]"
                      >
                        <LinkedInIcon size={14} />
                      </a>
                    </div>
                    <p className="mt-3 text-[14px] leading-[1.55] text-zinc-400">{f.bio}</p>
                  </div>
                </div>
                <div className="mt-5 inline-flex items-center gap-1.5 self-start border border-zinc-800 px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-zinc-400">
                  <span className="h-1 w-1 rounded-full" style={{ backgroundColor: A }} />
                  {f.tag}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SYSTEM ENGAGEMENT — deep obsidian */}
      <section className="relative bg-[#050505] py-20">
        <div className="mx-auto max-w-7xl px-5 text-center sm:px-8">
          <div className="font-mono text-[11px] tracking-[0.28em]" style={{ color: A }}>
            INITIALIZE FORESIGHT PROTOCOL // SELECT ACCESS VECTOR
          </div>
          <p className="mx-auto mt-4 max-w-xl text-sm text-zinc-500">
            Two ways in. Deploy a private enterprise pilot, or join the
            distributed network of forecasters that powers the signal.
          </p>

          {/* Dual-pillar CTA — mirrors the primary landing page's two-button split. */}
          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-4 text-left sm:grid-cols-2 sm:gap-5">
            {/* Pillar 1 — Enterprise access (cyan), wired to the pilot handler. */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="flex h-full flex-col"
            >
              <button
                type="button"
                onClick={openPilot}
                title="Deploy a private forecasting pilot scoped to your sector."
                className="impact-cta inline-flex w-full items-center justify-center px-7 py-3.5 font-mono text-sm font-bold tracking-[0.14em] text-black"
                style={{ backgroundColor: A }}
              >
                ENGAGE SIMULATOR CORE
              </button>
              <p className="mt-3 font-mono text-[11px] tracking-[0.16em]" style={{ color: AG }}>
                [ DEPLOY PRIVATE SECTOR PILOT ]
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-500">
                The enterprise access vector. Hand us a mandate and we return a
                merit-weighted forecast, scoped and confidential, for your
                organization.
              </p>
            </motion.div>

            {/* Pillar 2 — Collective wisdom (amethyst), wired to participant intake. */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="flex h-full flex-col"
            >
              <button
                type="button"
                onClick={openNetwork}
                title="Great foresight cannot be built in isolation. Every perspective holds a critical piece of the structural puzzle. We fuse distributed human wisdom to filter out data noise and uncover systemic truth."
                className="impact-cta-amethyst inline-flex w-full items-center justify-center border px-7 py-3.5 font-mono text-sm font-bold tracking-[0.14em]"
                style={{ borderColor: M, color: MG }}
              >
                BUILD THE GREATER WISDOM
              </button>
              <p className="mt-3 font-mono text-[11px] tracking-[0.16em]" style={{ color: MG }}>
                [ YOUR INSIGHT IS PRICELESS ]
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-500">
                Great foresight cannot be built in isolation. Every perspective
                holds a critical piece of the structural puzzle. We fuse
                distributed human wisdom to filter out data noise and uncover
                systemic truth.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
