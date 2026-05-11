import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-6 w-6", className)}
      aria-hidden
    >
      <defs>
        <linearGradient id="phoebe-mark" x1="0" y1="0" x2="32" y2="32">
          <stop offset="0%" stopColor="#00F0FF" />
          <stop offset="100%" stopColor="#8A2BE2" />
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="14" stroke="url(#phoebe-mark)" strokeWidth="1.25" opacity="0.55" />
      <path
        d="M16 4a12 12 0 0 1 0 24"
        stroke="url(#phoebe-mark)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M16 8a8 8 0 0 1 0 16"
        stroke="#00F0FF"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M16 12a4 4 0 0 1 0 8"
        stroke="#8A2BE2"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="16" cy="16" r="1.4" fill="#00F0FF" />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <LogoMark />
      <span className="font-display text-[17px] font-semibold tracking-tight text-white">
        Phoebe
      </span>
    </span>
  );
}
