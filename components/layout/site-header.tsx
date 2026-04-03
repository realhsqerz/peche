"use client";

import Link from "next/link";
import { Heart, Menu, ShoppingBag, User, Waves } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/constants";
import { useCart } from "@/components/cart/cart-provider";
import { useWishlist } from "@/components/wishlist/wishlist-provider";

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

  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(21,91,115,0.08)] bg-[rgba(247,251,251,0.84)] backdrop-blur-xl">
      <Container className="flex h-20 items-center justify-between">
        <Link className="flex items-center gap-3" href="/">
          <div className="flex h-12 w-12 items-center justify-center rounded-[1.4rem] bg-[linear-gradient(145deg,#1c7088,#4ca7ae)] text-white shadow-[0_18px_42px_-24px_rgba(21,91,115,0.55)]">
            <Waves className="h-5 w-5" />
          </div>
          <div>
            <p className="font-serif text-2xl font-extrabold tracking-tight text-[var(--color-primary)]">
              {siteConfig.name}
            </p>
            <p className="text-xs uppercase tracking-[0.3em] text-teal-700/65">
              Peche Cotiere
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
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

        <div className="flex items-center gap-3">
          <Link href="/wishlist">
            <Button className="relative px-4" variant="secondary">
              <Heart className="mr-2 h-4 w-4" />
              Favoris
              <span className="ml-3 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-[var(--color-primary)] px-2 text-xs text-white">
                {wishlistCount}
              </span>
            </Button>
          </Link>
          <Link href="/cart">
            <Button className="relative px-4" variant="secondary">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Panier
              <span className="ml-3 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-[var(--color-primary)] px-2 text-xs text-white">
                {itemCount}
              </span>
            </Button>
          </Link>
          <Link href="/account">
            <Button className="px-4" variant="secondary">
              <User className="mr-2 h-4 w-4" />
              Compte
            </Button>
          </Link>
          <button className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white md:hidden">
            <Menu className="h-5 w-5 text-[var(--color-primary)]" />
          </button>
        </div>
      </Container>
    </header>
  );
}
