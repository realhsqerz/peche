import { Container } from "@/components/layout/container";
import { PageIntro } from "@/components/layout/page-intro";
import { StoreShell } from "@/components/layout/store-shell";
import { CartPage } from "@/components/cart/cart-page";

export default function CartRoute() {
  return (
    <StoreShell>
      <PageIntro
        description="Modifiez les quantites, verifiez le sous-total et passez rapidement a la commande."
        eyebrow="Panier"
        title="Un panier simple et rapide"
      />
      <Container>
        <CartPage />
      </Container>
    </StoreShell>
  );
}
