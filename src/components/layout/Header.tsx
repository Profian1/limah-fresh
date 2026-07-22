"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Menu, Phone, X } from "lucide-react";
import { Logo } from "@/components/art/Logo";
import { WhatsAppIcon, TikTokIcon, InstagramIcon, FacebookIcon } from "@/components/art/icons";
import { NAV_LINKS, SITE, SOCIALS, waLink, generalInquiryMessage } from "@/lib/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Top info strip */}
      <div className="relative z-[60] hidden bg-deep text-[11px] font-medium text-mist/90 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-1.5">
          <p className="tracking-wide">
            {SITE.tagline}
          </p>
          <div className="flex items-center gap-4">
            <a href={`mailto:${SITE.emails[0]}`} className="flex items-center gap-1.5 transition hover:text-white">
              <Mail className="h-3 w-3" /> {SITE.emails[0]}
            </a>
            <a href={`mailto:${SITE.emails[1]}`} className="flex items-center gap-1.5 transition hover:text-white">
              <Mail className="h-3 w-3" /> {SITE.emails[1]}
            </a>
            <span className="h-4 w-px bg-white/20" />
            <a href={`tel:${SITE.phones[0].raw}`} className="flex items-center gap-1.5 transition hover:text-white">
              <Phone className="h-3 w-3" /> {SITE.phones[0].value}
            </a>
            <a href={`tel:${SITE.phones[1].raw}`} className="flex items-center gap-1.5 transition hover:text-white">
              <Phone className="h-3 w-3" /> {SITE.phones[1].value}
            </a>
            <span className="h-4 w-px bg-white/20" />
            <a href={SOCIALS[0].href} target="_blank" rel="noreferrer" aria-label="TikTok" className="transition hover:text-white">
              <TikTokIcon className="h-3.5 w-3.5" />
            </a>
            <a href={SOCIALS[1].href} target="_blank" rel="noreferrer" aria-label="Instagram" className="transition hover:text-white">
              <InstagramIcon className="h-3.5 w-3.5" />
            </a>
            <a href={SOCIALS[2].href} target="_blank" rel="noreferrer" aria-label="Facebook" className="transition hover:text-white">
              <FacebookIcon className="h-3.5 w-3.5" />
            </a>
            <a href={SOCIALS[3].href} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="transition hover:text-[#25D366]">
              <WhatsAppIcon className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-[60] transition-all duration-500 ${
          scrolled ? "bg-white/85 shadow-lg shadow-navy/5 backdrop-blur-xl" : "bg-white/60 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link href="/" aria-label="Limah Fresh home" className="rounded-2xl bg-deep/95 px-4 py-1.5">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link text-[13.5px] font-semibold tracking-wide transition ${
                  pathname === link.href ? "active text-brand" : "text-ink/80 hover:text-navy"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${SITE.phones[1].raw}`}
              className="hidden items-center gap-2 rounded-full border border-mist bg-ice px-4 py-2.5 text-sm font-bold text-navy transition hover:border-aqua hover:bg-mist/60 md:flex"
            >
              <Phone className="h-4 w-4 text-brand" />
              <span className="hidden xl:inline">{SITE.phones[1].value}</span>
              <span className="xl:hidden">Call Us</span>
            </a>
            <a
              href={waLink(generalInquiryMessage())}
              target="_blank"
              rel="noreferrer"
              className="btn-sheen hidden items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#25D366]/30 transition hover:-translate-y-0.5 sm:flex"
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp Us
            </a>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="rounded-full border border-mist bg-white p-2.5 text-navy transition hover:bg-mist/60 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[80] transition-opacity duration-300 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-deep/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
        <aside
          className={`absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-gradient-to-b from-navy to-deep p-6 text-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <Logo dark compact />
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="rounded-full bg-white/10 p-2.5 transition hover:rotate-90 hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="mt-10 flex flex-col gap-1" aria-label="Mobile">
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                style={{ transitionDelay: `${80 + i * 60}ms` }}
                className={`group flex items-center justify-between rounded-2xl px-4 py-3.5 text-lg font-bold transition-all duration-500 ${
                  open ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
                } ${pathname === link.href ? "bg-white/15 text-foam" : "hover:bg-white/10"}`}
              >
                {link.label}
                <span className="text-aqua transition-transform group-hover:translate-x-1">→</span>
              </Link>
            ))}
          </nav>

          <div className="mt-auto space-y-3 border-t border-white/10 pt-6">
            <a
              href={waLink(generalInquiryMessage())}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3.5 text-sm font-bold shadow-lg shadow-black/20"
            >
              <WhatsAppIcon className="h-4 w-4" /> Order on WhatsApp
            </a>
            <div className="grid grid-cols-2 gap-2 text-center text-xs font-semibold text-mist">
              {SITE.phones.slice(0, 2).map((p) => (
                <a key={p.raw} href={`tel:${p.raw}`} className="rounded-xl bg-white/10 px-3 py-2.5 transition hover:bg-white/20">
                  {p.label}
                  <br />
                  <span className="text-white">{p.value}</span>
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
