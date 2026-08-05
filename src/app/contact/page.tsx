import type { Metadata } from "next";
import Image from "next/image";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { PHOTOS, SITE, waLink, generalInquiryMessage } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { WaveDivider } from "@/components/art/WaveDivider";
import { ContactForm } from "@/components/forms/ContactForm";
import { WhatsAppIcon } from "@/components/art/icons";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Reach Limah E.A. Limited — Amee Holdings, North Airport Road, Nairobi. Call 0718 013 391 or email info@limahfresh.co.ke. Get directions, business hours, and a quick contact form.",
  keywords: [
    "contact Limah Fresh",
    "water company Nairobi contact",
    "Limah Fresh phone number",
    "water delivery contact Kenya",
  ],
  openGraph: {
    title: "Contact Limah Fresh — Pure Drinking Water",
    description:
      "Reach Limah E.A. Limited — Amee Holdings, North Airport Road, Nairobi. Call 0718 013 391 or email info@limahfresh.co.ke.",
  },
};

const cards = [
  {
    icon: MapPin,
    title: "Visit Our Plant",
    lines: [SITE.address, SITE.poBox],
    action: { label: "Get directions", href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.mapQuery)}`, external: true },
  },
  {
    icon: Phone,
    title: "Call or WhatsApp",
    lines: SITE.phones.map((p) => `${p.value} · ${p.label}`),
    action: { label: `Call ${SITE.phones[0].value}`, href: `tel:${SITE.phones[0].raw}` },
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: SITE.emails,
    action: { label: "Write an email", href: `mailto:${SITE.emails[0]}` },
  },
  {
    icon: Clock,
    title: "Operating Hours",
    lines: SITE.hours.map((h) => `${h.days}: ${h.time}`),
    action: { label: "Order on WhatsApp", href: waLink(generalInquiryMessage()), external: true },
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-deep">
        <Image src={PHOTOS.hero} alt="" fill priority className="object-cover opacity-40" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-deep/95 via-navy/85 to-brand/40" />
        <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-aqua/15 blur-3xl" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-16 sm:pb-24">
          <Reveal>
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-foam">
              <span className="h-px w-8 bg-aqua" /> Get in Touch
            </p>
          </Reveal>
          <Reveal delay={120}>
              <h1 className="font-display mt-5 max-w-3xl text-3xl font-extrabold leading-[1.08] tracking-tight text-white xs:text-4xl sm:text-5xl md:text-6xl">
              Let&apos;s Talk <span className="text-gradient">Water</span>
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-mist/85 sm:text-lg">
              Orders, bulk quotes, dispenser service or partnerships — the Limah Fresh team answers fast.
            </p>
          </Reveal>
        </div>
        <WaveDivider fill="#f2fafd" className="absolute inset-x-0 bottom-0" />
      </section>

      {/* Info cards */}
      <section className="bg-ice py-12 sm:py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-5 px-6 xs:grid-cols-2 md:grid-cols-4">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 110}>
              <div className="group flex h-full flex-col rounded-3xl border border-mist bg-white p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-aqua/50 hover:shadow-xl hover:shadow-aqua/10">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-aqua text-white shadow-lg shadow-aqua/25 transition group-hover:scale-110">
                  <c.icon className="h-6 w-6" />
                </span>
                <h3 className="font-display mt-5 text-lg font-bold text-navy">{c.title}</h3>
                <ul className="mt-3 flex-1 space-y-1.5">
                  {c.lines.map((l) => (
                    <li key={l} className="text-[13px] leading-relaxed text-slate-600">
                      {l}
                    </li>
                  ))}
                </ul>
                <a
                  href={c.action.href}
                  target={c.action.external ? "_blank" : undefined}
                  rel={c.action.external ? "noreferrer" : undefined}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand underline-offset-4 transition hover:text-aqua hover:underline"
                >
                  {c.action.label} →
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Form + map */}
      <section className="bg-white py-12 sm:py-16 md:py-20 xl:py-24">
        <div className="mx-auto grid max-w-7xl items-stretch gap-10 px-6 lg:grid-cols-2">
          <Reveal direction="left">
            <div className="mb-7">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-aqua">Direct Email Form</p>
              <h2 className="font-display mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
                Send Us a Message
              </h2>
              <p className="mt-3 text-sm text-slate-600">
                Your note goes straight to <span className="font-semibold text-brand">{SITE.emails[0]}</span> and{" "}
                <span className="font-semibold text-brand">{SITE.emails[1]}</span>.
              </p>
            </div>
            <ContactForm />
          </Reveal>

          <Reveal direction="right">
            <div className="flex h-full flex-col">
              <div className="mb-7">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-aqua">Find Us</p>
                <h2 className="font-display mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
                  North Airport Road, Nairobi
                </h2>
                <p className="mt-3 text-sm text-slate-600">
                  Minutes from JKIA and the SGR — easy drive-in for bottle pickups and bowser dispatches.
                </p>
              </div>
              <div className="map-frame relative flex-1 overflow-hidden rounded-3xl shadow-xl shadow-navy/10 ring-1 ring-mist min-h-[320px] sm:min-h-[420px]">
                <iframe
                  title="Limah E.A. Limited — Amee Holdings, North Airport Road, Nairobi"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(SITE.mapQuery)}&output=embed`}
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="pointer-events-none absolute bottom-5 left-5 right-5 sm:right-auto">
                  <div className="glass-dark pointer-events-auto flex items-center gap-4 rounded-2xl px-5 py-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-aqua to-sky text-deep">
                      <MapPin className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-display text-sm font-extrabold text-white">{SITE.company}</p>
                      <p className="text-xs text-mist/85">
                        {SITE.address}, {SITE.poBox}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* WhatsApp strip */}
      <section className="px-0 pb-12 sm:pb-16 md:pb-20">
        <div className="mx-4 overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-[#128C7E] to-[#25D366] p-8 sm:mx-6 sm:p-12 md:p-14">
          <Reveal direction="scale">
            <div className="flex flex-col items-center justify-between gap-6 lg:flex-row lg:text-left">
              <div className="flex items-center gap-5">
                <span className="hidden h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-white sm:flex">
                  <WhatsAppIcon className="h-9 w-9" />
                </span>
                <div>
                  <h3 className="font-display text-2xl font-extrabold text-white sm:text-3xl">
                    The fastest reply is on WhatsApp.
                  </h3>
                  <p className="mt-1 text-sm text-white/85">
                    Average response time during business hours: under 15 minutes.
                  </p>
                </div>
              </div>
              <a
                href={waLink(generalInquiryMessage())}
                target="_blank"
                rel="noreferrer"
                className="btn-sheen inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-[#128C7E] shadow-xl shadow-black/15 transition hover:-translate-y-0.5"
              >
                <WhatsAppIcon className="h-4 w-4" /> Start a Chat
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
