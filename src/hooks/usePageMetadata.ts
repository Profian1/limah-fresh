import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PAGE_META: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Limah Fresh — Pure Drinking Water",
    description:
      "Limah Fresh by Limah E.A. Limited — KEBS-certified purified drinking water in Nairobi. Bottled water 500ml–20L, water dispensers, bulk bowser supply (Limah Soft Water), dispenser maintenance and scheduled home & office delivery.",
  },
  "/about": {
    title: "About Us | Limah Fresh — Pure Drinking Water",
    description:
      "Limah E.A. Limited — incorporated November 20, 2013 under Cap 486. KEBS-certified. Our 4-step purification: micro-filtration, reverse osmosis, ozonation and UV sterilization. Serving Kenya since 2013.",
  },
  "/products": {
    title: "Products Catalog | Limah Fresh — Pure Drinking Water",
    description:
      "Shop Limah Fresh: bottled water in 500ml, 1L, 1.5L, 5L, 10L and 20L; floor-standing & desktop water dispensers; disposable cups and accessories. Packs and cases available. Order instantly via WhatsApp.",
  },
  "/services": {
    title: "Bulk Water Bowser & Services | Limah Fresh — Pure Drinking Water",
    description:
      "Limah Soft Water bowsers for construction, events and institutions; dispenser supply, maintenance & sanitization; scheduled home and office delivery contracts across Nairobi. Custom branded water available.",
  },
  "/gallery": {
    title: "Gallery | Limah Fresh — Pure Drinking Water",
    description:
      "Explore the Limah Fresh gallery: our Nairobi purification plant, water bottling facility, delivery fleet, team in action, and featured projects across Kenya since 2013.",
  },
  "/contact": {
    title: "Contact Us | Limah Fresh — Pure Drinking Water",
    description:
      "Reach Limah E.A. Limited — Amee Holdings, North Airport Road (Company & Plant) and Maziwa, Kahawa West (Shop), Nairobi. Call 0718 013 391 or email info@limahfresh.co.ke.",
  },
};

export function usePageMetadata() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = PAGE_META[pathname] || PAGE_META["/"];
    document.title = meta.title;

    let descTag = document.querySelector('meta[name="description"]');
    if (!descTag) {
      descTag = document.createElement("meta");
      descTag.setAttribute("name", "description");
      document.head.appendChild(descTag);
    }
    descTag.setAttribute("content", meta.description);

    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement("meta");
      ogTitle.setAttribute("property", "og:title");
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute("content", meta.title);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement("meta");
      ogDesc.setAttribute("property", "og:description");
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute("content", meta.description);

    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement("meta");
      ogUrl.setAttribute("property", "og:url");
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute("content", `https://limahfresh.co.ke${pathname}`);
  }, [pathname]);
}
