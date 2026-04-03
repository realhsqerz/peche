"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

import { AddToCartButton } from "@/components/product/add-to-cart-button";
import { WishlistButton } from "@/components/product/wishlist-button";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/lib/types";

export function ProductPurchasePanel({ product }: { product: Product }) {
  const variants = product.variants ?? [];
  const [quantity, setQuantity] = useState(1);
  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    variants[0]?.id ?? "",
  );

  const selectedVariant =
    variants.find((variant) => variant.id === selectedVariantId) ?? null;

  const selectedVariantLabel = selectedVariant
    ? `${selectedVariant.name}: ${selectedVariant.value}`
    : null;

  return (
    <div className="mt-8 space-y-6">
      {variants.length ? (
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
            Variante
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            {variants.map((variant) => {
              const label = `${variant.name}: ${variant.value}`;
              const selected = variant.id === selectedVariantId;

              return (
                <button
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                    selected
                      ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white"
                      : "border-slate-200 bg-white text-slate-600 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                  }`}
                  key={variant.id}
                  onClick={() => setSelectedVariantId(variant.id)}
                  type="button"
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
          Quantite
        </p>
        <div className="mt-3 inline-flex items-center rounded-full border border-slate-200 bg-white p-1">
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-100"
            onClick={() => setQuantity((current) => Math.max(1, current - 1))}
            type="button"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="min-w-12 text-center text-base font-semibold">{quantity}</span>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-100"
            onClick={() => setQuantity((current) => Math.min(product.stock, current + 1))}
            type="button"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {selectedVariantLabel ? <Badge>{selectedVariantLabel}</Badge> : null}

      <div className="flex flex-wrap gap-3">
        <AddToCartButton
          className="w-full sm:w-auto"
          product={product}
          quantity={quantity}
          variantId={selectedVariant?.id ?? null}
          variantLabel={selectedVariantLabel}
        />
        <WishlistButton product={product} />
      </div>
    </div>
  );
}
