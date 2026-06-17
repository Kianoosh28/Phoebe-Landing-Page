"use client";

import { usePathname } from "next/navigation";

/**
 * Renders its children on every route EXCEPT those whose pathname starts with
 * `prefix`. Used to keep the global site chrome (Nav / Footer / background FX)
 * off the standalone /impact enterprise landing page.
 */
export function HideOn({
  prefix,
  children,
}: {
  prefix: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  if (pathname?.startsWith(prefix)) return null;
  return <>{children}</>;
}
