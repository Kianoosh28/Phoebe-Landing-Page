import fs from "node:fs/promises";
import path from "node:path";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Phoebe × KPMG — VivaTech 2026 Flyer",
  description: "Double-sided square print preview for the VivaTech 2026 booth flyer.",
  robots: { index: false, follow: false },
};

const CYAN = "#00F0FF";
const AMETHYST = "#B88BFF";
const AMETHYST_DEEP = "#8A2BE2";

async function loadLogo(fill: string): Promise<string> {
  const svgPath = path.join(process.cwd(), "public", "logo.svg");
  const raw = await fs.readFile(svgPath, "utf8");
  return raw.replace(/#00F0FF/gi, fill);
}

function Tri({ color }: { color: string }) {
  return (
    <span
      aria-hidden
      className="inline-block shrink-0"
      style={{
        width: "9px",
        height: "9px",
        background: color,
        clipPath: "polygon(0 0, 100% 0, 0 100%)",
        marginTop: "0.55em",
      }}
    />
  );
}

function Pillar({
  title,
  body,
  accent,
}: {
  title: string;
  body: string;
  accent: string;
}) {
  return (
    <li className="flex gap-3">
      <Tri color={accent} />
      <div className="leading-snug">
        <span className="font-semibold tracking-tight" style={{ color: accent }}>
          {title}:
        </span>{" "}
        <span className="text-white/80">{body}</span>
      </div>
    </li>
  );
}

function ScenarioBox({
  title,
  body,
  accent,
}: {
  title: string;
  body: string;
  accent: string;
}) {
  return (
    <div
      className="flex flex-col border border-zinc-800 px-3 py-4"
      style={{ background: `${accent}0A` }}
    >
      <div
        className="text-center font-mono font-bold uppercase tracking-[0.06em] text-balance"
        style={{ color: accent, fontSize: "9.5pt", lineHeight: 1.25 }}
      >
        {title}
      </div>
      <p className="mt-3 text-white/75" style={{ fontSize: "10.5pt", lineHeight: 1.45 }}>
        {body}
      </p>
    </div>
  );
}

function QrFrame({ accent, label }: { accent: string; label: string }) {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{
        width: "26mm",
        height: "26mm",
        border: `1px solid ${accent}`,
      }}
    >
      <span
        aria-hidden
        className="absolute"
        style={{ top: -1, left: -1, width: 6, height: 6, borderTop: `2px solid ${accent}`, borderLeft: `2px solid ${accent}` }}
      />
      <span
        aria-hidden
        className="absolute"
        style={{ top: -1, right: -1, width: 6, height: 6, borderTop: `2px solid ${accent}`, borderRight: `2px solid ${accent}` }}
      />
      <span
        aria-hidden
        className="absolute"
        style={{ bottom: -1, left: -1, width: 6, height: 6, borderBottom: `2px solid ${accent}`, borderLeft: `2px solid ${accent}` }}
      />
      <span
        aria-hidden
        className="absolute"
        style={{ bottom: -1, right: -1, width: 6, height: 6, borderBottom: `2px solid ${accent}`, borderRight: `2px solid ${accent}` }}
      />
      <div className="flex flex-col items-center text-center" style={{ color: accent }}>
        <span className="font-mono text-[8pt] tracking-[0.2em] opacity-70">QR</span>
        <span className="font-mono text-[6pt] tracking-[0.15em] opacity-50 mt-1 px-1 break-all">
          {label}
        </span>
      </div>
    </div>
  );
}

