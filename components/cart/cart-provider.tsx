"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { CartItem, Product } from "@/lib/types";

const STORAGE_KEY = "peche-cart";

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (
    product: Product,
    options?: { quantity?: number; variantId?: string | null; variantLabel?: string | null },
  ) => void;
  removeItem: (cartKey: string) => void;
  updateQuantity: (cartKey: string, quantity: number) => void;
  clearCart: () => void;
  hydrated: boolean;
};

const CartContext = createContext<CartContextValue | null>(null);

function buildCartKey(productId: string, variantId?: string | null, variantLabel?: string | null) {
  return `${productId}::${variantId ?? variantLabel ?? "default"}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored) as CartItem[]);
      }
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [hydrated, items]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      hydrated,
      itemCount: items.reduce((total, item) => total + item.quantity, 0),
      subtotal: items.reduce((total, item) => total + item.price * item.quantity, 0),
      addItem(product, options) {
        const quantity = options?.quantity ?? 1;
        const variantId = options?.variantId ?? null;
        const variantLabel = options?.variantLabel ?? null;
        const cartKey = buildCartKey(product.id, variantId, variantLabel);

        setItems((currentItems) => {
          const existingItem = currentItems.find((item) => item.cartKey === cartKey);

          if (existingItem) {
            return currentItems.map((item) =>
              item.cartKey === cartKey
                ? {
                    ...item,
                    quantity: Math.min(item.quantity + quantity, item.stock),
                  }
                : item,
            );
          }

          return [
            ...currentItems,
            {
              cartKey,
              productId: product.id,
              variantId,
              variantLabel,
              name: product.name,
              price: product.price,
              imageUrl: product.imageUrl,
              category: product.category,
              quantity,
              stock: product.stock,
            },
          ];
        });
      },
      removeItem(cartKey) {
        setItems((currentItems) =>
          currentItems.filter((item) => item.cartKey !== cartKey),
        );
      },
      updateQuantity(cartKey, quantity) {
        if (quantity <= 0) {
          setItems((currentItems) =>
            currentItems.filter((item) => item.cartKey !== cartKey),
          );
          return;
        }

        setItems((currentItems) =>
          currentItems.map((item) =>
            item.cartKey === cartKey
              ? {
                  ...item,
                  quantity: Math.min(quantity, item.stock),
                }
              : item,
          ),
        );
      },
      clearCart() {
        setItems([]);
      },
    }),
    [hydrated, items],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}
