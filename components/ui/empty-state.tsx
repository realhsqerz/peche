import { Button } from "@/components/ui/button";

export function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
}: {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
}) {
  return (
    <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white/80 p-10 text-center">
      <h3 className="text-2xl font-semibold text-[var(--color-text)]">{title}</h3>
      <p className="mt-3 text-sm text-slate-500">{description}</p>
      {actionLabel && actionHref ? (
        <div className="mt-6">
          <a href={actionHref}>
            <Button>{actionLabel}</Button>
          </a>
        </div>
      ) : null}
    </div>
  );
}
