"use client";

import { useState } from "react";
import { Minus, Plus, FileText } from "lucide-react";
import { ProductArt } from "@/components/art/ProductArt";
import { WhatsAppIcon } from "@/components/art/icons";
import { productOrderMessage, waLink } from "@/lib/site";
import { useQuote } from "@/components/quote/QuoteProvider";

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
  const { openQuote } = useQuote();

  const orderHref = waLink(productOrderMessage(product.name, qty, product.volume));

  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-mist/80 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-aqua/50 hover:shadow-2xl hover:shadow-aqua/15"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Artwork */}
      <div className="art-tile relative flex h-60 items-center justify-center overflow-hidden">
        <ProductArt
          variant={product.art}
          className="h-52 w-auto drop-shadow-xl transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1.5 group-hover:scale-[1.06]"
        />
        {product.badge && (
          <span className="absolute left-4 top-4 rounded-full bg-navy px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.14em] text-foam shadow-lg shadow-navy/25">
            {product.badge}
          </span>
        )}
        <span className="absolute right-4 top-4 rounded-full bg-white/85 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-brand ring-1 ring-mist backdrop-blur">
          KEBS Certified
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-bold leading-snug text-navy">{product.name}</h3>
          {product.volume && (
            <span className="mt-0.5 shrink-0 rounded-full bg-mist/70 px-3 py-1 text-[11px] font-extrabold text-brand">
              {product.volume}
            </span>
          )}
        </div>
        <p className="mt-2.5 flex-1 text-[13.5px] leading-relaxed text-slate-600">{product.description}</p>
        {product.priceNote && (
          <p className="mt-3 text-xs font-semibold text-aqua">{product.priceNote}</p>
        )}

        {/* Quantity */}
        <div className="mt-5 flex items-center justify-between rounded-2xl bg-ice p-2 ring-1 ring-mist">
          <span className="pl-2 text-xs font-bold uppercase tracking-wider text-slate-500">Qty</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              aria-label="Decrease quantity"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-navy shadow-sm ring-1 ring-mist transition hover:bg-mist/60 active:scale-90"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-10 text-center font-display text-base font-extrabold text-navy">{qty}</span>
            <button
              onClick={() => setQty((q) => Math.min(999, q + 1))}
              aria-label="Increase quantity"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-navy shadow-sm ring-1 ring-mist transition hover:bg-mist/60 active:scale-90"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-3 grid grid-cols-[1fr_auto] gap-2">
          <a
            href={orderHref}
            target="_blank"
            rel="noreferrer"
            className="btn-sheen flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-[13px] font-bold text-white shadow-md shadow-[#25D366]/25 transition hover:-translate-y-0.5"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Order on WhatsApp
          </a>
          <button
            onClick={() => openQuote("bulk_bottled")}
            aria-label={`Request a quote for ${product.name}`}
            title="Request bulk quote"
            className="flex items-center justify-center gap-1.5 rounded-full border border-mist bg-white px-4 py-3 text-[13px] font-bold text-brand transition hover:border-aqua hover:bg-mist/40"
          >
            <FileText className="h-4 w-4" />
            Quote
          </button>
        </div>
      </div>
    </article>
  );
}
