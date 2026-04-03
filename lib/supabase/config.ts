export function getSupabaseEnv() {
  return {
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
  };
}

export function hasSupabaseEnv() {
  const { supabaseUrl, supabaseAnonKey } = getSupabaseEnv();
  return Boolean(supabaseUrl && supabaseAnonKey);
}

export function hasSupabaseAdminEnv() {
  const { supabaseUrl, supabaseAnonKey, supabaseServiceRoleKey } =
    getSupabaseEnv();
  return Boolean(supabaseUrl && supabaseAnonKey && supabaseServiceRoleKey);
}
