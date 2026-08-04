import type { Metadata } from "next";
import Image from "next/image";
import {
  BadgeCheck,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  Droplet,
  Droplets,
  Gift,
  PhoneCall,
  Sparkles,
  Truck,
  Wrench,
} from "lucide-react";
import { SITE, waLink, bowserMessage } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { WaveDivider } from "@/components/art/WaveDivider";
import { WhatsAppIcon } from "@/components/art/icons";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { QuoteButton } from "@/components/quote/QuoteButton";

export const metadata: Metadata = {
  title: "Bulk Water Bowser & Services",
  description:
    "Limah Soft Water bowsers for construction, events and institutions; dispenser supply, maintenance & sanitization; scheduled home and office delivery contracts across Nairobi.",
};

function PageHero() {
  return (
    <section className="relative overflow-hidden bg-deep">
      <Image src="/bowser.jpeg" alt="" fill priority className="object-cover opacity-60" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-r from-deep/80 via-navy/60 to-brand/25" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-16 sm:pb-24">
        <Reveal>
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-foam">
            <span className="h-px w-8 bg-aqua" /> B2B & Industrial Services
          </p>
        </Reveal>
        <Reveal delay={120}>
          <h1 className="font-display mt-5 max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl">
            Bulk Water &amp; <span className="text-gradient">Care Services</span>
          </h1>
        </Reveal>
        <Reveal delay={240}>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-mist/85 sm:text-lg">
            From 10,000-litre bowser drops to full dispenser care — the services Kenya&apos;s institutions
            rely on, run by one accountable team.
          </p>
        </Reveal>
      </div>
      <WaveDivider fill="#f2fafd" className="absolute inset-x-0 bottom-0" />
    </section>
  );
}

/* ------------------------------- bowser -------------------------------- */

