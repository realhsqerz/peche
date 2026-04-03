"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { hasSupabaseAdminEnv, hasSupabaseEnv } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { ActionState, OrderStatus } from "@/lib/types";
import { isAdminUser } from "@/services/auth";

function parsePrice(value: FormDataEntryValue | null) {
  return Number(value?.toString() ?? "0");
}

function parseStock(value: FormDataEntryValue | null) {
  return Number(value?.toString() ?? "0");
}

function getProductImagePath(imageUrl: string) {
  const projectUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const baseUrl = projectUrl ?? "";

  if (!imageUrl || !baseUrl) {
    return null;
  }

  const publicPrefix = `${baseUrl}/storage/v1/object/public/products/`;

  if (!imageUrl.startsWith(publicPrefix)) {
    return null;
  }

  return decodeURIComponent(imageUrl.slice(publicPrefix.length));
}

function getFileExtension(fileName: string) {
  const extension = fileName.split(".").pop()?.toLowerCase() ?? "jpg";
  return extension.replace(/[^a-z0-9]/g, "") || "jpg";
}

function parseVariantsInput(input: string) {
  return input
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => {
      const separatorIndex = line.indexOf(":");
      const hasNamedVariant = separatorIndex > 0;
      const name = hasNamedVariant ? line.slice(0, separatorIndex).trim() : "Option";
      const value = hasNamedVariant ? line.slice(separatorIndex + 1).trim() : line;

      if (!value) {
        throw new Error(`Variant line ${index + 1} is invalid. Use "Name: Value".`);
      }

      return {
        name,
        value,
        sort_order: index,
      };
    });
}

async function uploadProductImage(file: File) {
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    throw new Error("Supabase admin client could not be created.");
  }

  const extension = getFileExtension(file.name);
  const filePath = `${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}.${extension}`;
  const fileBuffer = Buffer.from(await file.arrayBuffer());

  const { error } = await supabase.storage.from("products").upload(filePath, fileBuffer, {
    contentType: file.type || "application/octet-stream",
    upsert: false,
  });

  if (error) {
    throw new Error(error.message);
  }

  const { data } = supabase.storage.from("products").getPublicUrl(filePath);

  return {
    path: filePath,
    publicUrl: data.publicUrl,
  };
}

async function removeProductImage(imageUrl: string) {
  const imagePath = getProductImagePath(imageUrl);

  if (!imagePath) {
    return;
  }

  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return;
  }

  await supabase.storage.from("products").remove([imagePath]);
}

async function syncProductVariants(productId: string, rawVariants: string) {
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    throw new Error("Supabase admin client could not be created.");
  }

  const variants = parseVariantsInput(rawVariants);

  const { error: deleteError } = await supabase
    .from("product_variants")
    .delete()
    .eq("product_id", productId);

  if (deleteError) {
    throw new Error(
      `${deleteError.message}. Run supabase/product-variants-migration.sql before using variants.`,
    );
  }

  if (!variants.length) {
    return;
  }

  const { error: insertError } = await supabase.from("product_variants").insert(
    variants.map((variant) => ({
      product_id: productId,
      ...variant,
    })),
  );

  if (insertError) {
    throw new Error(
      `${insertError.message}. Run supabase/product-variants-migration.sql before using variants.`,
    );
  }
}

async function resolveProductImage({
  fileEntry,
  currentImageUrl,
  required,
}: {
  fileEntry: FormDataEntryValue | null;
  currentImageUrl?: string;
  required: boolean;
}) {
  const file = fileEntry instanceof File ? fileEntry : null;
  const hasUpload = Boolean(file && file.size > 0);

  if (!hasUpload) {
    if (required && !currentImageUrl) {
      throw new Error("Select an image from your computer before saving the product.");
    }

    return currentImageUrl ?? "";
  }

  if (file && !file.type.startsWith("image/")) {
    throw new Error("Only image files are allowed.");
  }

  if (file && file.size > 5 * 1024 * 1024) {
    throw new Error("Image files must be 5MB or smaller.");
  }

  const uploadedImage = await uploadProductImage(file as File);

  if (currentImageUrl) {
    await removeProductImage(currentImageUrl);
  }

  return uploadedImage.publicUrl;
}

export async function loginAdmin(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  if (!hasSupabaseEnv()) {
    return {
      success: false,
      message: "Add Supabase URL and anon key before admin authentication can work.",
    };
  }

  const email = formData.get("email")?.toString().trim() ?? "";
  const password = formData.get("password")?.toString().trim() ?? "";

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return {
      success: false,
      message: "Supabase client could not be created.",
    };
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!isAdminUser(user)) {
    await supabase.auth.signOut();

    return {
      success: false,
      message:
        process.env.ADMIN_EMAILS?.trim()
          ? "This account is not allowed to access the admin area."
          : "Set ADMIN_EMAILS in .env.local to restrict admin access before using customer accounts.",
    };
  }

  redirect("/admin/dashboard");
}

