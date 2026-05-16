import Link from "next/link";
import { Coins, Users, Shield, ArrowRight, ScrollText, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, RevealItem } from "@/components/dynamic/reveal";

const MECHANICS = [
  {
    title: "Pay $PHOB to follow",
    body: "Users spend $PHOB to follow other forecasters. Following grants access to their predictions, arguments, analyses, and activity feed. Following is the only way a forecaster's signal enters your circle.",
  },
  {
    title: "Earn $PHOB through engagement",
    body: "Phoebe is the sole distributor of $PHOB. Tokens are awarded freely based on forecasting accuracy, calibration, deliberation quality, and activity. There is no buy-in — users never trade money for tokens.",
  },
  {
    title: "Your circle, your feed",
    body: "You see only the activity of people in your circle. There is no aggregated public price to anchor on, no leaderboard to chase. The bandwagon effect is removed by construction, not by policy.",
  },
  {
    title: "Engine-controlled supply",
    body: "Because Phoebe alone issues $PHOB, the protocol shapes which forecasters can be followed and at what cost — and that lever is how we maintain blind, semi-blind, and open deliberation conditions.",
  },
];

const CIRCLES = [
  {
    label: "Open Circle",
    members: "Public · low cost",
    desc: "Members see each other's predictions, arguments, and reactions in real time. High discoverability for newcomers, broad consensus signal — but lower deliberation isolation.",
    color: "cyan",
  },
  {
    label: "Semi-Blind Circle",
    members: "Curated · scheduled reveal",
    desc: "Members commit predictions privately, then Phoebe releases them in synchronized reveal windows. Peer signal arrives at the reveal phase — bandwagon-resistant by design.",
    color: "amethyst",
  },
  {
    label: "Blind Circle",
    members: "Closed cohort · post-resolution",
    desc: "Members never see each other's predictions until the question resolves. Pure independent signal, aggregated by merit. Reserved for the highest-stakes enterprise pilots.",
    color: "cyan",
  },
];

const NOT_GAMBLING = [
  {
    title: "No buy-in",
    body: "Users never trade their own money for $PHOB. The token is distributed exclusively by Phoebe based on engagement and performance — there is no exchange listing where outsiders can buy in.",
  },
  {
    title: "No contingent payouts",
    body: "Outcomes do not transfer money between counterparties. Phoebe has no order book, no settlement layer, and no win/lose mechanic priced in fiat or crypto.",
  },
  {
    title: "No public price",
    body: "There is no aggregated public probability to chase. Each user sees only their circle's signal — herding has no surface to attach to.",
  },
  {
    title: "No financial sacrifice",
    body: "The behavioural cleanliness of Phoebe's signal depends on users not having skin in the game. Their incentive is reputation and access, not return.",
  },
];

