# Project: Fishing Gear E-Commerce Platform

## Overview
A modern e-commerce web application for a fishing equipment business.

Customers can browse products and place orders using cash on delivery.

The business owner has access to a simple admin dashboard to manage:
- Products
- Orders
- Customers
- Basic analytics

The system must be clean, fast, mobile-first, and extremely easy to use.

---

# Tech Stack

## Frontend
- Next.js (App Router)
- React
- Tailwind CSS

## Backend (Supabase)
- Supabase PostgreSQL database
- Supabase Auth (admin only)
- Supabase Storage (product images)

---

# Core Architecture

- Public app (customer-facing)
- Admin dashboard (protected routes)
- Supabase handles:
  - Database
  - Authentication
  - File storage

---

# Supabase Setup Requirements

## Authentication
- Only admin login allowed
- No public signup
- Use Supabase Auth (email + password)

---

## Storage
- Bucket: `products`
- Used for product images

---

# Database Schema (IMPORTANT)

## Table: products
- id (uuid, primary key)
- name (text)
- description (text)
- price (numeric)
- category (text)
- stock (integer)
- image_url (text)
- created_at (timestamp)

---

## Table: orders
- id (uuid, primary key)
- customer_name (text)
- phone (text)
- address (text)
- total_price (numeric)
- status (text) → default: "pending"
- created_at (timestamp)

---

## Table: order_items
- id (uuid, primary key)
- order_id (uuid, foreign key → orders.id)
- product_id (uuid, foreign key → products.id)
- quantity (integer)
- price (numeric)

---

## Table: customers
- id (uuid, primary key)
- name (text)
- phone (text)
- created_at (timestamp)

---

# Relationships

- One order → many order_items
- One product → many order_items
- Customers linked by phone (simple approach)

---

# Row Level Security (RLS)

## Public Access (Customers)
- Can:
  - Read products
  - Insert orders
  - Insert order_items
  - Insert customers

## Admin Access
- Full access to all tables

---

# API / Data Flow

## Customer Flow
1. Fetch products from Supabase
2. Add to cart (frontend state)
3. Submit order:
   - Insert into `orders`
   - Insert into `order_items`
   - Insert/update `customers`

---

## Admin Flow
- Fetch all products, orders, customers
- Update order status
- Manage products

---

# Pages Structure

## Public

### /
- Homepage
- Hero banner
- Featured products
- Categories

### /shop
- Product listing
- Filters

### /product/[id]
- Product details

### /cart
- Shopping cart

### /checkout
- Order form (cash on delivery)

---

## Admin

### /admin/login
- Admin authentication

### /admin/dashboard
- Overview stats

### /admin/products
- CRUD products

### /admin/orders
- Manage orders

### /admin/customers
- View customers

---

# UI Design System

## Colors

Primary:
- #0B3C5D (Deep Ocean Blue)

Secondary:
- #1CA7A6 (Teal)

Accent:
- #FF7F11 (CTA buttons)

Background:
- #F4F4F4

Text:
- #1B1B2F

---

## Style
- Fishing / ocean inspired
- Clean and modern
- Mobile-first
- Strong hierarchy
- Large images

---

# Components

- Navbar
- Footer
- ProductCard
- ProductGrid
- CartDrawer or CartPage
- CheckoutForm
- AdminSidebar
- AdminTable
- DashboardCards

---

# Key Features

## Customer
- Browse products
- Add to cart
- Place order (no login)

## Admin
- Manage products
- Manage orders (update status)
- View customers
- View analytics

---

# Analytics (Simple)
- Total orders
- Total revenue
- Best-selling products

---

# Order Status Flow
- pending → confirmed → delivered

---

# Performance Requirements
- Fast load time
- Optimized images
- Server components where possible

---

# Development Guidelines

- Use reusable components
- Separate public and admin layouts
- Use environment variables for Supabase keys
- Clean and scalable code

---

# Future Improvements (Not required now)

- Stripe payments
- User accounts
- Reviews system
- Multi-language

---

# Final Goal

Build a production-ready e-commerce platform that:
- Is visually premium
- Is easy for customers
- Is extremely simple for the business owner
- Helps increase sales efficiently



Generate:
- Full Next.js project structure
- Supabase client setup
- SQL schema for all tables
- Admin dashboard pages
- Public e-commerce pages
- Clean reusable components