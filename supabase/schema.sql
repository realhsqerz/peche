create extension if not exists "pgcrypto";

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null,
  price numeric(10, 2) not null check (price >= 0),
  category text not null,
  stock integer not null default 0 check (stock >= 0),
  image_url text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  phone text not null,
  address text not null,
  total_price numeric(10, 2) not null check (total_price >= 0),
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'delivered')),
  created_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete restrict,
  quantity integer not null check (quantity > 0),
  price numeric(10, 2) not null check (price >= 0)
);

create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null unique,
  created_at timestamptz not null default now()
);

create index if not exists products_category_idx on public.products(category);
create index if not exists orders_created_at_idx on public.orders(created_at desc);
create index if not exists orders_status_idx on public.orders(status);
create index if not exists order_items_order_id_idx on public.order_items(order_id);
create index if not exists order_items_product_id_idx on public.order_items(product_id);
create index if not exists customers_phone_idx on public.customers(phone);

alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.customers enable row level security;

drop policy if exists "Public can read products" on public.products;
create policy "Public can read products"
on public.products
for select
to anon, authenticated
using (true);

drop policy if exists "Public can create orders" on public.orders;
create policy "Public can create orders"
on public.orders
for insert
to anon, authenticated
with check (status = 'pending');

drop policy if exists "Public can create order items" on public.order_items;
create policy "Public can create order items"
on public.order_items
for insert
to anon, authenticated
with check (quantity > 0 and price >= 0);

drop policy if exists "Public can create customers" on public.customers;
create policy "Public can create customers"
on public.customers
for insert
to anon, authenticated
with check (char_length(trim(name)) > 0 and char_length(trim(phone)) > 0);

drop policy if exists "Public can update existing customers by phone" on public.customers;
create policy "Public can update existing customers by phone"
on public.customers
for update
to anon, authenticated
using (true)
with check (char_length(trim(name)) > 0 and char_length(trim(phone)) > 0);

drop policy if exists "Authenticated full access products" on public.products;
create policy "Authenticated full access products"
on public.products
for all
to authenticated
using (true)
with check (true);

drop policy if exists "Authenticated full access orders" on public.orders;
create policy "Authenticated full access orders"
on public.orders
for all
to authenticated
using (true)
with check (true);

drop policy if exists "Authenticated full access order items" on public.order_items;
create policy "Authenticated full access order items"
on public.order_items
for all
to authenticated
using (true)
with check (true);

drop policy if exists "Authenticated full access customers" on public.customers;
create policy "Authenticated full access customers"
on public.customers
for all
to authenticated
using (true)
with check (true);

insert into storage.buckets (id, name, public)
values ('products', 'products', true)
on conflict (id) do nothing;

drop policy if exists "Public can view product images" on storage.objects;
create policy "Public can view product images"
on storage.objects
for select
to public
using (bucket_id = 'products');

drop policy if exists "Authenticated can manage product images" on storage.objects;
create policy "Authenticated can manage product images"
on storage.objects
for all
to authenticated
using (bucket_id = 'products')
with check (bucket_id = 'products');
