import { AlertTriangle } from "lucide-react";

export function SetupNotice() {
  return (
    <div className="rounded-[2rem] border border-amber-200 bg-amber-50 p-6 text-amber-900">
      <div className="flex items-center gap-3">
        <AlertTriangle className="h-5 w-5" />
        <p className="text-sm font-semibold uppercase tracking-[0.2em]">
          Configuration Supabase requise
        </p>
      </div>
      <p className="mt-3 text-sm leading-7">
        Ladministration affiche des donnees de demonstration tant que vous navez pas
        ajoute lURL Supabase, la cle anon et la cle service role dans `.env.local`.
      </p>
    </div>
  );
}
