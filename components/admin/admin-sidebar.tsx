import Link from "next/link";
import { BarChart3, Box, LogOut, PackageCheck, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { logoutAdmin } from "@/services/admin-actions";

const links = [
  { href: "/admin/dashboard", label: "Tableau de bord", icon: BarChart3 },
  { href: "/admin/products", label: "Produits", icon: Box },
  { href: "/admin/orders", label: "Commandes", icon: PackageCheck },
  { href: "/admin/customers", label: "Clients", icon: Users },
];

export function AdminSidebar() {
  return (
    <aside className="rounded-[2rem] bg-[var(--color-primary)] p-6 text-white">
      <p className="text-xs uppercase tracking-[0.3em] text-white/60">Administration</p>
      <p className="mt-3 font-serif text-3xl">Peche</p>
      <nav className="mt-8 space-y-2">
        {links.map(({ href, icon: Icon, label }) => (
          <Link
            className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
            href={href}
            key={href}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>
      <form action={logoutAdmin} className="mt-8">
        <Button className="w-full justify-center" type="submit" variant="secondary">
          <LogOut className="mr-2 h-4 w-4" />
          Deconnexion
        </Button>
      </form>
    </aside>
  );
}
