"use client";

import Image from "next/image";
import { Reveal, RevealItem } from "@/components/dynamic/reveal";

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

type Founder = {
  photo: string;
  name: string;
  role: string;
  bio: string;
  tag: string;
  accent: "cyan" | "amethyst";
  linkedin: string;
};

const FOUNDERS: Founder[] = [
  {
    photo: "/Paran.jpg",
    name: "Paran Tanzifi",
    role: "Co-Founder & CEO",
    bio: "Visionary with a decade experience in IT and gaming startups. Owns Phoebe's business and marketing strategy.",
    tag: "Business · Marketing",
    accent: "cyan",
    linkedin: "https://linkedin.com/in/paran-tanzifi",
  },
  {
    photo: "/Kianoosh.jpg",
    name: "Kianoosh Kani",
    role: "Co-Founder & COO",
    bio: "Serial founder across tech and gaming. Drives Phoebe's operating system and product surface through rigorous design-thinking.",
    tag: "Design Thinking · Ops",
    accent: "amethyst",
    linkedin: "https://linkedin.com/in/kianoosh-kani",
  },
  {
    photo: "/Bahador.jpg",
    name: "Bahador Bahrami",
    role: "Co-Founder & CSO",
    bio: "Neuroscientist whose published work on crowd wisdom and structured deliberation underpins Phoebe's methodological moat.",
    tag: "Neuroscience · Deliberation",
    accent: "cyan",
    linkedin: "https://linkedin.com/in/bahador-bahrami",
  },
  {
    photo: "/Bernard.jpg",
    name: "Bernard Okwampah",
    role: "Co-Founder & CTO",
    bio: "AI engineer with deep cybersecurity expertise. Architects Phoebe's merit-weighting algorithms and the platform's trust layer.",
    tag: "AI · Cybersecurity",
    accent: "amethyst",
    linkedin: "https://linkedin.com/in/okwampahbernard",
  },
];

export function Team() {
  return (
    <section className="relative bg-[#16161E] py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-mute-2 mb-5">
            <span className="h-1 w-1 rounded-full bg-cyan" />
            The Founders&apos; Moat
          </div>
          <h2 className="font-display glitch-reveal text-4xl sm:text-5xl lg:text-[56px] font-semibold tracking-[-0.025em] leading-[1.02] text-white text-balance">
            Four disciplines.{" "}
            <span className="bg-gradient-to-br from-amethyst-soft via-amethyst to-cyan bg-clip-text text-transparent">
              One forecasting engine.
            </span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
          {FOUNDERS.map((f, i) => (
            <RevealItem
              key={f.name}
              index={i}
              className="group relative rounded-2xl border border-line bg-gradient-to-b from-white/[0.025] to-transparent p-6 sm:p-7 hover:border-line-strong transition-colors h-full flex flex-col"
            >
              <div className="flex items-start gap-5">
                <div className="relative shrink-0">
                  <div
                    className={`relative h-24 w-24 overflow-hidden rounded-2xl border bg-black/40 ${
                      f.accent === "cyan" ? "border-cyan/50" : "border-amethyst/50"
                    }`}
                  >
                    <Image
                      src={f.photo}
                      alt={f.name}
                      fill
                      sizes="96px"
                      className="object-cover object-center grayscale transition-[filter,transform] duration-500 ease-out group-hover:grayscale-0 group-hover:saturate-150 group-hover:contrast-110 group-hover:brightness-105 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div
                    className={`absolute -inset-1 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity pointer-events-none ${
                      f.accent === "cyan" ? "bg-cyan/40" : "bg-amethyst/40"
                    }`}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="font-display text-[19px] font-semibold text-white tracking-[-0.015em] truncate">
                        {f.name}
                      </h3>
                      <div className="text-[12.5px] text-mute-2 mt-0.5 truncate">
                        {f.role}
                      </div>
                    </div>
                    <a
                      href={f.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${f.name} on LinkedIn`}
                      className={`shrink-0 inline-flex h-8 w-8 items-center justify-center rounded-md border border-line bg-white/[0.03] text-mute-2 transition-colors ${
                        f.accent === "cyan"
                          ? "hover:text-cyan hover:border-cyan/50"
                          : "hover:text-amethyst hover:border-amethyst/50"
                      }`}
                    >
                      <LinkedInIcon size={14} />
                    </a>
                  </div>
                  <p className="mt-3 text-[14px] leading-[1.55] text-mute-2 text-balance min-h-[66px]">
                    {f.bio}
                  </p>
                </div>
              </div>

              <div className="mt-auto pt-5 flex items-center">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-[10.5px] font-mono uppercase tracking-[0.14em] text-mute-2">
                  <span
                    className={`h-1 w-1 rounded-full ${
                      f.accent === "cyan" ? "bg-cyan" : "bg-amethyst"
                    }`}
                  />
                  {f.tag}
                </div>
              </div>
            </RevealItem>
          ))}
        </div>
      </div>
    </section>
  );
}
