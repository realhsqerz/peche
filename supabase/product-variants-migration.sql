create table if not exists public.product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  name text not null,
  value text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists product_variants_product_id_idx
on public.product_variants(product_id, sort_order asc, created_at asc);

alter table public.product_variants enable row level security;

drop policy if exists "Public can read product variants" on public.product_variants;
create policy "Public can read product variants"
on public.product_variants
for select
to anon, authenticated
using (true);

drop policy if exists "Authenticated full access product variants" on public.product_variants;
create policy "Authenticated full access product variants"
on public.product_variants
for all
to authenticated
using (true)
with check (true);

alter table public.order_items
add column if not exists variant_id uuid references public.product_variants(id) on delete set null;

alter table public.order_items
add column if not exists variant_label text;
