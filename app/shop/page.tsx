import { Container } from "@/components/layout/container";
import { PageIntro } from "@/components/layout/page-intro";
import { StoreShell } from "@/components/layout/store-shell";
import { ProductGrid } from "@/components/product/product-grid";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { categories } from "@/lib/constants";
import { getProducts } from "@/services/products";

export default async function ShopPage({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string; category?: string; ordered?: string }>;
}) {
  const params = searchParams ? await searchParams : undefined;
  const products = await getProducts({
    query: params?.query,
    category: params?.category,
  });

  return (
    <StoreShell>
      <PageIntro
        description="Utilisez les filtres pour passer rapidement entre cannes, moulinets, accessoires et autres essentiels."
        eyebrow="Boutique"
        title="Parcourir toute la collection"
      />
      <Container>
        {params?.ordered ? (
          <div className="mb-6 rounded-[2rem] border border-emerald-200 bg-emerald-50 p-5 text-sm text-emerald-700">
            Votre commande a bien ete enregistree.
          </div>
        ) : null}
        <form className="coastal-card mb-8 grid gap-4 rounded-[2rem] p-5 lg:grid-cols-[1fr_220px_160px]">
          <Input defaultValue={params?.query} name="query" placeholder="Rechercher un produit" />
          <Select defaultValue={params?.category ?? ""} name="category">
            <option value="">Toutes les categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
          <button className="rounded-2xl bg-[var(--color-primary)] px-5 py-3 text-sm font-semibold text-white" type="submit">
            Filtrer
          </button>
        </form>

        {products.length ? (
          <ProductGrid products={products} />
        ) : (
          <EmptyState
            actionHref="/shop"
            actionLabel="Reinitialiser"
            description="Essayez une recherche plus large ou retirez le filtre pour voir tout le catalogue."
            title="Aucun produit ne correspond a votre recherche"
          />
        )}
      </Container>
    </StoreShell>
  );
}
