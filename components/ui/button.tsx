import * as React from "react";

import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
};

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-[linear-gradient(135deg,#eb8640,#dc6d26)] text-white shadow-lg shadow-orange-500/20 hover:brightness-105",
  secondary:
    "border border-[rgba(21,91,115,0.12)] bg-white/92 text-[var(--color-text)] hover:border-[var(--color-primary)] hover:bg-[var(--color-foam)] hover:text-[var(--color-primary)]",
  ghost: "bg-transparent text-[var(--color-primary)] hover:bg-[var(--color-foam)]",
  danger: "bg-red-600 text-white hover:bg-red-700",
};

export function Button({
  className,
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex h-11 items-center justify-center rounded-2xl px-5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        className,
      )}
      type={type}
      {...props}
    />
  );
}
