"use client";

import Image from "next/image";
import { useActionState } from "react";

import { deleteProductAction, updateProductAction } from "@/services/admin-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Product } from "@/lib/types";

const initialState = {
  success: false,
  message: "",
};

export function ProductEditorCard({ product }: { product: Product }) {
  const [state, formAction, pending] = useActionState(updateProductAction, initialState);

  return (
    <article className="rounded-[2rem] border border-white/60 bg-white p-6 shadow-[0_25px_80px_-60px_rgba(11,60,93,0.45)]">
      <form action={formAction}>
        <input name="id" type="hidden" value={product.id} />
        <input name="currentImageUrl" type="hidden" value={product.imageUrl} />
        <div className="grid gap-4 lg:grid-cols-2">
          <label className="space-y-2 text-sm font-medium text-slate-600">
            Nom
            <Input defaultValue={product.name} name="name" required />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-600">
            Categorie
            <Input defaultValue={product.category} name="category" required />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-600">
            Prix
            <Input defaultValue={product.price} min="0" name="price" required step="0.01" type="number" />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-600">
            Stock
            <Input defaultValue={product.stock} min="0" name="stock" required type="number" />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-600 lg:col-span-2">
            Description
            <Textarea defaultValue={product.description} name="description" required />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-600 lg:col-span-2">
          Variantes
            <Textarea
              defaultValue={(product.variants ?? [])
                .map((variant) => `${variant.name}: ${variant.value}`)
                .join("\n")}
              name="variants"
              placeholder={"Size: 2.1m\nSize: 2.4m\nColor: Blue"}
            />
            <p className="text-xs text-slate-400">
              Une variante par ligne au format `Nom: Valeur`. Laissez vide pour supprimer
              les variantes.
            </p>
          </label>
        </div>
        <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <p className="text-sm font-medium text-slate-600">Image actuelle</p>
          <div className="mt-3 grid gap-4 md:grid-cols-[120px_1fr] md:items-center">
            <div className="relative h-28 overflow-hidden rounded-2xl">
              <Image
                alt={product.name}
                className="object-cover"
                fill
                sizes="120px"
                src={product.imageUrl}
              />
            </div>
            <p className="truncate text-sm text-[var(--color-primary)]">{product.imageUrl}</p>
          </div>
        </div>
        <label className="mt-4 block space-y-2 text-sm font-medium text-slate-600">
          Remplacer limage
          <input
            accept="image/*"
            className="block w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-[var(--color-text)] file:mr-4 file:rounded-full file:border-0 file:bg-[var(--color-primary)] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
            name="imageFile"
            type="file"
          />
          <p className="text-xs text-slate-400">Laissez vide pour conserver limage actuelle.</p>
        </label>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Button disabled={pending} type="submit" variant="secondary">
            {pending ? "Mise a jour..." : "Mettre a jour"}
          </Button>
          {state.message ? (
            <p className={`text-sm ${state.success ? "text-emerald-600" : "text-red-600"}`}>
              {state.message}
            </p>
          ) : null}
        </div>
      </form>
      <form action={deleteProductAction} className="mt-3">
        <input name="id" type="hidden" value={product.id} />
        <input name="imageUrl" type="hidden" value={product.imageUrl} />
        <Button type="submit" variant="danger">
          Supprimer
        </Button>
      </form>
    </article>
  );
}
