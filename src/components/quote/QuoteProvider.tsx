"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { X } from "lucide-react";
import { QuoteForm } from "@/components/forms/QuoteForm";

interface QuoteContextValue {
  openQuote: (service?: string) => void;
}

const QuoteContext = createContext<QuoteContextValue>({ openQuote: () => {} });

export function useQuote() {
  return useContext(QuoteContext);
}

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [service, setService] = useState("bowser");
  const [visible, setVisible] = useState(false);

  const openQuote = useCallback((svc = "bowser") => {
    setService(svc);
    setOpen(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
  }, []);

  const closeQuote = useCallback(() => {
    setVisible(false);
    setTimeout(() => setOpen(false), 280);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeQuote();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, closeQuote]);

  return (
    <QuoteContext.Provider value={{ openQuote }}>
      {children}
      {open && (
        <div
          className={`fixed inset-0 z-[90] flex items-end justify-center p-0 transition-opacity duration-300 sm:items-center sm:p-6 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Request a quote"
        >
          <div className="absolute inset-0 bg-deep/70 backdrop-blur-sm" onClick={closeQuote} />
          <div
            className={`relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl shadow-deep/40 transition-all duration-300 sm:rounded-3xl sm:p-8 ${
              visible ? "translate-y-0 scale-100" : "translate-y-10 scale-[0.97]"
            }`}
          >
            <button
              onClick={closeQuote}
              aria-label="Close quote form"
              className="absolute right-4 top-4 z-10 rounded-full bg-mist/70 p-2 text-navy transition hover:rotate-90 hover:bg-mist"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-aqua">Limah Fresh — Bulk & Services</p>
              <h3 className="font-display mt-2 text-2xl font-extrabold text-navy sm:text-3xl">
                Request a <span className="text-gradient">Quote</span>
              </h3>
              <p className="mt-1.5 text-sm text-slate-600">
                Bowsers, dispenser maintenance, or delivery contracts — tell us what you need.
              </p>
            </div>
            {/* key forces a fresh form when the preset service changes */}
            <QuoteForm key={service} defaultService={service} onDone={closeQuote} />
          </div>
        </div>
      )}
    </QuoteContext.Provider>
  );
}
