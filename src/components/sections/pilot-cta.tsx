"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/dynamic/magnetic";
import { Reveal } from "@/components/dynamic/reveal";
import { usePilotModal } from "@/components/pilot-modal";

export function PilotCTA() {
  const { open: openPilot } = usePilotModal();
  return (
    <section id="pilot" className="relative bg-[#0D0D11]/85 py-12 sm:py-16 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[560px] w-[1100px] rounded-full bg-cyan/8 blur-3xl" />
        <div className="absolute inset-0 grid-bg opacity-40" />
      </div>

      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <Reveal className="relative rounded-3xl border border-line-strong bg-gradient-to-b from-obsidian-100 to-obsidian-50 p-10 sm:p-16 text-center running-border">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-cyan mb-7">
            <span className="h-1 w-1 rounded-full bg-cyan" />
            For Studios, Publishers & Platforms
          </div>

          <h2 className="font-display glitch-reveal text-4xl sm:text-5xl lg:text-[60px] font-semibold tracking-[-0.025em] leading-[1.02] text-white max-w-3xl mx-auto text-balance">
            Run a pilot on your next launch.
          </h2>
          <p className="mt-5 text-[16.5px] leading-[1.55] text-mute-2 max-w-2xl mx-auto text-balance">
            Hand us a release. We hand you back a probabilistic forecast,
            argument graph, and confidence interval — typically within four
            weeks, with no engineering lift on your side.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
            <Magnetic>
              <Button variant="primary" size="lg" onClick={openPilot}>
                Request a Pilot
                <ArrowRight size={16} />
              </Button>
            </Magnetic>
            <Magnetic>
              <Link href="/science">
                <Button variant="outline" size="lg">
                  Read the Science
                </Button>
              </Link>
            </Magnetic>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[12px] text-mute font-mono uppercase tracking-[0.14em]">
            <span>· No assets required ·</span>
            <span>· 4-week turnaround ·</span>
            <span>· NDA on request ·</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
