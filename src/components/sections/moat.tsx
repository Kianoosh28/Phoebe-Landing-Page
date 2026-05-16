"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { Reveal, RevealItem } from "@/components/dynamic/reveal";
import { cn } from "@/lib/utils";

export function Moat() {
  return (
    <section className="relative bg-[#050505]/85 py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-mute-2 mb-5">
            <span className="h-1 w-1 rounded-full bg-amethyst" />
            The Methodological Moat
          </div>
          <h2 className="font-display glitch-reveal text-4xl sm:text-5xl lg:text-[56px] font-semibold tracking-[-0.025em] leading-[1.02] text-white text-balance">
            Why Phoebe beats prediction markets,{" "}
            <span className="bg-gradient-to-br from-amethyst-soft via-amethyst to-cyan bg-clip-text text-transparent">
              by design.
            </span>
          </h2>
          <p className="mt-5 text-[16.5px] text-mute-2 max-w-2xl">
            Polymarket asks the crowd binary questions. Phoebe asks{" "}
            <span className="text-white">how sure</span> they are, and weights every voice by{" "}
            <span className="text-white">earned merit</span>.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <CertaintyCard index={0} />
          <MeritCard index={1} />
          <CirclesCard index={2} />
        </div>
      </div>
    </section>
  );
}

function MoatCard({
  eyebrow,
  title,
  body,
  children,
  className,
  index = 0,
}: {
  eyebrow: string;
  title: string;
  body: string;
  children: React.ReactNode;
  className?: string;
  index?: number;
}) {
  return (
    <RevealItem
      index={index}
      className={cn(
        "relative rounded-2xl border border-line bg-gradient-to-b from-white/[0.025] to-transparent overflow-hidden flex flex-col",
        className
      )}
    >
      <div className="p-6 sm:p-7 pb-3">
        <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-mute mb-3">
          {eyebrow}
        </div>
        <h3 className="font-display text-[22px] sm:text-[24px] font-semibold text-white tracking-[-0.02em] leading-[1.15] mb-2.5 text-balance whitespace-pre-line">
          {title}
        </h3>
        <p className="text-[14px] leading-[1.55] text-mute-2 text-balance">
          {body}
        </p>
      </div>
      <div className="mt-2 px-6 sm:px-7 pb-7 flex-1">{children}</div>
    </RevealItem>
  );
}

function CertaintyCard({ index = 0 }: { index?: number }) {
  const [value, setValue] = useState(78);
  const buckets = [
    { lo: 0, hi: 25, label: "Doubt" },
    { lo: 25, hi: 50, label: "Lean" },
    { lo: 50, hi: 75, label: "Confident" },
    { lo: 75, hi: 100, label: "Certain" },
  ];
  const active = buckets.findIndex((b) => value >= b.lo && value < b.hi + 0.01);

  return (
    <MoatCard
      index={index}
      eyebrow="01 — Certainty-Weighted Probability"
      title={'We don\'t ask "Yes or No." We ask "How sure are you?"'}
      body='Drag the slider. Every prediction is graded on conviction, not just direction — turning binary noise into calibrated signal.'
    >
      <div className="rounded-xl border border-line bg-obsidian-100 p-5">
        <div className="flex items-baseline justify-between mb-4">
          <span className="text-[12px] text-mute-2">Your certainty</span>
          <span className="font-display text-2xl text-white tabular-nums">
            {value}%
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="w-full h-1.5 appearance-none bg-white/[0.06] rounded-full outline-none accent-cyan
                     [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(0,240,255,0.18)]"
          style={{
            background: `linear-gradient(to right, var(--color-cyan) 0%, var(--color-cyan) ${value}%, rgba(255,255,255,0.06) ${value}%, rgba(255,255,255,0.06) 100%)`,
          }}
        />
        <div className="grid grid-cols-4 gap-1.5 mt-4">
          {buckets.map((b, i) => (
            <div
              key={b.label}
              className={cn(
                "text-center rounded-md py-1.5 text-[11px] border transition-all",
                i === active
                  ? "border-cyan/50 bg-cyan/10 text-white"
                  : "border-line text-mute"
              )}
            >
              {b.label}
            </div>
          ))}
        </div>
      </div>
    </MoatCard>
  );
}

