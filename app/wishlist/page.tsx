import { Container } from "@/components/layout/container";
import { PageIntro } from "@/components/layout/page-intro";
import { StoreShell } from "@/components/layout/store-shell";
import { WishlistPage } from "@/components/wishlist/wishlist-page";

export default function WishlistRoute() {
  return (
    <StoreShell>
      <PageIntro
        description="Retrouvez ici les produits que vous souhaitez revoir, comparer ou acheter plus tard."
        eyebrow="Favoris"
        title="Une selection a garder sous la main"
      />
      <Container>
        <WishlistPage />
      </Container>
    </StoreShell>
  );
}
