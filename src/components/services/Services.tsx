"use client";

import { ArrowRight, Droplets, Truck, Wrench, CalendarClock } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

const ITEMS = [
  {
    icon: Droplets,
    title: "Bottled Water Delivery",
    text: "Same-day dispatch of every bottle size across Nairobi — from single bottles to pallet loads.",
  },
  {
    icon: Truck,
    title: "Bulk Bowser — Limah Soft Water",
    text: "Tanker deliveries of soft water for construction, events, institutions and commercial sites.",
  },
  {
    icon: Wrench,
    title: "Dispenser Maintenance",
    text: "Scheduled cleaning, sanitization and technical repairs that keep your dispensers safe.",
  },
  {
    icon: CalendarClock,
    title: "Home & Office Contracts",
    text: "Subscription-style refill plans with priority delivery windows, weekly or monthly.",
  },
];

const BUBBLE_SIZES = [40, 24, 56, 32, 20, 48, 36, 28, 52, 44];
const BUBBLE_POSITIONS = [5, 14, 23, 33, 42, 51, 60, 70, 79, 88];
const BUBBLE_DELAYS = [0, 2, 4, 6, 1, 3, 5, 7, 8, 9];
const BUBBLE_DURATIONS = [8, 10, 12, 9, 11, 13, 8, 10, 12, 9];

const LARGE_BUBBLE_SIZES = [60, 80, 50, 90, 70];
const LARGE_BUBBLE_POSITIONS = [8, 26, 44, 62, 80];
const LARGE_BUBBLE_DELAYS = [0, 3, 6, 1, 4];
const LARGE_BUBBLE_DURATIONS = [12, 15, 13, 16, 14];

const SPARKLE_POSITIONS_X = [12, 28, 44, 60, 76, 92, 18, 34];
const SPARKLE_POSITIONS_Y = [15, 35, 55, 75, 25, 45, 65, 85];
const SPARKLE_SIZES = [2, 3, 2, 3, 2, 3, 2, 2];
const SPARKLE_DELAYS = [0, 2, 4, 6, 1, 3, 5, 7];
const SPARKLE_DURATIONS = [7, 9, 8, 10, 7, 9, 8, 10];

