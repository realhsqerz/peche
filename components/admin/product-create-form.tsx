"use client";

import { useActionState } from "react";

import { createProductAction } from "@/services/admin-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const initialState = {
  success: false,
  message: "",
};

export function ProductCreateForm() {
  const [state, formAction, pending] = useActionState(createProductAction, initialState);

  return (
    <form
      action={formAction}
      className="rounded-[2rem] bg-white p-6 shadow-[0_25px_80px_-60px_rgba(11,60,93,0.45)]"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-[var(--color-text)]">Ajouter un produit</h2>
          <p className="mt-2 text-sm text-slate-500">Creez des produits pour la boutique.</p>
        </div>
        <Button disabled={pending} type="submit">
          {pending ? "Enregistrement..." : "Creer le produit"}
        </Button>
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-slate-600">
          Nom
          <Input name="name" required />
        </label>
        <label className="space-y-2 text-sm font-medium text-slate-600">
          Categorie
          <Input name="category" required />
        </label>
        <label className="space-y-2 text-sm font-medium text-slate-600">
          Prix
          <Input min="0" name="price" required step="0.01" type="number" />
        </label>
        <label className="space-y-2 text-sm font-medium text-slate-600">
          Stock
          <Input min="0" name="stock" required type="number" />
        </label>
        <label className="space-y-2 text-sm font-medium text-slate-600 lg:col-span-2">
          Image du produit
          <input
            accept="image/*"
            className="block w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-[var(--color-text)] file:mr-4 file:rounded-full file:border-0 file:bg-[var(--color-primary)] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
            name="imageFile"
            required
            type="file"
          />
          <p className="text-xs text-slate-400">Importez un JPG, PNG, WEBP ou AVIF jusqua 5 Mo.</p>
        </label>
        <label className="space-y-2 text-sm font-medium text-slate-600 lg:col-span-2">
          Description
          <Textarea name="description" required />
        </label>
        <label className="space-y-2 text-sm font-medium text-slate-600 lg:col-span-2">
          Variantes
          <Textarea
            name="variants"
            placeholder={"Size: 2.1m\nSize: 2.4m\nColor: Blue"}
          />
          <p className="text-xs text-slate-400">
            Une variante par ligne au format `Nom: Valeur`. Laissez vide si
            le produit na pas de variantes.
          </p>
        </label>
      </div>
      {state.message ? (
        <p className={`mt-4 text-sm ${state.success ? "text-emerald-600" : "text-red-600"}`}>
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
