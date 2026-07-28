"use client";

import { ArrowRight, Droplets } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

const CARDS = [
  {
    title: "Bottled Water Delivery",
    cta: "Learn more",
    href: "/products",
    image: "/packed bottles.jpeg",
    gridClasses: "lg:col-start-1 lg:row-start-1",
    alt: "Packed Limah Fresh water bottles ready for delivery",
  },
  {
    title: "Bulk Water Supply",
    cta: "Request Supply",
    href: "/services#bowser",
    image: "/bowser.jpeg",
    gridClasses: "lg:col-start-3 lg:row-start-1",
    alt: "Limah Soft Water bowser truck for bulk water delivery",
  },
  {
    title: "Dispenser Maintenance",
    cta: "Book Service",
    href: "/services",
    image: "/dispenser.jpg",
    gridClasses: "lg:col-start-2 lg:row-span-2 lg:row-start-1",
    alt: "Technician servicing a water dispenser",
  },
  {
    title: "Home & Office Contracts",
    cta: "View Plans",
    href: "/services",
    image: "/limahstaff.jpg",
    gridClasses: "lg:col-start-1 lg:row-start-2",
    alt: "Limah Fresh team ready to serve",
  },
  {
    title: "Custom Branded Water",
    cta: "Get Started",
    href: "/services#branded",
    image: "/branded.jpg",
    gridClasses: "lg:col-start-3 lg:row-start-2 col-span-2",
    alt: "Custom branded Limah Fresh water bottles",
  },
];

export function Services() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section heading */}
        <Reveal className="mb-16 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#00AEEF]">
            Our Services
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#102A43] sm:text-5xl">
            What We Do
          </h2>

          {/* Decorative divider */}
          <div className="mx-auto mt-6 flex items-center justify-center gap-3">
            <span
              className="h-[2px] flex-1"
              style={{
                maxWidth: 48,
                background: "linear-gradient(90deg, transparent, #00AEEF)",
              }}
            />
            <span className="relative flex items-center justify-center">
              <span
                className="absolute h-3 w-3 rounded-full bg-[rgba(0,174,239,0.15)] blur-sm"
                style={{ boxShadow: "0 0 8px rgba(0,174,239,0.3)" }}
              />
              <Droplets className="relative h-3.5 w-3.5 text-[#00AEEF]" />
            </span>
            <span
              className="h-[2px] flex-1"
              style={{
                maxWidth: 48,
                background: "linear-gradient(90deg, #00AEEF, transparent)",
              }}
            />
          </div>
        </Reveal>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-4 md:auto-rows-[320px] lg:grid-cols-3 lg:gap-8 lg:auto-rows-[380px]">
          {CARDS.map((card, i) => (
            <Reveal
              key={card.title}
              delay={i * 120}
              className={card.gridClasses}
            >
              <Link
                href={card.href}
                className="group/card relative flex min-h-[320px] h-full flex-col justify-end overflow-hidden rounded-[28px] bg-[#EAF4FA] transition-all duration-350 ease-out hover:-translate-y-2 hover:shadow-[0_24px_48px_rgba(0,0,0,0.12)]"
              >
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover/card:scale-105"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw"
                />

                {/* Text + CTA bar with local overlay */}
                <div className="relative z-10 p-6 lg:p-8 bg-gradient-to-t from-black/70 via-black/55 to-transparent">
                  <h3 className="text-lg leading-snug font-bold text-white lg:text-xl">
                    {card.title}
                  </h3>

                  <span className="mt-3 inline-flex items-center gap-1.5 rounded-[10px] bg-[#00AEEF] px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-[#00AEEF]/30 transition-all duration-300 ease-out group-hover/card:-translate-y-0.5 group-hover/card:shadow-xl group-hover/card:shadow-[#00AEEF]/40">
                    {card.cta}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover/card:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
