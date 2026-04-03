"use client";

import { Heart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useWishlist } from "@/components/wishlist/wishlist-provider";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/types";

export function WishlistButton({
  product,
  className,
  compact = false,
}: {
  product: Product;
  className?: string;
  compact?: boolean;
}) {
  const { hasItem, toggleItem, hydrated } = useWishlist();
  const active = hydrated && hasItem(product.id);

  return (
    <Button
      className={cn(
        compact ? "h-11 w-11 rounded-full px-0" : "",
        active ? "border border-red-200 bg-red-50 text-red-600 hover:bg-red-100" : "",
        className,
      )}
      onClick={() => toggleItem(product)}
      type="button"
      variant={active ? "ghost" : "secondary"}
    >
      <Heart className={cn("h-4 w-4", active ? "fill-current" : "")} />
      {compact ? null : <span className="ml-2">{active ? "Sauvegarde" : "Ajouter aux favoris"}</span>}
    </Button>
  );
}
