import { asc } from "drizzle-orm";
import { db } from "@/db";
import { products, type Product } from "@/db/schema";

/**
 * Reads the catalog from PostgreSQL; gracefully falls back to the canonical
 * seed data so the storefront never renders empty (e.g. pre-seed state).
 */
export async function getProducts(): Promise<Product[]> {
  try {
    const rows = await db.select().from(products).orderBy(asc(products.sortOrder));
    if (rows.length > 0) return rows;
  } catch (err) {
    console.warn("[data] products query failed, using fallback:", err);
  }
  return [];
}

export async function getFeaturedProducts(): Promise<Product[]> {
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
  return [];
}
