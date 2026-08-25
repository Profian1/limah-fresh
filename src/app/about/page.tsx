import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  CalendarDays,
  Camera,
  Filter,
  Globe2,
  RefreshCw,
  Sparkles,
  Sun,
} from "lucide-react";
import { PHOTOS, SITE } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { WaveDivider } from "@/components/art/WaveDivider";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Limah E.A. Limited — incorporated November 20, 2013 under Cap 486. KEBS-certified. Our 4-step purification: micro-filtration, reverse osmosis, ozonation and UV sterilization. Serving Kenya since 2013.",
  keywords: [
    "about Limah Fresh",
    "water purification Kenya",
    "KEBS certified water",
    "Limah E.A. Limited",
    "reverse osmosis water Nairobi",
  ],
  openGraph: {
    title: "About Limah Fresh — Pure Drinking Water Since 2013",
    description:
      "Limah E.A. Limited — KEBS-certified purified drinking water. 4-step purification process serving homes, offices and institutions across Kenya.",
  },
};

function PageHero() {
  return (
    <section className="relative overflow-hidden bg-deep">
      <Image src={PHOTOS.ripple} alt="" fill priority className="object-cover opacity-40" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-r from-deep/95 via-navy/85 to-brand/40" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-16 sm:pb-24">
        <Reveal>
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-foam">
            <span className="h-px w-8 bg-aqua" /> About {SITE.company}
          </p>
        </Reveal>
        <Reveal delay={120}>
          <h1 className="font-display mt-5 max-w-3xl text-3xl font-extrabold leading-[1.08] tracking-tight text-white xs:text-4xl sm:text-5xl md:text-6xl">
            Water You Can Trust, <span className="text-gradient">Bottle After Bottle</span>
          </h1>
        </Reveal>
        <Reveal delay={240}>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-mist/85 sm:text-lg">
            Since 2013 we have been on a single mission — solving clean water supply challenges across Kenya
            and Africa, one purified litre at a time.
          </p>
        </Reveal>
      </div>
      <WaveDivider fill="#f2fafd" className="absolute inset-x-0 bottom-0" />
    </section>
  );
}

