import { Container } from "@/components/layout/container";
import { PageIntro } from "@/components/layout/page-intro";
import { StoreShell } from "@/components/layout/store-shell";
import { CheckoutForm } from "@/components/checkout/checkout-form";

export default function CheckoutPage() {
  return (
    <StoreShell>
      <PageIntro
        description="Ce passage en caisse reste simple : nom, telephone, adresse et confirmation de la commande."
        eyebrow="Commande"
        title="Finaliser sans compliquer l'achat"
      />
      <Container>
        <CheckoutForm />
      </Container>
    </StoreShell>
  );
}
