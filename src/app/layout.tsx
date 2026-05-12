import type { Metadata } from "next";
import { Geist, Geist_Mono, Schibsted_Grotesk } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/sections/footer";
import { NeuralFog } from "@/components/dynamic/neural-fog";
import { PilotModalProvider } from "@/components/pilot-modal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Phoebe — The Sovereign Intelligence Engine",
  description:
    "Move beyond market noise. Phoebe combines neuroscientific deliberation with merit-weighted AI to generate forecasts with unmatched precision.",
  metadataBase: new URL("https://phoebeapp.io"),
  openGraph: {
    title: "Phoebe — The Sovereign Intelligence Engine",
    description:
      "Neuroscientific deliberation + merit-weighted AI. Forecasts with unmatched precision.",
    url: "https://phoebeapp.io",
    siteName: "Phoebe",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${schibsted.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-obsidian text-foreground selection:bg-cyan/30 overflow-x-clip">
        <PilotModalProvider>
          <NeuralFog />
          <Nav />
          <main className="relative z-10 flex-1">{children}</main>
          <Footer />
        </PilotModalProvider>
      </body>
    </html>
  );
}
