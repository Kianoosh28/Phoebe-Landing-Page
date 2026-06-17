import type { Metadata } from "next";
import { ImpactDashboard } from "./impact-client";

export const metadata: Metadata = {
  title: "Phoebe — Impact Simulation Core",
  description:
    "Phoebe fuses adaptive-weighted machine precision with deep human collective intelligence to map behavioral friction and forecast systemic policy, health, and climate transitions before crisis events unfold.",
  metadataBase: new URL("https://impact.phoebeapp.io"),
  openGraph: {
    title: "Phoebe — Impact Simulation Core",
    description:
      "Stop guessing the future. Forecast it. Predictive foresight for ESG, policy, infrastructure, and climate risk.",
    url: "https://impact.phoebeapp.io",
    siteName: "Phoebe",
    type: "website",
  },
};

export default function ImpactPage() {
  return <ImpactDashboard />;
}
