import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Fish, ShieldCheck, SunMedium, Truck } from "lucide-react";

import { Container } from "@/components/layout/container";
import { PageIntro } from "@/components/layout/page-intro";
import { StoreShell } from "@/components/layout/store-shell";
import { ProductGrid } from "@/components/product/product-grid";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { categories } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import { getFeaturedProducts } from "@/services/products";

const benefits = [
  {
    title: "Materiel pret pour la cote",
    description: "Cannes, moulinets et accessoires choisis pour la plage, les ports et les cotes rocheuses.",
    icon: Fish,
  },
  {
    title: "Paiement a la livraison",
    description: "Un passage en caisse simple, sans friction et sans obligation de compte.",
    icon: Truck,
  },
  {
    title: "Energie de bord de mer",
    description: "Une navigation plus directe et plus vivante, proche dune vraie boutique de peche.",
    icon: SunMedium,
  },
  {
    title: "Gestion fiable",
    description: "Une base simple pour les produits, commandes, comptes clients et favoris.",
    icon: ShieldCheck,
  },
];

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();
  const heroProducts = featuredProducts.slice(0, 3);
  const supportingProducts = heroProducts;

  return (
    <StoreShell>
      <section className="relative overflow-hidden pb-12 pt-10 sm:pb-16 sm:pt-14">
        <Container className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Badge>Materiel cotier pour pecheurs du quotidien</Badge>
            <h1 className="mt-6 max-w-3xl font-serif text-5xl leading-none font-extrabold text-[var(--color-primary)] sm:text-6xl lg:text-7xl">
              Plus de produits.
              <br />
              Moins de vitrine trop chic.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Peche prend maintenant une direction plus fraiche, plus coloree et plus
              commercante, avec des produits visibles des le premier ecran.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink href="/shop">
                Voir la boutique
                <ArrowRight className="ml-2 h-4 w-4" />
              </ButtonLink>
              <ButtonLink href="/wishlist" variant="secondary">
                Voir les favoris
              </ButtonLink>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {benefits.slice(0, 3).map(({ title, icon: Icon }) => (
                <div
                  className="inline-flex items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-sm font-semibold text-[var(--color-primary)] shadow-[0_18px_44px_-32px_rgba(0,114,184,0.45)]"
                  key={title}
                >
                  <Icon className="h-4 w-4" />
                  {title}
                </div>
              ))}
            </div>
          </div>

          {supportingProducts.length ? (
            <div className="grid gap-4">
              {supportingProducts.map((product) => (
                <Link
                  className="coastal-card glossy-card grid gap-4 rounded-[2rem] p-4 sm:grid-cols-[120px_1fr]"
                  href={`/product/${product.id}`}
                  key={product.id}
                >
                  <div className="relative h-32 overflow-hidden rounded-[1.5rem]">
                    <Image
                      alt={product.name}
                      className="object-cover"
                      fill
                      priority
                      sizes="120px"
                      src={product.imageUrl}
                    />
                  </div>
                  <div className="flex flex-col justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.22em] text-cyan-800/55">
                        {product.category}
                      </p>
                      <h3 className="mt-2 text-xl font-extrabold text-[var(--color-text)]">
                        {product.name}
                      </h3>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-lg font-extrabold text-[var(--color-primary)]">
                        {formatCurrency(product.price)}
                      </span>
                      <span className="text-sm font-semibold text-cyan-800/65">
                        Voir le produit
                      </span>
                    </div>
                  </div>
                </Link>
              ))}

              <div className="sand-strip rounded-[2rem] p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-cyan-900/50">
                  Achat rapide
                </p>
                <p className="mt-3 text-xl font-extrabold text-[var(--color-primary)]">
                  Les produits avant tout. Moins de distractions.
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Les clients arrivent directement sur les produits, les prix et les acces au panier.
                </p>
              </div>
            </div>
          ) : (
            <div className="ocean-panel relative overflow-hidden rounded-[2.5rem] p-8 text-white shadow-[0_45px_120px_-58px_rgba(0,114,184,0.72)]">
              <div className="absolute -right-10 top-6 h-28 w-28 rounded-full bg-white/20 blur-2xl" />
              <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-[#ffd54a]/32 blur-3xl" />
              <p className="text-sm uppercase tracking-[0.28em] text-white/70">Au bord de leau</p>
              <h2 className="mt-4 max-w-sm text-3xl font-extrabold leading-tight">
                Pense pour ressembler a une vraie boutique de peche en bord de mer.
              </h2>
            </div>
          )}
        </Container>
      </section>

      <Container className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {benefits.map(({ title, description, icon: Icon }) => (
          <article
            className="rounded-[1.75rem] bg-white/88 p-5 shadow-[0_18px_50px_-44px_rgba(0,114,184,0.18)] backdrop-blur-[2px]"
            key={title}
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--color-foam)] text-[var(--color-primary)]">
              <Icon className="h-5 w-5" />
            </div>
            <h2 className="mt-5 text-xl font-extrabold text-[var(--color-text)]">{title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
          </article>
        ))}
      </Container>

      <PageIntro
        description="Parcourez la boutique comme les clients achetent vraiment pour les sorties cotieres : cannes, moulinets, leurres, ligne et accessoires."
        eyebrow="Categories"
        title="Un catalogue plus direct et plus vivant"
      />
      <Container className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {categories.map((category) => (
          <Link
            className="sand-strip rounded-[2rem] p-6 transition hover:-translate-y-1 hover:shadow-[0_24px_70px_-55px_rgba(15,92,120,0.45)]"
            href={`/shop?category=${encodeURIComponent(category)}`}
            key={category}
          >
            <p className="text-sm uppercase tracking-[0.25em] text-teal-900/45">Categorie</p>
            <h3 className="mt-5 font-serif text-3xl font-extrabold text-[var(--color-primary)]">{category}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Explorez des {category.toLowerCase()} adaptes aux sorties en mer et a un achat plus simple.
            </p>
          </Link>
        ))}
      </Container>

      <PageIntro
        description="Une selection mise en avant, facile a parcourir, avec un style plus commercant et plus clair."
        eyebrow="Selection"
        title="Produits populaires a acheter rapidement"
      />
      <Container>
        <ProductGrid products={featuredProducts} />
      </Container>
    </StoreShell>
  );
}
