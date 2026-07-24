import type { Metadata } from "next";
import Image from "next/image";
import {
  Award,
  CalendarDays,
  Filter,
  Globe2,
  RefreshCw,
  Sparkles,
  Sun,
  Users,
} from "lucide-react";
import { PHOTOS, SITE } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { WaveDivider } from "@/components/art/WaveDivider";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Limah E.A. Limited — incorporated November 20, 2013. Our 4-step purification: micro-filtration, reverse osmosis, ozonation and UV sterilization.",
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
          <h1 className="font-display mt-5 max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl">
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
    <section className="bg-ice py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2">
        <Reveal direction="left">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-aqua">Our Story</p>
          <h2 className="font-display mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
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
                src="/limahstaff.jpg"
                alt="Limah Fresh staff team"
                width={1600}
                height={1067}
                className="h-[420px] w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="glass-dark absolute -bottom-6 -left-4 rounded-3xl p-5 sm:left-8">
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
    <section className="relative overflow-hidden bg-deep py-24">
      <Image src="/operations.png" alt="" fill className="object-cover opacity-30" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-r from-deep/80 via-navy/60 to-brand/20" />
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal className="mb-16 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-sky">Purification Technology</p>
          <h2 className="font-display mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Four Barriers Between <span className="text-gradient">You &amp; Impurity</span>
          </h2>
        </Reveal>
        <div className="relative grid gap-6 md:grid-cols-4">
          <div className="pointer-events-none absolute left-[12%] right-[12%] top-10 hidden border-t-2 border-dashed border-aqua/30 md:block" />
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 140}>
              <div className="group relative h-full rounded-3xl border border-white/10 bg-white/[0.06] p-7 backdrop-blur transition-all duration-500 hover:-translate-y-2 hover:border-aqua/40 hover:bg-white/10">
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

function Team() {
  const members = [
    { img: "/team1.jpg", alt: "Limah Fresh team member" },
    { img: "/team4.jpeg", alt: "Limah Fresh team member" },
    { img: "/team6.jpeg", alt: "Limah Fresh team member" },
    { img: "/team7.jpg", alt: "Limah Fresh team member" },
    { img: "/team3.jpg", alt: "Limah Fresh team member" },
    { img: "/team5.jpg", alt: "Limah Fresh team member" },
    { img: "/team8.jpg", alt: "Limah Fresh team member" },
    { img: "/team2.jpg", alt: "Limah Fresh team member" },
  ];

  return (
    <section className="bg-ice py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mb-14 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand to-aqua px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white shadow-lg shadow-aqua/25">
            <Users className="h-3.5 w-3.5" /> Our Team
          </span>
          <h2 className="font-display mt-5 text-3xl font-extrabold tracking-tight text-navy sm:text-5xl">
            Meet the People Behind <span className="text-gradient-deep">Every Drop</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Passionate, dedicated, and driven by quality — our team makes purity personal.
          </p>
        </Reveal>

        {/* Masonry gallery */}
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4 space-y-4">
          {members.map((m, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="group relative overflow-hidden rounded-[20px] bg-white shadow-md shadow-navy/5 ring-1 ring-mist/50 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-aqua/10 hover:ring-aqua/30">
                <div className="relative w-full">
                  <Image
                    src={m.img}
                    alt={m.alt}
                    width={800}
                    height={1000}
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 translate-y-full p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="font-display text-lg font-bold text-white">Limah Fresh Team</p>
                    <div className="mt-1.5 flex items-center gap-2">
                      <span className="h-1 w-8 rounded-full bg-gradient-to-r from-aqua to-sky" />
                      <span className="text-xs font-medium text-foam/80">Nairobi, Kenya</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
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
      <Team />
    </>
  );
}
