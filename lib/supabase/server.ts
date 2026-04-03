import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

import { getSupabaseEnv, hasSupabaseEnv } from "@/lib/supabase/config";

export async function createSupabaseServerClient() {
  if (!hasSupabaseEnv()) {
    return null;
  }

  const cookieStore = await cookies();
  const { supabaseUrl, supabaseAnonKey } = getSupabaseEnv();

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookieList) {
        cookieList.forEach(({ name, value, options }) => {
          try {
            cookieStore.set(name, value, options);
          } catch {
            return;
          }
        });
      },
    },
  });
}
