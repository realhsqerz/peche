import { createClient } from "@supabase/supabase-js";

import { getSupabaseEnv, hasSupabaseAdminEnv } from "@/lib/supabase/config";

export function createSupabaseAdminClient() {
  if (!hasSupabaseAdminEnv()) {
    return null;
  }

  const { supabaseUrl, supabaseServiceRoleKey } = getSupabaseEnv();

  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
