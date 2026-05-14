"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type WaitlistModalCtx = {
  open: () => void;
  close: () => void;
  isOpen: boolean;
};

const Ctx = createContext<WaitlistModalCtx | null>(null);

export function useWaitlistModal() {
  const ctx = useContext(Ctx);
  if (!ctx)
    throw new Error(
      "useWaitlistModal must be used inside <WaitlistModalProvider>"
    );
  return ctx;
}

export function WaitlistModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <Ctx.Provider value={{ open, close, isOpen }}>
      {children}
      <WaitlistModal />
    </Ctx.Provider>
  );
}

type SubmitStatus = "idle" | "submitting" | "success" | "error";

function WaitlistModal() {
  const { isOpen, close } = useWaitlistModal();
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [error, setError] = useState<string | null>(null);

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
    }
  }, [isOpen]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("https://formspree.io/f/xbdwvdne", {
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
            "Something went wrong. Please try again."
        );
        setStatus("error");
      }
    } catch {
      setError("Network error. Please check your connection and retry.");
      setStatus("error");
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
            aria-label="Close waitlist form"
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            onClick={close}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="waitlist-modal-title"
            className="relative z-10 w-full max-w-md rounded-2xl border border-amethyst/45 bg-obsidian-100 p-6 sm:p-8 shadow-[0_0_0_1px_rgba(138,43,226,0.28),0_30px_120px_-20px_rgba(138,43,226,0.5)] max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.92, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 4 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={close}
              className="absolute right-4 top-4 rounded-md p-1.5 text-mute-2 hover:text-white hover:bg-white/5 transition-colors"
            >
              <X size={18} />
            </button>

            {status === "success" ? (
              <SuccessPanel onClose={close} />
            ) : (
              <>
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 rounded-full border border-amethyst/35 bg-amethyst/10 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-amethyst-soft mb-4">
                    <span className="h-1 w-1 rounded-full bg-amethyst-soft" />
                    Prediction Waitlist
                  </div>
                  <h2
                    id="waitlist-modal-title"
                    className="font-display text-2xl sm:text-[26px] font-semibold tracking-[-0.02em] text-white leading-tight"
                  >
                    Join the Prediction Waitlist.
                  </h2>
                  <p className="mt-2 text-[14px] leading-[1.55] text-mute-2">
                    Early access members receive a{" "}
                    <span className="text-white">2,000 $PHOB</span> launch
                    voucher.
                  </p>
                </div>

                <form onSubmit={onSubmit} className="space-y-4" noValidate>
                  <Field
                    label="Name"
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

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className={cn(
                      "group relative inline-flex w-full items-center justify-center gap-2 rounded-full bg-amethyst px-6 h-12 text-[15px] font-semibold tracking-tight text-white",
                      "transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed",
                      "shadow-[0_0_0_1px_rgba(138,43,226,0.45),0_10px_40px_-10px_rgba(138,43,226,0.55)]",
                      "hover:bg-amethyst-soft hover:text-obsidian hover:shadow-[0_0_0_1px_rgba(138,43,226,0.7),0_0_60px_-5px_rgba(138,43,226,0.85),0_0_120px_-20px_rgba(138,43,226,0.6)]",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amethyst/60 focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian-100"
                    )}
                  >
                    {status === "submitting" ? "Joining…" : "Join the Waitlist"}
                  </button>

                  <p className="text-[11px] uppercase tracking-[0.16em] text-mute font-mono text-center">
                    No spam · Unsubscribe anytime
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
      <span className="block text-[11px] uppercase tracking-[0.18em] text-mute-2 font-mono mb-1.5">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={cn(
          "block w-full rounded-lg border border-amethyst/30 bg-obsidian px-3.5 h-11 text-[14px] text-white placeholder:text-mute",
          "transition-all duration-200",
          "hover:border-amethyst/55",
          "focus:outline-none focus:border-amethyst focus:ring-2 focus:ring-amethyst/30"
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
      className="text-center py-4"
    >
      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-amethyst/45 bg-amethyst/10 text-amethyst-soft shadow-[0_0_40px_-5px_rgba(138,43,226,0.6)]">
        <Check size={26} strokeWidth={2.4} />
      </div>
      <h3
        id="waitlist-modal-title"
        className="font-display text-2xl font-semibold tracking-[-0.02em] text-white"
      >
        You&apos;re on the list
      </h3>
      <p className="mt-3 text-[14.5px] leading-[1.55] text-mute-2 max-w-sm mx-auto">
        Thank you for joining the Prediction Waitlist. You&apos;ll receive your{" "}
        <span className="text-white">2,000 $PHOB</span> launch voucher via email
        within the next 2 days.
      </p>
      <Button variant="outline" size="md" className="mt-7" onClick={onClose}>
        Close
      </Button>
    </motion.div>
  );
}