function Story() {
  return (
    <section className="bg-ice py-12 sm:py-16 md:py-20 xl:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2">
        <Reveal direction="left">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-aqua">Our Story</p>
          <h2 className="font-display mt-3 text-2xl font-extrabold tracking-tight text-navy xs:text-3xl sm:text-4xl">
            Ensuring You Love &amp; Enjoy Your Environment
          </h2>
          <p className="mt-6 text-[15px] leading-relaxed text-slate-700">
            <strong className="text-navy">{SITE.company}</strong> was incorporated on{" "}
            <strong className="text-navy">November 20, 2013</strong> under the Companies Act (Cap 486) of the
            Laws of Kenya. From our plant at Amee Holdings on North Airport Road, Nairobi, we set out to close
            the gap between the water people had and the water people deserve.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-slate-700">
            Today, Limah Fresh serves thousands of households and some of Kenya&apos;s most demanding
            institutions — delivering purified bottled water, dispenser solutions and bulk soft water with the
            same obsession: <em>purity you can verify, service you can rely on.</em>
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              { icon: CalendarDays, label: "Incorporated", value: "Nov 20, 2013" },
              { icon: Globe2, label: "Vision", value: "Kenya & Africa" },
              { icon: Award, label: "Standard", value: "KEBS Diamond Mark" },
            ].map((m) => (
              <div key={m.label} className="rounded-2xl border border-mist bg-white p-4">
                <m.icon className="h-5 w-5 text-brand" />
                <p className="mt-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">{m.label}</p>
                <p className="font-display mt-1 text-sm font-extrabold text-navy">{m.value}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal direction="right">
          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] shadow-2xl shadow-navy/20 ring-1 ring-mist">
              <Image
                src="/limahstaff.webp"
                alt="Limah Fresh staff team"
                width={1600}
                height={1067}
                className="w-full aspect-[3/2] object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
              />
            </div>
            <div className="glass-dark absolute -bottom-6 -left-2 rounded-3xl p-5 xs:-left-4 sm:left-8">
              <p className="font-display text-3xl font-extrabold text-white">
                4-Step <span className="text-aqua">Purification</span>
              </p>
              <p className="mt-1 text-xs font-medium text-mist/80">
                Micro-filtration · RO · Ozonation · UV
              </p>
            </div>
            <div className="absolute -right-3 -top-6 animate-float rounded-3xl bg-white px-6 py-4 shadow-xl shadow-navy/10 ring-1 ring-mist sm:right-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand">Established</p>
              <p className="font-display text-2xl font-extrabold text-navy">2013</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Purification() {
  const steps = [
    {
      icon: Filter,
      num: "01",
      title: "Micro-Filtration",
      text: "Raw water passes through fine sediment and carbon micro-filters that strip out suspended particles, odours and organic matter.",
    },
    {
      icon: RefreshCw,
      num: "02",
      title: "Reverse Osmosis",
      text: "High-pressure membranes remove dissolved solids, salts and impurities down to 0.0001 microns — the heart of our purity.",
    },
    {
      icon: Sparkles,
      num: "03",
      title: "Ozonation",
      text: "Food-grade ozone (O₃) is infused to neutralize bacteria and viruses, keeping every bottle sterile from plant to seal.",
    },
    {
      icon: Sun,
      num: "04",
      title: "UV Sterilization",
      text: "A final ultraviolet light bath deactivates any remaining microorganisms — pure, safe water with its fresh taste intact.",
    },
  ];
  return (
    <section className="relative overflow-hidden bg-deep py-12 sm:py-16 md:py-20 xl:py-24">
      <Image src="/operations.webp" alt="" fill className="object-cover opacity-30" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-r from-deep/80 via-navy/60 to-brand/20" />
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal className="mb-16 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-sky">Purification Technology</p>
          <h2 className="font-display mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Four Barriers Between <span className="text-gradient">You &amp; Impurity</span>
          </h2>
        </Reveal>
        <div className="relative grid gap-6 xs:grid-cols-2 md:grid-cols-4">
          <div className="pointer-events-none absolute left-[12%] right-[12%] top-10 hidden border-t-2 border-dashed border-aqua/30 md:block" />
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 140}>
              <div className="group relative h-full rounded-3xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur transition-all duration-500 hover:-translate-y-2 hover:border-aqua/40 hover:bg-white/10 xs:p-6 sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-aqua to-sky text-deep shadow-lg shadow-aqua/30 transition group-hover:scale-110 group-hover:-rotate-6">
                    <s.icon className="h-7 w-7" />
                  </span>
                  <span className="font-display text-3xl font-extrabold text-white/15 transition group-hover:text-aqua/40">
                    {s.num}
                  </span>
                </div>
                <h3 className="font-display mt-6 text-lg font-bold text-white">{s.title}</h3>
                <p className="mt-2.5 text-[13px] leading-relaxed text-mist/70">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryCta() {
  const previewImages = [
    { src: "/limahstaff.webp", alt: "The Limah Fresh team ready to serve" },
    { src: "/bowser.webp", alt: "Limah Soft Water bowser delivering to a construction site" },
  ];

  return (
    <section className="bg-ice py-12 sm:py-16 md:py-20 xl:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Collage side */}
          <Reveal direction="left">
            <div className="relative grid grid-cols-2 gap-3 sm:gap-4">
              {previewImages.map((img) => (
                <div key={img.src} className="overflow-hidden rounded-[24px] shadow-xl shadow-navy/10 ring-1 ring-mist/50">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={400}
                    height={500}
                    className="w-full aspect-[4/5] object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </Reveal>

          {/* Text + CTA side */}
          <Reveal direction="right">
            <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand to-aqua px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white shadow-lg shadow-aqua/25">
              <Camera className="h-3.5 w-3.5" /> Our Gallery
            </span>
            <h2 className="font-display mt-5 text-3xl font-extrabold tracking-tight text-navy sm:text-5xl">
              Explore Our <span className="text-gradient-deep">Gallery</span>
            </h2>
            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-slate-600">
              Discover our completed projects, workshop, facilities and skilled team — see the quality and care that goes into every drop.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-500">
              From our state-of-the-art purification plant to successful deliveries across Nairobi, our gallery tells the story of reliability, hygiene, and passion for pure water.
            </p>
            <Link
              href="/gallery"
              className="btn-sheen group mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand to-aqua px-8 py-4 text-sm font-bold text-white shadow-xl shadow-aqua/25 transition hover:-translate-y-0.5"
            >
              Explore Full Gallery
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <>
      <PageHero />
      <Story />
      <Purification />
      <GalleryCta />
    </>
  );
}
