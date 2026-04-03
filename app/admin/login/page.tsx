import { redirect } from "next/navigation";

import { Container } from "@/components/layout/container";
import { LoginForm } from "@/components/admin/login-form";
import { SetupNotice } from "@/components/admin/setup-notice";
import { hasSupabaseEnv } from "@/lib/supabase/config";
import { getAdminSession } from "@/services/auth";

export default async function AdminLoginPage() {
  const session = await getAdminSession();

  if (session) {
    redirect("/admin/dashboard");
  }

  return (
    <Container className="grid min-h-screen place-items-center py-12">
      <div className="w-full max-w-xl space-y-6">
        {!hasSupabaseEnv() ? <SetupNotice /> : null}
        <LoginForm />
      </div>
    </Container>
  );
}
