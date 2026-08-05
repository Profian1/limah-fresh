import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { QuoteProvider } from "@/components/quote/QuoteProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — ${SITE.slogan} | ${SITE.company}`,
    template: `%s | ${SITE.name} — ${SITE.slogan}`,
  },
  description:
    "Limah Fresh by Limah E.A. Limited — KEBS-certified purified drinking water in Nairobi. Bottled water 500ml–18.9L, water dispensers, bulk bowser supply (Limah Soft Water), dispenser maintenance and scheduled home & office delivery.",
  keywords: [
    "drinking water Nairobi",
    "bottled water Kenya",
    "water bowser Nairobi",
    "water dispenser",
    "Limah Fresh",
    "KEBS certified water",
  ],
  icons: {
    icon: "/limah-fresh.svg",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body className="antialiased pb-16 md:pb-0">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-5 focus:py-3 focus:text-navy focus:font-bold focus:shadow-xl focus:outline-none">
          Skip to main content
        </a>
        <QuoteProvider>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <MobileNav />
          <WhatsAppFloat />
        </QuoteProvider>
      </body>
    </html>
  );
}
