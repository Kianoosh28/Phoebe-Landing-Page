"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, X } from "lucide-react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { cn } from "@/lib/utils";

/*
 * Cyan-themed clone of the main page's PilotModal
 * (src/components/pilot-modal.tsx). Identical submission flow:
 * Cloudflare Turnstile + POST to the same Formspree pilot endpoint, with the
 * same idle/submitting/success/error state machine. Recolored to the impact
 * subdomain's electric-cyan palette and given enterprise-context fields.
 */

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
const FORMSPREE_ENDPOINT = "https://formspree.io/f/maqvvdvv";

type ImpactPilotCtx = {
  open: () => void;
  close: () => void;
  isOpen: boolean;
};

const Ctx = createContext<ImpactPilotCtx | null>(null);

export function useImpactPilot() {
  const ctx = useContext(Ctx);
  if (!ctx)
    throw new Error("useImpactPilot must be used inside <ImpactPilotProvider>");
  return ctx;
}

export function ImpactPilotProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <Ctx.Provider value={{ open, close, isOpen }}>
      {children}
      <ImpactPilotModal />
    </Ctx.Provider>
  );
}

type SubmitStatus = "idle" | "submitting" | "success" | "error";

function ImpactPilotModal() {
  const { isOpen, close } = useImpactPilot();
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance | undefined>(undefined);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, close]);

  useEffect(() => {
    if (!isOpen) {
      setStatus("idle");
      setError(null);
      setTurnstileToken(null);
    }
  }, [isOpen]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!turnstileToken) return;
    setStatus("submitting");
    setError(null);
    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("cf-turnstile-response", turnstileToken);
    data.set("_subject", "Impact - Private Engine Access Request");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        form.reset();
        setStatus("success");
      } else {
        const json = (await res.json().catch(() => null)) as
          | { errors?: { message?: string }[] }
          | null;
        setError(
          json?.errors?.[0]?.message ??
            "Something went wrong. Please try again.",
        );
        setStatus("error");
        turnstileRef.current?.reset();
        setTurnstileToken(null);
      }
    } catch {
      setError("Network error. Please check your connection and retry.");
      setStatus("error");
      turnstileRef.current?.reset();
      setTurnstileToken(null);
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.button
            type="button"
            aria-label="Close access request form"
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={close}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="impact-pilot-title"
            className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto border border-[#00F0FF]/40 bg-zinc-950 p-6 font-sans shadow-[0_0_0_1px_rgba(0,240,255,0.25),0_30px_120px_-20px_rgba(0,240,255,0.5)] sm:p-8"
            initial={{ opacity: 0, scale: 0.92, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 4 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={close}
              className="absolute right-4 top-4 rounded-md p-1.5 text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              <X size={18} />
            </button>

            {status === "success" ? (
              <SuccessPanel onClose={close} />
            ) : (
              <>
                <div className="mb-6">
                  <div className="mb-4 inline-flex items-center gap-2 border border-[#00F0FF]/40 bg-[#00F0FF]/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-[#5CF6FF]">
                    <span className="h-1 w-1 rounded-full bg-[#00F0FF]" />
                    Private Engine Access
                  </div>
                  <h2
                    id="impact-pilot-title"
                    className="font-display text-2xl font-semibold leading-tight tracking-[-0.02em] text-white sm:text-[28px]"
                  >
                    Deploy a private foresight pilot.
                  </h2>
                  <p className="mt-2 text-[14px] leading-[1.55] text-zinc-400">
                    Tell us about your mandate. We&apos;ll reply within 48 hours
                    with scope and timing.
                  </p>
                </div>

                <form onSubmit={onSubmit} className="space-y-4" noValidate>
                  <Field
                    label="Organization"
                    name="organization"
                    type="text"
                    required
                    autoComplete="organization"
                  />
                  <Field
                    label="Foresight Domain / Sector"
                    name="sector"
                    type="text"
                    required
                    placeholder="Public Policy / Health / Climate"
                  />
                  <Field
                    label="Full Name & Position"
                    name="name_position"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Jane Doe, Director of Risk"
                  />
                  <Field
                    label="Corporate Email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                  />

                  <input
                    type="text"
                    name="_gotcha"
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-hidden
                  />

                  {error && (
                    <p className="text-[13px] text-bearish" role="alert">
                      {error}
                    </p>
                  )}

                  <div className="flex justify-center pt-1">
                    <Turnstile
                      ref={turnstileRef}
                      siteKey={TURNSTILE_SITE_KEY}
                      options={{ theme: "dark" }}
                      onSuccess={(t) => setTurnstileToken(t)}
                      onError={() => setTurnstileToken(null)}
                      onExpire={() => setTurnstileToken(null)}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "submitting" || !turnstileToken}
                    className={cn(
                      "group relative inline-flex h-12 w-full items-center justify-center gap-2 bg-[#00F0FF] px-6 font-mono text-[14px] font-bold tracking-[0.12em] text-black",
                      "transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60",
                      "shadow-[0_0_0_1px_rgba(0,240,255,0.4),0_10px_40px_-10px_rgba(0,240,255,0.55)]",
                      "hover:shadow-[0_0_0_1px_rgba(92,246,255,0.65),0_0_60px_-5px_rgba(0,240,255,0.85)]",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950",
                    )}
                  >
                    {status === "submitting"
                      ? "SUBMITTING..."
                      : "REQUEST PRIVATE ENGINE ACCESS"}
                  </button>

                  <p className="text-center font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-600">
                    NDA on request &middot; 4-week turnaround
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  name,
  type,
  required,
  autoComplete,
  placeholder,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={cn(
          "block h-11 w-full border border-[#00F0FF]/30 bg-black px-3.5 text-[14px] text-white placeholder:text-zinc-600",
          "transition-all duration-200",
          "hover:border-[#00F0FF]/55",
          "focus:border-[#00F0FF] focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/30",
        )}
      />
    </label>
  );
}

function SuccessPanel({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="py-4 text-center"
    >
      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-[#00F0FF]/40 bg-[#00F0FF]/10 text-[#5CF6FF] shadow-[0_0_40px_-5px_rgba(0,240,255,0.6)]">
        <Check size={26} strokeWidth={2.4} />
      </div>
      <h3 className="font-display text-2xl font-semibold tracking-[-0.02em] text-white">
        Request received
      </h3>
      <p className="mx-auto mt-3 max-w-sm text-[14.5px] leading-[1.55] text-zinc-400">
        Thank you for your interest in the Phoebe Impact Simulation Core.
        We&apos;ll be in touch within 48 hours.
      </p>
      <button
        type="button"
        onClick={onClose}
        className="mt-7 border border-[#00F0FF]/50 px-6 py-2.5 font-mono text-sm tracking-[0.12em] text-[#5CF6FF] transition-colors hover:bg-[#00F0FF]/10"
      >
        CLOSE
      </button>
    </motion.div>
  );
}