function Bowser() {
  const features = [
    "Food-grade tankers, 5,000L – 30,000L+ per trip",
    "Ideal for construction, events, institutions & commercial sites",
    "Scheduled or emergency same-day dispatch in Nairobi",
    "Driver-assisted offloading with food-grade hose",
    "Volume, trip and monthly-contract billing options",
  ];
  return (
    <section className="bg-ice py-12 sm:py-16 md:py-20 xl:py-24" id="bowser">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal direction="left">
            <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand to-aqua px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white shadow-lg shadow-aqua/25">
              <Truck className="h-3.5 w-3.5" /> Service 01
            </span>
            <h2 className="font-display mt-5 text-3xl font-extrabold tracking-tight text-navy sm:text-5xl">
              Bulk Water Bowsers — <span className="text-gradient-deep">“Limah Soft Water”</span>
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
              <a
                href="#bowser-form"
                className="btn-sheen inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand to-aqua px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-aqua/25 transition hover:-translate-y-0.5"
              >
                <ClipboardList className="h-4 w-4" /> Request a Quote
              </a>
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
                  className="h-[280px] w-full object-cover transition-transform duration-700 hover:scale-105 xs:h-[340px] sm:h-[420px]"
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
                <p className="font-display text-2xl font-extrabold text-navy">5,000L – 30,000L+</p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* inline quote form */}
        <Reveal className="mt-20" direction="scale">
          <div id="bowser-form" className="mx-auto max-w-3xl scroll-mt-28 rounded-[2rem] bg-white p-6 shadow-2xl shadow-navy/10 ring-1 ring-mist sm:p-8 md:p-10">
            <div className="mb-7 text-center">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-aqua text-white shadow-lg shadow-aqua/25">
                <Droplet className="h-6 w-6" />
              </span>
              <h3 className="font-display mt-4 text-2xl font-extrabold text-navy sm:text-3xl">
                Request a Bowser / Quote
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Tell us the location, volume and date — we&apos;ll confirm availability and pricing fast.
              </p>
            </div>
            <QuoteForm defaultService="bowser" accent />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------- maintenance ------------------------------ */

function Maintenance() {
  const list = [
    "Scheduled deep-cleaning & sanitization cycles",
    "Hot tank descaling and tap sterilization",
    "Technical diagnosis, repair & genuine spares",
    "Sanitization certificate after every service",
    "Service reminders — we track the calendar for you",
  ];
  return (
    <section className="relative overflow-hidden bg-navy py-12 sm:py-16 md:py-20 xl:py-24">
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal direction="left" className="order-2 lg:order-1">
            <div className="relative">
              <div className="overflow-hidden rounded-[2rem] shadow-2xl shadow-deep/40 ring-1 ring-white/10">
                <Image
                  src="/dispenser.jpg"
                  alt="Technician-serviced office water dispenser in use"
                  width={1600}
                  height={1067}
                  className="h-[280px] w-full object-cover transition-transform duration-700 hover:scale-105 xs:h-[340px] sm:h-[420px]"
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
            <div className="mt-9">
              <QuoteButton
                service="dispenser_maintenance"
                className="btn-sheen inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-aqua to-sky px-7 py-3.5 text-sm font-bold text-deep shadow-xl shadow-aqua/25 transition hover:-translate-y-0.5"
              >
                <Wrench className="h-4 w-4" /> Book a Service Visit
              </QuoteButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- contracts -------------------------------- */

function Contracts() {
  const plans = [
    {
      icon: Droplets,
      name: "Home Plan",
      tag: "Residential",
      points: ["2× 18.9L refills weekly", "Flexible delivery windows", "Bottle exchange included", "Pause anytime"],
    },
    {
      icon: CalendarClock,
      name: "Office Plan",
      tag: "Most Popular",
      featured: true,
      points: [
        "Scheduled weekly bottle drops",
        "Dispenser supply & free installation",
        "Priority same-day top-ups",
        "Monthly consolidated invoicing",
      ],
    },
    {
      icon: Truck,
      name: "Institution Plan",
      tag: "Enterprise",
      points: [
        "Custom volumes — bottles to bowsers",
        "Dedicated account manager",
        "Sanitization & maintenance bundled",
        "SLA-backed delivery guarantees",
      ],
    },
  ];
  return (
    <section className="bg-white py-12 sm:py-16 md:py-20 xl:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mb-14 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand to-aqua px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white shadow-lg shadow-aqua/25">
            <BadgeCheck className="h-3.5 w-3.5" /> Service 04
          </span>
          <h2 className="font-display mt-5 text-3xl font-extrabold tracking-tight text-navy sm:text-5xl">
            Corporate &amp; Home <span className="text-gradient-deep">Delivery Contracts</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Never think about water again. Pick a rhythm — we handle refills, exchanges and dispenser care.
          </p>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 130}>
              <div
                className={`relative flex h-full flex-col rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 ${
                  plan.featured
                    ? "bg-gradient-to-b from-navy to-brand text-white shadow-2xl shadow-brand/25"
                    : "border border-mist bg-gradient-to-b from-ice to-white hover:border-aqua/50 hover:shadow-xl hover:shadow-aqua/10"
                }`}
              >
                <span
                  className={`absolute right-6 top-6 rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] ${
                    plan.featured ? "bg-white/15 text-foam" : "bg-mist/70 text-brand"
                  }`}
                >
                  {plan.tag}
                </span>
                <span
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg ${
                    plan.featured
                      ? "bg-white/15 text-foam shadow-deep/20"
                      : "bg-gradient-to-br from-brand to-aqua text-white shadow-aqua/25"
                  }`}
                >
                  <plan.icon className="h-7 w-7" />
                </span>
                <h3 className={`font-display mt-6 text-2xl font-extrabold ${plan.featured ? "text-white" : "text-navy"}`}>
                  {plan.name}
                </h3>
                <ul className="mt-5 flex-1 space-y-3">
                  {plan.points.map((pt) => (
                    <li
                      key={pt}
                      className={`flex items-start gap-2.5 text-sm ${plan.featured ? "text-foam" : "text-slate-700"}`}
                    >
                      <CheckCircle2 className={`mt-0.5 h-[18px] w-[18px] shrink-0 ${plan.featured ? "text-white" : "text-aqua"}`} />
                      <span className="font-medium">{pt}</span>
                    </li>
                  ))}
                </ul>
                <QuoteButton
                  service="delivery_contract"
                  className={`btn-sheen mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold transition hover:-translate-y-0.5 ${
                    plan.featured
                      ? "bg-white text-navy shadow-xl shadow-deep/25"
                      : "bg-gradient-to-r from-brand to-aqua text-white shadow-lg shadow-aqua/25"
                  }`}
                >
                  <PhoneCall className="h-4 w-4" /> Get {plan.name} Quote
                </QuoteButton>
              </div>
            </Reveal>
          ))}
        </div>

        {/* process */}
        <Reveal className="mt-20">
          <div className="grid gap-px overflow-hidden rounded-3xl bg-mist xs:grid-cols-2 md:grid-cols-4">
            {[
              ["01", "Request", "Call, WhatsApp or submit the quote form."],
              ["02", "Confirm", "We schedule around your site and timeline."],
              ["03", "Deliver", "Bottles or bowsers arrive when promised."],
              ["04", "Support", "Sanitization, swaps and care on schedule."],
            ].map(([num, title, text]) => (
              <div key={num} className="bg-ice px-7 py-8">
                <p className="font-display text-3xl font-extrabold text-aqua/50">{num}</p>
                <p className="font-display mt-2 text-lg font-bold text-navy">{title}</p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------- branded water ----------------------------- */

function BrandedWater() {
  const features = [
    "Weddings, corporate summits, birthdays, and thank-you gifts",
    "Company-branded water for offices, hotels, clinics, and sites",
    "Sizes: 500ml, 1L, 5L, 10L, and 20L",
    "Custom label design and premium packaging included",
  ];
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
            <div className="overflow-hidden rounded-[2rem] shadow-2xl shadow-navy/20 ring-1 ring-mist">
              <Image
                src="/branded.jpg"
                alt="Custom branded Limah Fresh water bottles"
                width={1600}
                height={1067}
                className="h-[280px] w-full object-cover transition-transform duration-700 hover:scale-105 xs:h-[340px] sm:h-[420px]"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  return (
    <>
      <PageHero />
      <Bowser />
      <Maintenance />
      <BrandedWater />
      <Contracts />
    </>
  );
}
