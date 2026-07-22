import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

/**
 * Product catalog — showcases bottled water, dispensers and accessories.
 * `art` maps to the built-in SVG illustration system so the catalog stays
 * visually consistent; `priceNote` keeps room for future M-Pesa pricing.
 */
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  category: text("category").notNull(), // bottled_water | dispensers | accessories
  volume: text("volume"),
  description: text("description").notNull(),
  badge: text("badge"),
  art: text("art").notNull(), // ProductArt variant key
  priceNote: text("price_note"),
  featured: boolean("featured").notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

/**
 * Quote requests — bowser deliveries, maintenance, contracts.
 * Phase 2 will attach M-Pesa Express checkout via `checkoutRequestId`.
 */
export const quoteRequests = pgTable("quote_requests", {
  id: serial("id").primaryKey(),
  reference: text("reference").notNull().unique(),
  serviceType: text("service_type").notNull(), // bowser | dispenser_maintenance | delivery_contract | bulk_bottled | general
  name: text("name").notNull(),
  company: text("company"),
  phone: text("phone").notNull(),
  email: text("email"),
  location: text("location"),
  volume: text("volume"),
  deliveryDate: text("delivery_date"),
  message: text("message"),
  status: text("status").notNull().default("new"), // new | contacted | quoted | closed
  checkoutRequestId: text("checkout_request_id"), // reserved for M-Pesa Express (Phase 2)
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

/** Contact page inquiries. */
export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Product = typeof products.$inferSelect;
export type QuoteRequest = typeof quoteRequests.$inferSelect;
export type Inquiry = typeof inquiries.$inferSelect;