function SideA({ logoSvg }: { logoSvg: string }) {
  return (
    <article
      className="flyer-card relative flex shrink-0 flex-col justify-between text-white"
      style={{
        width: "210mm",
        height: "210mm",
        background: "#050505",
        padding: "12mm",
        fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif",
        boxShadow: "0 30px 80px -40px rgba(0, 240, 255, 0.35), 0 0 0 1px rgba(255,255,255,0.04)",
      }}
    >
      {/* corner ticks */}
      <span aria-hidden className="absolute" style={{ top: "6mm", left: "6mm", width: 14, height: 14, borderTop: `1px solid ${CYAN}`, borderLeft: `1px solid ${CYAN}` }} />
      <span aria-hidden className="absolute" style={{ top: "6mm", right: "6mm", width: 14, height: 14, borderTop: `1px solid ${CYAN}`, borderRight: `1px solid ${CYAN}` }} />
      <span aria-hidden className="absolute" style={{ bottom: "6mm", left: "6mm", width: 14, height: 14, borderBottom: `1px solid ${CYAN}`, borderLeft: `1px solid ${CYAN}` }} />
      <span aria-hidden className="absolute" style={{ bottom: "6mm", right: "6mm", width: 14, height: 14, borderBottom: `1px solid ${CYAN}`, borderRight: `1px solid ${CYAN}` }} />

      {/* Logo + target audience box */}
      <div className="flex items-center justify-between gap-4">
        <div
          className="flex items-center"
          style={{ height: "11mm" }}
          dangerouslySetInnerHTML={{
            __html: logoSvg.replace(
              "<svg ",
              `<svg style="height:11mm;width:auto;display:block" `
            ),
          }}
        />
        <div
          className="inline-flex px-2 py-1 font-mono uppercase text-[7.5pt] tracking-[0.22em]"
          style={{ border: `1px solid ${CYAN}`, color: CYAN }}
        >
          CORE USER BASE // ESG DIRECTORS, POLICYMAKERS, AGENCIES, AND RISK MANAGERS
        </div>
      </div>

      {/* Headline + intro — one section */}
      <div>
        <h1 className="font-display" style={{ maxWidth: "160mm" }}>
          <span
            className="block font-mono"
            style={{
              fontSize: "19pt",
              fontWeight: 500,
              letterSpacing: "-0.01em",
              lineHeight: 1.1,
              color: "#FFFFFF",
            }}
          >
            Stop Guessing the Future.
          </span>
          <span
            className="block"
            style={{
              fontFamily: "var(--font-schibsted), var(--font-geist-sans), system-ui, sans-serif",
              fontSize: "34pt",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.0,
              color: CYAN,
            }}
          >
            Forecast It.
          </span>
        </h1>

        <p
          className="mt-4 text-white/75"
          style={{ fontSize: "10.5pt", lineHeight: 1.45, maxWidth: "120mm" }}
        >
          Surface-level metrics only show you where the world was. Phoebe shows
          you where it is going. Our Collective Intelligence + AI-Powered Engine
          maps out the hidden human friction, supply chain bottlenecks, and
          behavioral compliance risks of systemic policy shifts months before
          they unfold.
        </p>
      </div>

      {/* Scenario panels — 3 side-by-side brutalist boxes */}
      <div className="grid grid-cols-3 gap-4">
        <ScenarioBox
          accent={CYAN}
          title="Public Policy & Mobility"
          body="Simulating actual commuter compliance thresholds, retail economic impacts, and public pushback on urban mobility restrictions."
        />
        <ScenarioBox
          accent={CYAN}
          title="Health & Infrastructure"
          body="Quantifying capacity shortfalls, hidden psychological friction, and artisan supply-chain bottlenecks in social housing programs."
        />
        <ScenarioBox
          accent={CYAN}
          title="Climate & Resource Risk"
          body="Forecasting agrarian land-use shifts, supply-chain constraints, and legal/civil escalation risks over regional environmental resource caps."
        />
      </div>

      {/* CTA — dual-column partner enclosure */}
      <div
        className="flex flex-col"
        style={{ border: `1px solid ${CYAN}`, padding: "5mm", height: "60mm" }}
      >
        {/* Inner top center text */}
        <div
          className="text-center uppercase font-mono"
          style={{ color: "#FFFFFF", fontSize: "9pt", letterSpacing: "0.24em", fontWeight: 600 }}
        >
          Meet Our Founders at:
        </div>

        {/* Remaining space split into two equal halves by a vertical divider */}
        <div className="flex flex-1" style={{ marginTop: "4mm" }}>
          {/* Left half — VivaTech */}
          <div className="flex flex-1 items-center justify-center" style={{ padding: "0 4mm" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/vivatech-logo.svg?v=6"
              alt="VivaTech"
              style={{ width: "56mm", maxWidth: "100%", height: "auto" }}
            />
          </div>

          {/* Vertical divider — splits the remaining space into two equal halves */}
          <div aria-hidden style={{ width: "1px", alignSelf: "stretch", background: CYAN }} />

          {/* Right half — KPMG */}
          <div className="flex flex-1 items-center justify-center" style={{ padding: "0 4mm" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/kpmg-logo.svg?v=5"
              alt="KPMG"
              style={{ width: "56mm", maxWidth: "100%", height: "auto" }}
            />
          </div>
        </div>

        {/* Web destination */}
        <div
          className="text-center font-mono lowercase"
          style={{ color: CYAN, fontSize: "8pt", letterSpacing: "0.15em", marginTop: "3mm" }}
        >
          impact.phoebeapp.io
        </div>
      </div>

    </article>
  );
}

function SideB({ logoSvg }: { logoSvg: string }) {
  return (
    <article
      className="flyer-card relative flex shrink-0 flex-col text-white"
      style={{
        width: "210mm",
        height: "210mm",
        background: "#0D0D11",
        padding: "12mm",
        fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif",
        boxShadow: "0 30px 80px -40px rgba(184, 139, 255, 0.35), 0 0 0 1px rgba(255,255,255,0.04)",
      }}
    >
      {/* corner ticks */}
      <span aria-hidden className="absolute" style={{ top: "6mm", left: "6mm", width: 14, height: 14, borderTop: `1px solid ${AMETHYST}`, borderLeft: `1px solid ${AMETHYST}` }} />
      <span aria-hidden className="absolute" style={{ top: "6mm", right: "6mm", width: 14, height: 14, borderTop: `1px solid ${AMETHYST}`, borderRight: `1px solid ${AMETHYST}` }} />
      <span aria-hidden className="absolute" style={{ bottom: "6mm", left: "6mm", width: 14, height: 14, borderBottom: `1px solid ${AMETHYST}`, borderLeft: `1px solid ${AMETHYST}` }} />
      <span aria-hidden className="absolute" style={{ bottom: "6mm", right: "6mm", width: 14, height: 14, borderBottom: `1px solid ${AMETHYST}`, borderRight: `1px solid ${AMETHYST}` }} />

      {/* Logo */}
      <div className="flex items-center justify-between">
        <div
          className="flex items-center"
          style={{ height: "11mm" }}
          dangerouslySetInnerHTML={{
            __html: logoSvg.replace(
              "<svg ",
              `<svg style="height:11mm;width:auto;display:block" `
            ),
          }}
        />
        <span
          className="font-mono text-[7pt] tracking-[0.25em]"
          style={{ color: AMETHYST }}
        >
          SIDE B · COMMUNITY
        </span>
      </div>

      {/* Tag */}
      <div
        className="mt-6 inline-flex self-start px-2 py-1 font-mono text-[7.5pt] tracking-[0.22em]"
        style={{ border: `1px solid ${AMETHYST}`, color: AMETHYST }}
      >
        JOIN THE WISDOM NETWORK
      </div>

      {/* Headline */}
      <h1
        className="mt-5 font-display text-balance"
        style={{
          fontFamily: "var(--font-schibsted), var(--font-geist-sans), system-ui, sans-serif",
          fontSize: "30pt",
          lineHeight: 1.03,
          letterSpacing: "-0.03em",
          fontWeight: 800,
          maxWidth: "160mm",
        }}
      >
        Your Perspective is the Missing Signal.{" "}
        <span style={{ color: AMETHYST }}>Every Voice Forms the Truth.</span>
      </h1>

      {/* Body */}
      <p
        className="mt-4 text-white/75"
        style={{ fontSize: "9pt", lineHeight: 1.45, maxWidth: "120mm" }}
      >
        In traditional consensus tracking, outlier data is discarded. At
        Phoebe, we know better. Whether your predictions are perfectly accurate
        or wildly unconventional, your cognitive footprint is essential to
        mapping macro-reality. We don&rsquo;t look for an individual genius; we
        synthesize the constructive friction of human crowds to unlock
        undeniable truths.
      </p>

      {/* Pillars container */}
      <div
        className="mt-5 p-3"
        style={{ border: `1px solid ${AMETHYST}`, maxWidth: "160mm" }}
      >
        <ul className="space-y-2.5" style={{ fontSize: "8.75pt" }}>
          <Pillar
            accent={AMETHYST}
            title="Share Your Wisdom"
            body="Deliberate on real-world questions tracking climate, tech transition, and social impact."
          />
          <Pillar
            accent={AMETHYST}
            title="Claim Your Equity"
            body="Early community members become founding pillars of our decentralized ecosystem."
          />
          <Pillar
            accent={AMETHYST}
            title="Unlock 2,000 $PHOB"
            body="Join the early-access waitlist directly from the floor."
          />
        </ul>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Voucher box */}
      <div
        className="mt-4 flex items-center justify-between p-3"
        style={{
          border: `1px solid ${AMETHYST}`,
          background: `linear-gradient(180deg, rgba(184,139,255,0.06), rgba(184,139,255,0.02))`,
        }}
      >
        <div>
          <div
            className="font-mono text-[7pt] tracking-[0.25em] mb-1"
            style={{ color: AMETHYST }}
          >
            VOUCHER CODE
          </div>
          <div
            className="font-mono"
            style={{
              fontSize: "14pt",
              letterSpacing: "0.08em",
              color: "#FFFFFF",
              textShadow: `0 0 12px ${AMETHYST_DEEP}55`,
            }}
          >
            VIVATECH-2026-PHOB
          </div>
          <div
            className="mt-1 text-white/55"
            style={{ fontSize: "7.5pt", lineHeight: 1.3 }}
          >
            Redeemable for 2,000 $PHOB on the early-access waitlist.
          </div>
        </div>
      </div>

      {/* CTA row */}
      <div
        className="mt-3 flex items-center gap-4 p-3"
        style={{ border: `1px solid ${AMETHYST}` }}
      >
        <QrFrame accent={AMETHYST} label="phoebeapp.io" />
        <div className="flex-1">
          <div
            className="font-mono text-[7pt] tracking-[0.22em] mb-1"
            style={{ color: AMETHYST }}
          >
            JOIN THE WAITLIST
          </div>
          <p
            className="text-white/85"
            style={{ fontSize: "8.5pt", lineHeight: 1.35 }}
          >
            Scan to claim your spot in the Wisdom Network and apply your
            voucher code.
          </p>
          <div
            className="mt-2 font-mono text-[6.5pt] tracking-[0.2em] text-white/40"
          >
            phoebeapp.io
          </div>
        </div>
      </div>

      {/* Footer microcopy */}
      <div
        className="mt-3 flex items-center justify-between font-mono text-[6pt] tracking-[0.25em] text-white/35"
      >
        <span>PHOEBE · WISDOM NETWORK</span>
        <span>EU · 2026</span>
      </div>
    </article>
  );
}

const PRINT_CSS = `
@page {
  size: 210mm 210mm;
  margin: 0;
}

@media print {
  html, body {
    background: #ffffff !important;
    margin: 0 !important;
    padding: 0 !important;
  }
  body * {
    visibility: hidden !important;
  }
  #flyer-print-root, #flyer-print-root * {
    visibility: visible !important;
  }
  #flyer-print-root {
    position: absolute !important;
    inset: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
    background: transparent !important;
    display: block !important;
  }
  .flyer-screen-chrome {
    display: none !important;
  }
  .flyer-stage {
    display: block !important;
    margin: 0 !important;
    padding: 0 !important;
    gap: 0 !important;
    background: transparent !important;
  }
  .flyer-card {
    width: 210mm !important;
    height: 210mm !important;
    margin: 0 !important;
    box-shadow: none !important;
    border-radius: 0 !important;
    page-break-after: always;
    break-after: page;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    color-adjust: exact !important;
    overflow: hidden !important;
  }
  .flyer-card:last-child {
    page-break-after: auto;
    break-after: auto;
  }
}
`;

export default async function FlyerPreviewPage() {
  const [logoCyan, logoAmethyst] = await Promise.all([
    loadLogo(CYAN),
    loadLogo(AMETHYST),
  ]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: PRINT_CSS }} />
      <div id="flyer-print-root" className="min-h-screen bg-[#050505] py-10">
        <header className="flyer-screen-chrome mx-auto mb-8 flex max-w-[1700px] items-end justify-between px-6">
          <div>
            <div className="font-mono text-[10px] tracking-[0.3em] text-cyan/80">
              PHOEBE × KPMG · VIVATECH 2026
            </div>
            <h2 className="mt-1 font-display text-2xl font-semibold tracking-tight text-white">
              Square flyer — print preview
            </h2>
            <p className="mt-1 text-sm text-white/55">
              Side A (Enterprise / Cyan) · Side B (Community / Amethyst). Use{" "}
              <kbd className="rounded border border-white/15 px-1.5 py-0.5 text-[10px]">
                Ctrl
              </kbd>{" "}
              +{" "}
              <kbd className="rounded border border-white/15 px-1.5 py-0.5 text-[10px]">
                P
              </kbd>{" "}
              to print square (210 × 210 mm).
            </p>
          </div>
          <button
            type="button"
            id="print-flyer-btn"
            className="rounded-none border border-cyan px-4 py-2 font-mono text-[11px] tracking-[0.25em] text-cyan transition-colors hover:bg-cyan hover:text-obsidian"
          >
            PRINT FLYER
          </button>
          <script
            dangerouslySetInnerHTML={{
              __html:
                "document.getElementById('print-flyer-btn')?.addEventListener('click',function(){window.print()});",
            }}
          />
        </header>

        <div className="flyer-stage mx-auto flex max-w-[1700px] flex-col items-center justify-center gap-10 px-6 lg:flex-row lg:items-start lg:gap-8">
          <SideA logoSvg={logoCyan} />
          <SideB logoSvg={logoAmethyst} />
        </div>

        <footer className="flyer-screen-chrome mx-auto mt-10 max-w-[1700px] px-6 text-center font-mono text-[10px] tracking-[0.3em] text-white/30">
          SQUARE · 210 × 210 MM · DOUBLE-SIDED
        </footer>
      </div>
    </>
  );
}
