"use client";

import type { ReactNode } from "react";
import { useQuote } from "@/components/quote/QuoteProvider";

export function QuoteButton({
  service = "bowser",
  className = "",
  children,
}: {
  service?: string;
  className?: string;
  children: ReactNode;
}) {
  const { openQuote } = useQuote();
  return (
    <button onClick={() => openQuote(service)} className={className}>
      {children}
    </button>
  );
}
