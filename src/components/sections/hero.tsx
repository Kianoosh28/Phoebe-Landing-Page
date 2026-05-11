"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LiveForecast } from "@/components/live-forecast";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 sm:pt-40 pb-12 sm:pb-16">
      {/* Backdrop */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[520px] w-[820px] rounded-full bg-gradient-to-b from-cyan/20 via-amethyst/10 to-transparent blur-3xl opacity-50" />
        <div className="absolute -bottom-40 left-1/4 h-[420px] w-[640px] rounded-full bg-amethyst/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-14 items-center">
          {/* Left column */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.02] px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-mute-2 mb-6"
            >
              <Sparkles size={12} className="text-cyan" />
              The Sovereign Intelligence Engine
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="font-display text-balance text-[42px] leading-[1.02] sm:text-[58px] sm:leading-[0.98] lg:text-[68px] font-semibold tracking-[-0.025em] text-white"
            >
              The end of binary bets.{" "}
              <span className="bg-gradient-to-br from-cyan via-cyan-soft to-amethyst bg-clip-text text-transparent">
                The rise of probabilistic truth.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-6 max-w-xl text-balance text-[16px] sm:text-[17.5px] leading-[1.55] text-mute-2"
            >
              Move beyond market noise. Phoebe combines neuroscientific deliberation
              with merit-weighted AI to generate forecasts with{" "}
              <span className="text-white">unmatched precision.</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-9 flex flex-col sm:flex-row gap-3"
            >
              <Link href="#pilot">
                <Button variant="primary" size="lg">
                  Request a Pilot
                  <ArrowRight size={16} />
                </Button>
              </Link>
              <Link href="#argument-graph">
                <Button variant="outline" size="lg">
                  Inspect the Argument Graph
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.5 }}
              className="mt-12 grid grid-cols-3 gap-5 max-w-md"
            >
              {[
                { v: "1.3%", l: "median error margin" },
                { v: "120+", l: "pro reviewers benchmarked" },
                { v: "0.94", l: "calibration score" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-2xl sm:text-3xl text-white font-semibold tabular-nums">
                    {s.v}
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.14em] text-mute mt-1">
                    {s.l}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <LiveForecast />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
