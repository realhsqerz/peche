"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";

import { useCart } from "@/components/cart/cart-provider";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { formatCurrency } from "@/lib/utils";

export function CartPage() {
  const { items, subtotal, removeItem, updateQuantity, hydrated } = useCart();

  if (!hydrated) {
    return <div className="rounded-[2rem] bg-white p-8 text-sm text-slate-500">Chargement du panier...</div>;
  }

  if (!items.length) {
    return (
      <EmptyState
        actionHref="/shop"
        actionLabel="Voir les produits"
        description="Ajoutez des cannes, moulinets et accessoires a votre panier avant de passer commande."
        title="Votre panier est vide"
      />
    );
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[1.3fr_0.7fr]">
      <div className="space-y-5">
        {items.map((item) => (
          <article
            className="grid gap-5 rounded-[2rem] border border-white/60 bg-white p-5 shadow-[0_30px_80px_-60px_rgba(11,60,93,0.55)] sm:grid-cols-[120px_1fr]"
            key={item.cartKey}
          >
            <div className="relative h-32 overflow-hidden rounded-[1.5rem]">
              <Image alt={item.name} className="object-cover" fill sizes="120px" src={item.imageUrl} />
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{item.category}</p>
                <h3 className="mt-2 text-xl font-semibold text-[var(--color-text)]">{item.name}</h3>
                {item.variantLabel ? (
                  <p className="mt-1 text-sm font-medium text-[var(--color-primary)]">
                    {item.variantLabel}
                  </p>
                ) : null}
                <p className="mt-2 text-sm text-slate-500">{formatCurrency(item.price)} each</p>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 p-1">
                  <button
                    className="flex h-9 w-9 items-center justify-center rounded-full text-slate-600 transition hover:bg-white"
                    onClick={() => updateQuantity(item.cartKey, item.quantity - 1)}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="min-w-10 text-center text-sm font-semibold">{item.quantity}</span>
                  <button
                    className="flex h-9 w-9 items-center justify-center rounded-full text-slate-600 transition hover:bg-white"
                    onClick={() => updateQuantity(item.cartKey, item.quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <p className="min-w-24 text-right text-lg font-semibold text-[var(--color-primary)]">
                  {formatCurrency(item.price * item.quantity)}
                </p>
                <button
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-red-100 text-red-600 transition hover:bg-red-50"
                  onClick={() => removeItem(item.cartKey)}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <aside className="h-fit rounded-[2rem] border border-white/60 bg-[var(--color-primary)] p-6 text-white shadow-[0_30px_100px_-60px_rgba(11,60,93,0.75)]">
        <p className="text-sm uppercase tracking-[0.25em] text-white/60">Resume de commande</p>
        <div className="mt-6 space-y-4 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-white/70">Sous-total</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white/70">Livraison</span>
            <span>Paiement a la livraison</span>
          </div>
        </div>
        <div className="mt-6 border-t border-white/15 pt-6">
          <div className="flex items-center justify-between">
            <span className="text-white/70">Total</span>
            <span className="text-2xl font-semibold">{formatCurrency(subtotal)}</span>
          </div>
        </div>
        <Link className="mt-6 block" href="/checkout">
          <Button className="w-full">Passer a la commande</Button>
        </Link>
      </aside>
    </div>
  );
}
