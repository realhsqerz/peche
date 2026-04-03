import { SetupNotice } from "@/components/admin/setup-notice";
import { Badge } from "@/components/ui/badge";
import { hasSupabaseAdminEnv } from "@/lib/supabase/config";
import { formatDate } from "@/lib/utils";
import { getCustomers } from "@/services/orders";

export default async function AdminCustomersPage() {
  const customers = await getCustomers();

  return (
    <div className="space-y-6">
      {!hasSupabaseAdminEnv() ? <SetupNotice /> : null}
      <div>
        <Badge>Clients</Badge>
        <h1 className="mt-5 font-serif text-5xl text-[var(--color-primary)]">Liste des clients</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
          Consultez les fiches clients liees au numero de telephone pour un suivi simple.
        </p>
      </div>
      <section className="rounded-[2rem] bg-white p-6 shadow-[0_25px_80px_-60px_rgba(11,60,93,0.45)]">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-slate-400">
              <tr>
                <th className="pb-4 pr-4 font-medium">Client</th>
                <th className="pb-4 pr-4 font-medium">Telephone</th>
                <th className="pb-4 pr-4 font-medium">Cree le</th>
                <th className="pb-4 font-medium">Commandes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td className="py-4 pr-4 font-semibold text-[var(--color-text)]">{customer.name}</td>
                  <td className="py-4 pr-4 text-slate-500">{customer.phone}</td>
                  <td className="py-4 pr-4 text-slate-500">{formatDate(customer.createdAt)}</td>
                  <td className="py-4 font-semibold text-[var(--color-primary)]">{customer.orderCount ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
