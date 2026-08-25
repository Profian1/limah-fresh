"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Lightbox } from "@/components/gallery/Lightbox";

const IMAGES = [
  { src: "/limahstaff.webp", alt: "The Limah Fresh team ready to serve", span: "md:col-span-4 md:row-span-2", aspect: "aspect-[4/3] md:aspect-auto" },
  { src: "/custom-branded-water.webp", alt: "Custom branded water bottles for a corporate event", span: "md:col-span-2 md:row-span-2", aspect: "aspect-[4/5] md:aspect-auto" },
  { src: "/company.webp", alt: "Limah Fresh company premises", span: "md:col-span-2", aspect: "aspect-[4/3] md:aspect-auto" },
  { src: "/front.webp", alt: "Front exterior of Limah Fresh", span: "md:col-span-2", aspect: "aspect-[4/3] md:aspect-auto" },
  { src: "/ourbowsers.webp", alt: "Limah Fresh fleet of water bowsers", span: "md:col-span-2", aspect: "aspect-[4/3] md:aspect-auto" },
  { src: "/happy client.webp", alt: "Happy Limah Fresh client", span: "md:col-span-3", aspect: "aspect-[4/3] md:aspect-auto" },
  { src: "/happy client 1.webp", alt: "Satisfied Limah Fresh customer", span: "md:col-span-3", aspect: "aspect-[4/3] md:aspect-auto" },
];

export function GalleryPreview() {
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  return (
    <section className="bg-white py-12 sm:py-16 md:py-20 xl:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mb-12 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-aqua">See Our Work</p>
          <h2 className="font-display mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-5xl">
            Behind the <span className="text-gradient-deep">Scenes</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
            A glimpse into our facilities, team, and the passion that drives every drop of Limah Fresh water.
          </p>
        </Reveal>

        {/* Photo collage grid */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-6 md:gap-5 auto-rows-[minmax(160px,auto)]">
          {IMAGES.map((img, i) => (
            <Reveal key={i} delay={i * 60} className={`col-span-1 ${img.span}`}>
              <div
                role="button"
                tabIndex={0}
                className={`group relative w-full h-full ${img.aspect} cursor-pointer overflow-hidden rounded-2xl bg-mist shadow-lg shadow-navy/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-aqua/10`}
                onClick={() => setLightboxIndex(i)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setLightboxIndex(i); } }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-deep/0 transition-colors duration-500 group-hover:bg-deep/30">
                  <span className="translate-y-4 rounded-full bg-white/20 px-4 py-2 text-sm font-bold text-white opacity-0 backdrop-blur transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    View Full
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Lightbox
          images={IMAGES}
          currentIndex={Math.max(0, lightboxIndex)}
          isOpen={lightboxIndex >= 0}
          onClose={() => setLightboxIndex(-1)}
          onNavigate={setLightboxIndex}
        />

        <Reveal className="mt-12 text-center">
          <Link
            href="/gallery"
            className="btn-sheen group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand to-aqua px-8 py-4 text-sm font-bold text-white shadow-xl shadow-aqua/25 transition hover:-translate-y-0.5"
          >
            View Full Gallery
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
