# Peche

Peche is a production-oriented coastal fishing e-commerce app built with Next.js App Router, Tailwind CSS, and Supabase.

It includes:
- Public storefront
- Customer account auth
- Wishlist
- Client-side cart
- Cash-on-delivery checkout
- Protected admin dashboard
- Product image upload support with Supabase Storage

## Stack

- Next.js 16
- React 19
- Tailwind CSS 4
- Supabase Auth, Database, and Storage
- TypeScript

## Features

- Home, shop, product, cart, checkout, wishlist, and account pages
- Admin login and protected admin routes
- Product CRUD
- Order management
- Customer listing
- Product variants
- Local product image uploads from admin to Supabase Storage
- Seed script for starter catalog

## Project Structure

```text
app/
components/
hooks/
lib/
scripts/
services/
supabase/
public/products/
```

## Environment Variables

Create `.env.local` with:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_EMAILS=
```

Notes:
- Keep `.env.local` out of Git.
- `ADMIN_EMAILS` should contain the email addresses allowed into the admin area.

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Run the database setup in Supabase SQL editor:

```text
supabase/schema.sql
supabase/product-variants-migration.sql
```

3. Start the app:

```bash
npm run dev
```

4. Open:

```text
http://localhost:3000
```

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run seed:products
```

## Admin Access

- Create an email/password user in Supabase Auth
- Add that email to `ADMIN_EMAILS`
- Visit `/admin`

## Seeding Starter Products

After configuring Supabase and adding the SQL schema, you can seed starter products:

```bash
npm run seed:products
```

The starter product images are served from `public/products`.

## Deployment Notes

- Do not commit `.env.local`
- Run the SQL files before using live product variants
- Ensure the `products` storage bucket exists in Supabase

