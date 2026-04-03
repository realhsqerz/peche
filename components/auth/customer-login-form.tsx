"use client";

import Link from "next/link";
import { useActionState } from "react";

import { loginCustomer } from "@/services/customer-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const initialState = {
  success: false,
  message: "",
};

export function CustomerLoginForm() {
  const [state, formAction, pending] = useActionState(loginCustomer, initialState);

  return (
    <form action={formAction} className="rounded-[2rem] border border-white/60 bg-white p-8 shadow-[0_35px_100px_-60px_rgba(11,60,93,0.55)]">
      <h1 className="font-serif text-4xl text-[var(--color-primary)]">Connexion client</h1>
      <p className="mt-3 text-sm leading-7 text-slate-500">
        Connectez-vous pour retrouver vos favoris et garder votre activite liee a votre compte.
      </p>
      <div className="mt-8 space-y-4">
        <label className="space-y-2 text-sm font-medium text-slate-600">
          Email
          <Input name="email" required type="email" />
        </label>
        <label className="space-y-2 text-sm font-medium text-slate-600">
          Mot de passe
          <Input name="password" required type="password" />
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
      <p className="mt-4 text-sm text-slate-500">
        Pas encore de compte ?{" "}
        <Link className="font-semibold text-[var(--color-primary)]" href="/account/register">
          Creer un compte
        </Link>
      </p>
    </form>
  );
}
