"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Menu, ShoppingBag, User, Waves, X } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/constants";
import { useCart } from "@/components/cart/cart-provider";
import { useWishlist } from "@/components/wishlist/wishlist-provider";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/shop", label: "Boutique" },
  { href: "/wishlist", label: "Favoris" },
  { href: "/cart", label: "Panier" },
  { href: "/account", label: "Compte" },
];

export function SiteHeader() {
  const { itemCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(21,91,115,0.08)] bg-[rgba(247,251,251,0.84)] backdrop-blur-xl">
      <Container className="py-3 lg:h-20 lg:py-0">
        <div className="flex items-center justify-between gap-3">
          <Link className="flex min-w-0 items-center gap-3" href="/">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[1.2rem] bg-[linear-gradient(145deg,#1c7088,#4ca7ae)] text-white shadow-[0_18px_42px_-24px_rgba(21,91,115,0.55)] sm:h-12 sm:w-12 sm:rounded-[1.4rem]">
              <Waves className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="truncate font-serif text-xl font-extrabold tracking-tight text-[var(--color-primary)] sm:text-2xl">
                {siteConfig.name}
              </p>
              <p className="hidden text-xs uppercase tracking-[0.3em] text-teal-700/65 sm:block">
                Peche Cotiere
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex xl:gap-7">
            {links.map((link) => (
              <Link
                className="text-sm font-semibold text-slate-600 transition hover:text-[var(--color-primary)]"
                href={link.href}
                key={link.href}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/wishlist">
              <Button className="relative h-10 w-10 rounded-2xl px-0 sm:h-11 lg:w-11 lg:px-0 xl:w-auto xl:px-4" variant="secondary">
                <Heart className="h-4 w-4 xl:mr-2" />
                <span className="hidden xl:inline">Favoris</span>
                <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--color-primary)] px-1.5 text-[10px] text-white xl:static xl:ml-3 xl:h-6 xl:min-w-6 xl:px-2 xl:text-xs">
                  {wishlistCount}
                </span>
              </Button>
            </Link>
            <Link href="/cart">
              <Button className="relative h-10 w-10 rounded-2xl px-0 sm:h-11 lg:w-11 lg:px-0 xl:w-auto xl:px-4" variant="secondary">
                <ShoppingBag className="h-4 w-4 xl:mr-2" />
                <span className="hidden xl:inline">Panier</span>
                <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--color-primary)] px-1.5 text-[10px] text-white xl:static xl:ml-3 xl:h-6 xl:min-w-6 xl:px-2 xl:text-xs">
                  {itemCount}
                </span>
              </Button>
            </Link>
            <Link href="/account">
              <Button className="h-10 w-10 rounded-2xl px-0 sm:h-11 lg:w-11 lg:px-0 xl:w-auto xl:px-4" variant="secondary">
                <User className="h-4 w-4 xl:mr-2" />
                <span className="hidden xl:inline">Compte</span>
              </Button>
            </Link>
            <button
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white lg:hidden"
              onClick={() => setIsMobileMenuOpen((value) => !value)}
              type="button"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 text-[var(--color-primary)]" />
              ) : (
                <Menu className="h-5 w-5 text-[var(--color-primary)]" />
              )}
            </button>
          </div>
        </div>

        <div
          className={cn(
            "grid overflow-hidden transition-[grid-template-rows,opacity,margin] duration-300 lg:hidden",
            isMobileMenuOpen ? "mt-4 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0",
          )}
        >
          <nav className="min-h-0 overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/75 p-3 shadow-[0_20px_60px_-48px_rgba(21,91,115,0.42)] backdrop-blur-xl">
            <div className="grid gap-2">
              {links.map((link) => (
                <Link
                  className="rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-[var(--color-foam)] hover:text-[var(--color-primary)]"
                  href={link.href}
                  key={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </Container>
    </header>
  );
}