function MeritCard({ index = 0 }: { index?: number }) {
  const users = [
    { name: "K. Imura", acc: 0.91, dom: "Critic", weight: 1.42 },
    { name: "M. Velasco", acc: 0.84, dom: "Analyst", weight: 1.21 },
    { name: "L. Park", acc: 0.62, dom: "Press", weight: 0.78 },
  ];
  return (
    <MoatCard
      index={index}
      eyebrow="02 — Merit-Weighted Aggregation"
      title={"Not all voices are equal.\nSuperforecasters compound."}
      body="Phoebe's AI weights predictions by your historical accuracy and the quality of your deliberation — so signal compounds, noise decays."
    >
      <div className="space-y-2.5">
        {users.map((u, i) => (
          <div
            key={u.name}
            className="rounded-xl border border-line bg-obsidian-100 p-3.5"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <div className="h-7 w-7 rounded-full bg-gradient-to-br from-cyan/30 to-amethyst/30 border border-line flex items-center justify-center text-[11px] font-mono text-white">
                  {u.name
                    .split(" ")
                    .map((p) => p[0])
                    .join("")}
                </div>
                <div>
                  <div className="text-[13px] text-white">{u.name}</div>
                  <div className="text-[10.5px] text-mute font-mono">
                    {u.dom} · accuracy {(u.acc * 100).toFixed(0)}%
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[11px] text-mute uppercase tracking-wider">
                  weight
                </div>
                <div className="font-mono text-[13px] text-cyan tabular-nums">
                  ×{u.weight.toFixed(2)}
                </div>
              </div>
            </div>
            <div className="h-1 rounded-full bg-white/[0.05] overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${u.acc * 100}%` }}
                transition={{ duration: 0.9, delay: 0.1 + i * 0.1 }}
                className="h-full bg-gradient-to-r from-cyan-deep to-cyan rounded-full"
              />
            </div>
          </div>
        ))}
      </div>
    </MoatCard>
  );
}

function CirclesCard({ index = 0 }: { index?: number }) {
  return (
    <MoatCard
      index={index}
      eyebrow="03 — Structured Deliberation"
      title="Blind circles eliminate the bandwagon effect."
      body="Forecasts cluster in semi-blind circles before peer exposure — Bahrami's neuroscience prevents groupthink from poisoning the signal."
    >
      <div className="relative h-[220px] rounded-xl border border-line bg-obsidian-100 overflow-hidden">
        <svg viewBox="0 0 360 220" className="absolute inset-0 w-full h-full">
          <defs>
            <radialGradient id="circle-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#8A2BE2" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#8A2BE2" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Outer circle */}
          <circle cx="180" cy="110" r="92" stroke="rgba(255,255,255,0.08)" fill="url(#circle-grad)" />
          <circle cx="180" cy="110" r="62" stroke="rgba(0,240,255,0.18)" fill="none" strokeDasharray="2 3" />
          <circle cx="180" cy="110" r="32" stroke="rgba(138,43,226,0.4)" fill="rgba(138,43,226,0.08)" />

          {/* Nodes — outer ring (blind) */}
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i / 8) * Math.PI * 2;
            const x = 180 + Math.cos(a) * 92;
            const y = 110 + Math.sin(a) * 92;
            return (
              <g key={i}>
                <circle cx={x} cy={y} r="3.5" fill="#00F0FF" opacity="0.55" />
              </g>
            );
          })}
          {/* Mid ring (semi-blind) */}
          {Array.from({ length: 6 }).map((_, i) => {
            const a = (i / 6) * Math.PI * 2 + 0.2;
            const x = 180 + Math.cos(a) * 62;
            const y = 110 + Math.sin(a) * 62;
            return <circle key={i} cx={x} cy={y} r="3" fill="#00F0FF" opacity="0.9" />;
          })}
          {/* Center cluster (consensus) */}
          <circle cx="180" cy="110" r="5" fill="#8A2BE2" />

          {/* Labels */}
          <text x="180" y="18" textAnchor="middle" className="fill-mute" style={{ fontSize: 10, letterSpacing: 1.5 }}>
            BLIND
          </text>
          <text x="180" y="60" textAnchor="middle" className="fill-mute-2" style={{ fontSize: 10, letterSpacing: 1.5 }}>
            SEMI-BLIND
          </text>
          <text x="180" y="115" textAnchor="middle" className="fill-white" style={{ fontSize: 10, letterSpacing: 1.5 }}>
            CONSENSUS
          </text>
        </svg>
      </div>
    </MoatCard>
  );
}
