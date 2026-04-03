import Image from "next/image";
import Link from "next/link";

import { AddToCartButton } from "@/components/product/add-to-cart-button";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { WishlistButton } from "@/components/product/wishlist-button";
import { formatCurrency } from "@/lib/utils";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="coastal-card group overflow-hidden rounded-[2rem] transition hover:-translate-y-1">
      <div className="relative h-72 overflow-hidden">
        <div className="absolute right-4 top-4 z-10">
          <WishlistButton compact product={product} />
        </div>
        <Link className="block h-full" href={`/product/${product.id}`}>
          <Image
            alt={product.name}
            className="object-cover transition duration-500 group-hover:scale-105"
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            src={product.imageUrl}
          />
        </Link>
      </div>
      <div className="space-y-4 p-6">
        <div className="flex items-center justify-between gap-4">
          <Badge>{product.category}</Badge>
          <span className="text-sm font-medium text-cyan-800/60">{product.stock} in stock</span>
        </div>
        <div>
          <Link href={`/product/${product.id}`}>
            <h3 className="text-2xl font-extrabold text-[var(--color-text)] transition hover:text-[var(--color-primary)]">
              {product.name}
            </h3>
          </Link>
          <p className="mt-3 line-clamp-2 text-sm leading-7 text-slate-500">
            {product.description}
          </p>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-2xl font-semibold text-[var(--color-primary)]">
            {formatCurrency(product.price)}
          </span>
          {product.variants?.length ? (
            <ButtonLink href={`/product/${product.id}`} variant="secondary">
              Choose options
            </ButtonLink>
          ) : (
            <AddToCartButton product={product} />
          )}
        </div>
      </div>
    </article>
  );
}
