import { Link } from "react-router-dom";
import { ArrowRight, Droplets } from "lucide-react";
import { Logo } from "@/components/art/Logo";
import { WhatsAppIcon } from "@/components/art/icons";
import { waLink, generalInquiryMessage } from "@/lib/site";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ice px-6 py-24 text-center">
      <Logo />
      <h1 className="font-display mt-8 text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">
        Page Not Found
      </h1>
      <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-slate-600 sm:text-base">
        The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you
        back to pure hydration.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link
          to="/"
          className="btn-sheen inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand to-aqua px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-aqua/25 transition hover:-translate-y-0.5"
        >
          <Droplets className="h-4 w-4" />
          Back to Home
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 rounded-full border border-mist bg-white px-7 py-3.5 text-sm font-bold text-navy transition hover:border-aqua hover:bg-mist/40"
        >
          Browse Products
        </Link>
        <a
          href={waLink(generalInquiryMessage())}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-[#25D366]/25 transition hover:-translate-y-0.5"
        >
          <WhatsAppIcon className="h-4 w-4" />
          Chat on WhatsApp
        </a>
      </div>
    </div>
  );
}
