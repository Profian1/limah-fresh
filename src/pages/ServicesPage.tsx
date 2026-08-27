import { SITE } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { WaveDivider } from "@/components/art/WaveDivider";
import { BowserSection } from "@/components/services/BowserSection";
import { MaintenanceSection } from "@/components/services/MaintenanceSection";
import { BrandedSection } from "@/components/services/BrandedSection";
import { ContractsSection } from "@/components/services/ContractsSection";

function PageHero() {
  return (
    <section className="relative overflow-hidden bg-deep">
      <img src="/bowser.webp" alt="" className="absolute inset-0 h-full w-full object-cover opacity-60" fetchPriority="high" />
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
