import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { QuoteProvider } from "@/components/quote/QuoteProvider";
import { ScrollToTop } from "@/components/ScrollToTop";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const HomePage = lazy(() => import("@/pages/HomePage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const ProductsPage = lazy(() => import("@/pages/ProductsPage"));
const ServicesPage = lazy(() => import("@/pages/ServicesPage"));
const GalleryPage = lazy(() => import("@/pages/GalleryPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

function PageShell() {
  usePageMetadata();
  return null;
}

export function App() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-5 focus:py-3 focus:text-navy focus:font-bold focus:shadow-xl focus:outline-none"
      >
        Skip to main content
      </a>
      <QuoteProvider>
        <ScrollToTop />
        <PageShell />
        <Header />
        <main id="main-content">
          <Suspense
            fallback={
              <div className="flex min-h-screen items-center justify-center bg-ice">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-mist border-t-aqua" />
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <MobileNav />
        <WhatsAppFloat />
      </QuoteProvider>
    </>
  );
}
