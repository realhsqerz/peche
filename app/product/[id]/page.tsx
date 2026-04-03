import Image from "next/image";
import { notFound } from "next/navigation";
import { ShieldCheck, Truck } from "lucide-react";

import { Container } from "@/components/layout/container";
import { StoreShell } from "@/components/layout/store-shell";
import { ProductPurchasePanel } from "@/components/product/product-purchase-panel";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { getProductById } from "@/services/products";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <StoreShell>
      <Container className="grid gap-10 py-10 lg:grid-cols-[1fr_0.95fr] lg:py-16">
        <div className="relative min-h-[420px] overflow-hidden rounded-[2.5rem] shadow-[0_45px_120px_-60px_rgba(11,60,93,0.75)]">
          <Image
            alt={product.name}
            className="object-cover"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            src={product.imageUrl}
          />
        </div>
        <div>
          <Badge>{product.category}</Badge>
          <h1 className="mt-5 font-serif text-5xl leading-none text-[var(--color-primary)]">
            {product.name}
          </h1>
          <p className="mt-5 text-base leading-8 text-slate-600">{product.description}</p>
          <div className="mt-8 flex items-end gap-4">
            <span className="text-4xl font-semibold text-[var(--color-text)]">
              {formatCurrency(product.price)}
            </span>
            <span className="pb-1 text-sm text-slate-500">{product.stock} units available</span>
          </div>
          <ProductPurchasePanel product={product} />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <article className="rounded-[2rem] border border-white/60 bg-white p-5">
              <Truck className="h-5 w-5 text-[var(--color-secondary)]" />
              <h2 className="mt-4 text-lg font-semibold text-[var(--color-text)]">Livraison rapide</h2>
              <p className="mt-2 text-sm leading-7 text-slate-500">
                Les commandes sont pensees pour une livraison simple avec paiement a la livraison.
              </p>
            </article>
            <article className="rounded-[2rem] border border-white/60 bg-white p-5">
              <ShieldCheck className="h-5 w-5 text-[var(--color-secondary)]" />
              <h2 className="mt-4 text-lg font-semibold text-[var(--color-text)]">Gestion plus simple</h2>
              <p className="mt-2 text-sm leading-7 text-slate-500">
                Le stock et le suivi des commandes restent synchronises avec ladministration.
              </p>
            </article>
          </div>
        </div>
      </Container>
    </StoreShell>
  );
}
