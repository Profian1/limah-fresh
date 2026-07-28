"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { LayoutGrid, Droplets, CupSoda } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { type ProductData } from "@/data/products";

const TABS = [
  { value: "all", label: "All Products", icon: LayoutGrid },
  { value: "bottled_water", label: "Bottled Water", icon: Droplets },
  { value: "accessories", label: "Accessories", icon: CupSoda },
];

export function ProductCatalog({ products }: { products: ProductData[] }) {
  const params = useSearchParams();
  const initial = params.get("cat");
  const [tab, setTab] = useState(
    TABS.some((t) => t.value === initial) ? (initial as string) : "all",
  );

  const filtered = useMemo(
    () =>
      tab === "all" ? products : products.filter((p) => p.category === tab),
    [tab, products],
  );

  return (
    <div>
      {/* Filter tabs */}
      <div className="sticky top-[84px] z-40 -mx-2 px-2 py-3">
        <div className="mx-auto flex w-fit max-w-full flex-wrap items-center justify-center gap-1.5 rounded-full bg-white/85 p-1.5 shadow-lg shadow-navy/5 ring-1 ring-mist backdrop-blur-xl">
          {TABS.map((t) => {
            const Icon = t.icon;
            const active = tab === t.value;
            return (
              <button
                key={t.value}
                onClick={() => setTab(t.value)}
                className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-bold transition-all duration-300 sm:px-5 ${
                  active
                    ? "bg-gradient-to-r from-brand to-aqua text-white shadow-md shadow-aqua/30"
                    : "text-slate-600 hover:bg-mist/50 hover:text-navy"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden xs:inline sm:inline">{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <p className="mt-4 text-center text-sm font-medium text-slate-500">
        Showing{" "}
        <span className="font-bold text-brand">{filtered.length}</span> of{" "}
        {products.length} products
      </p>

      {/* Grid */}
      <div
        key={tab}
        className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4"
      >
        {filtered.map((p, i) => (
          <ProductCard key={p.slug} product={p} index={i} />
        ))}
      </div>
    </div>
  );
}
