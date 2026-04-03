"use client";

import { useActionState, useEffect, useEffectEvent, useRef } from "react";
import { useRouter } from "next/navigation";

import { placeOrder } from "@/services/store-actions";
import { useCart } from "@/components/cart/cart-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/utils";

const initialState = {
  success: false,
  message: "",
};

export function CheckoutForm() {
  const router = useRouter();
  const { items, subtotal, clearCart, hydrated } = useCart();
  const [state, formAction, pending] = useActionState(placeOrder, initialState);
  const hasHandledSuccessRef = useRef(false);

  const handleSuccessfulCheckout = useEffectEvent(() => {
    clearCart();
    router.replace("/shop?ordered=1");
  });

  useEffect(() => {
    if (!state.success || hasHandledSuccessRef.current) {
      return;
    }

    hasHandledSuccessRef.current = true;
    handleSuccessfulCheckout();
  }, [state.success]);

  useEffect(() => {
    if (!state.success) {
      hasHandledSuccessRef.current = false;
    }
  }, [state.success]);

  if (!hydrated) {
    return <div className="rounded-[2rem] bg-white p-8 text-sm text-slate-500">Chargement de la commande...</div>;
  }

  return (
    <form action={formAction} className="grid gap-6 xl:grid-cols-[1fr_380px]">
      <div className="rounded-[2rem] border border-white/60 bg-white p-6 shadow-[0_35px_100px_-60px_rgba(11,60,93,0.55)]">
        <h2 className="text-2xl font-semibold text-[var(--color-text)]">Informations de livraison</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="space-y-2 text-sm font-medium text-slate-600">
            Prenom
            <Input name="firstName" placeholder="Prenom" required />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-600">
            Nom
            <Input name="lastName" placeholder="Nom" required />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-600">
            Telephone
            <Input name="phone" placeholder="+216 ..." required />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-600">
            Region / gouvernorat
            <Input name="deliveryState" placeholder="Tunis, Sousse, Sfax..." required />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-600 sm:col-span-2">
            Adresse
            <Textarea
              name="address"
              placeholder="Rue, quartier, appartement et remarques de livraison"
              required
            />
          </label>
        </div>
        <input name="items" type="hidden" value={JSON.stringify(items)} />
        {state.message ? (
          <p className={`mt-4 text-sm ${state.success ? "text-emerald-600" : "text-red-600"}`}>
            {state.message}
          </p>
        ) : null}
      </div>

      <aside className="h-fit rounded-[2rem] bg-[var(--color-primary)] p-6 text-white">
        <p className="text-sm uppercase tracking-[0.25em] text-white/60">Paiement a la livraison</p>
        <div className="mt-6 space-y-3 text-sm">
          {items.map((item) => (
            <div className="flex items-center justify-between gap-3" key={item.cartKey}>
              <span className="text-white/70">
                {item.name}
                {item.variantLabel ? ` (${item.variantLabel})` : ""} x {item.quantity}
              </span>
              <span>{formatCurrency(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 border-t border-white/15 pt-6">
          <div className="flex items-center justify-between">
            <span className="text-white/70">Total</span>
            <span className="text-2xl font-semibold">{formatCurrency(subtotal)}</span>
          </div>
        </div>
        <Button className="mt-6 w-full" disabled={!items.length || pending} type="submit">
          {pending ? "Validation..." : "Confirmer la commande"}
        </Button>
      </aside>
    </form>
  );
}
