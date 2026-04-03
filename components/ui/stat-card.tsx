import { ArrowUpRight } from "lucide-react";

export function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <article className="rounded-[2rem] border border-white/50 bg-white p-6 shadow-[0_25px_80px_-50px_rgba(11,60,93,0.45)]">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-500">{label}</span>
        <ArrowUpRight className="h-5 w-5 text-[var(--color-secondary)]" />
      </div>
      <p className="mt-5 text-3xl font-semibold text-[var(--color-text)]">{value}</p>
      <p className="mt-3 text-sm text-slate-500">{hint}</p>
    </article>
  );
}
