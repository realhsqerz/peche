import Link from "next/link";

import { Container } from "@/components/layout/container";
import { PageIntro } from "@/components/layout/page-intro";
import { StoreShell } from "@/components/layout/store-shell";
import { Button } from "@/components/ui/button";
import { logoutCustomer } from "@/services/customer-actions";
import { requireCustomerSession } from "@/services/auth";

export default async function AccountPage() {
  const user = await requireCustomerSession();
  const firstName = user.user_metadata.first_name as string | undefined;
  const lastName = user.user_metadata.last_name as string | undefined;
  const fullName = [firstName, lastName].filter(Boolean).join(" ");

  return (
    <StoreShell>
      <PageIntro
        description="Votre compte client vous permet de retrouver vos favoris et de vous reconnecter facilement."
        eyebrow="Compte"
        title={fullName ? `Bon retour, ${fullName}` : "Compte client"}
      />
      <Container className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <section className="rounded-[2rem] border border-white/60 bg-white p-8 shadow-[0_35px_100px_-60px_rgba(11,60,93,0.55)]">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Profil</p>
          <h2 className="mt-4 text-3xl font-semibold text-[var(--color-text)]">
            {fullName || "Client"}
          </h2>
          <p className="mt-3 text-sm text-slate-500">{user.email}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/wishlist">
              <Button variant="secondary">Ouvrir les favoris</Button>
            </Link>
            <Link href="/shop">
              <Button>Continuer vos achats</Button>
            </Link>
          </div>
        </section>
        <aside className="rounded-[2rem] bg-[var(--color-primary)] p-8 text-white">
          <p className="text-sm uppercase tracking-[0.2em] text-white/60">Session</p>
          <p className="mt-4 text-sm leading-7 text-white/75">
            Ce compte est connecte via Supabase Auth. Utilisez le bouton ci-dessous pour vous deconnecter.
          </p>
          <form action={logoutCustomer} className="mt-8">
            <Button type="submit" variant="secondary">
              Se deconnecter
            </Button>
          </form>
        </aside>
      </Container>
    </StoreShell>
  );
}
