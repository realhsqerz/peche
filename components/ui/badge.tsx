import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-[rgba(76,167,174,0.18)] bg-[var(--color-foam)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
