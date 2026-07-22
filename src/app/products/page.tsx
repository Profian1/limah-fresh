import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { Droplets, PackageCheck, ShieldCheck, Truck } from "lucide-react";
import { PHOTOS, waLink, generalInquiryMessage } from "@/lib/site";
import { getProducts } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { WaveDivider } from "@/components/art/WaveDivider";
import { ProductCatalog } from "@/components/product/ProductCatalog";
import { WhatsAppIcon } from "@/components/art/icons";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Products Catalog",
  description:
    "Shop Limah Fresh: bottled water in 500ml, 1L, 1.5L, 5L, 10L and 18.9L; floor-standing & desktop water dispensers (Ipcone, Nonga); disposable cups and accessories. Order instantly via WhatsApp.",
};

const perks = [
  { icon: ShieldCheck, text: "Tamper-proof KEBS seal on every bottle" },
  { icon: Droplets, text: "Returnable bottles sanitized before every refill" },
  { icon: Truck, text: "Same-day dispatch across Nairobi" },
  { icon: PackageCheck, text: "Bulk & pallet pricing for offices and events" },
];

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <>
      {/* Hero band */}
      <section className="relative overflow-hidden bg-deep">
        <Image src={PHOTOS.bottles} alt="" fill priority className="object-cover opacity-45" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-deep/95 via-navy/85 to-brand/40" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 pb-32 pt-24 sm:pb-36">
          <Reveal>
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-foam">
              <span className="h-px w-8 bg-aqua" /> The Limah Fresh Catalog
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="font-display mt-5 max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-6xl">
              Every Size of <span className="text-gradient">Pure Refreshment</span>
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-mist/85 sm:text-lg">
              Pick your bottle, set your quantity, and check out in seconds via WhatsApp — delivered to your
              home, office or event.
            </p>
          </Reveal>
        </div>
        <WaveDivider fill="#f2fafd" className="absolute inset-x-0 bottom-0" />
      </section>

      {/* Catalog */}
      <section className="bg-ice py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Suspense>
            <ProductCatalog products={products} />
          </Suspense>
        </div>
      </section>

      {/* Reassurance strip */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {perks.map((p, i) => (
              <Reveal key={p.text} delay={i * 100}>
                <div className="flex h-full items-center gap-4 rounded-3xl border border-mist bg-ice p-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-aqua text-white shadow-md shadow-aqua/25">
                    <p.icon className="h-5 w-5" />
                  </span>
                  <p className="text-[13px] font-semibold leading-snug text-navy">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-14" direction="scale">
            <div className="wave-dots flex flex-col items-center justify-between gap-6 rounded-[2rem] bg-gradient-to-r from-navy to-brand p-10 text-center sm:p-12 lg:flex-row lg:text-left">
              <div>
                <h3 className="font-display text-2xl font-extrabold text-white sm:text-3xl">
                  Can&apos;t decide? Talk to a hydration specialist.
                </h3>
                <p className="mt-2 text-sm text-mist/85">
                  We&apos;ll recommend the right bottle size, dispenser and delivery rhythm for your space.
                </p>
              </div>
              <a
                href={waLink(generalInquiryMessage())}
                target="_blank"
                rel="noreferrer"
                className="btn-sheen inline-flex shrink-0 items-center gap-2 rounded-full bg-[#25D366] px-8 py-4 text-sm font-bold text-white shadow-xl shadow-deep/20 transition hover:-translate-y-0.5"
              >
                <WhatsAppIcon className="h-4 w-4" /> Chat on WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
