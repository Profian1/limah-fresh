import Image from "next/image";
import Link from "next/link";
import dynamicImport from "next/dynamic";
import {
  ArrowRight,
  BadgeCheck,
  Quote,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { SITE, waLink, generalInquiryMessage } from "@/lib/site";
import { getFeaturedProducts } from "@/data/products";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { WhatsAppIcon } from "@/components/art/icons";
import { ProductCard } from "@/components/product/ProductCard";
import { QuoteButton } from "@/components/quote/QuoteButton";
import { Services } from "@/components/services/Services";

const WhyChooseUs = dynamicImport(() => import("@/components/why-choose-us/WhyChooseUs").then((m) => ({ default: m.WhyChooseUs })));
const Clients = dynamicImport(() => import("@/components/clients/Clients").then((m) => ({ default: m.Clients })));
const GalleryPreview = dynamicImport(() => import("@/components/gallery/GalleryPreview").then((m) => ({ default: m.GalleryPreview })));

export const dynamic = "force-dynamic";

/* ---------------------------------- hero ---------------------------------- */

function Hero() {
  return (
    <>
      {/* ── MOBILE layout (< 768px): full-bleed hero image with text overlay ── */}
      <section className="relative flex min-h-screen flex-col justify-end overflow-hidden bg-deep md:hidden">
        {/* Full-bleed mobile hero image */}
        <Image
          src="/mobile-hero-background.png"
          alt="Limah Fresh pure water"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Gradient overlay — deeper at the bottom where text sits */}
        <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/40 to-transparent" />

        {/* Text + CTA panel — pinned to very bottom */}
        <div className="relative z-20 px-6 pb-30 pt-8">
          <Reveal delay={120}>
            <h2 className="font-display text-[2.1rem] font-extrabold leading-[1.1] tracking-tight text-white xs:text-[2.4rem]">
              Pure Hydration,
              <br />
              Delivered to <span className="text-gradient">Your Doorstep</span>
            </h2>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-5 text-base leading-relaxed text-mist/85">
              Exceptional taste from water purified through{" "}
              <strong className="text-white">reverse osmosis</strong> and{" "}
              <strong className="text-white">UV sterilization</strong> — bottled
              by {SITE.company} for homes, offices and institutions across
              Nairobi.
            </p>
          </Reveal>
          <Reveal delay={360}>
            <div className="mt-8 flex flex-col gap-3">
              <Link
                href="/products"
                className="btn-sheen group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand to-aqua px-7 py-4 text-sm font-bold text-white shadow-xl shadow-aqua/30 transition hover:-translate-y-0.5"
              >
                Explore Products
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href={waLink(generalInquiryMessage())}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-4 text-sm font-bold text-white shadow-xl shadow-[#25D366]/25 transition hover:-translate-y-0.5"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Order via WhatsApp
              </a>
              <QuoteButton
                service="bowser"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-foam/40 bg-white/5 px-7 py-4 text-sm font-bold text-foam backdrop-blur transition hover:bg-white/15"
              >
                <Truck className="h-4 w-4" />
                Request a Bowser
              </QuoteButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── DESKTOP / TABLET layout (≥ 768px): full-bleed background, unchanged ── */}
      <section className="relative hidden min-h-screen items-center overflow-hidden bg-deep md:flex">
        <Image
          src="/hero background.png"
          alt=""
          fill
          priority
          className="object-cover opacity-70"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-deep/65 via-navy/45 to-brand/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-deep/40 via-transparent to-deep/25" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20">
          <Reveal delay={120}>
            <h1 className="font-display mt-6 text-[2.6rem] font-extrabold leading-[1.05] tracking-tight text-white xs:text-5xl sm:text-6xl xl:text-7xl">
              Pure Hydration,
              <br />
              Delivered to <span className="text-gradient">Your Doorstep</span>
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-mist/85 sm:text-lg">
              Exceptional taste from water purified through{" "}
              <strong className="text-white">reverse osmosis</strong> and{" "}
              <strong className="text-white">UV sterilization</strong> — bottled
              by {SITE.company} for homes, offices and institutions across
              Nairobi.
            </p>
          </Reveal>
          <Reveal delay={360}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/products"
                className="btn-sheen group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand to-aqua px-7 py-4 text-sm font-bold text-white shadow-xl shadow-aqua/30 transition hover:-translate-y-0.5"
              >
                Explore Products
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href={waLink(generalInquiryMessage())}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-4 text-sm font-bold text-white shadow-xl shadow-[#25D366]/25 transition hover:-translate-y-0.5"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Order via WhatsApp
              </a>
              <QuoteButton
                service="bowser"
                className="inline-flex items-center gap-2 rounded-full border border-foam/40 bg-white/5 px-7 py-4 text-sm font-bold text-foam backdrop-blur transition hover:bg-white/15"
              >
                <Truck className="h-4 w-4" />
                Request a Bowser
              </QuoteButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ------------------------------ trust ribbon ------------------------------ */

function TrustRibbon() {
  const items = [
    {
      icon: ShieldCheck,
      label: "KEBS Diamond Mark Certified",
      color: "from-brand via-brand to-aqua",
    },
    {
      icon: BadgeCheck,
      label: "KRA Excise Licensed",
      color: "from-aqua via-sky to-foam",
    },
    {
      icon: ShieldCheck,
      label: "Ministry of Health Certified",
      color: "from-navy via-brand to-aqua",
    },
    {
      icon: Truck,
      label: "Free Delivery in Nairobi",
      color: "from-[#25D366] via-[#128C7E] to-[#075e54]",
    },
  ];

  const double = [...items, ...items, ...items];

  return (
    <section className="overflow-hidden bg-gradient-to-r from-brand via-aqua to-sky py-5">
      <div
        className="group relative"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, black 5%, black 95%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, black 5%, black 95%, transparent)",
        }}
      >
        <div className="animate-marquee flex w-max items-center gap-0 group-hover:[animation-play-state:paused]">
          {double.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 whitespace-nowrap px-10"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/25 text-white shadow-lg backdrop-blur">
                <item.icon className="h-5 w-5" />
              </span>
              <span className="font-display text-base font-extrabold tracking-tight text-white sm:text-lg">
                {item.label}
              </span>
              <span className="mx-2 h-1.5 w-1.5 rounded-full bg-white/40" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- featured products ---------------------------- */

function Featured() {
  const featured = getFeaturedProducts();
  return (
    <section className="relative bg-gradient-to-b from-ice to-white py-12 sm:py-16 md:py-20 xl:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <Reveal className="mb-8 text-center md:mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-aqua">
            Our Products
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#102A43] sm:text-5xl">
            Pure Hydration in <span className="text-gradient">Every Size</span>
          </h2>
        </Reveal>
        <div className="grid grid-cols-2 gap-3 xs:gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {featured.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------- stats --------------------------- */

function StatsBand() {
  const stats = [
    { value: 13, suffix: "+", label: "Years serving Kenya" },
    { value: 950000, suffix: "+", label: "Litres purified yearly" },
    { value: 8, suffix: "+", label: "Major institutions" },
    { value: 100, suffix: "%", label: "Batches lab-tested" },
  ];
  return (
    <section className="bg-white py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-6 xs:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 100}>
              <div className="flex h-full flex-col items-center rounded-3xl bg-ice px-4 py-8 text-center xs:px-6 sm:py-10">
                <CountUp
                  end={s.value}
                  suffix={s.suffix}
                  className="font-display text-3xl font-extrabold text-navy xs:text-4xl sm:text-5xl"
                />
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-brand/80">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------- testimonials --------------------------- */

function Testimonials() {
  const testimonials = [
    {
      quote:
        "LIMAH FRESH has provided our school with excellent service, clean high-quality drinking water with unmatched professionalism. We truly value and enjoy working with them and highly recommend their reliable services.",
      name: "Head of Administration",
      org: "BLESSEDVILLE SCHOOLS",
    },
    {
      quote:
        "LIMAH FRESH has consistently delivered quality services and reliable drinking water to our media house. Their professionalism and timely delivery make them a partner we appreciate working with.",
      name: "Head of Operations",
      org: "TULIA DIGITAL MEDIA",
    },
    {
      quote:
        "We've been using Limah Fresh for both water deliveries and dispenser maintenance, and the experience has been excellent. Their technicians are knowledgeable, and the service is fast and reliable. It's one less thing for us to worry about.",
      name: "Sales Manager",
      org: "RJ MARKETING",
    },
  ];
  return (
    <section className="bg-white py-12 sm:py-16 md:py-20 xl:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mb-12 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-aqua">
            Word on the Street
          </p>
          <h2 className="font-display mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-5xl">
            Trusted Where Quality{" "}
            <span className="text-gradient-deep">Cannot Slip</span>
          </h2>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.org} delay={i * 130}>
              <figure className="relative flex h-full flex-col rounded-3xl border border-mist/70 bg-gradient-to-b from-ice to-white p-5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-aqua/10 sm:p-6 md:p-8">
                <Quote className="h-8 w-8 text-aqua/50" />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-700">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-6 border-t border-mist pt-4">
                  <p className="font-display text-sm font-bold text-navy">
                    {t.name}
                  </p>
                  <p className="text-xs font-medium text-brand">{t.org}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- CTA band -------------------------------- */

function CtaBand() {
  return (
    <section className="relative overflow-hidden px-4 py-16 xs:px-6 sm:py-20 md:py-24">
      <Image
        src="/bowser.jpeg"
        alt=""
        fill
        className="object-cover opacity-90"
        sizes="100vw"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/85 via-navy/65 to-brand/40" />
      <Reveal direction="scale" className="relative z-10">
        <div className="wave-dots relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand via-aqua to-sky p-8 text-center shadow-2xl shadow-brand/30 sm:p-12 md:p-16">
          <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <Truck className="mx-auto h-12 w-12 text-white" />
          <h2 className="font-display mx-auto mt-6 max-w-3xl text-2xl font-extrabold leading-tight tracking-tight text-white xs:text-3xl sm:text-4xl md:text-5xl">
            Need Bulk Water for Construction, Events or Commercial Use?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/90 sm:text-base">
            Limah Soft Water bowsers deliver clean soft water across Nairobi —
            flexible volumes, scheduled windows and driver-assisted offloading.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <QuoteButton
              service="bowser"
              className="btn-sheen inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-deep shadow-xl shadow-navy/20 transition hover:-translate-y-0.5"
            >
              Request a Bowser Today
              <ArrowRight className="h-4 w-4" />
            </QuoteButton>
            <a
              href={waLink(
                "Hello Limah Fresh, I would like to request a water bowser delivery quote.",
                SITE.whatsappBowser,
              )}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-8 py-4 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20"
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp the Team
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------------------------------- page ----------------------------------- */

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustRibbon />
      <Services />
      <Featured />
      <GalleryPreview />
      <WhyChooseUs />
      <Clients />
      <StatsBand />
      <CtaBand />
      <Testimonials />
    </>
  );
}
