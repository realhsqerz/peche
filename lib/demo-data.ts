import type { Customer, DashboardMetrics, Order, Product } from "@/lib/types";

export const demoProducts: Product[] = [
  {
    id: "8a0f1d1d-7f84-4b2c-8fd0-5f4d2a9d1001",
    name: "Ocean Drift Spinning Rod",
    description:
      "A lightweight carbon rod built for long casts from rocky coasts and harbor walls.",
    price: 289,
    category: "Rods",
    stock: 12,
    imageUrl:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2026-03-01T09:00:00.000Z",
    featured: true,
    variants: [
      {
        id: "variant-rod-1",
        productId: "8a0f1d1d-7f84-4b2c-8fd0-5f4d2a9d1001",
        name: "Length",
        value: "2.1m",
        sortOrder: 0,
      },
      {
        id: "variant-rod-2",
        productId: "8a0f1d1d-7f84-4b2c-8fd0-5f4d2a9d1001",
        name: "Length",
        value: "2.4m",
        sortOrder: 1,
      },
    ],
  },
  {
    id: "8a0f1d1d-7f84-4b2c-8fd0-5f4d2a9d1002",
    name: "Harbor Steel Reel 4000",
    description:
      "Salt-ready spinning reel with sealed drag, balanced rotor, and smooth retrieval.",
    price: 199,
    category: "Reels",
    stock: 9,
    imageUrl:
      "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2026-03-02T09:00:00.000Z",
    featured: true,
    variants: [
      {
        id: "variant-reel-1",
        productId: "8a0f1d1d-7f84-4b2c-8fd0-5f4d2a9d1002",
        name: "Size",
        value: "3000",
        sortOrder: 0,
      },
      {
        id: "variant-reel-2",
        productId: "8a0f1d1d-7f84-4b2c-8fd0-5f4d2a9d1002",
        name: "Size",
        value: "4000",
        sortOrder: 1,
      },
    ],
  },
  {
    id: "8a0f1d1d-7f84-4b2c-8fd0-5f4d2a9d1003",
    name: "Deep Tide Braided Line",
    description:
      "Eight-strand braided line designed for sensitivity, abrasion resistance, and control.",
    price: 49,
    category: "Lines",
    stock: 30,
    imageUrl:
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2026-03-03T09:00:00.000Z",
    featured: false,
  },
  {
    id: "8a0f1d1d-7f84-4b2c-8fd0-5f4d2a9d1004",
    name: "Blue Current Lure Kit",
    description:
      "A curated lure set for seabass, bonito, and reef predators with versatile colorways.",
    price: 79,
    category: "Tackle",
    stock: 22,
    imageUrl:
      "https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2026-03-04T09:00:00.000Z",
    featured: true,
  },
  {
    id: "8a0f1d1d-7f84-4b2c-8fd0-5f4d2a9d1005",
    name: "Dockside Utility Pack",
    description:
      "Weather-resistant tackle bag with modular compartments and padded carry strap.",
    price: 129,
    category: "Accessories",
    stock: 16,
    imageUrl:
      "https://images.unsplash.com/photo-1494256997604-768d1f608cac?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2026-03-05T09:00:00.000Z",
    featured: false,
  },
  {
    id: "8a0f1d1d-7f84-4b2c-8fd0-5f4d2a9d1006",
    name: "Shore Master Combo",
    description:
      "A complete rod and reel setup for new anglers who want a refined, durable starter kit.",
    price: 349,
    category: "Rods",
    stock: 7,
    imageUrl:
      "https://images.unsplash.com/photo-1492006173525-fd7c2d6f8a49?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2026-03-06T09:00:00.000Z",
    featured: true,
  },
];

export const demoOrders: Order[] = [
  {
    id: "59a868e4-6a1d-472f-95f2-1a84b9b70001",
    customerName: "Sami Ben Ali",
    phone: "+216 22 111 222",
    address: "La Marsa, Tunis",
    totalPrice: 488,
    status: "pending",
    createdAt: "2026-03-28T14:40:00.000Z",
    items: [
      {
        id: "1",
        orderId: "59a868e4-6a1d-472f-95f2-1a84b9b70001",
        productId: demoProducts[0].id,
        variantId: "variant-rod-2",
        variantLabel: "Length: 2.4m",
        quantity: 1,
        price: 289,
        product: demoProducts[0],
      },
      {
        id: "2",
        orderId: "59a868e4-6a1d-472f-95f2-1a84b9b70001",
        productId: demoProducts[3].id,
        quantity: 1,
        price: 79,
        product: demoProducts[3],
      },
      {
        id: "3",
        orderId: "59a868e4-6a1d-472f-95f2-1a84b9b70001",
        productId: demoProducts[4].id,
        quantity: 1,
        price: 120,
        product: demoProducts[4],
      },
    ],
  },
  {
    id: "59a868e4-6a1d-472f-95f2-1a84b9b70002",
    customerName: "Mouna Trabelsi",
    phone: "+216 55 444 999",
    address: "Sousse Medina",
    totalPrice: 248,
    status: "confirmed",
    createdAt: "2026-03-26T10:20:00.000Z",
    items: [
      {
        id: "4",
        orderId: "59a868e4-6a1d-472f-95f2-1a84b9b70002",
        productId: demoProducts[1].id,
        variantId: "variant-reel-2",
        variantLabel: "Size: 4000",
        quantity: 1,
        price: 199,
        product: demoProducts[1],
      },
      {
        id: "5",
        orderId: "59a868e4-6a1d-472f-95f2-1a84b9b70002",
        productId: demoProducts[2].id,
        quantity: 1,
        price: 49,
        product: demoProducts[2],
      },
    ],
  },
];

export const demoCustomers: Customer[] = [
  {
    id: "1b26ac8d-f479-4fa0-9173-5a8a92f99001",
    name: "Sami Ben Ali",
    phone: "+216 22 111 222",
    createdAt: "2026-03-28T14:40:00.000Z",
    orderCount: 1,
  },
  {
    id: "1b26ac8d-f479-4fa0-9173-5a8a92f99002",
    name: "Mouna Trabelsi",
    phone: "+216 55 444 999",
    createdAt: "2026-03-26T10:20:00.000Z",
    orderCount: 1,
  },
];

export const demoMetrics: DashboardMetrics = {
  totalOrders: demoOrders.length,
  totalRevenue: demoOrders.reduce((total, order) => total + order.totalPrice, 0),
  bestSellingProduct: "Ocean Drift Spinning Rod",
  pendingOrders: demoOrders.filter((order) => order.status === "pending").length,
};
