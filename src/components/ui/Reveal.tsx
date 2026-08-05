"use client";

import { memo, useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type Direction = "up" | "left" | "right" | "scale";

export const Reveal = memo(function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px" },
    );
    io.observe(el);
    const timeout = setTimeout(() => el.classList.add("revealed"), 1500);
    return () => {
      io.disconnect();
      clearTimeout(timeout);
    };
  }, []);

  const style: CSSProperties = { transitionDelay: `${delay}ms` };

  return (
    <div
      ref={ref}
      className={className}
      style={style}
      data-reveal={direction === "up" ? "" : direction}
    >
      {children}
    </div>
  );
});
