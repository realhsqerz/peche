import { Fish, MapPinned, Phone } from "lucide-react";

import { Container } from "@/components/layout/container";
import { siteConfig } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-white/60 bg-[linear-gradient(180deg,rgba(232,251,255,0.5),rgba(255,242,216,0.75))] py-12">
      <Container className="grid gap-8 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <p className="font-serif text-3xl font-extrabold text-[var(--color-primary)]">{siteConfig.name}</p>
          <p className="mt-3 max-w-md text-sm leading-7 text-slate-500">
            Du materiel lumineux, une energie de bord de mer, et une boutique prete pour
            le port, la plage et les sorties du matin.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
            Contact
          </p>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <p className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-[var(--color-secondary)]" />
              {siteConfig.phone}
            </p>
            <p className="flex items-center gap-3">
              <MapPinned className="h-4 w-4 text-[var(--color-secondary)]" />
              Livraison sur le littoral tunisien
            </p>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
            Engagement
          </p>
          <p className="mt-4 flex items-start gap-3 text-sm leading-7 text-slate-600">
            <Fish className="mt-1 h-4 w-4 text-[var(--color-accent)]" />
            Paiement a la livraison, parcours dachat plus rapide, et style cotier plus
            vivant sur mobile comme sur desktop.
          </p>
        </div>
      </Container>
    </footer>
  );
}
