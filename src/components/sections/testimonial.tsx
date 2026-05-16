"use client";

import Image from "next/image";
import { motion } from "motion/react";

export function Testimonial() {
  return (
    <section className="relative py-12 sm:py-20 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[1100px] rounded-full bg-gradient-radial from-cyan/8 via-transparent to-transparent blur-3xl" />
      </div>

      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl border border-line bg-gradient-to-b from-white/[0.03] to-transparent p-8 sm:p-14 running-border"
        >
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-mute-2 mb-8">
              <span className="h-1 w-1 rounded-full bg-cyan" />
              Validated by Amazon Games
            </div>

            <span
              aria-hidden
              className="block font-display text-[88px] sm:text-[120px] leading-[0.5] text-cyan/30 select-none pointer-events-none pl-1"
            >
              &ldquo;
            </span>

            <blockquote className="mt-4 font-display text-[22px] sm:text-[30px] lg:text-[34px] leading-[1.3] font-medium text-balance text-white tracking-[-0.015em]">
              We used Phoebe for one of our titles. The process was{" "}
              <span className="text-cyan">very easy and low friction</span>
              {" "}on our side, as we did not have to produce any specific
              asset. Phoebe&rsquo;s prediction was spot on —{" "}
              <span className="text-white underline decoration-cyan/50 decoration-2 underline-offset-4">
                1% error margin after 120 press reviews
              </span>
              . This was{" "}
              <span className="text-amethyst-soft">way more accurate</span>
              {" "}than the mock-up reviews we did with our traditional
              vendors.
            </blockquote>

            <span
              aria-hidden
              className="block font-display text-[88px] sm:text-[120px] leading-[0.5] text-cyan/30 select-none pointer-events-none text-right pr-1 mt-8"
            >
              &rdquo;
            </span>

            <div className="mt-9 flex items-center gap-4">
              <div className="relative h-12 w-12 overflow-hidden rounded-full border border-cyan/40 bg-black/40">
                <Image
                  src="/Greg.jpg"
                  alt="Greg Gobbi"
                  fill
                  sizes="48px"
                  className="object-cover object-center"
                />
              </div>
              <div>
                <div className="text-white font-medium">Greg Gobbi</div>
                <div className="text-[13px] text-mute-2">
                  Chief Creative Officer & Head of Development · Amazon Games
                </div>
              </div>
            </div>

            <div className="hairline mt-10" />

            <div className="grid grid-cols-3 gap-5 sm:gap-8 mt-8">
              {[
                { v: "1%", l: "error margin" },
                { v: "120", l: "press reviews benchmarked" },
                { v: "0", l: "assets required from team" },
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
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
