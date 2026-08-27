import { Suspense } from "react";
import { PHOTOS } from "@/lib/site";
import { getAllProducts } from "@/data/products";
import { Reveal } from "@/components/ui/Reveal";
import { WaveDivider } from "@/components/art/WaveDivider";
import { ProductCatalog } from "@/components/product/ProductCatalog";

export default function ProductsPage() {
  const products = getAllProducts();

  return (
    <>
      <section className="relative overflow-hidden bg-deep">
        <img src={PHOTOS.bottles} alt="" className="absolute inset-0 h-full w-full object-cover opacity-45" fetchPriority="high" />
        <div className="absolute inset-0 bg-gradient-to-r from-deep/95 via-navy/85 to-brand/40" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-16 sm:pb-24">
          <Reveal>
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-foam">
              <span className="h-px w-8 bg-aqua" /> The Limah Fresh Catalog
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="font-display mt-5 max-w-3xl text-3xl font-extrabold leading-[1.08] tracking-tight text-white xs:text-4xl sm:text-5xl md:text-6xl">
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

      <section className="bg-ice py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <Suspense fallback={<p className="py-12 text-center text-sm text-slate-500">Loading products...</p>}>
            <ProductCatalog products={products} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
