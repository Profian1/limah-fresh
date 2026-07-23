/**
 * Canonical product data — used to seed the database and as a resilient
 * fallback if the database is unreachable during rendering.
 */
export interface ProductSeed {
  slug: string;
  name: string;
  category: "bottled_water" | "dispensers" | "accessories";
  volume?: string;
  description: string;
  badge?: string;
  art: string;
  image?: string;
  priceNote?: string;
  featured?: boolean;
  sortOrder: number;
}

export const PRODUCT_SEED: ProductSeed[] = [
  {
    slug: "refill-18-9l",
    name: "18.9 Litre Refill Bottle",
    category: "bottled_water",
    volume: "18.9 L",
    description:
      "The home & office classic. Dispenser-ready, returnable polycarbonate bottle with a tamper-proof KEBS-approved seal.",
    badge: "Best Seller",
    art: "jug",
    image: "/18.9lbottle.jpeg",
    priceNote: "Refill & exchange available",
    featured: true,
    sortOrder: 1,
  },
  {
    slug: "bottle-10l",
    name: "10 Litre Bottle",
    category: "bottled_water",
    volume: "10 L",
    description:
      "Family-size hydration with a sturdy moulded handle and convenient handle-cap for easy lifting and pouring.",
    badge: "Family Size",
    art: "bottle-lg",
    featured: true,
    sortOrder: 2,
  },
  {
    slug: "bottle-5l",
    name: "5 Litre Bottle",
    category: "bottled_water",
    volume: "5 L",
    description:
      "Easy-grip design built for kitchens, small offices, road trips and events — no dispenser needed.",
    art: "bottle-md",
    sortOrder: 3,
  },
  {
    slug: "bottle-1-5l",
    name: "1.5 Litre Bottle",
    category: "bottled_water",
    volume: "1.5 L",
    description:
      "Your daily hydration partner — gym, desk or dinner table. Crisp, purified taste in every sip.",
    art: "pet-lg",
    sortOrder: 4,
  },
  {
    slug: "bottle-1l",
    name: "1 Litre Bottle",
    category: "bottled_water",
    volume: "1 L",
    description:
      "On-the-go size that fits backpacks, cup holders and handbags. Perfect for school and commute.",
    art: "pet-md",
    image: "/1litrebottle.jpeg",
    sortOrder: 5,
  },
  {
    slug: "bottle-500ml",
    name: "500ml Bottle — Case of 24",
    category: "bottled_water",
    volume: "500 ml × 24",
    description:
      "Pocket and event size, shrink-wrapped in cases of 24. The go-to choice for conferences, weddings and retail.",
    badge: "Events Favorite",
    art: "pet-sm",
    image: "/500mlbottle.jpeg",
    priceNote: "Sold per case",
    featured: true,
    sortOrder: 6,
  },
  {
    slug: "cups-disposable",
    name: "Disposable Cups — Sleeve of 100",
    category: "accessories",
    volume: "100 pcs",
    description:
      "Clean, food-grade drinking cups for dispensers, events and front-office hospitality stations.",
    badge: "Food Grade",
    art: "cups",
    image: "/disposablecups.png",
    sortOrder: 7,
  },
];
