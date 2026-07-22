import "dotenv/config";
import { db } from "./index";
import { products } from "./schema";
import { PRODUCT_SEED } from "../lib/products";

async function main() {
  console.log("🌱 Seeding Limah Fresh catalog…");
  await db.delete(products); // idempotent reseed
  await db.insert(products).values(
    PRODUCT_SEED.map((p) => ({
      slug: p.slug,
      name: p.name,
      category: p.category,
      volume: p.volume ?? null,
      description: p.description,
      badge: p.badge ?? null,
      art: p.art,
      priceNote: p.priceNote ?? null,
      featured: p.featured ?? false,
      sortOrder: p.sortOrder,
    }))
  );
  console.log(`✅ Seeded ${PRODUCT_SEED.length} products.`);
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
