import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { PHOTOS } from "@/lib/site";
import { getProducts } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { WaveDivider } from "@/components/art/WaveDivider";
import { ProductCatalog } from "@/components/product/ProductCatalog";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Products Catalog",
  description:
    "Shop Limah Fresh: bottled water in 500ml, 1L, 1.5L, 5L, 10L and 18.9L; floor-standing & desktop water dispensers (Ipcone, Nonga); disposable cups and accessories. Order instantly via WhatsApp.",
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <>
      {/* Hero band */}
      <section className="relative overflow-hidden bg-deep">
        <Image src={PHOTOS.bottles} alt="" fill priority className="object-cover opacity-45" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-deep/95 via-navy/85 to-brand/40" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-16 sm:pb-24">
          <Reveal>
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-foam">
              <span className="h-px w-8 bg-aqua" /> The Limah Fresh Catalog
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="font-display mt-5 max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl">
              Every Size of <span className="text-gradient">Pure Refreshment</span>
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-mist/85 sm:text-lg">
              Pick your bottle, set your quantity, and check out in seconds via WhatsApp — delivered to your
              home, office or event.
            </p>
          </Reveal>
        </div>
        <WaveDivider fill="#f2fafd" className="absolute inset-x-0 bottom-0" />
      </section>

      {/* Catalog */}
      <section className="bg-ice py-16">
        <div className="mx-auto max-w-7xl px-3 sm:px-6">
          <Suspense>
            <ProductCatalog products={products} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
