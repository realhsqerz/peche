"use server";

import { revalidatePath } from "next/cache";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { hasSupabaseAdminEnv } from "@/lib/supabase/config";
import type { ActionState, CartItem } from "@/lib/types";

export async function placeOrder(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  if (!hasSupabaseAdminEnv()) {
    return {
      success: false,
      message: "Ajoutez les identifiants Supabase avant d'activer la commande en direct.",
    };
  }

  const firstName = formData.get("firstName")?.toString().trim() ?? "";
  const lastName = formData.get("lastName")?.toString().trim() ?? "";
  const phone = formData.get("phone")?.toString().trim() ?? "";
  const deliveryState = formData.get("deliveryState")?.toString().trim() ?? "";
  const address = formData.get("address")?.toString().trim() ?? "";
  const rawItems = formData.get("items")?.toString() ?? "[]";
  const customerName = `${firstName} ${lastName}`.replace(/\s+/g, " ").trim();
  const deliveryAddress = `${address}\n${deliveryState}`.trim();

  if (!firstName || !lastName || !phone || !deliveryState || !address) {
    return {
      success: false,
      message: "Le prenom, le nom, le telephone, la region et l'adresse sont obligatoires.",
    };
  }

  let items: CartItem[];

  try {
    items = JSON.parse(rawItems) as CartItem[];
  } catch {
    return {
      success: false,
      message: "Les donnees du panier sont invalides. Rechargez la page et reessayez.",
    };
  }

  if (!items.length) {
    return {
      success: false,
      message: "Votre panier est vide.",
    };
  }

  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return {
      success: false,
      message: "Le client administrateur Supabase n'a pas pu etre cree.",
    };
  }

  const { error: customerError } = await supabase.from("customers").upsert(
    {
      name: customerName,
      phone,
    },
    {
      onConflict: "phone",
    },
  );

  if (customerError) {
    return {
      success: false,
      message: customerError.message,
    };
  }

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      customer_name: customerName,
      phone,
      address: deliveryAddress,
      total_price: totalPrice,
      status: "pending",
    })
    .select("id")
    .single();

  if (orderError || !order) {
    return {
      success: false,
      message: orderError?.message ?? "La commande n'a pas pu etre creee.",
    };
  }

  const { error: itemsError } = await supabase.from("order_items").insert(
    items.map((item) => ({
      order_id: order.id,
      product_id: item.productId,
      variant_id: item.variantId ?? null,
      variant_label: item.variantLabel ?? null,
      quantity: item.quantity,
      price: item.price,
    })),
  );

  if (itemsError) {
    return {
      success: false,
      message: itemsError.message,
    };
  }

  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/orders");
  revalidatePath("/admin/customers");

  return {
    success: true,
    message: "Commande enregistree avec succes.",
  };
}
