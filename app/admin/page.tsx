import { redirect } from "next/navigation";

import { getAdminSession } from "@/services/auth";

export default async function AdminEntryPage() {
  const adminUser = await getAdminSession();

  if (adminUser) {
    redirect("/admin/dashboard");
  }

  redirect("/admin/login");
}
