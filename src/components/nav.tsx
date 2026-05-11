"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Wordmark } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Engine" },
  { href: "/science", label: "Science" },
  { href: "/ecosystem", label: "Ecosystem" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "backdrop-blur-xl bg-obsidian/70 border-b border-line"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center" aria-label="Phoebe home">
          <Wordmark />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-2 text-sm text-mute-2 hover:text-white transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Link href="#pilot">
            <Button variant="primary" size="sm">
              Request a Pilot
            </Button>
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden p-2 text-white"
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-line bg-obsidian/95 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-5 py-4 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-white hover:bg-white/5"
              >
                {l.label}
              </Link>
            ))}
            <Link href="#pilot" onClick={() => setOpen(false)} className="mt-2">
              <Button variant="primary" size="md" className="w-full">
                Request a Pilot
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
