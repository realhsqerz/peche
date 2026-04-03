"use server";

import { redirect } from "next/navigation";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/config";
import type { ActionState } from "@/lib/types";

export async function loginCustomer(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  if (!hasSupabaseEnv()) {
    return {
      success: false,
      message: "Les variables d'environnement Supabase sont manquantes.",
    };
  }

  const email = formData.get("email")?.toString().trim() ?? "";
  const password = formData.get("password")?.toString().trim() ?? "";
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return {
      success: false,
      message: "Le client Supabase n'a pas pu etre cree.",
    };
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  redirect("/account");
}

export async function registerCustomer(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  if (!hasSupabaseEnv()) {
    return {
      success: false,
      message: "Les variables d'environnement Supabase sont manquantes.",
    };
  }

  const firstName = formData.get("firstName")?.toString().trim() ?? "";
  const lastName = formData.get("lastName")?.toString().trim() ?? "";
  const email = formData.get("email")?.toString().trim() ?? "";
  const password = formData.get("password")?.toString().trim() ?? "";
  const supabase = await createSupabaseServerClient();

  if (!firstName || !lastName || !email || !password) {
    return {
      success: false,
      message: "Le prenom, le nom, l'email et le mot de passe sont obligatoires.",
    };
  }

  if (!supabase) {
    return {
      success: false,
      message: "Le client Supabase n'a pas pu etre cree.",
    };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    },
  });

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  if (data.session) {
    redirect("/account");
  }

  return {
    success: true,
    message:
      "Compte cree. Si la confirmation email est activee dans Supabase, verifiez votre boite mail avant de vous connecter.",
  };
}

export async function logoutCustomer() {
  const supabase = await createSupabaseServerClient();
  await supabase?.auth.signOut();
  redirect("/");
}
