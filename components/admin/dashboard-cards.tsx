import { StatCard } from "@/components/ui/stat-card";
import { formatCurrency } from "@/lib/utils";
import type { DashboardMetrics } from "@/lib/types";

export function DashboardCards({ metrics }: { metrics: DashboardMetrics }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        hint="Toutes les commandes enregistrees sur la boutique."
        label="Commandes"
        value={metrics.totalOrders.toString()}
      />
      <StatCard
        hint="Genere par les commandes confirmees."
        label="Revenus"
        value={formatCurrency(metrics.totalRevenue)}
      />
      <StatCard
        hint="Commandes encore en attente de confirmation."
        label="En attente"
        value={metrics.pendingOrders.toString()}
      />
      <StatCard
        hint="Produit le plus vendu selon les quantites."
        label="Top vente"
        value={metrics.bestSellingProduct}
      />
    </div>
  );
}
