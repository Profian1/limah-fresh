"use client";

import Image from "next/image";
import { CheckCircle2, Gift } from "lucide-react";
import { waLink } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/art/icons";
import { QuoteButton } from "@/components/quote/QuoteButton";

const features = [
  "Weddings, corporate summits, birthdays, and thank-you gifts",
  "Company-branded water for offices, hotels, clinics, and sites",
  "Sizes: 500ml, 1L, 5L, 10L, and 20L",
  "Custom label design and premium packaging included",
];

export function BrandedSection() {
  return (
    <section className="bg-ice py-12 sm:py-16 md:py-20 xl:py-24" id="branded">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal direction="left">
            <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand to-aqua px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white shadow-lg shadow-aqua/25">
              <Gift className="h-3.5 w-3.5" /> Service 03
            </span>
            <h2 className="font-display mt-5 text-3xl font-extrabold tracking-tight text-navy sm:text-5xl">
              Custom Branded <span className="text-gradient-deep">Water Bottles</span>
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-slate-700">
              We print your logo, name, or event message on premium purified water bottles — from 500ml event
              bottles to 20L home and office containers. Every label is designed to match your brand identity,
              with professional packaging that leaves a lasting impression.
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
                service="branded_water"
                className="btn-sheen inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand to-aqua px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-aqua/25 transition hover:-translate-y-0.5"
              >
                <Gift className="h-4 w-4" /> Request Branded Water Quote
              </QuoteButton>
              <a
                href={waLink("Hello Limah Fresh, I would like to inquire about custom branded water bottles for an event/business.")}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-mist bg-white px-7 py-3.5 text-sm font-bold text-navy transition hover:border-aqua hover:bg-mist/40"
              >
                <WhatsAppIcon className="h-4 w-4" /> WhatsApp an Inquiry
              </a>
            </div>
          </Reveal>
          <Reveal direction="right">
            <div className="overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-navy/20 ring-1 ring-mist">
              <Image
                src="/custom-branded-water.png"
                alt="Custom branded Limah Fresh water bottles"
                width={1600}
                height={1067}
                className="w-full aspect-[3/2] object-contain p-6 transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
