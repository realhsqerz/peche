import type { ReactNode } from "react";

import { Container } from "@/components/layout/container";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { hasSupabaseEnv } from "@/lib/supabase/config";
import { requireAdminSession } from "@/services/auth";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  if (hasSupabaseEnv()) {
    await requireAdminSession();
  }

  return (
    <Container className="grid gap-8 py-10 lg:grid-cols-[280px_1fr]">
      <AdminSidebar />
      <div className="space-y-6">{children}</div>
    </Container>
  );
}
