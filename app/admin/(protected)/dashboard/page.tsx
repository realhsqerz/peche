import { SetupNotice } from "@/components/admin/setup-notice";
import { DashboardCards } from "@/components/admin/dashboard-cards";
import { Badge } from "@/components/ui/badge";
import { hasSupabaseAdminEnv } from "@/lib/supabase/config";
import { formatCurrency, formatDate } from "@/lib/utils";
import { getDashboardMetrics, getAdminOrders } from "@/services/orders";

export default async function AdminDashboardPage() {
  const [metrics, orders] = await Promise.all([getDashboardMetrics(), getAdminOrders()]);

  return (
    <>
      {!hasSupabaseAdminEnv() ? <SetupNotice /> : null}
      <div>
        <Badge>Tableau de bord</Badge>
        <h1 className="mt-5 font-serif text-5xl text-[var(--color-primary)]">Vue d ensemble</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
          Suivez les revenus, les commandes en attente et les meilleures ventes depuis un panneau compact.
        </p>
      </div>
      <DashboardCards metrics={metrics} />
      <section className="rounded-[2rem] bg-white p-6 shadow-[0_25px_80px_-60px_rgba(11,60,93,0.45)]">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-[var(--color-text)]">Dernieres commandes</h2>
            <p className="mt-2 text-sm text-slate-500">Activite recente des clients sur la boutique.</p>
          </div>
        </div>
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-slate-400">
              <tr>
                <th className="pb-4 pr-4 font-medium">Client</th>
                <th className="pb-4 pr-4 font-medium">Date</th>
                <th className="pb-4 pr-4 font-medium">Statut</th>
                <th className="pb-4 font-medium">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id}>
                  <td className="py-4 pr-4">
                    <div>
                      <p className="font-semibold text-[var(--color-text)]">{order.customerName}</p>
                      <p className="text-slate-500">{order.phone}</p>
                    </div>
                  </td>
                  <td className="py-4 pr-4 text-slate-500">{formatDate(order.createdAt)}</td>
                  <td className="py-4 pr-4">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 font-semibold text-[var(--color-primary)]">
                    {formatCurrency(order.totalPrice)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
