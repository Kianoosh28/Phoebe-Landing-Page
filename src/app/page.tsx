import { Hero } from "@/components/sections/hero";
import { Synergy } from "@/components/sections/synergy";
import { Moat } from "@/components/sections/moat";
import { Testimonial } from "@/components/sections/testimonial";
import { ArgumentGraph } from "@/components/argument-graph/graph";
import { Team } from "@/components/sections/team";
import { Science } from "@/components/sections/science";
import { PilotCTA } from "@/components/sections/pilot-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <Synergy />
      <Moat />
      <Testimonial />
      <ArgumentGraph />
      <Team />
      <Science />
      <PilotCTA />
    </>
  );
}
