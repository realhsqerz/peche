import { ProductCreateForm } from "@/components/admin/product-create-form";
import { ProductEditorCard } from "@/components/admin/product-editor-card";
import { SetupNotice } from "@/components/admin/setup-notice";
import { Badge } from "@/components/ui/badge";
import { hasSupabaseAdminEnv } from "@/lib/supabase/config";
import { getProducts } from "@/services/products";

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div className="space-y-6">
      {!hasSupabaseAdminEnv() ? <SetupNotice /> : null}
      <div>
        <Badge>Produits</Badge>
        <h1 className="mt-5 font-serif text-5xl text-[var(--color-primary)]">Gestion du catalogue</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
          Creez, mettez a jour et supprimez les produits avec des formulaires simples.
        </p>
      </div>
      <ProductCreateForm />
      <div className="grid gap-5">
        {products.map((product) => (
          <ProductEditorCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
