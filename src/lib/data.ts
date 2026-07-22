import { asc } from "drizzle-orm";
import { db } from "@/db";
import { products } from "@/db/schema";
import { PRODUCT_SEED } from "@/lib/products";
import type { CardProduct } from "@/components/product/ProductCard";

function seedFallback(): CardProduct[] {
  return PRODUCT_SEED.map((p) => ({
    slug: p.slug,
    name: p.name,
    category: p.category,
    volume: p.volume ?? null,
    description: p.description,
    badge: p.badge ?? null,
    art: p.art,
    priceNote: p.priceNote ?? null,
  }));
}

/**
 * Reads the catalog from PostgreSQL; gracefully falls back to the canonical
 * seed data so the storefront never renders empty (e.g. pre-seed state).
 */
export async function getProducts(): Promise<CardProduct[]> {
  try {
    const rows = await db.select().from(products).orderBy(asc(products.sortOrder));
    if (rows.length > 0) return rows;
  } catch (err) {
    console.warn("[data] products query failed, using fallback:", err);
  }
  return seedFallback();
}

export async function getFeaturedProducts(): Promise<CardProduct[]> {
  try {
    const rows = await db.select().from(products).orderBy(asc(products.sortOrder));
    if (rows.length > 0) {
      const featured = rows.filter((r) => r.featured);
      if (featured.length > 0) return featured.slice(0, 4);
      return rows.slice(0, 4);
    }
  } catch (err) {
    console.warn("[data] featured query failed, using fallback:", err);
  }
  const fallback = PRODUCT_SEED.filter((p) => p.featured);
  return seedFallback().filter((p) => fallback.some((f) => f.slug === p.slug));
}
