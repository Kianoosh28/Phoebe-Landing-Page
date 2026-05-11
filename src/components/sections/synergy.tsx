"use client";

import { motion } from "motion/react";
import { Users, Sliders, Sparkles, LineChart } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    n: "01",
    icon: Users,
    title: "Follow & Deliberate",
    body: "Users follow trusted analysts across social circles, surface their analyses, and discuss arguments in structured threads.",
  },
  {
    n: "02",
    icon: Sliders,
    title: "Predict with Certainty",
    body: "Forecasters submit probabilistic multi-guess predictions — never a Yes/No. Every claim is paired with a certainty score.",
  },
  {
    n: "03",
    icon: Sparkles,
    title: "AI Weighted Aggregation",
    body: "Phoebe's dynamic algorithm weights each input by historical accuracy, deliberation quality, and certainty calibration.",
  },
  {
    n: "04",
    icon: LineChart,
    title: "Studio Dashboard",
    body: "Aggregated forecasts, drill-down arguments, and confidence intervals — accessible in your team's Studio in real time.",
  },
];

export function Synergy() {
  return (
    <section className="relative py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-mute-2 mb-5">
            <span className="h-1 w-1 rounded-full bg-cyan" />
            Human-AI Synergy
          </div>
          <h2 className="font-display glitch-reveal text-4xl sm:text-5xl lg:text-[56px] font-semibold tracking-[-0.025em] leading-[1.02] text-white text-balance">
            Four steps from{" "}
            <span className="bg-gradient-to-br from-cyan-soft via-cyan to-amethyst bg-clip-text text-transparent">
              scattered intuition
            </span>{" "}
            to{" "}
            <span className="bg-gradient-to-br from-amethyst-soft via-amethyst to-cyan bg-clip-text text-transparent">
              converged forecast.
            </span>
          </h2>
        </div>

        <div className="relative mt-16">
          {/* Horizontal connecting line */}
          <div className="hidden lg:block absolute top-12 left-12 right-12 h-px bg-gradient-to-r from-transparent via-line-strong to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="relative group"
                >
                  <div className="rounded-2xl border border-line bg-gradient-to-b from-white/[0.03] to-transparent p-6 h-full hover:border-line-strong transition-colors">
                    <div className="flex items-center gap-4 mb-5">
                      <div className="relative">
                        <div
                          className={cn(
                            "h-12 w-12 rounded-xl bg-obsidian-200 border border-line flex items-center justify-center group-hover:border-cyan/40 transition-colors"
                          )}
                        >
                          <Icon size={20} className="text-cyan" />
                        </div>
                      </div>
                      <span className="font-mono text-[12px] text-mute tracking-widest">
                        STEP {s.n}
                      </span>
                    </div>
                    <h3 className="font-display text-[20px] font-semibold text-white tracking-[-0.015em] mb-2">
                      {s.title}
                    </h3>
                    <p className="text-[14.5px] leading-[1.55] text-mute-2">
                      {s.body}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
