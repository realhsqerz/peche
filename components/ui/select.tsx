import * as React from "react";

import { cn } from "@/lib/utils";

export function Select({
  className,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-[var(--color-text)] outline-none transition focus:border-[var(--color-secondary)] focus:ring-2 focus:ring-teal-100",
        className,
      )}
      {...props}
    />
  );
}