export async function logoutAdmin() {
  const supabase = await createSupabaseServerClient();
  await supabase?.auth.signOut();
  redirect("/admin/login");
}

export async function createProductAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  if (!hasSupabaseAdminEnv()) {
    return {
      success: false,
      message: "Add the service role key to enable product writes.",
    };
  }

  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return {
      success: false,
      message: "Supabase admin client could not be created.",
    };
  }

  let imageUrl = "";

  try {
    imageUrl = await resolveProductImage({
      fileEntry: formData.get("imageFile"),
      required: true,
    });
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Image upload failed.",
    };
  }

  const payload = {
    name: formData.get("name")?.toString().trim() ?? "",
    description: formData.get("description")?.toString().trim() ?? "",
    price: parsePrice(formData.get("price")),
    category: formData.get("category")?.toString().trim() ?? "",
    stock: parseStock(formData.get("stock")),
    image_url: imageUrl,
  };

  const { data: createdProduct, error } = await supabase
    .from("products")
    .insert(payload)
    .select("id")
    .single();

  if (error || !createdProduct) {
    return {
      success: false,
      message: error?.message ?? "Product could not be created.",
    };
  }

  const variantsInput = formData.get("variants")?.toString() ?? "";

  if (variantsInput.trim()) {
    try {
      await syncProductVariants(createdProduct.id, variantsInput);
    } catch (variantError) {
      return {
        success: false,
        message:
          variantError instanceof Error
            ? variantError.message
            : "Product variants could not be saved.",
      };
    }
  }

  revalidatePath("/admin/products");
  revalidatePath("/shop");
  revalidatePath("/");

  return {
    success: true,
    message: "Product created successfully.",
  };
}

export async function updateProductAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  if (!hasSupabaseAdminEnv()) {
    return {
      success: false,
      message: "Add the service role key to enable product updates.",
    };
  }

  const id = formData.get("id")?.toString() ?? "";
  const currentImageUrl = formData.get("currentImageUrl")?.toString().trim() ?? "";
  const variantsInput = formData.get("variants")?.toString() ?? "";
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return {
      success: false,
      message: "Supabase admin client could not be created.",
    };
  }

  let imageUrl = currentImageUrl;

  try {
    imageUrl = await resolveProductImage({
      fileEntry: formData.get("imageFile"),
      currentImageUrl,
      required: false,
    });
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Image upload failed.",
    };
  }

  const { error } = await supabase
    .from("products")
    .update({
      name: formData.get("name")?.toString().trim() ?? "",
      description: formData.get("description")?.toString().trim() ?? "",
      price: parsePrice(formData.get("price")),
      category: formData.get("category")?.toString().trim() ?? "",
      stock: parseStock(formData.get("stock")),
      image_url: imageUrl,
    })
    .eq("id", id);

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  try {
    await syncProductVariants(id, variantsInput);
  } catch (variantError) {
    return {
      success: false,
      message:
        variantError instanceof Error
          ? variantError.message
          : "Product variants could not be updated.",
    };
  }

  revalidatePath("/admin/products");
  revalidatePath("/shop");
  revalidatePath(`/product/${id}`);

  return {
    success: true,
    message: "Product updated successfully.",
  };
}

export async function deleteProductAction(formData: FormData) {
  if (!hasSupabaseAdminEnv()) {
    return;
  }

  const id = formData.get("id")?.toString() ?? "";
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return;
  }

  const imageUrl = formData.get("imageUrl")?.toString().trim() ?? "";

  await supabase.from("products").delete().eq("id", id);
  await removeProductImage(imageUrl);

  revalidatePath("/admin/products");
  revalidatePath("/shop");
  revalidatePath("/");
}

export async function updateOrderStatusAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  if (!hasSupabaseAdminEnv()) {
    return {
      success: false,
      message: "Add the service role key to enable order updates.",
    };
  }

  const id = formData.get("id")?.toString() ?? "";
  const status = formData.get("status")?.toString() as OrderStatus;
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return {
      success: false,
      message: "Supabase admin client could not be created.",
    };
  }

  const { error } = await supabase.from("orders").update({ status }).eq("id", id);

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  revalidatePath("/admin/orders");
  revalidatePath("/admin/dashboard");

  return {
    success: true,
    message: "Order status updated.",
  };
}
