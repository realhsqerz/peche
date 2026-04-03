"use client";

import { useActionState } from "react";

import { updateOrderStatusAction } from "@/services/admin-actions";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { orderStatuses } from "@/lib/constants";
import type { Order } from "@/lib/types";

const initialState = {
  success: false,
  message: "",
};

export function OrderStatusForm({ order }: { order: Order }) {
  const [state, formAction, pending] = useActionState(updateOrderStatusAction, initialState);

  return (
    <form action={formAction} className="flex flex-wrap items-center gap-3">
      <input name="id" type="hidden" value={order.id} />
      <Select className="min-w-40" defaultValue={order.status} name="status">
        {orderStatuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </Select>
      <Button disabled={pending} type="submit" variant="secondary">
        {pending ? "Enregistrement..." : "Mettre a jour"}
      </Button>
      {state.message ? (
        <span className={`text-sm ${state.success ? "text-emerald-600" : "text-red-600"}`}>
          {state.message}
        </span>
      ) : null}
    </form>
  );
}
