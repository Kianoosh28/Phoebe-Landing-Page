export type Polarity = "bull" | "bear";
export type Status = "resolved" | "live";

export type ArgumentNode = {
  id: string;
  title: string;
  weight: number; // 0..1
  polarity: Polarity;
  reasoning: string;
  sources: { label: string; type: "press" | "crowd" | "model" | "analyst" | "leak" }[];
};

export type Cluster = {
  id: string;
  label: string;
  arguments: ArgumentNode[];
};

export type Prediction = {
  id: string;
  status: Status;
  title: string;
  metric: string;
  phoebePrediction: string;
  actual?: string;
  errorMargin?: string;
  resolvedAt?: string;
  resolvesAt?: string;
  blurb: string;
  clusters: Cluster[];
};

export const PREDICTIONS: Prediction[] = [
  {
    id: "kom",
    status: "resolved",
    title: "King of Meat",
    metric: "Average Critic Score",
    phoebePrediction: "76",
    actual: "77",
    errorMargin: "1.3%",
    resolvedAt: "Apr 2026",
    blurb: "Glowmade co-op brawler.",
    clusters: [
      {
        id: "kom-c1",
        label: "Mechanics & Loop",
        arguments: [
          {
            id: "kom-a1",
            title: "Co-op brawler retention strong",
            weight: 0.78,
            polarity: "bull",
            reasoning:
              "Closed-beta retention sat 38% above brawler-genre 7-day average; the core loop scored 4.1/5 in deep playtests.",
            sources: [
              { label: "Phoebe Crowd · n=412", type: "crowd" },
              { label: "Glowmade Test Suite", type: "model" },
            ],
          },
          {
            id: "kom-a2",
            title: "Mod tooling depth signal",
            weight: 0.64,
            polarity: "bull",
            reasoning: "User-generated weapons saw 12K shares in closed beta — a strong long-tail content signal critics historically reward.",
            sources: [
              { label: "Beta Telemetry", type: "model" },
              { label: "r/KingOfMeat", type: "crowd" },
            ],
          },
        ],
      },
      {
        id: "kom-c2",
        label: "Critical Reception",
        arguments: [
          {
            id: "kom-a3",
            title: "Preview tone trending warm",
            weight: 0.71,
            polarity: "bull",
            reasoning: "Hands-on previews from 14 outlets averaged +0.62 sentiment, weighted to outlets correlated with final score.",
            sources: [
              { label: "M. Velasco · Analyst", type: "analyst" },
              { label: "Press Aggregator", type: "press" },
            ],
          },
          {
            id: "kom-a4",
            title: "Performance regressions late build",
            weight: 0.55,
            polarity: "bear",
            reasoning: "Pre-launch build showed inconsistent 60fps on mid-tier hardware — historically -3 to -5 points on aggregate.",
            sources: [{ label: "L. Park · Press", type: "press" }],
          },
        ],
      },
      {
        id: "kom-c3",
        label: "Team Pedigree",
        arguments: [
          {
            id: "kom-a5",
            title: "Lionhead / Media Molecule alumni",
            weight: 0.69,
            polarity: "bull",
            reasoning:
              "Glowmade's founders are Lionhead and Media Molecule veterans. Phoebe's model historically uplifts +3 to +6 points for debut titles led by established creative leads.",
            sources: [{ label: "Phoebe Studio Index", type: "model" }],
          },
        ],
      },
    ],
  },
  {
    id: "tga",
    status: "resolved",
    title: "TGA Game of the Year",
    metric: "Winner",
    phoebePrediction: "Clair Obscur: Expedition 33",
    actual: "Clair Obscur: Expedition 33",
    errorMargin: "Hit",
    resolvedAt: "Dec 2025",
    blurb: "The Game Awards 2025 GOTY.",
    clusters: [
      {
        id: "tga-c1",
        label: "Critical Aggregate",
        arguments: [
          {
            id: "tga-a1",
            title: "Metacritic ceiling 94",
            weight: 0.88,
            polarity: "bull",
            reasoning: "Expedition 33 closed the season with the highest weighted-critic ceiling of any nominee since 2019's winner cohort.",
            sources: [
              { label: "Press Aggregator", type: "press" },
              { label: "S. Ojo · Modeler", type: "model" },
            ],
          },
          {
            id: "tga-a2",
            title: "Cultural penetration spike",
            weight: 0.76,
            polarity: "bull",
            reasoning: "Cross-platform search interest 3.1× the average GOTY nominee in the 4 weeks before voting cutoff.",
            sources: [{ label: "Trends Pulse", type: "model" }],
          },
        ],
      },
      {
        id: "tga-c2",
        label: "Voter Composition Model",
        arguments: [
          {
            id: "tga-a3",
            title: "Indie/AA underdog dynamic",
            weight: 0.81,
            polarity: "bull",
            reasoning: "TGA's split jury historically rewards a singular AA artistic statement when no AAA reaches 93+ MC.",
            sources: [
              { label: "Phoebe Crowd · n=1,204", type: "crowd" },
              { label: "M. Velasco · Analyst", type: "analyst" },
            ],
          },
          {
            id: "tga-a4",
            title: "Competing nominee fragmentation",
            weight: 0.67,
            polarity: "bull",
            reasoning: "Three AAA contenders split the action-RPG vote bloc, opening lane for Expedition 33.",
            sources: [{ label: "K. Imura · Critic", type: "analyst" }],
          },
        ],
      },
      {
        id: "tga-c3",
        label: "Risk Factors",
        arguments: [
          {
            id: "tga-a5",
            title: "Late-year AAA release noise",
            weight: 0.52,
            polarity: "bear",
            reasoning: "A late-cycle blockbuster could pull recency-biased voters — Phoebe modeled this as a 16% tail-risk.",
            sources: [{ label: "Phoebe Risk Engine", type: "model" }],
          },
        ],
      },
    ],
  },
  {
    id: "rer",
    status: "resolved",
    title: "Resident Evil Requiem",
    metric: "First 5-Day Sales",
    phoebePrediction: "5.1M",
    actual: "5.0M",
    errorMargin: "2.0%",
    resolvedAt: "Mar 2026",
    blurb: "Capcom's RE9.",
    clusters: [
      {
        id: "rer-c1",
        label: "Pre-Order Velocity",
        arguments: [
          {
            id: "rer-a1",
            title: "Digital pre-order curve",
            weight: 0.86,
            polarity: "bull",
            reasoning: "Two-week digital pre-orders tracking +18% vs RE Village's launch baseline.",
            sources: [
              { label: "Channel Partner Index", type: "model" },
              { label: "Phoebe Crowd · n=2,031", type: "crowd" },
            ],
          },
          {
            id: "rer-a2",
            title: "Retail allocation signal",
            weight: 0.71,
            polarity: "bull",
            reasoning: "EU retail allocations sized for a 4.6–5.3M opener — Capcom rarely overbuilds physical.",
            sources: [{ label: "Supply Chain Leak", type: "leak" }],
          },
        ],
      },
      {
        id: "rer-c2",
        label: "Franchise Trajectory",
        arguments: [
          {
            id: "rer-a3",
            title: "Series momentum compounding",
            weight: 0.74,
            polarity: "bull",
            reasoning: "Each numbered RE since RE7 has opened 12–18% above the last. Compound priors favor a 5M opener.",
            sources: [{ label: "S. Ojo · Modeler", type: "model" }],
          },
          {
            id: "rer-a4",
            title: "Survival horror saturation",
            weight: 0.48,
            polarity: "bear",
            reasoning: "Three high-profile horror titles shipped in the prior quarter, mildly cannibalizing the audience pool.",
            sources: [{ label: "R. Chen · Critic", type: "analyst" }],
          },
        ],
      },
      {
        id: "rer-c3",
        label: "Marketing & Press",
        arguments: [
          {
            id: "rer-a5",
            title: "Reveal-event sentiment",
            weight: 0.69,
            polarity: "bull",
            reasoning: "Capcom Spotlight reveal scored +0.74 weighted sentiment across 22 covered outlets.",
            sources: [{ label: "Press Aggregator", type: "press" }],
          },
        ],
      },
    ],
  },
  {
    id: "gta6",
    status: "live",
    title: "Grand Theft Auto VI",
    metric: "Launch MSRP (USD, standard ed.)",
    phoebePrediction: "$79",
    resolvesAt: "On launch announce",
    blurb: "Rockstar's open-world tentpole.",
    clusters: [
      {
        id: "gta-c1",
        label: "Industry Pricing Drift",
        arguments: [
          {
            id: "gta-a1",
            title: "Sony/MS $80 trial balloons",
            weight: 0.79,
            polarity: "bull",
            reasoning: "First-party tier already crossed $79–$80 on flagship titles. Take-Two has signaled willingness to lead pricing.",
            sources: [
              { label: "S. Ojo · Modeler", type: "model" },
              { label: "Earnings Call Transcript", type: "press" },
            ],
          },
          {
            id: "gta-a2",
            title: "Inflation-adjusted parity",
            weight: 0.62,
            polarity: "bull",
            reasoning: "GTA V launched at $60 in 2013 — that's ~$83 in 2026 dollars. Take-Two has anchor pricing precedent.",
            sources: [{ label: "Phoebe Macro Index", type: "model" }],
          },
        ],
      },
      {
        id: "gta-c2",
        label: "Take-Two Posture",
        arguments: [
          {
            id: "gta-a3",
            title: "Zelnick pricing rhetoric",
            weight: 0.71,
            polarity: "bull",
            reasoning: "Strauss Zelnick has repeatedly framed AAA pricing as 'extraordinary value'—the rhetorical setup for premium ceiling pricing.",
            sources: [
              { label: "Press Aggregator", type: "press" },
              { label: "M. Velasco · Analyst", type: "analyst" },
            ],
          },
          {
            id: "gta-a4",
            title: "Consumer pricing resistance",
            weight: 0.58,
            polarity: "bear",
            reasoning: "Polymarket-style crowd skews 56% toward $69, citing PR risk of crossing $80 publicly.",
            sources: [{ label: "Phoebe Crowd · n=3,408", type: "crowd" },
            { label: "L. Park · Press", type: "press" }],
          },
        ],
      },
      {
        id: "gta-c3",
        label: "SKU Tiering",
        arguments: [
          {
            id: "gta-a5",
            title: "Likely Deluxe at $109–$119",
            weight: 0.66,
            polarity: "bull",
            reasoning: "Tier-laddering analysis suggests Standard $79 / Deluxe ~$109, with $69 reserved for a future price-drop slot.",
            sources: [{ label: "Channel Partner Index", type: "model" }],
          },
        ],
      },
    ],
  },
  {
    id: "ps6",
    status: "live",
    title: "PlayStation 6",
    metric: "Launch Window",
    phoebePrediction: "Q4 2028",
    resolvesAt: "On Sony announce",
    blurb: "Sony's next-gen platform.",
    clusters: [
      {
        id: "ps6-c1",
        label: "Generational Cadence",
        arguments: [
          {
            id: "ps6-a1",
            title: "7-year console cadence",
            weight: 0.74,
            polarity: "bull",
            reasoning: "PS5 launched Nov 2020; Sony's last three generations averaged a 7.0-year cadence. Q4 2027 base, slipped one year for AI cycle.",
            sources: [{ label: "Phoebe Platform Index", type: "model" }],
          },
          {
            id: "ps6-a2",
            title: "Mid-gen Pro refresh runway",
            weight: 0.68,
            polarity: "bull",
            reasoning: "PS5 Pro shipped late 2024 — Sony historically gives a Pro a ~4-year tail before a successor.",
            sources: [{ label: "S. Ojo · Modeler", type: "model" }],
          },
        ],
      },
      {
        id: "ps6-c2",
        label: "Supply Chain Signal",
        arguments: [
          {
            id: "ps6-a3",
            title: "AMD design-in roadmap",
            weight: 0.81,
            polarity: "bull",
            reasoning: "Supply-chain whispers place AMD's Zen 5c + RDNA 5 console design-in tape-out in late 2027 — consistent with a Q4 2028 launch window.",
            sources: [
              { label: "Supply Chain Leak", type: "leak" },
              { label: "Trade Press · DigiTimes", type: "press" },
            ],
          },
          {
            id: "ps6-a4",
            title: "TSMC wafer reservation",
            weight: 0.63,
            polarity: "bull",
            reasoning: "Reported N3P reservation pattern matches the pre-launch console ramp profile seen 12 months before PS5.",
            sources: [{ label: "Trade Press", type: "press" }],
          },
        ],
      },
      {
        id: "ps6-c3",
        label: "Risk Factors",
        arguments: [
          {
            id: "ps6-a5",
            title: "AI/cloud cannibalization risk",
            weight: 0.49,
            polarity: "bear",
            reasoning: "If cloud-streaming AI hardware accelerates, Sony could delay hardware to 2029 to amortize PS5 base further.",
            sources: [{ label: "K. Imura · Analyst", type: "analyst" }],
          },
        ],
      },
    ],
  },
];

export type GraphNodeType = "root" | "cluster" | "argument" | "source";
