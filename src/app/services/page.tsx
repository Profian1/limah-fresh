import type { Metadata } from "next";
import Image from "next/image";
import { SITE } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { WaveDivider } from "@/components/art/WaveDivider";
import { BowserSection } from "@/components/services/BowserSection";
import { MaintenanceSection } from "@/components/services/MaintenanceSection";
import { BrandedSection } from "@/components/services/BrandedSection";
import { ContractsSection } from "@/components/services/ContractsSection";

export const metadata: Metadata = {
  title: "Bulk Water Bowser & Services",
  description:
    "Limah Soft Water bowsers for construction, events and institutions; dispenser supply, maintenance & sanitization; scheduled home and office delivery contracts across Nairobi. Custom branded water available.",
  keywords: [
    "water bowser Nairobi",
    "bulk water delivery Kenya",
    "dispenser maintenance Nairobi",
    "branded water bottles Kenya",
    "water delivery contract Nairobi",
    "Limah Soft Water",
    "corporate water supply",
    "event water delivery",
  ],
  openGraph: {
    title: "Limah Fresh — Bulk Water Bowsers & Services",
    description:
      "Limah Soft Water bowsers, dispenser maintenance, branded water bottles and delivery contracts — serving homes, offices, and institutions across Nairobi.",
  },
};

function PageHero() {
  return (
    <section className="relative overflow-hidden bg-deep">
      <Image src="/bowser.webp" alt="" fill priority className="object-cover opacity-60" sizes="100vw" />
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
            From 5,000-litre bowser drops to full dispenser care — the services Kenya&apos;s institutions
            rely on, run by one accountable team.
          </p>
        </Reveal>
      </div>
      <WaveDivider fill="#f2fafd" className="absolute inset-x-0 bottom-0" />
    </section>
  );
}

export default function ServicesPage() {
  return (
    <>
      <PageHero />
      <BowserSection />
      <MaintenanceSection />
      <BrandedSection />
      <ContractsSection />
    </>
  );
}
