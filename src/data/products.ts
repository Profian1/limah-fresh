/**
 * Central product data — the single source of truth for the Limah Fresh catalog.
 *
 * To update prices, names, pack info, images, or descriptions:
 *   → edit this file only — no component or page code needs changing.
 */
import { waLink, productOrderMessage } from "@/lib/site";

export interface PackPricing {
  label: string;    // "24 Pieces"
  quantity: number;
  price: number;    // "KSh 560"
}

export interface ProductData {
  id: number;
  slug: string;
  name: string;
  description: string;
  image?: string | null;
  art: string;
  category: string;
  volume?: string;
  badge?: string;
  /** Individual unit price in KSh */
  unitPrice: number;
  /** Optional bulk/pack pricing */
  packLabel?: string;
  packQuantity?: number;
  packPrice?: number;
  sortOrder: number;
  featured: boolean;
}

export const PRODUCTS: ProductData[] = [
  {
    id: 1,
    slug: "bottle-500ml",
    name: "500ml Bottled Water",
    description: "Fresh purified drinking water in a compact, grab-and-go size.",
    image: "/Products/500mlbottle.jpeg",
    art: "pet-sm",
    category: "bottled_water",
    volume: "500 ml",
    badge: "Events Favorite",
    unitPrice: 28,
    packLabel: "24 Pieces",
    packQuantity: 24,
    packPrice: 560,
    sortOrder: 1,
    featured: true,
  },
  {
    id: 2,
    slug: "bottle-1l",
    name: "1L Bottled Water",
    description: "On-the-go hydration that fits backpacks, cup holders and handbags.",
    image: "/Products/1litrebottle.jpeg",
    art: "pet-md",
    category: "bottled_water",
    volume: "1 L",
    unitPrice: 40,
    packLabel: "12 Pieces",
    packQuantity: 12,
    packPrice: 450,
    sortOrder: 2,
    featured: true,
  },
  {
    id: 3,
    slug: "bottle-1-5l",
    name: "1.5L Bottled Water",
    description: "Your daily hydration partner — gym, desk or dinner table.",
    art: "pet-lg",
    category: "bottled_water",
    volume: "1.5 L",
    unitPrice: 65,
    packLabel: "6 Pieces",
    packQuantity: 6,
    packPrice: 480,
    sortOrder: 3,
    featured: false,
  },
  {
    id: 4,
    slug: "bottle-5l",
    name: "5L Bottled Water",
    description: "Easy-grip design for kitchens, small offices, road trips and events.",
    art: "bottle-md",
    category: "bottled_water",
    volume: "5 L",
    unitPrice: 145,
    sortOrder: 4,
    featured: true,
  },
  {
    id: 5,
    slug: "bottle-10l",
    name: "10L Bottled Water",
    description: "Family-size hydration with a sturdy handle for easy lifting and pouring.",
    art: "bottle-lg",
    category: "bottled_water",
    volume: "10 L",
    badge: "Family Size",
    unitPrice: 250,
    sortOrder: 5,
    featured: true,
  },
  {
    id: 6,
    slug: "refill-20l",
    name: "20L Refill",
    description: "Return your empty bottle for a fresh refill — same purity, lower cost.",
    image: "/Products/18.9lbottle.jpeg",
    art: "jug",
    category: "bottled_water",
    volume: "20 L",
    badge: "Best Seller",
    unitPrice: 300,
    sortOrder: 6,
    featured: true,
  },
  {
    id: 7,
    slug: "soft-bottle-20l",
    name: "20L Soft Bottle + Water",
    description: "A new soft polycarbonate bottle filled with purified water, ready for your dispenser.",
    art: "jug",
    category: "bottled_water",
    volume: "20 L",
    unitPrice: 550,
    sortOrder: 7,
    featured: false,
  },
  {
    id: 8,
    slug: "hard-bottle-20l",
    name: "20L Hard Bottle + Water",
    description: "Premium hard-shell bottle with tamper-proof seal, filled and delivered.",
    art: "jug",
    category: "bottled_water",
    volume: "20 L",
    unitPrice: 1550,
    sortOrder: 8,
    featured: true,
  },
  {
    id: 9,
    slug: "cups-disposable",
    name: "Disposable Cups",
    description: "Clean, food-grade drinking cups for dispensers, events and office hospitality.",
    image: "/Products/disposablecups.png",
    art: "cups",
    category: "accessories",
    volume: "100 pcs",
    unitPrice: 450,
    sortOrder: 9,
    featured: false,
  },
];

export function formatPrice(amount: number): string {
  return `KSh ${amount.toLocaleString("en-KE")}`;
}

/** Featured products (top N by sortOrder). */
export function getFeaturedProducts(limit: number = 4): ProductData[] {
  return PRODUCTS.filter((p) => p.featured)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .slice(0, limit);
}

/** All products sorted by sortOrder. */
export function getAllProducts(): ProductData[] {
  return [...PRODUCTS].sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getWhatsAppLink(
  product: ProductData,
  qty: number = 1,
) {
  return waLink(
    productOrderMessage(product.name, qty, product.volume, product.unitPrice),
  );
}
