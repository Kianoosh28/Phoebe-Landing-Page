"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LiveForecast } from "@/components/live-forecast";
import { Magnetic } from "@/components/dynamic/magnetic";
import { usePilotModal } from "@/components/pilot-modal";

export function Hero() {
  const { open: openPilot } = usePilotModal();
  return (
    <section className="relative overflow-hidden pt-32 sm:pt-40 pb-12 sm:pb-16">
      {/* Backdrop */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[520px] w-[820px] rounded-full bg-gradient-to-b from-cyan/20 via-amethyst/10 to-transparent blur-3xl opacity-50" />
        <div className="absolute -bottom-40 left-1/4 h-[420px] w-[640px] rounded-full bg-amethyst/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-14 items-center min-w-0">
          {/* Left column */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-cyan/45 bg-cyan/10 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-cyan mb-6 shadow-[0_0_28px_-6px_rgba(0,240,255,0.65),inset_0_0_0_1px_rgba(0,240,255,0.08)]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_8px_2px_rgba(0,240,255,0.8)]" />
              For AA &amp; AAA Game Studios
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="font-display glitch-reveal text-balance text-[50px] leading-[0.98] sm:text-[68px] sm:leading-[0.95] lg:text-[82px] lg:leading-[0.93] font-bold tracking-[-0.03em] text-white"
            >
              Know Your Score.{" "}
              <span className="bg-gradient-to-br from-cyan via-cyan-soft to-amethyst bg-clip-text text-transparent">
                Secure Your Success.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-6 max-w-xl text-balance text-[16.5px] sm:text-[18px] leading-[1.55] text-mute-2"
            >
              Stop relying on gut feeling. Phoebe is a predictive intelligence
              engine that forecasts{" "}
              <span className="text-white">
                game ratings and commercial performance
              </span>{" "}
              months before launch — allowing you to pivot your strategy when
              it actually matters.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-9 flex flex-col sm:flex-row gap-3"
            >
              <Magnetic>
                <Button variant="primary" size="lg" onClick={openPilot}>
                  Request a Pilot
                  <ArrowRight size={16} />
                </Button>
              </Magnetic>
              <Magnetic>
                <Link href="#argument-graph">
                  <Button variant="outline" size="lg">
                    Inspect the Argument Graph
                  </Button>
                </Link>
              </Magnetic>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5 }}
              className="mt-12 max-w-xl"
            >
              <div className="rounded-xl border border-cyan/25 bg-gradient-to-r from-cyan/[0.07] via-cyan/[0.03] to-transparent p-5 flex items-start gap-5">
                <div className="shrink-0">
                  <div className="font-display text-3xl sm:text-[40px] text-white font-semibold tabular-nums leading-none">
                    1.3<span className="text-cyan">%</span>
                  </div>
                  <div className="text-[10.5px] uppercase tracking-[0.16em] text-cyan font-mono mt-2">
                    Proven Accuracy
                  </div>
                </div>
                <p className="text-[13.5px] leading-[1.5] text-mute-2 border-l border-line pl-5">
                  Our{" "}
                  <span className="text-white">Amazon Games pilot</span>{" "}
                  predicted a{" "}
                  <span className="text-white tabular-nums">
                    77 Metacritic score
                  </span>{" "}
                  with a{" "}
                  <span className="text-white tabular-nums">76 forecast</span>.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="min-w-0 w-full"
          >
            <div className="mb-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-mute font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_8px_2px_rgba(0,240,255,0.7)]" />
              <span>
                Real-time Dashboard Preview · Forecasting{" "}
                <span className="text-white">Lords of the Fallen II</span>
              </span>
            </div>
            <LiveForecast />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
