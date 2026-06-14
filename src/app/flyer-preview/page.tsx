import fs from "node:fs/promises";
import path from "node:path";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Phoebe × KPMG — VivaTech 2026 Flyer",
  description: "Double-sided A5 print preview for the VivaTech 2026 booth flyer.",
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

function RiskBox({ label, body }: { label: string; body: string }) {
  return (
    <div
      className="px-3 py-2.5"
      style={{ border: `1px solid ${CYAN}` }}
    >
      <span
        className="font-mono tracking-[0.18em]"
        style={{ color: CYAN, fontSize: "7.5pt" }}
      >
        {label}
      </span>
      <span
        className="font-mono tracking-[0.18em]"
        style={{ color: CYAN, fontSize: "7.5pt" }}
      >
        {" "}
        //
      </span>{" "}
      <span className="text-white/70" style={{ fontSize: "8pt", lineHeight: 1.4 }}>
        {body}
      </span>
    </div>
  );
}

function SideA({ logoSvg }: { logoSvg: string }) {
  return (
    <article
      className="flyer-card relative flex flex-col text-white"
      style={{
        width: "148mm",
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

      {/* Logo — top center with generous dark negative space */}
      <div className="flex justify-center" style={{ paddingTop: "6mm", paddingBottom: "9mm" }}>
        <div
          aria-label="Phoebe"
          dangerouslySetInnerHTML={{
            __html: logoSvg.replace(
              "<svg ",
              `<svg style="height:13mm;width:auto;display:block" `
            ),
          }}
        />
      </div>

      {/* Header tag */}
      <div
        className="font-mono uppercase tracking-[0.32em]"
        style={{ color: CYAN, fontSize: "7pt" }}
      >
        KPMG PARIS PAVILION // VIVATECH 2026
      </div>

      {/* Massive headline — bold, stark white */}
      <h1
        className="mt-3 font-display text-balance"
        style={{
          fontFamily: "var(--font-schibsted), var(--font-geist-sans), system-ui, sans-serif",
          fontSize: "26pt",
          lineHeight: 1.02,
          letterSpacing: "-0.03em",
          fontWeight: 800,
          color: "#FFFFFF",
        }}
      >
        Stop Guessing the Future of ESG. Forecast It.
      </h1>

      {/* Platform core description */}
      <p
        className="mt-4 text-white/75"
        style={{ fontSize: "8.5pt", lineHeight: 1.5 }}
      >
        Surface-level metrics only show you where the world was. Phoebe shows
        you where it is going. Featured with KPMG at VivaTech 2026, our
        Sovereign Intelligence Engine maps out the hidden human friction,
        supply chain bottlenecks, and behavioral compliance risks of systemic
        policy shifts months before they unfold.
      </p>

      {/* Verticals risk boxes — thin 1px brutalist cyan borders */}
      <div className="mt-5 space-y-2.5">
        <RiskBox
          label="PUBLIC POLICY & MOBILITY"
          body="Simulating actual commuter compliance thresholds, retail economic impacts, and public pushback on urban mobility restrictions."
        />
        <RiskBox
          label="HEALTH & INFRASTRUCTURE"
          body="Quantifying capacity shortfalls, hidden psychological friction, and artisan supply-chain bottlenecks in social housing programs."
        />
        <RiskBox
          label="CLIMATE & RESOURCE RISK"
          body="Forecasting agrarian land-use shifts, supply-chain constraints, and legal/civil escalation risks over regional environmental resource caps."
        />
      </div>

      {/* Spacer pushes the anchor block to the lower third */}
      <div className="flex-1" />

      {/* Bottom anchor divider — razor-thin 1px cyan line */}
      <div style={{ height: "1px", background: CYAN, width: "100%" }} />

      {/* Call to action */}
      <div className="mt-4">
        <p
          className="font-semibold"
          style={{ color: "#FFFFFF", fontSize: "12pt", lineHeight: 1.2, letterSpacing: "-0.01em" }}
        >
          De-Risk Strategic Policy. Deploy a Private Pilot.
        </p>
        <p
          className="mt-2 text-white/80"
          style={{ fontSize: "8.5pt", lineHeight: 1.4 }}
        >
          Meet our founders live at{" "}
          <span style={{ color: CYAN }}>VivaTech</span> //{" "}
          <span style={{ color: CYAN }}>KPMG Pavilion: Hall 7 — Booth 3D09</span>
        </p>
      </div>

      {/* Partner logos — minimal co-branding stamps */}
      <div className="mt-6 flex items-center gap-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/kpmg-logo.png"
          alt="KPMG"
          style={{ height: "24px", width: "auto", opacity: 0.55 }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/vivatech-logo.svg"
          alt="VivaTech"
          style={{
            height: "24px",
            width: "auto",
            opacity: 0.55,
            filter: "brightness(0) invert(1)",
          }}
        />
      </div>
    </article>
  );
}

function SideB({ logoSvg }: { logoSvg: string }) {
  return (
    <article
      className="flyer-card relative flex flex-col text-white"
      style={{
        width: "148mm",
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
          fontSize: "22pt",
          lineHeight: 1.05,
          letterSpacing: "-0.025em",
          fontWeight: 800,
        }}
      >
        Your Perspective is the Missing Signal.{" "}
        <span style={{ color: AMETHYST }}>Every Voice Forms the Truth.</span>
      </h1>

      {/* Body */}
      <p
        className="mt-4 text-white/75"
        style={{ fontSize: "9pt", lineHeight: 1.45 }}
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
        style={{ border: `1px solid ${AMETHYST}` }}
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
  size: A5;
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
    width: 148mm !important;
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
        <header className="flyer-screen-chrome mx-auto mb-8 flex max-w-[1180px] items-end justify-between px-6">
          <div>
            <div className="font-mono text-[10px] tracking-[0.3em] text-cyan/80">
              PHOEBE × KPMG · VIVATECH 2026
            </div>
            <h2 className="mt-1 font-display text-2xl font-semibold tracking-tight text-white">
              A5 flyer — print preview
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
              to print to A5 (148 × 210 mm).
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

        <div className="flyer-stage mx-auto flex max-w-[1180px] flex-col items-center justify-center gap-10 px-6 lg:flex-row lg:items-start lg:gap-8">
          <SideA logoSvg={logoCyan} />
          <SideB logoSvg={logoAmethyst} />
        </div>

        <footer className="flyer-screen-chrome mx-auto mt-10 max-w-[1180px] px-6 text-center font-mono text-[10px] tracking-[0.3em] text-white/30">
          A5 · 148 × 210 MM · DOUBLE-SIDED
        </footer>
      </div>
    </>
  );
}
