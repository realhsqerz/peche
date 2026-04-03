import { redirect } from "next/navigation";

import { CustomerRegisterForm } from "@/components/auth/customer-register-form";
import { Container } from "@/components/layout/container";
import { getCurrentUser } from "@/services/auth";

export default async function CustomerRegisterPage() {
  const user = await getCurrentUser();

  if (user) {
    redirect("/account");
  }

  return (
    <Container className="grid min-h-screen place-items-center py-12">
      <div className="w-full max-w-xl">
        <CustomerRegisterForm />
      </div>
    </Container>
  );
}
