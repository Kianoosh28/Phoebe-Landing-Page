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
 * Amethyst-themed participant intake for the impact subdomain — the community
 * forecaster registration counterpart to the cyan enterprise pilot modal
 * (src/app/impact/impact-pilot.tsx). Identical submission flow: Cloudflare
 * Turnstile + POST to the shared community/waitlist Formspree endpoint, with the
 * same idle/submitting/success/error state machine. Recolored to the brand
 * amethyst highlights and given forecaster-context fields.
 */

/* Amethyst highlights — the Foresight Network's primary color. */
const M = "#9966CC";
const MG = "#B692DB";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
/* Dedicated Foresight Network participant intake endpoint. */
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mykarenv";

type ForesightNetworkCtx = {
  open: () => void;
  close: () => void;
  isOpen: boolean;
};

const Ctx = createContext<ForesightNetworkCtx | null>(null);

export function useForesightNetwork() {
  const ctx = useContext(Ctx);
  if (!ctx)
    throw new Error(
      "useForesightNetwork must be used inside <ForesightNetworkProvider>",
    );
  return ctx;
}

export function ForesightNetworkProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <Ctx.Provider value={{ open, close, isOpen }}>
      {children}
      <ForesightNetworkModal />
    </Ctx.Provider>
  );
}

type SubmitStatus = "idle" | "submitting" | "success" | "error";

function ForesightNetworkModal() {
  const { isOpen, close } = useForesightNetwork();
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
    data.set("_subject", "Impact - Foresight Network Application");
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
            aria-label="Close Foresight Network form"
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={close}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="foresight-network-title"
            className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto border bg-zinc-950 p-6 font-sans sm:p-8"
            style={{
              borderColor: `${M}66`,
              boxShadow: `0 0 0 1px ${M}40, 0 30px 120px -20px ${M}80`,
            }}
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
                  <div
                    className="mb-4 inline-flex items-center gap-2 border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em]"
                    style={{
                      borderColor: `${M}66`,
                      backgroundColor: `${M}1a`,
                      color: MG,
                    }}
                  >
                    <span
                      className="h-1 w-1 rounded-full"
                      style={{ backgroundColor: M }}
                    />
                    Foresight Network
                  </div>
                  <h2
                    id="foresight-network-title"
                    className="font-display text-2xl font-semibold leading-tight tracking-[-0.02em] text-white sm:text-[28px]"
                  >
                    Stake your conviction.
                  </h2>
                  <p className="mt-2 text-[14px] leading-[1.55] text-zinc-400">
                    Join the distributed network of forecasters. Detect friction,
                    stake conviction, and help filter signal from noise.
                  </p>
                </div>

                <form onSubmit={onSubmit} className="space-y-4" noValidate>
                  <Field
                    label="Full Name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                  />
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                  />
                  <Field
                    label="Domain of Insight"
                    name="domain"
                    type="text"
                    placeholder="Policy / Health / Climate / Markets"
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
                      "group relative inline-flex h-12 w-full items-center justify-center gap-2 px-6 font-mono text-[14px] font-bold tracking-[0.12em] text-black",
                      "transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950",
                    )}
                    style={{
                      backgroundColor: M,
                      boxShadow: `0 0 0 1px ${M}66, 0 10px 40px -10px ${M}8c`,
                    }}
                  >
                    {status === "submitting"
                      ? "SUBMITTING..."
                      : "JOIN THE FORESIGHT NETWORK"}
                  </button>

                  <p className="text-center font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-600">
                    No spam &middot; Unsubscribe anytime
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
          "block h-11 w-full border bg-black px-3.5 text-[14px] text-white placeholder:text-zinc-600",
          "transition-all duration-200 focus:outline-none",
          "foresight-field",
        )}
        style={{ borderColor: `${M}4d` }}
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
      <div
        className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border"
        style={{
          borderColor: `${M}66`,
          backgroundColor: `${M}1a`,
          color: MG,
          boxShadow: `0 0 40px -5px ${M}99`,
        }}
      >
        <Check size={26} strokeWidth={2.4} />
      </div>
      <h3 className="font-display text-2xl font-semibold tracking-[-0.02em] text-white">
        You&apos;re in the network
      </h3>
      <p className="mx-auto mt-3 max-w-sm text-[14.5px] leading-[1.55] text-zinc-400">
        Thank you for joining the Phoebe Foresight Network. We&apos;ll be in
        touch with your onboarding details shortly.
      </p>
      <button
        type="button"
        onClick={onClose}
        className="mt-7 border px-6 py-2.5 font-mono text-sm tracking-[0.12em] transition-colors"
        style={{ borderColor: `${M}80`, color: MG }}
      >
        CLOSE
      </button>
    </motion.div>
  );
}
