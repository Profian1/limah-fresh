"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
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
  image?: string | null;
  price: number;
  oldPrice?: number | null;
  priceNote?: string | null;
}

export function ProductCard({
  product,
  index = 0,
}: {
  product: CardProduct;
  index?: number;
}) {
  const [qty, setQty] = useState(1);
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useRef(false);
  const [transform, setTransform] = useState("");

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (prefersReducedMotion.current || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotateX = ((y - cy) / cy) * -3;
      const rotateY = ((x - cx) / cx) * 3;
      setTransform(
        `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-8px)`,
      );
    },
    [],
  );

  const handleMouseLeave = useCallback(() => {
    setTransform("");
  }, []);

  const orderHref = waLink(
    productOrderMessage(product.name, qty, product.volume, product.price),
  );

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col overflow-hidden rounded-[16px] sm:rounded-[24px] border border-[rgba(0,174,239,.08)] bg-white shadow-[0_10px_30px_rgba(0,0,0,.05)] transition-all duration-[350ms] ease-out hover:border-[#00AEEF] hover:shadow-[0_24px_48px_rgba(0,174,239,.12)] hover:z-10"
      style={{
        transform: transform || undefined,
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Product image */}
      <div className="relative flex h-[140px] sm:h-[260px] items-center justify-center overflow-hidden bg-gradient-to-b from-[#f8fdff] to-[#eef7fc]">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <ProductArt
            variant={product.art}
            className="h-24 w-auto sm:h-48 transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] sm:h-56"
          />
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-3 sm:p-6">
        <h3
          className="font-display text-[12px] leading-tight sm:text-[15px] font-bold sm:leading-snug"
          style={{ color: "#102A43" }}
        >
          {product.name}
        </h3>

        {/* Quantity selector */}
        <div className="mt-2 sm:mt-4 flex items-center rounded-full border border-[rgba(0,174,239,.12)] bg-[#f2fafd] p-1">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
            className="flex h-[28px] w-[28px] sm:h-[34px] sm:w-[34px] items-center justify-center rounded-full bg-white text-[#102A43] shadow-sm ring-1 ring-[rgba(0,174,239,.1)] transition hover:bg-[#eef7fc] active:scale-90"
          >
            <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
          </button>
          <span className="mx-1 sm:mx-3 flex-1 text-center font-display text-sm sm:text-base font-extrabold text-[#102A43]">
            {qty}
          </span>
          <button
            onClick={() => setQty((q) => Math.min(99, q + 1))}
            aria-label="Increase quantity"
            className="flex h-[28px] w-[28px] sm:h-[34px] sm:w-[34px] items-center justify-center rounded-full bg-[#00AEEF] text-white shadow-sm shadow-[#00AEEF]/25 transition hover:bg-[#0096c7] active:scale-90"
          >
            <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
          </button>
        </div>

        {/* Order button */}
        <a
          href={orderHref}
          target="_blank"
          rel="noreferrer"
          className="mt-2 sm:mt-3 flex items-center justify-center gap-1.5 sm:gap-2 rounded-[12px] sm:rounded-[16px] bg-[#25D366] py-[10px] sm:py-[15px] text-[11px] sm:text-[14px] font-bold text-white shadow-md shadow-[#25D366]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#22c35e] hover:shadow-lg hover:shadow-[#25D366]/30 active:scale-[0.98]"
        >
          <WhatsAppIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="hidden sm:inline">Order via WhatsApp</span>
          <span className="sm:hidden">Order</span>
        </a>
      </div>
    </article>
  );
}
