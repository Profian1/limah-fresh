import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { waLink, generalInquiryMessage } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { WaveDivider } from "@/components/art/WaveDivider";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { WhatsAppIcon } from "@/components/art/icons";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Explore the Limah Fresh gallery: our Nairobi purification plant, water bottling facility, delivery fleet, team in action, and featured projects across Kenya since 2013.",
  keywords: [
    "Limah Fresh gallery",
    "water company Kenya photos",
    "water purification plant Nairobi",
    "Limah Fresh facilities",
  ],
  openGraph: {
    title: "Limah Fresh Gallery — Our Facilities & Team",
    description:
      "See behind the scenes at Limah Fresh — purification plant, bottling facility, delivery fleet, and our dedicated team serving Kenya.",
  },
};

const FEATURED_PROJECTS = [
  { src: "/ourbowsers.webp", alt: "Limah Fresh fleet of water bowsers", aspect: "aspect-[16/9]" },
  { src: "/custom-branded-water.webp", alt: "Custom branded water bottles for a corporate event", aspect: "aspect-[3/4]" },
  { src: "/dispenser-maintenance.webp", alt: "Office water dispenser maintenance in progress", aspect: "aspect-[4/3]" },
  { src: "/team6.webp", alt: "Limah Fresh water delivery personnel in action", aspect: "aspect-[4/3]" },
  { src: "/WhatsApp Image 2026-07-27 at 12.24.37 PM (3).webp", alt: "Limah Fresh project delivery", aspect: "aspect-[3/4]" },
  { src: "/24packenh.webp", alt: "Shrink-wrapped 24-packs of Limah Fresh water", aspect: "aspect-[4/5]" },
  { src: "/bowser.webp", alt: "Limah Soft Water bowser delivery", aspect: "aspect-[16/9]" },
];

const WORKSHOP_FACILITIES = [
  { src: "/company.webp", alt: "Limah Fresh company premises", aspect: "aspect-[16/9]" },
  { src: "/front.webp", alt: "Front exterior of Limah Fresh", aspect: "aspect-[16/9]" },
  { src: "/operations.webp", alt: "Inside the Limah Fresh purification facility", aspect: "aspect-video" },
  { src: "/packed bottles.webp", alt: "Freshly packed bottles ready for dispatch", aspect: "aspect-square" },
  { src: "/pack.webp", alt: "Shrink-wrapped Limah Fresh water crates", aspect: "aspect-[4/3]" },
  { src: "/row.webp", alt: "Neat row of Limah Fresh water bottles", aspect: "aspect-video" },
  { src: "/soft.webp", alt: "Limah Soft Water bottles", aspect: "aspect-[4/3]" },
  { src: "/24 pack 2.webp", alt: "24-pack of purified water", aspect: "aspect-square" },
];

const TEAM_IN_ACTION = [
  { src: "/limahstaff.webp", alt: "The Limah Fresh team ready to serve", aspect: "aspect-video" },
  { src: "/happy client.webp", alt: "Happy Limah Fresh client", aspect: "aspect-[3/4]" },
  { src: "/happy client 1.webp", alt: "Satisfied Limah Fresh customer", aspect: "aspect-square" },
  { src: "/team1.webp", alt: "Our delivery personnel out in the field", aspect: "aspect-square" },
  { src: "/team2.webp", alt: "Technical staff reviewing operations", aspect: "aspect-[3/4]" },
  { src: "/team3.webp", alt: "Quality control inspection", aspect: "aspect-[4/3]" },
  { src: "/team4.webp", alt: "Customer service and dispatch team", aspect: "aspect-square" },
  { src: "/team5.webp", alt: "Loading water bowsers for a major project", aspect: "aspect-[4/5]" },
  { src: "/team7.webp", alt: "Team members collaborating", aspect: "aspect-[3/4]" },
  { src: "/team8.webp", alt: "Staff at the production line", aspect: "aspect-[4/3]" },
];

function GalleryHero() {
  return (
    <section className="relative overflow-hidden bg-deep">
      <Image src="/hero background.webp" alt="" fill priority className="object-cover opacity-60" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-r from-deep/90 via-navy/70 to-brand/30" />
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center text-center px-6 pb-20 pt-16 sm:pb-24">
        <Reveal>
          <p className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-foam">
            <span className="h-px w-8 bg-aqua" /> Visual Showcase <span className="h-px w-8 bg-aqua" />
          </p>
        </Reveal>
        <Reveal delay={120}>
          <h1 className="font-display mt-5 max-w-3xl text-3xl font-extrabold leading-[1.08] tracking-tight text-white xs:text-4xl sm:text-5xl md:text-6xl">
            Our <span className="text-gradient">Gallery</span>
          </h1>
        </Reveal>
        <Reveal delay={240}>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-mist/85 sm:text-lg">
            Take a look inside our state-of-the-art purification facilities, meet the dedicated team behind the scenes, and explore some of our featured projects across Kenya.
          </p>
        </Reveal>
      </div>
      <WaveDivider fill="#f2fafd" className="absolute inset-x-0 bottom-0" />
    </section>
  );
}

function GallerySection({ id, title, subtitle, images }: { id: string; title: string; subtitle: string; images: { src: string; alt: string; aspect: string }[] }) {
  return (
    <section id={id} className="bg-ice py-12 first-of-type:pt-16 last-of-type:pb-32 sm:py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mb-12 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-aqua">{subtitle}</p>
          <h2 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
            {title}
          </h2>
        </Reveal>
        
        <GalleryGrid images={images} />
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-navy px-6 py-12 sm:py-16 md:py-20 xl:py-24">
      <div className="absolute inset-0 bg-gradient-to-br from-brand/20 via-transparent to-transparent" />
      <Reveal direction="up" className="relative z-10 text-center">
        <h2 className="font-display mx-auto max-w-2xl text-2xl font-extrabold tracking-tight text-white xs:text-3xl sm:text-4xl md:text-5xl">
          Ready to Transform Your Space?
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-mist/90">
          Whether you need a reliable bulk water supply, premium dispenser maintenance, or branded water for your next event, Limah Fresh is here to help.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/services#bowser"
            className="btn-sheen inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand to-aqua px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-aqua/25 transition hover:-translate-y-0.5 xs:px-8 xs:py-4"
          >
            Request a Quote
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href={waLink(generalInquiryMessage())}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-[#25D366]/25 transition hover:-translate-y-0.5 xs:px-8 xs:py-4"
          >
            <WhatsAppIcon className="h-4 w-4" /> Contact Us
          </a>
        </div>
      </Reveal>
    </section>
  );
}

export default function GalleryPage() {
  return (
    <>
      <GalleryHero />
      <div className="bg-ice">
        <GallerySection 
          id="featured" 
          subtitle="Our Work" 
          title="Featured Projects" 
          images={FEATURED_PROJECTS} 
        />
        <GallerySection 
          id="facilities" 
          subtitle="Behind the Scenes" 
          title="Workshop & Facilities" 
          images={WORKSHOP_FACILITIES} 
        />
        <GallerySection 
          id="team" 
          subtitle="The People" 
          title="Our Team in Action" 
          images={TEAM_IN_ACTION} 
        />
      </div>
      <CtaSection />
    </>
  );
}
