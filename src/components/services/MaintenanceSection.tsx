"use client";

import Image from "next/image";
import { CheckCircle2, Sparkles, Wrench } from "lucide-react";
import { waLink } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { QuoteButton } from "@/components/quote/QuoteButton";
import { WhatsAppIcon } from "@/components/art/icons";

const list = [
  "Scheduled deep-cleaning & sanitization cycles",
  "Hot tank descaling and tap sterilization",
  "Technical diagnosis, repair & genuine spares",
  "Sanitization certificate after every service",
  "Service reminders — we track the calendar for you",
];

export function MaintenanceSection() {
  return (
    <section className="relative overflow-hidden bg-navy py-12 sm:py-16 md:py-20 xl:py-24">
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal direction="left" className="order-2 lg:order-1">
            <div className="relative">
              <div className="overflow-hidden rounded-[2rem] shadow-2xl shadow-deep/40 ring-1 ring-white/10">
                <Image
                  src="/dispenser-maintenance.png"
                  alt="Technician-serviced office water dispenser in use"
                  width={1600}
                  height={1067}
                  className="w-full aspect-[3/2] object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  loading="lazy"
                />
              </div>
              <div className="glass-dark absolute -bottom-6 left-6 rounded-3xl p-5">
                <p className="font-display flex items-center gap-2 text-xl font-extrabold text-white">
                  <Sparkles className="h-5 w-5 text-aqua" /> Sanitized &amp; Certified
                </p>
                <p className="mt-1 text-xs text-mist/80">after every single service visit</p>
              </div>
            </div>
          </Reveal>
          <Reveal direction="right" className="order-1 lg:order-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-foam ring-1 ring-white/15">
              <Wrench className="h-3.5 w-3.5" /> Service 02
            </span>
            <h2 className="font-display mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              Dispenser Maintenance &amp; <span className="text-gradient">Sanitization</span>
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-mist/80">
              A dirty dispenser quietly undoes every step of purification. Our technicians keep yours
              hospital-clean — on a schedule, with documentation your HSE team will love.
            </p>
            <ul className="mt-7 space-y-3.5">
              {list.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-mist/85">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-aqua" />
                  <span className="font-medium">{f}</span>
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap gap-3">
              <QuoteButton
                service="dispenser_maintenance"
                className="btn-sheen inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-aqua to-sky px-7 py-3.5 text-sm font-bold text-deep shadow-xl shadow-aqua/25 transition hover:-translate-y-0.5"
              >
                <Wrench className="h-4 w-4" /> Book a Service Visit
              </QuoteButton>
              <a
                href={waLink("Hello Limah Fresh, I would like to book a dispenser maintenance or sanitization service.")}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-[#25D366]/25 transition hover:-translate-y-0.5"
              >
                <WhatsAppIcon className="h-4 w-4" /> WhatsApp to Book
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
