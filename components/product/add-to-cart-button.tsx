"use client";

import { useState } from "react";
import { Check, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart/cart-provider";
import type { Product } from "@/lib/types";

export function AddToCartButton({
  product,
  quantity = 1,
  variantId,
  variantLabel,
  className,
}: {
  product: Product;
  quantity?: number;
  variantId?: string | null;
  variantLabel?: string | null;
  className?: string;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <Button
      className={className}
      onClick={() => {
        addItem(product, { quantity, variantId, variantLabel });
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1400);
      }}
    >
      {added ? <Check className="mr-2 h-4 w-4" /> : <ShoppingCart className="mr-2 h-4 w-4" />}
      {added ? "Ajoute" : "Ajouter au panier"}
    </Button>
  );
}
