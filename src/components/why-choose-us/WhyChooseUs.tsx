"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ShieldCheck,
  BadgeCheck,
  Truck,
  CircleDollarSign,
  Headphones,
  Leaf,
  Clock,
  Users,
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const CARDS = [
  {
    icon: ShieldCheck,
    title: "Safe & Pure Drinking Water",
    description:
      "Every drop is purified using advanced multi-stage filtration and sterilization processes to ensure safe, clean, refreshing water that meets the highest hygiene standards.",
  },
  {
    icon: BadgeCheck,
    title: "Certified Quality Assurance",
    description:
      "Every batch undergoes strict quality testing and continuous monitoring, guaranteeing consistent purity, freshness, and excellent taste.",
  },
  {
    icon: Truck,
    title: "Reliable Delivery",
    description:
      "From homes and offices to schools and hotels, our dependable delivery network ensures your water arrives on time, every time.",
  },
  {
    icon: CircleDollarSign,
    title: "Exceptional Value",
    description:
      "Premium-quality drinking water at competitive prices, giving you more value without compromising on quality or safety.",
  },
  {
    icon: Headphones,
    title: "Customer-First Service",
    description:
      "Our dedicated support team is always ready to help with orders, deliveries, and after-sales service, ensuring a smooth and friendly experience.",
  },
  {
    icon: Leaf,
    title: "Environmentally Responsible",
    description:
      "We encourage reusable bottles, responsible packaging, and sustainable business practices that protect our environment for future generations.",
  },
  {
    icon: Clock,
    title: "Always Available",
    description:
      "Whether you need scheduled deliveries, emergency refills, or bulk orders, Limah Fresh is ready whenever you need clean drinking water.",
  },
  {
    icon: Users,
    title: "Trusted Across Kenya",
    description:
      "Thousands of households, businesses, schools, restaurants, and institutions trust Limah Fresh for dependable service and consistently high-quality drinking water.",
  },
];

function FloatingBubbles() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {[...Array(6)].map((_, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-aqua/8"
          style={{
            width: `${40 + Math.random() * 80}px`,
            height: `${40 + Math.random() * 80}px`,
            left: `${5 + Math.random() * 90}%`,
            animationDelay: `${Math.random() * 9}s`,
            animationDuration: `${8 + Math.random() * 6}s`,
          }}
        />
      ))}
      {[...Array(4)].map((_, i) => (
        <span
          key={`r-${i}`}
          className="absolute rounded-full border border-aqua/12"
          style={{
            width: `${100 + Math.random() * 160}px`,
            height: `${100 + Math.random() * 160}px`,
            left: `${10 + Math.random() * 80}%`,
            top: `${15 + Math.random() * 70}%`,
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${5 + Math.random() * 4}s`,
          }}
        />
      ))}
    </div>
  );
}

function Card({
  card,
  index,
}: {
  card: (typeof CARDS)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");
  const [glow, setGlow] = useState("");
  const [rippleStyle, setRippleStyle] = useState<React.CSSProperties>({});
  const [rippleActive, setRippleActive] = useState(false);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (prefersReducedMotion.current || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -6;
    const rotateY = ((x - cx) / cx) * 6;
    setTransform(
      `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px)`,
    );
    setGlow(
      `radial-gradient(circle at ${((x / rect.width) * 100).toFixed(1)}% ${((y / rect.height) * 100).toFixed(1)}%, rgba(0,180,216,0.12) 0%, transparent 60%)`,
    );
  }, []);

  const handleMouseEnter = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRippleStyle({
      left: x,
      top: y,
    });
    setRippleActive(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform("");
    setGlow("");
    setRippleActive(false);
  }, []);

  const Icon = card.icon;

  return (
    <Reveal delay={index * 100}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group relative isolate cursor-default rounded-[24px] border border-aqua/10 bg-white/30 p-6 shadow-md shadow-navy/[0.04] backdrop-blur-[18px] transition-[transform,box-shadow,border-color,background-color] duration-[350ms] ease-out will-change-transform sm:p-8"
        style={{
          transform: transform || undefined,
          boxShadow: transform
            ? "0 32px 60px -16px rgba(0, 180, 216, 0.18), 0 0 0 1px rgba(0, 180, 216, 0.25)"
            : undefined,
        }}
      >
        {/* card glow overlay */}
        {glow && (
          <div
            className="pointer-events-none absolute inset-0 z-0 rounded-[24px]"
            style={{ background: glow }}
          />
        )}

        {/* ripple effect */}
        {rippleActive && (
          <span
            className="pointer-events-none absolute z-0 animate-ripple rounded-full bg-aqua/20"
            style={{
              ...rippleStyle,
              width: 4,
              height: 4,
              marginLeft: -2,
              marginTop: -2,
            }}
          />
        )}

        <div className="relative z-10 flex flex-col">
          {/* icon */}
          <span className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-aqua/20 to-brand/10 text-brand shadow-sm shadow-aqua/10 ring-1 ring-aqua/20 transition-transform duration-[350ms] ease-out group-hover:rotate-[8deg] group-hover:scale-110 group-hover:shadow-md group-hover:shadow-aqua/25">
            <Icon className="h-7 w-7 transition-colors duration-300 group-hover:text-brand" />
          </span>

          {/* title */}
          <h3 className="font-display text-lg font-bold leading-tight text-navy transition-colors duration-300 group-hover:text-brand">
            {card.title}
          </h3>

          {/* description */}
          <p className="mt-2.5 text-[13px] leading-relaxed text-slate-500">
            {card.description}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

export function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden py-[140px]">
      {/* background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #ffffff 0%, #f9fdff 40%, #eef9ff 100%)",
        }}
      />

      {/* decorative SVG wave */}
      <svg
        className="pointer-events-none absolute left-0 top-0 w-full text-aqua/[0.04]"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        aria-hidden="true"
        style={{ height: 320 }}
      >
        <path
          fill="currentColor"
          d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        />
      </svg>

      {/* bottom wave */}
      <svg
        className="pointer-events-none absolute bottom-0 left-0 w-full text-aqua/[0.05]"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        aria-hidden="true"
        style={{ height: 200 }}
      >
        <path
          fill="currentColor"
          d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,176C672,181,768,139,864,122.7C960,107,1056,117,1152,133.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </svg>

      {/* floating decorations */}
      <FloatingBubbles />

      {/* subtle grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(0,180,216,0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />

      {/* content */}
      <div className="relative z-10 mx-auto max-w-[1300px] px-6">
        {/* section heading */}
        <Reveal className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="font-display mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl lg:text-5xl">
            Why Choose <span className="text-gradient-deep">Limah Fresh?</span>
          </h2>
        </Reveal>
        {/* cards grid: 4 cols desktop, 3 cols tablet, 2 cols mobile */}
        <div className="grid grid-cols-2 gap-5 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {CARDS.map((card, i) => (
            <Card key={card.title} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
