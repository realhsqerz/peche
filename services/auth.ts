import type { User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

import { hasSupabaseEnv } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function getAdminEmails() {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminUser(user: User | null) {
  if (!user?.email) {
    return false;
  }

  const adminEmails = getAdminEmails();

  if (!adminEmails.length) {
    return true;
  }

  return adminEmails.includes(user.email.toLowerCase());
}

export async function getCurrentUser() {
  if (!hasSupabaseEnv()) {
    return null;
  }

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return null;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function getAdminSession() {
  const user = await getCurrentUser();
  return isAdminUser(user) ? user : null;
}

export async function requireAdminSession() {
  const user = await getAdminSession();

  if (!user) {
    redirect("/admin/login");
  }

  return user;
}

export async function requireCustomerSession() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/account/login");
  }

  return user;
}
