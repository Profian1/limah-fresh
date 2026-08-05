"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { ProductArt } from "@/components/art/ProductArt";
import { WhatsAppIcon } from "@/components/art/icons";
import { type ProductData, formatPrice } from "@/data/products";
import { ArrowRight } from "lucide-react";

export function ProductCard({
  product,
  index = 0,
}: {
  product: ProductData;
  index?: number;
}) {
  const href = `https://wa.me/254718013391?text=${encodeURIComponent(
    `Hello Limah Fresh, I would like to order:\n\n• Product: ${product.name}${product.volume ? ` (${product.volume})` : ""}\n• Price: ${formatPrice(product.unitPrice)} per unit\n• Quantity: [please specify]\n• Location: [please share your delivery location]\n\nThank you.`,
  )}`;

  return (
    <Reveal delay={index * 100}>
      <article className="group relative flex h-full flex-col overflow-hidden rounded-[20px] border border-[rgba(0,174,239,0.08)] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 ease-out hover:-translate-y-2 hover:border-[#00AEEF] hover:shadow-[0_20px_48px_rgba(0,174,239,0.12)]">
        {/* Product image */}
        <div className="relative w-full aspect-[4/5] overflow-hidden rounded-t-[20px] bg-gradient-to-b from-[#f8fcff] to-white flex items-center justify-center">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain object-center p-2.5 transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              priority={index < 4}
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full p-4 transition-transform duration-300 group-hover:scale-105">
              <ProductArt
                variant={product.art}
                className="h-[85%] w-auto max-w-[85%] max-h-[85%] object-contain"
              />
            </div>
          )}
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-3 sm:p-4">
          {/* Name + volume */}
          <div>
            <h3 className="text-[13px] leading-snug font-bold text-[#102A43] sm:text-[15px]">
              {product.name}
            </h3>
            {product.volume && (
              <p className="mt-0.5 text-[11px] font-medium text-slate-400">
                {product.volume}
              </p>
            )}
          </div>

          {/* Pricing */}
          <div className="mt-auto pt-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
              {product.packPrice ? "Starting From" : "Price"}
            </p>
            <p className="text-[18px] font-extrabold leading-tight text-[#00AEEF] xs:text-[20px] sm:text-[22px] md:text-[24px]">
              {formatPrice(product.unitPrice)}
            </p>
            {product.packPrice && product.packLabel && (
              <p className="mt-0.5 text-[11px] font-medium text-slate-400">
                {product.packLabel} • {formatPrice(product.packPrice)}
              </p>
            )}

            {/* Order button */}
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-[12px] bg-[#25D366] py-2.5 text-[12px] font-bold text-white shadow-md shadow-[#25D366]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#22c35e] hover:shadow-lg hover:shadow-[#25D366]/30 sm:py-3 sm:text-[13px]"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Order via WhatsApp
              <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
