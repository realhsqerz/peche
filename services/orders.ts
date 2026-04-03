import { demoCustomers, demoMetrics, demoOrders, demoProducts } from "@/lib/demo-data";
import { hasSupabaseAdminEnv } from "@/lib/supabase/config";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { Customer, DashboardMetrics, Order, Product } from "@/lib/types";

function productLookup() {
  return new Map(demoProducts.map((product) => [product.id, product]));
}

function mapOrder(row: {
  id: string;
  customer_name: string;
  phone: string;
  address: string;
  total_price: number;
  status: Order["status"];
  created_at: string;
  order_items?: Array<{
    id: string;
    order_id: string;
    product_id: string;
    variant_id?: string | null;
    variant_label?: string | null;
    quantity: number;
    price: number;
    products?: {
      id: string;
      name: string;
      image_url: string | null;
      category: string;
    } | null;
  }>;
}): Order {
  return {
    id: row.id,
    customerName: row.customer_name,
    phone: row.phone,
    address: row.address,
    totalPrice: Number(row.total_price),
    status: row.status,
    createdAt: row.created_at,
    items: row.order_items?.map((item) => ({
      id: item.id,
      orderId: item.order_id,
      productId: item.product_id,
      variantId: item.variant_id ?? null,
      variantLabel: item.variant_label ?? null,
      quantity: item.quantity,
      price: Number(item.price),
      product: item.products
        ? {
            id: item.products.id,
            name: item.products.name,
            imageUrl:
              item.products.image_url ||
              "https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&w=1200&q=80",
            category: item.products.category,
          }
        : undefined,
    })),
  };
}

function mapCustomer(row: {
  id: string;
  name: string;
  phone: string;
  created_at: string;
}): Customer {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    createdAt: row.created_at,
  };
}

export async function getAdminOrders() {
  if (!hasSupabaseAdminEnv()) {
    return demoOrders;
  }

  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return demoOrders;
  }

  const baseSelect =
    "id, customer_name, phone, address, total_price, status, created_at, order_items(id, order_id, product_id, quantity, price, products(id, name, image_url, category))";
  const withVariantsSelect =
    "id, customer_name, phone, address, total_price, status, created_at, order_items(id, order_id, product_id, variant_id, variant_label, quantity, price, products(id, name, image_url, category))";

  const primaryResult = await supabase
    .from("orders")
    .select(withVariantsSelect)
    .order("created_at", { ascending: false });

  const queryResult = primaryResult.error
    ? await supabase
      .from("orders")
      .select(baseSelect)
      .order("created_at", { ascending: false })
    : primaryResult;

  if (queryResult.error || !queryResult.data) {
    return demoOrders;
  }

  return queryResult.data.map((row) => mapOrder(row as never));
}

export async function getCustomers() {
  if (!hasSupabaseAdminEnv()) {
    return demoCustomers;
  }

  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return demoCustomers;
  }

  const { data, error } = await supabase
    .from("customers")
    .select("id, name, phone, created_at")
    .order("created_at", { ascending: false });

  if (error || !data) {
    return demoCustomers;
  }

  const customers = data.map((row) => mapCustomer(row as never));
  const orders = await getAdminOrders();

  return customers.map((customer) => ({
    ...customer,
    orderCount: orders.filter((order) => order.phone === customer.phone).length,
  }));
}

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  if (!hasSupabaseAdminEnv()) {
    return demoMetrics;
  }

  const orders = await getAdminOrders();

  if (!orders.length) {
    return {
      totalOrders: 0,
      totalRevenue: 0,
      bestSellingProduct: "No sales yet",
      pendingOrders: 0,
    };
  }

  const tally = new Map<string, { quantity: number; product: Product | null }>();
  const fallbackProducts = productLookup();

  orders.forEach((order) => {
    order.items?.forEach((item) => {
      const entry = tally.get(item.productId) ?? {
        quantity: 0,
        product: item.product
          ? {
              id: item.product.id,
              name: item.product.name,
              category: item.product.category,
              imageUrl: item.product.imageUrl,
              description: "",
              price: item.price,
              stock: 0,
              createdAt: "",
            }
          : fallbackProducts.get(item.productId) ?? null,
      };

      entry.quantity += item.quantity;
      tally.set(item.productId, entry);
    });
  });

  const bestSellingProduct =
    [...tally.values()].sort((left, right) => right.quantity - left.quantity)[0]
      ?.product?.name ?? "No sales yet";

  return {
    totalOrders: orders.length,
    totalRevenue: orders.reduce((total, order) => total + order.totalPrice, 0),
    bestSellingProduct,
    pendingOrders: orders.filter((order) => order.status === "pending").length,
  };
}