export function Services() {
  return (
    <section className="relative overflow-hidden bg-navy py-24 lg:py-32">
      {/* ========== LAYER 1: Base dark blue gradient ========== */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #023e8a 0%, #012250 45%, #01143a 100%)",
        }}
        aria-hidden="true"
      />

      {/* ========== LAYER 2: Subtle water texture (replaces grid) ========== */}
      <div
        className="water-texture pointer-events-none absolute inset-0"
        aria-hidden="true"
      />

      {/* ========== LAYER 3: Abstract water-inspired illustration ========== */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06]"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="wr1" cx="25%" cy="15%" r="65%">
            <stop offset="0%" stopColor="#48cae4" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#48cae4" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="wr2" cx="75%" cy="65%" r="55%">
            <stop offset="0%" stopColor="#00b4d8" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#00b4d8" stopOpacity="0" />
          </radialGradient>
        </defs>
        <path d="M0 280 Q300 160 600 260 T1200 240 T1440 270 L1440 0 L0 0 Z" fill="url(#wr1)" />
        <path d="M0 500 Q480 360 960 520 T1440 480 L1440 900 L0 900 Z" fill="url(#wr2)" />
        <ellipse cx="720" cy="280" rx="550" ry="55" fill="none" stroke="#90e0ef" strokeWidth="0.6" opacity="0.3" />
        <ellipse cx="720" cy="280" rx="420" ry="42" fill="none" stroke="#90e0ef" strokeWidth="0.5" opacity="0.25" />
        <ellipse cx="720" cy="280" rx="300" ry="30" fill="none" stroke="#90e0ef" strokeWidth="0.5" opacity="0.2" />
        <ellipse cx="720" cy="280" rx="180" ry="18" fill="none" stroke="#90e0ef" strokeWidth="0.4" opacity="0.15" />
      </svg>

      {/* ========== LAYER 4: Radial blue glows ========== */}
      <div
        className="animate-breathe pointer-events-none absolute left-1/2 top-0 -translate-x-1/2"
        style={{
          width: "800px",
          height: "400px",
          background:
            "radial-gradient(ellipse at center, rgba(0,180,216,0.16) 0%, transparent 70%)",
          filter: "blur(250px)",
        }}
        aria-hidden="true"
      />
      <div
        className="animate-breathe pointer-events-none absolute left-1/2"
        style={{
          top: "52%",
          width: "900px",
          height: "500px",
          background:
            "radial-gradient(ellipse at center, rgba(72,202,228,0.13) 0%, transparent 70%)",
          filter: "blur(260px)",
          animationDelay: "4s",
          marginLeft: "-450px",
        }}
        aria-hidden="true"
      />

      {/* ========== Top ambient spotlight ========== */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2"
        style={{
          width: "600px",
          height: "280px",
          background:
            "radial-gradient(ellipse at center, rgba(144,224,239,0.10) 0%, transparent 70%)",
          filter: "blur(180px)",
        }}
        aria-hidden="true"
      />

      {/* ========== LAYER 5: Floating bubbles ========== */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        {BUBBLE_SIZES.map((size, i) => (
          <span
            key={i}
            className="animate-bubble-rise absolute rounded-full border border-aqua/12"
            style={{
              width: size,
              height: size,
              left: `${BUBBLE_POSITIONS[i]}%`,
              bottom: "-24px",
              animationDelay: `${BUBBLE_DELAYS[i]}s`,
              animationDuration: `${BUBBLE_DURATIONS[i]}s`,
              opacity: 0,
            }}
          />
        ))}
        {LARGE_BUBBLE_SIZES.map((size, i) => (
          <span
            key={`lg-${i}`}
            className="animate-bubble-rise-slow absolute rounded-full border border-aqua/08"
            style={{
              width: size,
              height: size,
              left: `${LARGE_BUBBLE_POSITIONS[i]}%`,
              bottom: "-30px",
              animationDelay: `${LARGE_BUBBLE_DELAYS[i]}s`,
              animationDuration: `${LARGE_BUBBLE_DURATIONS[i]}s`,
              opacity: 0,
            }}
          />
        ))}
      </div>

      {/* ========== Faint LIMAH FRESH watermark ========== */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none"
        aria-hidden="true"
      >
        <span
          className="font-display whitespace-nowrap text-[11vw] font-extrabold tracking-[0.6em] text-aqua/[0.022]"
          style={{ transform: "rotate(-8deg)" }}
        >
          LIMAH FRESH
        </span>
      </div>

      {/* ========== Wave behind cards ========== */}
      <svg
        className="animate-wave-drift pointer-events-none absolute left-0 w-[200%] opacity-[0.05]"
        style={{ top: "58%" }}
        viewBox="0 0 2880 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          fill="none"
          stroke="#90e0ef"
          strokeWidth="1.5"
          d="M0 60 Q180 20 360 60 T720 60 T1080 60 T1440 60 T1800 60 T2160 60 T2520 60 T2880 60"
        />
        <path
          fill="none"
          stroke="#48cae4"
          strokeWidth="1"
          opacity="0.5"
          d="M0 80 Q240 40 480 80 T960 80 T1440 80 T1920 80 T2400 80 T2880 80"
        />
      </svg>

      {/* ========== Floating sparkle particles ========== */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        {SPARKLE_POSITIONS_X.map((x, i) => (
          <span
            key={`sparkle-${i}`}
            className="animate-float-slow absolute rounded-full bg-aqua/15"
            style={{
              width: SPARKLE_SIZES[i],
              height: SPARKLE_SIZES[i],
              left: `${x}%`,
              top: `${SPARKLE_POSITIONS_Y[i]}%`,
              animationDelay: `${SPARKLE_DELAYS[i]}s`,
              animationDuration: `${SPARKLE_DURATIONS[i]}s`,
            }}
          />
        ))}
      </div>

      {/* ========== CONTENT ========== */}
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <Reveal className="mb-14 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-sky">
            What We Do
          </p>
          <h2
            className="font-display mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
            style={{ textShadow: "0 0 80px rgba(0,180,216,0.18)" }}
          >
            One Partner for{" "}
            <span
              className="text-gradient"
              style={{ textShadow: "0 0 40px rgba(0,180,216,0.25)" }}
            >
              Every Drop
            </span>
          </h2>

          {/* Premium divider */}
          <div className="mx-auto mt-6 flex items-center justify-center gap-3">
            <span
              className="h-px flex-1"
              style={{
                maxWidth: "48px",
                background: "linear-gradient(90deg, transparent, #48cae4)",
              }}
            />
            <span className="relative flex items-center justify-center">
              <span
                className="absolute h-3 w-3 rounded-full bg-aqua/20 blur-sm"
                style={{ boxShadow: "0 0 12px rgba(72,202,228,0.4)" }}
              />
              <Droplets className="relative h-4 w-4 text-sky" />
            </span>
            <span
              className="h-px flex-1"
              style={{
                maxWidth: "48px",
                background: "linear-gradient(90deg, #48cae4, transparent)",
              }}
            />
          </div>
        </Reveal>

        {/* Card area with ambient depth glow */}
        <div className="relative">
          <div
            className="pointer-events-none absolute -inset-x-16 -inset-y-12 rounded-[80px]"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(0,180,216,0.06) 0%, transparent 60%)",
            }}
            aria-hidden="true"
          />

          {/* Cards — completely untouched from original */}
          <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ITEMS.map((item, i) => (
              <Reveal key={item.title} delay={i * 120}>
                <Link
                  href="/services"
                  className="group block h-full rounded-3xl border border-white/10 bg-white/[0.06] p-7 backdrop-blur transition-all duration-500 hover:-translate-y-2 hover:border-aqua/40 hover:bg-white/10"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-aqua to-sky text-deep shadow-lg shadow-aqua/30 transition group-hover:scale-110 group-hover:rotate-3">
                    <item.icon className="h-7 w-7" />
                  </span>
                  <h3 className="font-display mt-6 text-lg font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-[13px] leading-relaxed text-mist/70">
                    {item.text}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky">
                    Learn more{" "}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
