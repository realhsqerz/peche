"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";

import { AddToCartButton } from "@/components/product/add-to-cart-button";
import { ButtonLink } from "@/components/ui/button-link";
import { EmptyState } from "@/components/ui/empty-state";
import { useWishlist } from "@/components/wishlist/wishlist-provider";
import { formatCurrency } from "@/lib/utils";
import type { Product } from "@/lib/types";

export function WishlistPage() {
  const { items, hydrated, removeItem } = useWishlist();

  if (!hydrated) {
    return (
      <div className="rounded-[2rem] bg-white p-8 text-sm text-slate-500">
        Loading wishlist...
      </div>
    );
  }

  if (!items.length) {
    return (
      <EmptyState
        actionHref="/shop"
        actionLabel="Voir les produits"
        description="Enregistrez les produits que vous voulez comparer, revoir ou acheter plus tard."
        title="Votre liste de favoris est vide"
      />
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => {
        const wishlistProduct: Product = {
          id: item.productId,
          name: item.name,
          description: "",
          price: item.price,
          category: item.category,
          stock: 99,
          imageUrl: item.imageUrl,
          createdAt: "",
        };

        return (
          <article
            className="overflow-hidden rounded-[2rem] border border-white/60 bg-white shadow-[0_35px_100px_-60px_rgba(11,60,93,0.55)]"
            key={item.productId}
          >
            <Link className="relative block h-72" href={`/product/${item.productId}`}>
              <Image
                alt={item.name}
                className="object-cover"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                src={item.imageUrl}
              />
            </Link>
            <div className="space-y-4 p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{item.category}</p>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-[var(--color-text)]">{item.name}</h2>
                  <p className="mt-3 text-xl font-semibold text-[var(--color-primary)]">
                    {formatCurrency(item.price)}
                  </p>
                </div>
                <button
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-red-100 text-red-600 transition hover:bg-red-50"
                  onClick={() => removeItem(item.productId)}
                  type="button"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                <ButtonLink href={`/product/${item.productId}`} variant="secondary">
                  {item.hasVariants ? "Choisir les options" : "Voir le produit"}
                </ButtonLink>
                {item.hasVariants ? null : <AddToCartButton product={wishlistProduct} />}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
