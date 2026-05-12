import Image from "next/image";
import { cn } from "@/lib/utils";

export function Wordmark({ className }: { className?: string }) {
  return (
    <Image
      src="/logo.svg"
      alt="Phoebe"
      width={122}
      height={40}
      priority
      className={cn("h-10 w-auto select-none", className)}
    />
  );
}
