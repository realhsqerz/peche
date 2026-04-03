import { Container } from "@/components/layout/container";
import { StoreShell } from "@/components/layout/store-shell";
import { ButtonLink } from "@/components/ui/button-link";

export default function NotFound() {
  return (
    <StoreShell>
      <Container className="py-24 text-center">
        <p className="text-sm uppercase tracking-[0.25em] text-slate-400">404</p>
        <h1 className="mt-6 font-serif text-5xl text-[var(--color-primary)]">Page introuvable</h1>
        <p className="mt-4 text-sm leading-7 text-slate-500">
          La page demandee nexiste pas ou le produit a ete retire du catalogue.
        </p>
        <ButtonLink className="mt-8" href="/shop">
          Retour a la boutique
        </ButtonLink>
      </Container>
    </StoreShell>
  );
}