const COMPLIANCE = [
  {
    title: "Not a prediction market",
    body: "Phoebe does not match counterparties on contingent payouts. There is no order book and no settlement layer. We are a forecasting protocol, not a derivatives venue.",
  },
  {
    title: "Utility-first token design",
    body: "$PHOB is structured for access, governance, and engagement rewards — calibrated under MiCA-aligned utility-token guidance with EU counsel.",
  },
  {
    title: "KYC where required",
    body: "Studio tier and high-stakes blind circles enforce KYC. Open and Semi-Blind circles remain open-access for research participation under standard onboarding.",
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
        <Reveal className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-mute-2 mb-5">
            <Coins size={12} className="text-amethyst" />
            Ecosystem
          </div>
          <h1 className="font-display glitch-reveal text-5xl sm:text-6xl lg:text-[72px] font-semibold tracking-[-0.025em] leading-[0.98] text-white text-balance">
            <span className="bg-gradient-to-br from-amethyst-soft to-amethyst bg-clip-text text-transparent">
              $PHOB
            </span>{" "}
            shapes the circle.{" "}
            <span className="text-mute-2">The circle shapes the truth.</span>
          </h1>
          <p className="mt-6 text-[17px] leading-[1.55] text-mute-2 text-balance max-w-2xl">
            Phoebe is the sole issuer of $PHOB. Users spend it to follow other
            forecasters and unlock their feed — and that single primitive is
            how we engineer blind, semi-blind, and open deliberation
            conditions. No public price. No herding. No financial stake.
          </p>
        </Reveal>

        {/* Mechanic */}
        <section className="mb-20">
          <Reveal>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-mute font-mono mb-5">
              <Sparkles size={12} className="text-amethyst" />
              How $PHOB Works
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-semibold tracking-[-0.025em] leading-[1.05] text-white mb-4 text-balance">
              Follow with tokens. Build your circle.
            </h2>
            <p className="text-[16px] text-mute-2 max-w-2xl mb-8 text-balance">
              The mechanic is deliberately small — but it is the entire reason
              Phoebe&apos;s signal stays clean.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MECHANICS.map((m, i) => (
              <RevealItem
                key={m.title}
                index={i}
                className="relative rounded-2xl border border-line bg-gradient-to-b from-white/[0.025] to-transparent p-6 overflow-hidden"
              >
                <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-amethyst/15 blur-3xl pointer-events-none" />
                <div className="relative">
                  <div className="font-mono text-[11px] text-amethyst tracking-widest mb-2">
                    PRIMITIVE 0{i + 1}
                  </div>
                  <h3 className="font-display text-[19px] font-semibold text-white tracking-[-0.015em] mb-2">
                    {m.title}
                  </h3>
                  <p className="text-[14px] leading-[1.55] text-mute-2">{m.body}</p>
                </div>
              </RevealItem>
            ))}
          </div>
        </section>

        {/* Social Circles */}
        <section className="mb-20">
          <Reveal>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-mute font-mono mb-5">
              <Users size={12} className="text-cyan" />
              Social Circles
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-semibold tracking-[-0.025em] leading-[1.05] text-white mb-4 text-balance">
              Deliberation conditions, engineered by access.
            </h2>
            <p className="text-[16px] text-mute-2 max-w-2xl mb-8 text-balance">
              Three circle types emerge from following relationships. Phoebe
              gates each via $PHOB cost and visibility rules — the topology
              Bahrami&apos;s neuroscience demands.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CIRCLES.map((c, i) => (
              <RevealItem
                key={c.label}
                index={i}
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
              </RevealItem>
            ))}
          </div>
        </section>

        {/* Why this isn't gambling */}
        <section className="mb-20">
          <Reveal>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-mute font-mono mb-5">
              <Shield size={12} className="text-cyan" />
              Why This Isn&apos;t Gambling
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-semibold tracking-[-0.025em] leading-[1.05] text-white mb-4 text-balance">
              Free distribution. Zero financial stake.
            </h2>
            <p className="text-[16px] text-mute-2 max-w-2xl mb-8 text-balance">
              Every prediction market we know of asks users to bet their own
              money. Phoebe doesn&apos;t — and the legal, behavioural, and
              methodological implications run deep.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {NOT_GAMBLING.map((c, i) => (
              <RevealItem
                key={c.title}
                index={i}
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
              </RevealItem>
            ))}
          </div>
        </section>

        {/* Compliance */}
        <section id="compliance" className="mb-20">
          <Reveal>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-mute font-mono mb-5">
              <Shield size={12} className="text-amethyst" />
              Legal & Compliance
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-semibold tracking-[-0.025em] leading-[1.05] text-white mb-8 text-balance">
              A protocol, not a casino.
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {COMPLIANCE.map((c, i) => (
              <RevealItem
                key={c.title}
                index={i}
                className="rounded-2xl border border-line bg-gradient-to-b from-white/[0.025] to-transparent p-6"
              >
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="font-mono text-[11px] text-amethyst tracking-widest">
                    0{i + 1}
                  </span>
                  <h3 className="font-display text-[18px] font-semibold text-white tracking-[-0.015em] leading-[1.2]">
                    {c.title}
                  </h3>
                </div>
                <p className="text-[14px] leading-[1.55] text-mute-2">{c.body}</p>
              </RevealItem>
            ))}
          </div>
        </section>

        {/* Footer CTA */}
        <section id="legal">
          <Reveal className="rounded-3xl border border-line-strong bg-gradient-to-b from-obsidian-100 to-obsidian-50 p-10 sm:p-14 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-mute-2 mb-6">
            <ScrollText size={12} className="text-amethyst" />
            For Legal & Counsel Teams
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[48px] font-semibold tracking-[-0.025em] text-white max-w-3xl mx-auto text-balance">
            Need the full token-mechanics paper?
          </h2>
          <p className="mt-4 text-[16px] text-mute-2 max-w-2xl mx-auto">
            We share an extended legal memo and token-economics whitepaper with
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
          </Reveal>
        </section>
      </div>
    </div>
  );
}
