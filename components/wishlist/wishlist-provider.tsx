"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { Product, WishlistItem } from "@/lib/types";

const STORAGE_KEY = "peche-wishlist";

type WishlistContextValue = {
  items: WishlistItem[];
  itemCount: number;
  hydrated: boolean;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  toggleItem: (product: Product) => void;
  hasItem: (productId: string) => boolean;
  clearWishlist: () => void;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored) as WishlistItem[]);
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

  const value = useMemo<WishlistContextValue>(
    () => ({
      items,
      hydrated,
      itemCount: items.length,
      addItem(product) {
        setItems((currentItems) => {
          if (currentItems.some((item) => item.productId === product.id)) {
            return currentItems;
          }

          return [
            ...currentItems,
            {
              productId: product.id,
              name: product.name,
              price: product.price,
              imageUrl: product.imageUrl,
              category: product.category,
              hasVariants: Boolean(product.variants?.length),
            },
          ];
        });
      },
      removeItem(productId) {
        setItems((currentItems) =>
          currentItems.filter((item) => item.productId !== productId),
        );
      },
      toggleItem(product) {
        setItems((currentItems) => {
          if (currentItems.some((item) => item.productId === product.id)) {
            return currentItems.filter((item) => item.productId !== product.id);
          }

          return [
            ...currentItems,
            {
              productId: product.id,
              name: product.name,
              price: product.price,
              imageUrl: product.imageUrl,
              category: product.category,
              hasVariants: Boolean(product.variants?.length),
            },
          ];
        });
      },
      hasItem(productId) {
        return items.some((item) => item.productId === productId);
      },
      clearWishlist() {
        setItems([]);
      },
    }),
    [hydrated, items],
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error("useWishlist must be used within WishlistProvider");
  }

  return context;
}
