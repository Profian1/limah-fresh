"use client";

import Image from "next/image";
import { CheckCircle2, ClipboardList, Truck } from "lucide-react";
import { waLink, bowserMessage } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/art/icons";
import { QuoteButton } from "@/components/quote/QuoteButton";

const features = [
  "Food-grade tankers, 5,000L – 10,000L+ per trip",
  "Ideal for construction, events, institutions & commercial sites",
  "Scheduled or emergency same-day dispatch in Nairobi",
  "Driver-assisted offloading with food-grade hose",
  "Volume, trip and monthly-contract billing options",
];

export function BowserSection() {
  return (
    <section className="bg-ice py-12 sm:py-16 md:py-20 xl:py-24" id="bowser">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal direction="left">
            <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand to-aqua px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white shadow-lg shadow-aqua/25">
              <Truck className="h-3.5 w-3.5" /> Service 01
            </span>
            <h2 className="font-display mt-5 text-3xl font-extrabold tracking-tight text-navy sm:text-5xl">
              Bulk Water Bowsers — <span className="text-gradient-deep">"Limah Soft Water"</span>
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-slate-700">
              When a bottle won&apos;t cut it, our bowsers roll in. Limah Soft Water is clean,
              treated soft water delivered in volume — for construction sites topping up tanks, hotels and
              events pushing through peak season, and institutions bridging supply gaps.
            </p>
            <ul className="mt-7 space-y-3.5">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-aqua" />
                  <span className="font-medium">{f}</span>
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap gap-3">
              <QuoteButton
                service="bowser"
                className="btn-sheen inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand to-aqua px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-aqua/25 transition hover:-translate-y-0.5"
              >
                <ClipboardList className="h-4 w-4" /> Request a Quote
              </QuoteButton>
              <a
                href={waLink(bowserMessage())}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-[#25D366]/25 transition hover:-translate-y-0.5"
              >
                <WhatsAppIcon className="h-4 w-4" /> WhatsApp a Bowser
              </a>
            </div>
          </Reveal>
          <Reveal direction="right">
            <div className="relative">
              <div className="overflow-hidden rounded-[2rem] shadow-2xl shadow-navy/20 ring-1 ring-mist">
                <Image
                  src="/bowser.jpeg"
                  alt="Limah Soft Water tanker bowser ready for delivery"
                  width={1600}
                  height={1067}
                  className="w-full aspect-[3/2] object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-deep/90 to-transparent p-7 pt-20">
                  <p className="font-display text-2xl font-extrabold text-white">Limah Soft Water</p>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-foam/80">
                    Treated soft water · delivered in volume
                  </p>
                </div>
              </div>
              <div className="absolute -top-6 right-6 animate-float rounded-3xl bg-white px-6 py-4 shadow-xl shadow-navy/10 ring-1 ring-mist">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand">Capacity per trip</p>
                <p className="font-display text-2xl font-extrabold text-navy">5,000L – 10,000L+</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
