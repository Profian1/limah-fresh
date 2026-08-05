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
    image: "/Products/500ml.png",
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
    image: "/Products/1L.png",
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
    image: "/Products/1.5 l.jpeg",
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
    image: "/Products/5L bottle.jpeg",
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
    image: "/Products/10 L bottle.png",
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
    image: "/Products/18.9L.png",
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
    image: "/Products/18.9L softbottle.png",
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
    image: "/Products/18.9L waterbottlehard.png",
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
    unitPrice: 100,
    sortOrder: 9,
    featured: false,
  },
  {
    id: 10,
    slug: "pack-500ml-24",
    name: "500ml × 24 Pack",
    description: "24 bottles of 500ml — perfect for events, parties and office coolers.",
    image: "/Products/24pieces 500ml pack.png",
    art: "pet-sm",
    category: "packs",
    volume: "500 ml × 24",
    badge: "Bulk Deal",
    unitPrice: 560,
    sortOrder: 10,
    featured: false,
  },
  {
    id: 11,
    slug: "pack-1l-12",
    name: "1L × 12 Pack",
    description: "12 bottles of 1 litre — ideal for meetings, conferences and group settings.",
    image: "/Products/12pieces 1L pack.png",
    art: "pet-md",
    category: "packs",
    volume: "1 L × 12",
    badge: "Bulk Deal",
    unitPrice: 450,
    sortOrder: 11,
    featured: false,
  },
  {
    id: 12,
    slug: "pack-1-5l-6",
    name: "1.5L × 6 Pack",
    description: "6 bottles of 1.5 litres — a great weekly supply for home or small office.",
    image: "/Products/6pieces 1.5L pack.png",
    art: "pet-lg",
    category: "packs",
    volume: "1.5 L × 6",
    badge: "Bulk Deal",
    unitPrice: 480,
    sortOrder: 12,
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
