"use client";

import { BadgeCheck, CalendarClock, CheckCircle2, Droplets, PhoneCall, Truck } from "lucide-react";
import { waLink } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { QuoteButton } from "@/components/quote/QuoteButton";
import { WhatsAppIcon } from "@/components/art/icons";

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

export function ContractsSection() {
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
                <div className="mt-8 space-y-3">
                  <QuoteButton
                    service="delivery_contract"
                    className={`btn-sheen inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold transition hover:-translate-y-0.5 ${
                      plan.featured
                        ? "bg-white text-navy shadow-xl shadow-deep/25"
                        : "bg-gradient-to-r from-brand to-aqua text-white shadow-lg shadow-aqua/25"
                    }`}
                  >
                    <PhoneCall className="h-4 w-4" /> Get {plan.name} Quote
                  </QuoteButton>
                  <a
                    href={waLink("Hello Limah Fresh, I would like to discuss a water delivery contract for my home/office.")}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold transition hover:-translate-y-0.5 ${
                      plan.featured
                        ? "bg-[#25D366] text-white shadow-xl shadow-[#25D366]/25"
                        : "bg-[#25D366] text-white shadow-lg shadow-[#25D366]/25"
                    }`}
                  >
                    <WhatsAppIcon className="h-4 w-4" /> WhatsApp Inquiry
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

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
