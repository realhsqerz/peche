import { demoProducts } from "@/lib/demo-data";
import { hasSupabaseEnv } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Product, ProductVariant } from "@/lib/types";

type ProductFilter = {
  query?: string;
  category?: string;
};

function mapProduct(row: {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image_url: string | null;
  created_at: string;
  product_variants?: Array<{
    id: string;
    product_id: string;
    name: string;
    value: string;
    sort_order: number;
  }>;
}): Product {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    price: Number(row.price),
    category: row.category,
    stock: row.stock,
    imageUrl:
      row.image_url ||
      "https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&w=1200&q=80",
    createdAt: row.created_at,
    variants:
      row.product_variants?.map(
        (variant): ProductVariant => ({
          id: variant.id,
          productId: variant.product_id,
          name: variant.name,
          value: variant.value,
          sortOrder: variant.sort_order,
        }),
      ) ?? [],
  };
}

function attachVariants(products: Product[], variants: ProductVariant[]) {
  const variantsByProductId = new Map<string, ProductVariant[]>();

  variants.forEach((variant) => {
    const bucket = variantsByProductId.get(variant.productId) ?? [];
    bucket.push(variant);
    variantsByProductId.set(variant.productId, bucket);
  });

  return products.map((product) => ({
    ...product,
    variants:
      variantsByProductId.get(product.id)?.sort(
        (left, right) => left.sortOrder - right.sortOrder,
      ) ?? product.variants ?? [],
  }));
}

function filterProducts(products: Product[], filter?: ProductFilter) {
  return products.filter((product) => {
    const matchesQuery = filter?.query
      ? [product.name, product.description, product.category]
          .join(" ")
          .toLowerCase()
          .includes(filter.query.toLowerCase())
      : true;
    const matchesCategory = filter?.category
      ? product.category === filter.category
      : true;

    return matchesQuery && matchesCategory;
  });
}

export async function getProducts(filter?: ProductFilter) {
  if (!hasSupabaseEnv()) {
    return filterProducts(demoProducts, filter);
  }

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return filterProducts(demoProducts, filter);
  }

  const { data, error } = await supabase
    .from("products")
    .select("id, name, description, price, category, stock, image_url, created_at")
    .order("created_at", { ascending: false });

  if (error || !data) {
    return filterProducts(demoProducts, filter);
  }

  const products = data.map(mapProduct);

  const { data: variantRows } = await supabase
    .from("product_variants")
    .select("id, product_id, name, value, sort_order")
    .order("sort_order", { ascending: true });

  const variants =
    variantRows?.map(
      (variant): ProductVariant => ({
        id: variant.id,
        productId: variant.product_id,
        name: variant.name,
        value: variant.value,
        sortOrder: variant.sort_order,
      }),
    ) ?? [];

  return filterProducts(attachVariants(products, variants), filter);
}

export async function getFeaturedProducts() {
  const products = await getProducts();
  const featuredProducts = products.filter((product) => product.featured);
  return (featuredProducts.length ? featuredProducts : products).slice(0, 4);
}

export async function getProductById(id: string) {
  const products = await getProducts();
  return products.find((product) => product.id === id) ?? null;
}
