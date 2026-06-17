"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ImpactPilotProvider, useImpactPilot } from "./impact-pilot";
import { Moat } from "@/components/sections/moat";
import { Science } from "@/components/sections/science";
import { Team } from "@/components/sections/team";

/* Amethyst technical palette — this subdomain's distinct flavor. */
const A = "#9966CC";
const AG = "#B692DB";

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

/* Deterministic seed so SSR and first client render match (no hydration drift). */
function seed(i: number) {
  return ((i * 1103515245 + 12345) >>> 8) % 256;
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

/* Running binary/hex diagnostic ticker. */
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

/* Live memory-footprint diagnostic bars. */
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
          style={{
            height: `${v}%`,
            backgroundColor: i === vals.length - 1 ? AG : `${A}99`,
          }}
        />
      ))}
    </div>
  );
}

/* Glowing indicator matrix block. */
function IndicatorMatrix({ rows = 4, cols = 9 }: { rows?: number; cols?: number }) {
  const cells = rows * cols;
  return (
    <div
      className="grid gap-[3px]"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))` }}
    >
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

/* Section eyebrow label with technical rule. */
function SectionLabel({ left, right }: { left: string; right?: string }) {
  return (
    <div className="mb-8 flex items-center gap-3 font-mono text-xs tracking-[0.26em] text-zinc-500">
      <span style={{ color: A }}>//</span> {left}
      <span className="h-px flex-1 bg-zinc-800" />
      {right && <span>{right}</span>}
    </div>
  );
}

function Panel({ s, index }: { s: (typeof SCENARIOS)[number]; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="relative flex flex-col overflow-hidden border border-zinc-800 bg-black/40"
    >
      {/* 2px amethyst top accent */}
      <span aria-hidden className="absolute inset-x-0 top-0 h-[2px]" style={{ backgroundColor: A }} />

      {/* Module header */}
      <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-3">
        <span className="font-mono text-[11px] tracking-[0.16em]" style={{ color: AG }}>
          [ {s.id} ]
        </span>
        <span className="h-1.5 w-1.5 rounded-full impact-blink" style={{ backgroundColor: A, boxShadow: `0 0 8px ${A}` }} />
      </div>

      {/* Radar / tracking variables */}
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

      {/* Core intel */}
      <div className="flex flex-1 flex-col px-5 pb-6 pt-5">
        <h3 className="font-display text-xl font-bold tracking-tight text-zinc-50">{s.title}</h3>
        <div className="mt-2 mb-3 font-mono text-[10px] tracking-[0.18em] text-zinc-600">// CORE INTEL</div>
        <p className="text-sm leading-relaxed text-zinc-400">{s.intel}</p>
      </div>
    </motion.article>
  );
}

export function ImpactDashboard() {
  return (
    <ImpactPilotProvider>
      <DashboardInner />
    </ImpactPilotProvider>
  );
}

function DashboardInner() {
  const { open: openPilot } = useImpactPilot();

  return (
    <div className="font-sans text-zinc-100">
      {/* Scoped technical animations */}
      <style>{`
        @keyframes impactBlink { 0%,100%{opacity:1} 50%{opacity:.35} }
        .impact-blink { animation: impactBlink 1.8s ease-in-out infinite; }
        @keyframes impactScan { 0%{transform:translateY(-100%)} 100%{transform:translateY(900%)} }
        .impact-scan { animation: impactScan 3.4s linear infinite; }
        .impact-cta { transition: box-shadow .2s ease, opacity .2s ease; }
        .impact-cta:hover { box-shadow: 0 0 0 1px ${AG}, 0 0 26px -4px ${A}; opacity: .95; }
      `}</style>

      {/* HERO INTEL BLOCK — deep obsidian */}
      <section className="relative overflow-hidden bg-[#050505] pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 grid-bg opacity-50" />
          <div
            className="absolute left-1/2 top-0 h-[460px] w-[760px] -translate-x-1/2 rounded-full blur-3xl"
            style={{ background: `radial-gradient(ellipse at center, ${A}26, transparent 70%)` }}
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
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(135deg, ${AG}, ${A})` }}
              >
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

            {/* Pilot CTA — opens the private engine access form */}
            <div className="mt-8">
              <button
                type="button"
                onClick={openPilot}
                className="impact-cta inline-flex items-center border border-transparent px-7 py-3.5 font-mono text-sm font-bold tracking-[0.12em] text-black"
                style={{ backgroundColor: A }}
              >
                REQUEST PRIVATE ENGINE ACCESS
              </button>
            </div>
          </motion.div>

          {/* Live diagnostic console */}
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
          <SectionLabel left="FORWARD SCENARIOS SIMULATOR" right="03 MODULES ONLINE" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {SCENARIOS.map((s, i) => (
              <Panel key={s.id} s={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* THE METHODOLOGICAL MOAT — reused from the main landing page */}
      <Moat />

      {/* DATA CONTRAST ENGINE — lighter slate */}
      <section className="relative bg-[#16161E] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionLabel left="DATA CONTRAST ENGINE" />
          <div className="relative overflow-hidden border border-zinc-800 bg-black/40">
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
          </div>
        </div>
      </section>

      {/* THE SCIENCE BEHIND PHOEBE — reused from the main landing page */}
      <Science />

      {/* THE FOUNDERS' MOAT — reused from the main landing page */}
      <Team />

      {/* SYSTEM ENGAGEMENT — deep obsidian */}
      <section className="relative bg-[#050505] py-20">
        <div className="mx-auto max-w-7xl px-5 text-center sm:px-8">
          <div className="font-mono text-[11px] tracking-[0.28em]" style={{ color: A }}>
            INITIALIZE PRIVATE ENTERPRISE PILOT // ENTER CREDENTIALS
          </div>
          <p className="mx-auto mt-4 max-w-xl text-sm text-zinc-500">
            Request access to the engine. Deploy a private forecasting pilot
            scoped to your sector.
          </p>
          <div className="mt-8">
            <button
              type="button"
              onClick={openPilot}
              className="impact-cta inline-flex items-center px-7 py-3.5 font-mono text-sm font-bold tracking-[0.14em] text-black"
              style={{ backgroundColor: A }}
            >
              ENGAGE SIMULATOR CORE
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
