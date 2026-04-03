import { OrderStatusForm } from "@/components/admin/order-status-form";
import { SetupNotice } from "@/components/admin/setup-notice";
import { Badge } from "@/components/ui/badge";
import { hasSupabaseAdminEnv } from "@/lib/supabase/config";
import { formatCurrency, formatDate } from "@/lib/utils";
import { getAdminOrders } from "@/services/orders";

export default async function AdminOrdersPage() {
  const orders = await getAdminOrders();

  return (
    <div className="space-y-6">
      {!hasSupabaseAdminEnv() ? <SetupNotice /> : null}
      <div>
        <Badge>Commandes</Badge>
        <h1 className="mt-5 font-serif text-5xl text-[var(--color-primary)]">Gestion des commandes</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
          Faites passer les commandes de en attente a confirmee puis livree avec un flux simple.
        </p>
      </div>
      <div className="space-y-5">
        {orders.map((order) => (
          <article className="rounded-[2rem] bg-white p-6 shadow-[0_25px_80px_-60px_rgba(11,60,93,0.45)]" key={order.id}>
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">{formatDate(order.createdAt)}</p>
                <h2 className="mt-3 text-2xl font-semibold text-[var(--color-text)]">{order.customerName}</h2>
                <p className="mt-2 text-sm text-slate-500">{order.phone}</p>
                <p className="mt-1 whitespace-pre-line text-sm text-slate-500">
                  {order.address}
                </p>
                <p className="mt-4 text-lg font-semibold text-[var(--color-primary)]">
                  {formatCurrency(order.totalPrice)}
                </p>
              </div>
              <OrderStatusForm order={order} />
            </div>
            {order.items?.length ? (
              <div className="mt-5 border-t border-slate-100 pt-5 text-sm text-slate-500">
                {order.items.map((item) => (
                  <div className="flex items-center justify-between py-2" key={item.id}>
                    <span>
                      {item.product?.name ?? "Produit"}
                      {item.variantLabel ? ` (${item.variantLabel})` : ""} x {item.quantity}
                    </span>
                    <span>{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}
