import { Link } from "react-router-dom";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/art/Logo";
import { WhatsAppIcon } from "@/components/art/icons";
import { NAV_LINKS, SITE, waLink, generalInquiryMessage } from "@/lib/site";

const productLinks = [
  { href: "/products?cat=bottled_water", label: "Bottled Water" },
  { href: "/products?cat=dispensers", label: "Water Dispensers" },
  { href: "/products?cat=accessories", label: "Accessories" },
  { href: "/services", label: "Bulk Bowser Supply" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-deep text-mist">
      <div className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-brand/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-aqua/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 pb-28 pt-12 sm:px-6 sm:pt-16 md:pb-10 lg:px-8">
        <div className="grid gap-8 sm:gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          <div>
            <Logo dark />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-mist/70">
              Premium purified drinking water — micro-filtered, reverse-osmosis treated, ozonated and
              UV-sterilized. Serving homes, offices and institutions across Nairobi since 2013.
            </p>
            <a
              href={waLink(generalInquiryMessage())}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-black/20 transition hover:-translate-y-0.5"
            >
              <WhatsAppIcon className="h-4 w-4" /> Chat on WhatsApp
            </a>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-foam">Explore</h4>
            <ul className="mt-5 space-y-3 text-sm">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className="text-mist/75 transition hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-foam">Catalog</h4>
            <ul className="mt-5 space-y-3 text-sm">
              {productLinks.map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className="text-mist/75 transition hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-foam">Talk to Us</h4>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-aqua" />
                <span className="flex flex-col gap-1.5 text-mist/75">
                  {SITE.locations.map((loc) => (
                    <span key={loc.label}>
                      <span className="font-medium text-white/80">{loc.label}:</span> {loc.address}
                    </span>
                  ))}
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-aqua" />
                <span className="flex flex-col gap-1 text-mist/75">
                  {SITE.phones.map((p) => (
                    <a key={p.raw} href={`tel:${p.raw}`} className="transition hover:text-white">
                      {p.value} <span className="text-mist/40">· {p.label}</span>
                    </a>
                  ))}
                </span>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-aqua" />
                <span className="flex flex-col gap-1 text-mist/75">
                  {SITE.emails.map((e) => (
                    <a key={e} href={`mailto:${e}`} className="break-all transition hover:text-white">
                      {e}
                    </a>
                  ))}
                </span>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-aqua" />
                <span className="text-mist/75">
                  Mon – Fri: 8:00 AM – 5:30 PM
                  <br />
                  Sat: 8:00 AM – 3:00 PM
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-6 text-center text-xs text-mist/70">
          <p>
            © {new Date().getFullYear()} {SITE.company} — {SITE.slogan}. All rights reserved.
          </p>
          <p className="mt-1.5">
            Web design by{" "}
            <a
              href="https://inactechnologies.co.ke"
              target="_blank"
              rel="noreferrer"
              className="text-aqua/70 underline-offset-2 transition hover:text-aqua hover:underline"
            >
              INac Tech
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
