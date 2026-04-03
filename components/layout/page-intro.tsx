import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/layout/container";

export function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="relative overflow-hidden py-12 sm:py-16">
      <Container className="wave-grid">
        <div className="coastal-card relative overflow-hidden rounded-[2rem] p-8 sm:p-10">
          <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[var(--color-sun)]/45 blur-2xl" />
          <div className="absolute bottom-0 left-0 h-24 w-40 rounded-tr-[4rem] bg-[var(--color-foam)]/90" />
          <Badge>{eyebrow}</Badge>
          <h1 className="mt-6 max-w-3xl font-serif text-4xl leading-tight font-extrabold text-[var(--color-primary)] sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">{description}</p>
        </div>
      </Container>
    </section>
  );
}
