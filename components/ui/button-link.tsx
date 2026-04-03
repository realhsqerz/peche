import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type ButtonLinkProps = LinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    variant?: "primary" | "secondary";
  };

const variants: Record<NonNullable<ButtonLinkProps["variant"]>, string> = {
  primary:
    "bg-[linear-gradient(135deg,#eb8640,#dc6d26)] text-white shadow-lg shadow-orange-500/20 hover:brightness-105",
  secondary:
    "border border-[rgba(21,91,115,0.12)] bg-white/92 text-[var(--color-text)] hover:border-[var(--color-primary)] hover:bg-[var(--color-foam)] hover:text-[var(--color-primary)]",
};

export function ButtonLink({
  className,
  variant = "primary",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(
        "inline-flex h-11 items-center justify-center rounded-2xl px-5 text-sm font-semibold transition",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
