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

const siteTitle = `${SITE.name} — ${SITE.slogan}`;
const siteDescription =
  "Limah Fresh by Limah E.A. Limited — KEBS-certified purified drinking water in Nairobi. Bottled water 500ml–20L, water dispensers, bulk bowser supply (Limah Soft Water), dispenser maintenance and scheduled home & office delivery.";
const siteUrl = "https://limahfresh.co.ke";
const ogImage = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: `${SITE.name} — ${SITE.slogan}`,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteTitle}`,
  },
  description: siteDescription,
  keywords: [
    "drinking water Nairobi",
    "bottled water Kenya",
    "water bowser Nairobi",
    "water dispenser",
    "Limah Fresh",
    "Limah E.A. Limited",
    "KEBS certified water",
    "purified water delivery",
    "bulk water supply",
    "dispenser maintenance",
    "custom branded water",
    "Nairobi water company",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    locale: "en_KE",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [ogImage],
  },
  icons: {
    icon: "/limah-fresh.svg",
    apple: "/limahfresh-logo.png",
  },
  manifest: "/site.webmanifest",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#00AEEF",
};

// JSON-LD Organization + LocalBusiness + Website schema
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: SITE.name,
      legalName: "Limah E.A. Limited",
      url: siteUrl,
      logo: `${siteUrl}/limahfresh-logo.png`,
      foundingDate: "2013-11-20",
      description: siteDescription,
      sameAs: [
        "https://www.tiktok.com/@limah_fresh",
        "https://www.instagram.com/limahfresh_ea",
        "https://www.facebook.com/limahfreash",
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+254718013391",
          contactType: "sales",
          availableLanguage: ["English", "Swahili"],
        },
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": `${siteUrl}/#localbusiness`,
      name: SITE.name,
      image: `${siteUrl}/limahfresh-logo.png`,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Amee Holdings, North Airport Road",
        addressLocality: "Nairobi",
        postalCode: "00200",
        addressCountry: "KE",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -1.3191,
        longitude: 36.8804,
      },
      telephone: "+254718013391",
      email: "info@limahfresh.co.ke",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
          closes: "17:30",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Saturday",
          opens: "08:00",
          closes: "15:00",
        },
      ],
      priceRange: "KSh 28 – KSh 1,550",
      areaServed: {
        "@type": "City",
        name: "Nairobi",
        sameAs: "https://en.wikipedia.org/wiki/Nairobi",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteTitle,
      publisher: { "@id": `${siteUrl}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${siteUrl}/search?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
