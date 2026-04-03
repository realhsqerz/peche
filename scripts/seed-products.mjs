import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, "..", ".env.local");

function parseEnvFile(input) {
  return input
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"))
    .reduce((env, line) => {
      const separatorIndex = line.indexOf("=");

      if (separatorIndex === -1) {
        return env;
      }

      const key = line.slice(0, separatorIndex).trim();
      const value = line.slice(separatorIndex + 1).trim();
      env[key] = value;
      return env;
    }, {});
}

const envFile = await readFile(envPath, "utf8");
const env = parseEnvFile(envFile);

const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  throw new Error("Missing Supabase configuration in .env.local.");
}

const products = [
  {
    name: "Ocean Drift Spinning Rod",
    description:
      "A lightweight carbon rod built for long casts from rocky coasts and harbor walls.",
    price: 289,
    category: "Rods",
    stock: 12,
    image_url: "/products/ocean-drift-spinning-rod.jpg",
  },
  {
    name: "Harbor Steel Reel 4000",
    description:
      "Salt-ready spinning reel with sealed drag, balanced rotor, and smooth retrieval.",
    price: 199,
    category: "Reels",
    stock: 9,
    image_url: "/products/harbor-steel-reel-4000.jpg",
  },
  {
    name: "Deep Tide Braided Line",
    description:
      "Eight-strand braided line designed for sensitivity, abrasion resistance, and control.",
    price: 49,
    category: "Lines",
    stock: 30,
    image_url: "/products/deep-tide-braided-line.jpg",
  },
  {
    name: "Blue Current Lure Kit",
    description:
      "A curated lure set for seabass, bonito, and reef predators with versatile colorways.",
    price: 79,
    category: "Tackle",
    stock: 22,
    image_url: "/products/blue-current-lure-kit.jpg",
  },
  {
    name: "Dockside Utility Pack",
    description:
      "Weather-resistant tackle bag with modular compartments and padded carry strap.",
    price: 129,
    category: "Accessories",
    stock: 16,
    image_url: "/products/dockside-utility-pack.jpg",
  },
  {
    name: "Shore Master Combo",
    description:
      "A complete rod and reel setup for new anglers who want a refined, durable starter kit.",
    price: 349,
    category: "Rods",
    stock: 7,
    image_url: "/products/shore-master-combo.jpg",
  },
];

const existingResponse = await fetch(
  `${SUPABASE_URL}/rest/v1/products?select=id,name`,
  {
    headers: {
      apikey: SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
    },
  },
);

if (!existingResponse.ok) {
  const body = await existingResponse.text();
  throw new Error(`Failed to fetch existing products: ${body}`);
}

const existingProducts = await existingResponse.json();
const existingNames = new Set(existingProducts.map((product) => product.name));
const missingProducts = products.filter((product) => !existingNames.has(product.name));

if (!missingProducts.length) {
  console.log("Seed skipped: starter products already exist.");
  process.exit(0);
}

const insertResponse = await fetch(`${SUPABASE_URL}/rest/v1/products`, {
  method: "POST",
  headers: {
    apikey: SERVICE_ROLE_KEY,
    Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
    "Content-Type": "application/json",
    Prefer: "return=representation",
  },
  body: JSON.stringify(missingProducts),
});

if (!insertResponse.ok) {
  const body = await insertResponse.text();
  throw new Error(`Failed to insert starter products: ${body}`);
}

const insertedProducts = await insertResponse.json();
console.log(`Inserted ${insertedProducts.length} starter products.`);
