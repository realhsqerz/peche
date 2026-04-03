"use client";

import { useActionState } from "react";

import { loginAdmin } from "@/services/admin-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const initialState = {
  success: false,
  message: "",
};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAdmin, initialState);

  return (
    <form action={formAction} className="rounded-[2rem] border border-white/60 bg-white p-8 shadow-[0_35px_100px_-60px_rgba(11,60,93,0.55)]">
      <h1 className="font-serif text-4xl text-[var(--color-primary)]">Connexion administrateur</h1>
      <p className="mt-3 text-sm leading-7 text-slate-500">
        Connectez-vous avec lemail et le mot de passe crees dans Supabase Auth.
      </p>
      <div className="mt-8 space-y-4">
        <label className="space-y-2 text-sm font-medium text-slate-600">
          Email
          <Input name="email" placeholder="admin@example.com" required type="email" />
        </label>
        <label className="space-y-2 text-sm font-medium text-slate-600">
          Mot de passe
          <Input name="password" placeholder="••••••••" required type="password" />
        </label>
      </div>
      {state.message ? (
        <p className={`mt-4 text-sm ${state.success ? "text-emerald-600" : "text-red-600"}`}>
          {state.message}
        </p>
      ) : null}
      <Button className="mt-8 w-full" disabled={pending} type="submit">
        {pending ? "Connexion..." : "Se connecter"}
      </Button>
    </form>
  );
}
