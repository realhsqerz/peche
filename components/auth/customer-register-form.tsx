"use client";

import Link from "next/link";
import { useActionState } from "react";

import { registerCustomer } from "@/services/customer-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const initialState = {
  success: false,
  message: "",
};

export function CustomerRegisterForm() {
  const [state, formAction, pending] = useActionState(registerCustomer, initialState);

  return (
    <form action={formAction} className="rounded-[2rem] border border-white/60 bg-white p-8 shadow-[0_35px_100px_-60px_rgba(11,60,93,0.55)]">
      <h1 className="font-serif text-4xl text-[var(--color-primary)]">Creer un compte</h1>
      <p className="mt-3 text-sm leading-7 text-slate-500">
        Creez votre compte client pour vous reconnecter facilement et garder une experience dachat plus simple.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-slate-600">
          Prenom
          <Input name="firstName" required />
        </label>
        <label className="space-y-2 text-sm font-medium text-slate-600">
          Nom
          <Input name="lastName" required />
        </label>
        <label className="space-y-2 text-sm font-medium text-slate-600 sm:col-span-2">
          Email
          <Input name="email" required type="email" />
        </label>
        <label className="space-y-2 text-sm font-medium text-slate-600 sm:col-span-2">
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
        {pending ? "Creation..." : "Creer le compte"}
      </Button>
      <p className="mt-4 text-sm text-slate-500">
        Deja inscrit ?{" "}
        <Link className="font-semibold text-[var(--color-primary)]" href="/account/login">
          Se connecter
        </Link>
      </p>
    </form>
  );
}
