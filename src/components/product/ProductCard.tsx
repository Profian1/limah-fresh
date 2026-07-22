"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { ProductArt } from "@/components/art/ProductArt";
import { WhatsAppIcon } from "@/components/art/icons";
import { productOrderMessage, waLink } from "@/lib/site";

export interface CardProduct {
  slug: string;
  name: string;
  category: string;
  volume: string | null;
  description: string;
  badge: string | null;
  art: string;
  priceNote?: string | null;
}

export function ProductCard({ product, index = 0 }: { product: CardProduct; index?: number }) {
  const [qty, setQty] = useState(1);

  const orderHref = waLink(productOrderMessage(product.name, qty, product.volume));

  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-mist/80 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-aqua/50 hover:shadow-2xl hover:shadow-aqua/15"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Artwork */}
      <div className="art-tile relative flex h-44 items-center justify-center overflow-hidden sm:h-60">
        <ProductArt
          variant={product.art}
          className="h-36 w-auto drop-shadow-xl transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1.5 group-hover:scale-[1.06] sm:h-52"
        />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-navy px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.12em] text-foam shadow-lg shadow-navy/25 sm:left-4 sm:top-4 sm:px-3.5 sm:py-1.5 sm:text-[10px] sm:tracking-[0.14em]">
            {product.badge}
          </span>
        )}
        <span className="absolute right-3 top-3 rounded-full bg-white/85 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-brand ring-1 ring-mist backdrop-blur sm:right-4 sm:top-4 sm:px-3 sm:py-1.5 sm:text-[10px]">
          KEBS Certified
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4 sm:p-6">
        <div className="flex items-start justify-between gap-2 sm:gap-3">
          <h3 className="font-display text-sm font-bold leading-snug text-navy sm:text-lg">{product.name}</h3>
          {product.volume && (
            <span className="mt-0.5 shrink-0 rounded-full bg-mist/70 px-2 py-0.5 text-[10px] font-extrabold text-brand sm:px-3 sm:py-1 sm:text-[11px]">
              {product.volume}
            </span>
          )}
        </div>
        <p className="mt-2 flex-1 text-[12px] leading-relaxed text-slate-600 sm:text-[13.5px]">{product.description}</p>
        {product.priceNote && (
          <p className="mt-2 text-[10px] font-semibold text-aqua sm:mt-3 sm:text-xs">{product.priceNote}</p>
        )}

        {/* Quantity */}
        <div className="mt-3 flex items-center justify-between rounded-2xl bg-ice p-1.5 ring-1 ring-mist sm:mt-5 sm:p-2">
          <span className="pl-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 sm:pl-2 sm:text-xs">Qty</span>
          <div className="flex items-center gap-0.5 sm:gap-1">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              aria-label="Decrease quantity"
              className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-navy shadow-sm ring-1 ring-mist transition hover:bg-mist/60 active:scale-90 sm:h-8 sm:w-8"
            >
              <Minus className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            </button>
            <span className="w-8 text-center font-display text-sm font-extrabold text-navy sm:w-10 sm:text-base">{qty}</span>
            <button
              onClick={() => setQty((q) => Math.min(999, q + 1))}
              aria-label="Increase quantity"
              className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-navy shadow-sm ring-1 ring-mist transition hover:bg-mist/60 active:scale-90 sm:h-8 sm:w-8"
            >
              <Plus className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            </button>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-2.5 sm:mt-3">
          <a
            href={orderHref}
            target="_blank"
            rel="noreferrer"
            className="btn-sheen flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-[11px] font-bold text-white shadow-md shadow-[#25D366]/25 transition hover:-translate-y-0.5 sm:text-[13px]"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Order via WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}
