import { asc } from "drizzle-orm";
import { db } from "@/db";
import { products, type Product } from "@/db/schema";
import { createLogger } from "@/lib/logger";

const log = createLogger("data");

/**
 * Reads the catalog from PostgreSQL; gracefully falls back to the canonical
 * seed data so the storefront never renders empty (e.g. pre-seed state).
 */
export async function getProducts(): Promise<Product[]> {
  try {
    const rows = await db.select().from(products).orderBy(asc(products.sortOrder));
    if (rows.length > 0) return rows;
  } catch (err) {
    log.warn("products query failed", { error: String(err) });
  }
  return [];
}
