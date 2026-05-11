import Link from "next/link";
import { Coins, Users, Shield, ArrowRight, ScrollText } from "lucide-react";
import { Button } from "@/components/ui/button";

const TOKEN_USES = [
  {
    title: "Stake to Forecast",
    body: "Forecasters stake $PHOB on their predictions. Confidence becomes economic skin.",
  },
  {
    title: "Earn for Accuracy",
    body: "Calibrated forecasters earn $PHOB from the merit-weighted distribution pool.",
  },
  {
    title: "Govern Circle Rules",
    body: "Token-holders vote on circle parameters, deliberation cadence, and weighting curves.",
  },
  {
    title: "Access Studio Tier",
    body: "Enterprise clients pay for Studio access in $PHOB — closing the value loop.",
  },
];

const CIRCLES = [
  {
    label: "Open Circle",
    members: "Anyone · public",
    desc: "Forecasters post predictions and arguments openly. Discoverability layer.",
    color: "cyan",
  },
  {
    label: "Semi-Blind Circle",
    members: "Invite · capped",
    desc: "Members commit predictions privately, then reveal in synchronised waves. Bandwagon-resistant.",
    color: "amethyst",
  },
  {
    label: "Blind Circle",
    members: "Curated experts",
    desc: "Forecasts never cross-revealed until resolution. Reserved for high-stakes enterprise pilots.",
    color: "cyan",
  },
];

const COMPLIANCE = [
  {
    title: "Not a prediction market",
    body: "Phoebe does not match counterparties on contingent payouts. There is no order book. We are a forecasting protocol, not a derivatives venue.",
  },
  {
    title: "Utility-first token design",
    body: "$PHOB is structured for staking, governance, and access — calibrated under MiCA-aligned utility-token guidance with EU counsel.",
  },
  {
    title: "KYC where required",
    body: "Studio tier and high-stakes circles enforce KYC. Public circles remain open-access for research participation.",
  },
  {
    title: "Data sovereignty by default",
    body: "Enterprise customer data is processed inside EU GDPR-compliant infrastructure with regional residency options.",
  },
];

export default function Ecosystem() {
  return (
    <div className="pt-32 pb-12">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Hero */}
        <div className="max-w-3xl mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-mute-2 mb-5">
            <Coins size={12} className="text-amethyst" />
            Ecosystem
          </div>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-[72px] font-semibold tracking-[-0.025em] leading-[0.98] text-white text-balance">
            <span className="bg-gradient-to-br from-amethyst-soft to-amethyst bg-clip-text text-transparent">
              $PHOB
            </span>{" "}
            powers the circles.{" "}
            <span className="text-mute-2">Circles power the engine.</span>
          </h1>
          <p className="mt-6 text-[17px] leading-[1.55] text-mute-2 text-balance max-w-2xl">
            The $PHOB token aligns forecasters, studios, and governors around a
            single objective: better-calibrated probabilistic truth, distributed
            and rewarded by merit.
          </p>
        </div>

        {/* $PHOB token */}
        <section className="mb-24">
          <div className="text-[11px] uppercase tracking-[0.18em] text-mute font-mono mb-5">
            $PHOB · The Utility Token
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {TOKEN_USES.map((u, i) => (
              <div
                key={u.title}
                className="relative rounded-2xl border border-line bg-gradient-to-b from-white/[0.025] to-transparent p-6 overflow-hidden"
              >
                <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-amethyst/15 blur-3xl" />
                <div className="relative">
                  <div className="font-mono text-[11px] text-amethyst tracking-widest mb-2">
                    USE 0{i + 1}
                  </div>
                  <h3 className="font-display text-[19px] font-semibold text-white tracking-[-0.015em] mb-2">
                    {u.title}
                  </h3>
                  <p className="text-[14px] leading-[1.55] text-mute-2">{u.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Social Circles */}
        <section className="mb-24">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-mute font-mono mb-5">
            <Users size={12} className="text-cyan" />
            Social Circles
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-semibold tracking-[-0.025em] leading-[1.05] text-white mb-4 text-balance">
            Deliberation topology — by design.
          </h2>
          <p className="text-[16px] text-mute-2 max-w-2xl mb-8 text-balance">
            Phoebe&apos;s circle structure is the social-layer expression of
            Bahrami&apos;s neuroscience: small, structured, semi-blind groups
            outperform large unstructured crowds.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CIRCLES.map((c) => (
              <div
                key={c.label}
                className="rounded-2xl border border-line bg-gradient-to-b from-white/[0.025] to-transparent p-6"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      c.color === "cyan" ? "bg-cyan" : "bg-amethyst"
                    }`}
                  />
                  <span className="text-[11px] uppercase tracking-[0.16em] font-mono text-mute-2">
                    {c.members}
                  </span>
                </div>
                <h3 className="font-display text-[20px] font-semibold text-white tracking-[-0.015em] mb-2">
                  {c.label}
                </h3>
                <p className="text-[14px] leading-[1.55] text-mute-2">{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Compliance */}
        <section id="compliance" className="mb-20">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-mute font-mono mb-5">
            <Shield size={12} className="text-cyan" />
            Legal & Compliance
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-semibold tracking-[-0.025em] leading-[1.05] text-white mb-8 text-balance">
            A protocol, not a casino.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {COMPLIANCE.map((c, i) => (
              <div
                key={c.title}
                className="rounded-2xl border border-line bg-gradient-to-b from-white/[0.025] to-transparent p-6"
              >
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="font-mono text-[11px] text-cyan tracking-widest">
                    0{i + 1}
                  </span>
                  <h3 className="font-display text-[18px] font-semibold text-white tracking-[-0.015em] leading-[1.2]">
                    {c.title}
                  </h3>
                </div>
                <p className="text-[14px] leading-[1.55] text-mute-2">{c.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer CTA */}
        <section
          id="legal"
          className="rounded-3xl border border-line-strong bg-gradient-to-b from-obsidian-100 to-obsidian-50 p-10 sm:p-14 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-mute-2 mb-6">
            <ScrollText size={12} className="text-amethyst" />
            For Legal & Counsel Teams
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[48px] font-semibold tracking-[-0.025em] text-white max-w-3xl mx-auto text-balance">
            Need the full token-mechanics paper?
          </h2>
          <p className="mt-4 text-[16px] text-mute-2 max-w-2xl mx-auto">
            We share an extended legal memo and economics whitepaper with
            qualified counsel on request.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="mailto:tech_admin@phoebeapp.io?subject=Phoebe%20Whitepaper%20Request">
              <Button variant="primary" size="lg">
                Request Whitepaper
                <ArrowRight size={16} />
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" size="lg">
                Back to Engine
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
