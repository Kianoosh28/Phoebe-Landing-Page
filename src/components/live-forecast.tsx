"use client";

import { motion, AnimatePresence, useMotionValue, animate } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Argument = {
  id: number;
  author: string;
  weight: number; // 0..1
  polarity: "bull" | "bear";
  claim: string;
};

const ARGUMENTS: Argument[] = [
  { id: 1, author: "K. Imura · Critic", weight: 0.92, polarity: "bull", claim: "Combat loop tested 4× longer retention vs. genre avg." },
  { id: 2, author: "M. Velasco · Analyst", weight: 0.81, polarity: "bull", claim: "Pre-order velocity 2.1σ above prior franchise launch." },
  { id: 3, author: "L. Park · Press", weight: 0.66, polarity: "bear", claim: "Multiplayer netcode regressions in late preview build." },
  { id: 4, author: "Phoebe Crowd · n=412", weight: 0.74, polarity: "bull", claim: "Median certainty 0.79 on 'GOTY contender' framing." },
  { id: 5, author: "S. Ojo · Modeler", weight: 0.88, polarity: "bull", claim: "Sentiment-to-score regression: +6.2 vs. baseline." },
  { id: 6, author: "R. Chen · Critic", weight: 0.55, polarity: "bear", claim: "Pacing in act II flagged by 38% of test cohort." },
];

export function LiveForecast() {
  const score = useMotionValue(72);
  const [step, setStep] = useState(0);
  const [scoreNum, setScoreNum] = useState(72);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsub = score.on("change", (v) => setScoreNum(Number(v.toFixed(1))));
    return () => unsub();
  }, [score]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [step]);

  useEffect(() => {
    let mounted = true;
    const sequence = async () => {
      const targets = [78.4, 81.2, 79.6, 82.1, 84.8, 83.9];
      for (let i = 0; i < ARGUMENTS.length; i++) {
        if (!mounted) return;
        await new Promise((r) => setTimeout(r, 500));
        setStep(i + 1);
        animate(score, targets[i], { duration: 0.9, ease: "easeOut" });
      }
      await new Promise((r) => setTimeout(r, 1800));
      if (!mounted) return;
      setStep(0);
      animate(score, 72, { duration: 0.6 });
    };
    sequence();
    const loop = setInterval(sequence, 12000);
    return () => {
      mounted = false;
      clearInterval(loop);
    };
  }, [score]);

  return (
    <div className="relative w-full max-w-[560px] mx-auto min-w-0">
      <div className="relative rounded-2xl border border-line bg-gradient-to-b from-obsidian-100 to-obsidian-50 p-4 sm:p-6 overflow-hidden">
        {/* glow ring */}
        <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-cyan/10 blur-3xl" />

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 mb-5">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative shrink-0">
              <div className="h-2 w-2 rounded-full bg-cyan" />
              <div className="absolute inset-0 h-2 w-2 rounded-full bg-cyan animate-ping" />
            </div>
            <span className="text-[10.5px] sm:text-[11px] uppercase tracking-[0.16em] sm:tracking-[0.18em] text-mute-2 truncate">
              Live Forecast · AA · Q4 2026
            </span>
          </div>
          <span className="text-[11px] text-mute font-mono shrink-0">#PH-2031</span>
        </div>

        <div className="text-[12.5px] sm:text-[13px] text-mute-2 mb-1 text-balance">
          Lords of the Fallen II · Critic Aggregate Score (0–100)
        </div>

        {/* Score */}
        <div className="flex items-baseline flex-wrap gap-x-3 gap-y-1 mb-5">
          <span className="font-display text-[52px] sm:text-[64px] lg:text-[72px] leading-none font-semibold tabular-nums bg-gradient-to-br from-white to-cyan-soft bg-clip-text text-transparent">
            {scoreNum.toFixed(1)}
          </span>
          <span className="text-mute-2 text-sm">±1.3 margin</span>
        </div>

        {/* Bar */}
        <div className="relative h-1.5 rounded-full bg-white/[0.06] mb-6 overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-deep via-cyan to-amethyst rounded-full"
            animate={{ width: `${Math.min(100, scoreNum)}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
          <div
            className="absolute top-0 h-full w-px bg-white/40"
            style={{ left: "82%" }}
          />
          <div className="absolute -top-5 text-[10px] font-mono text-mute-2" style={{ left: "82%" }}>
            <span className="-translate-x-1/2 inline-block">consensus</span>
          </div>
        </div>

        {/* Aggregator */}
        <div className="relative">
          <div className="text-[10.5px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.18em] text-mute-2 mb-3">
            Atomic Arguments — weighted
          </div>
          <div
            ref={scrollRef}
            className="space-y-2 h-[244px] overflow-y-auto scrollbar-hide"
          >
            <AnimatePresence initial={false}>
              {ARGUMENTS.slice(0, step).map((a) => (
                <motion.div
                  key={a.id}
                  initial={{ opacity: 0, x: a.id % 2 === 0 ? 80 : -80, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative flex items-center gap-2 sm:gap-3 rounded-lg border border-line bg-white/[0.02] p-2.5 sm:p-3"
                >
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full shrink-0",
                      a.polarity === "bull" ? "bg-cyan" : "bg-bearish"
                    )}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2 min-w-0">
                      <span className="text-[10.5px] sm:text-[11px] font-mono text-mute-2 truncate min-w-0">
                        {a.author}
                      </span>
                      <span className="text-[10.5px] sm:text-[11px] font-mono text-white tabular-nums shrink-0">
                        w·{a.weight.toFixed(2)}
                      </span>
                    </div>
                    <div className="text-[12px] sm:text-[12.5px] text-white/85 leading-snug truncate">
                      {a.claim}
                    </div>
                  </div>
                  <div
                    className={cn(
                      "hidden sm:block h-full w-1 rounded-r shrink-0",
                      a.polarity === "bull" ? "bg-cyan/40" : "bg-bearish/40"
                    )}
                    style={{ height: 28 + a.weight * 18 }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
            <span className="text-[11px] text-mute-2 font-mono">
              {step}/{ARGUMENTS.length} arguments aggregated
            </span>
            <span className="text-[11px] text-cyan font-mono">
              {step === ARGUMENTS.length ? "converged" : step > 0 ? "aggregating…" : "idle"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
