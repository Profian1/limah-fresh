"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CheckCircle, Droplets } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const LOGOS = [
  { src: "/clients/posta.svg", alt: "Posta Kenya", scale: 1, opacity: 0.9 },
  { src: "/clients/kws.svg", alt: "Kenya Wildlife Service", scale: 1, opacity: 0.9 },
  { src: "/clients/kicc.svg", alt: "KICC", scale: 1, opacity: 0.9 },
  { src: "/clients/kntc.svg", alt: "KNTC", scale: 1, opacity: 0.9 },
  { src: "/clients/jamii.svg", alt: "Jamii Sacco", scale: 1, opacity: 0.9 },
  { src: "/clients/superior.jpg", alt: "Superior Homes", scale: 1, opacity: 0.9 },
  { src: "/clients/kissi%20.svg", alt: "Kisii Teaching & Referral Hospital", scale: 1.35, opacity: 1 },
  { src: "/clients/kmpdc.svg", alt: "KMPDC", scale: 1.45, opacity: 1 },
  { src: "/clients/kaa.svg", alt: "Kenya Airports Authority", scale: 1.55, opacity: 1 },
  { src: "/clients/mas.svg", alt: "MAS", scale: 1.55, opacity: 1 },
  { src: "/clients/teule.svg", alt: "Teule", scale: 1.45, opacity: 1 },
  { src: "/clients/abynissia.svg", alt: "Abynissia", scale: 1.35, opacity: 1 },
  { src: "/clients/bahari.svg", alt: "Bahari", scale: 1, opacity: 0.9 },
  { src: "/clients/disabilities.svg", alt: "Disabilities", scale: 1.35, opacity: 1 },
  { src: "/clients/halisi.svg", alt: "Halisi", scale: 1.5, opacity: 1 },
  { src: "/clients/hfgroup.svg", alt: "HF Group", scale: 1.45, opacity: 1 },
  { src: "/clients/mrm.svg", alt: "MRM", scale: 1.5, opacity: 1 },
  { src: "/clients/naivasha.svg", alt: "Naivasha", scale: 1.55, opacity: 1 },
  { src: "/clients/prime.svg", alt: "Prime", scale: 1.35, opacity: 1 },
  { src: "/clients/hela.webp", alt: "Hela", scale: 1.5, opacity: 1 },
];

const PYRAMID = [6, 5, 4, 3, 2];

function LogoCard({
  logo,
  globalDelay,
  colIndex,
  sectionRect,
  mouseInSection,
  mousePos,
}: {
  logo: (typeof LOGOS)[number];
  globalDelay: number;
  colIndex: number;
  sectionRect: DOMRect | null;
  mouseInSection: boolean;
  mousePos: { x: number; y: number };
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  const getTilt = useCallback(() => {
    if (prefersReducedMotion.current || !sectionRect || !mouseInSection) return "";
    const cx = sectionRect.left + sectionRect.width / 2;
    const cy = sectionRect.top + sectionRect.height / 2;
    const rotX = ((mousePos.y - cy) / sectionRect.height) * -6;
    const rotY = ((mousePos.x - cx) / sectionRect.width) * 6;
    const clampedX = Math.max(-3, Math.min(3, rotX));
    const clampedY = Math.max(-3, Math.min(3, rotY));
    return `perspective(600px) rotateX(${clampedX.toFixed(2)}deg) rotateY(${clampedY.toFixed(2)}deg)`;
  }, [sectionRect, mouseInSection, mousePos]);

  const scale = logo.scale;
  const w = Math.round(130 * scale);
  const h = Math.round(46 * scale);

  return (
    <Reveal direction="up" delay={globalDelay + colIndex * 40}>
      <div
        ref={cardRef}
        className="group relative flex h-[90px] w-[170px] items-center justify-center rounded-[18px] border border-[rgba(0,174,239,0.08)] bg-[rgba(255,255,255,0.55)] p-5 backdrop-blur-[12px] transition-all duration-[350ms] ease-out hover:-translate-y-[6px] hover:border-[#00AEEF] hover:shadow-[0_24px_40px_-12px_rgba(0,174,239,0.15)]"
        style={{ transform: getTilt() }}
      >
        <div
          className="relative transition-all duration-[350ms] ease-out group-hover:scale-105"
          style={{ width: w, height: h }}
        >
          <Image
            src={logo.src}
            alt={logo.alt}
            fill
            className="object-contain transition-all duration-[350ms] ease-out group-hover:opacity-100"
            style={{ opacity: logo.opacity }}
            sizes={`${w}px`}
          />
        </div>
      </div>
    </Reveal>
  );
}

export function Clients() {
  const sectionRef = useRef<HTMLElement>(null);
  const [sectionRect, setSectionRect] = useState<DOMRect | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mouseInSection, setMouseInSection] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const updateRect = () => setSectionRect(el.getBoundingClientRect());
    updateRect();
    window.addEventListener("resize", updateRect);
    window.addEventListener("scroll", updateRect, { passive: true });
    return () => {
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("scroll", updateRect);
    };
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setMousePos({ x: e.clientX, y: e.clientY });
    setMouseInSection(true);
    setSectionRect(rect);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMouseInSection(false);
  }, []);

  const renderPyramidDesktop = () => {
    let idx = 0;
    return PYRAMID.map((rowSize, rowIdx) => (
      <div
        key={rowIdx}
        className="flex justify-center gap-2.5 sm:gap-3"
        style={{
          marginTop: rowIdx === 0 ? 0 : 8,
        }}
      >
        {Array.from({ length: rowSize }).map((_, colIdx) => {
          const logo = LOGOS[idx];
          const delay = rowIdx * 160 + colIdx * 40;
          idx++;
          return (
            <LogoCard
              key={logo.alt}
              logo={logo}
              globalDelay={delay}
              colIndex={colIdx}
              sectionRect={sectionRect}
              mouseInSection={mouseInSection}
              mousePos={mousePos}
            />
          );
        })}
      </div>
    ));
  };

  const renderMobileGrid = () => {
    const itemsPerRow = 5;
    const rows: Array<typeof LOGOS> = [];
    for (let i = 0; i < LOGOS.length; i += itemsPerRow) {
      rows.push(LOGOS.slice(i, i + itemsPerRow));
    }
    return rows.map((row, rowIdx) => (
      <div
        key={rowIdx}
        className="flex flex-wrap justify-center gap-2.5"
        style={{ marginTop: rowIdx === 0 ? 0 : 12 }}
      >
        {row.map((logo, colIdx) => {
          const delay = rowIdx * 200 + colIdx * 40;
          return (
            <LogoCard
              key={logo.alt}
              logo={logo}
              globalDelay={delay}
              colIndex={colIdx}
              sectionRect={sectionRect}
              mouseInSection={mouseInSection}
              mousePos={mousePos}
            />
          );
        })}
      </div>
    ));
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden pt-[140px] pb-[60px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background */}
      <div className="absolute inset-0" style={{ background: "#FCFEFF" }} aria-hidden="true" />

      {/* Subtle blue radial gradient */}
      <div
        className="animate-breathe pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,174,239,0.05) 0%, transparent 100%)",
          animationDuration: "20s",
        }}
        aria-hidden="true"
      />

      {/* Water-inspired texture */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='25' cy='25' r='0.6' fill='%2300AEEF' opacity='0.6'/%3E%3Ccircle cx='60' cy='15' r='0.4' fill='%2300AEEF' opacity='0.4'/%3E%3Ccircle cx='85' cy='35' r='0.5' fill='%2300AEEF' opacity='0.5'/%3E%3Ccircle cx='15' cy='55' r='0.3' fill='%2300AEEF' opacity='0.3'/%3E%3Ccircle cx='45' cy='70' r='0.6' fill='%2300AEEF' opacity='0.5'/%3E%3Ccircle cx='75' cy='80' r='0.4' fill='%2300AEEF' opacity='0.4'/%3E%3Ccircle cx='30' cy='90' r='0.5' fill='%2300AEEF' opacity='0.3'/%3E%3Ccircle cx='90' cy='95' r='0.3' fill='%2300AEEF' opacity='0.3'/%3E%3C/svg%3E")`,
          backgroundSize: "300px 300px",
        }}
        aria-hidden="true"
      />

      {/* Cursor-following glow */}
      {mouseInSection && (
        <div
          className="pointer-events-none absolute"
          style={{
            left: mousePos.x - 200,
            top: mousePos.y - 200,
            width: 400,
            height: 400,
            background: "radial-gradient(circle, rgba(0,174,239,0.06) 0%, transparent 70%)",
            transition: "left 0.4s ease-out, top 0.4s ease-out",
            zIndex: 0,
          }}
          aria-hidden="true"
        />
      )}

      {/* Floating bubbles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <span className="animate-bubble-rise-slow absolute left-[8%] rounded-full border border-[rgba(0,174,239,0.08)]" style={{ width: 30, height: 30, bottom: "-30px", animationDelay: "0s" }} />
        <span className="animate-bubble-rise absolute left-[25%] rounded-full border border-[rgba(0,174,239,0.08)]" style={{ width: 18, height: 18, bottom: "-20px", animationDelay: "3s" }} />
        <span className="animate-bubble-rise-slow absolute left-[52%] rounded-full border border-[rgba(0,174,239,0.08)]" style={{ width: 40, height: 40, bottom: "-40px", animationDelay: "6s" }} />
        <span className="animate-bubble-rise absolute left-[75%] rounded-full border border-[rgba(0,174,239,0.08)]" style={{ width: 22, height: 22, bottom: "-24px", animationDelay: "9s" }} />
        <span className="animate-bubble-rise-slow absolute left-[90%] rounded-full border border-[rgba(0,174,239,0.08)]" style={{ width: 34, height: 34, bottom: "-34px", animationDelay: "12s" }} />
      </div>

      {/* Content */}
      <div
        className="relative z-10 mx-auto max-w-[1320px] px-5 sm:px-6 lg:px-8"
        style={{
          maxWidth: 1320,
          paddingLeft: "clamp(20px, 5vw, 32px)",
          paddingRight: "clamp(20px, 5vw, 32px)",
        }}
      >
        {/* Label */}
        <Reveal className="text-center" delay={0}>
          <span className="text-[13px] font-semibold uppercase tracking-[0.45em]" style={{ color: "#00AEEF" }}>
            Trusted By
          </span>
        </Reveal>

        {/* Heading */}
        <Reveal className="mx-auto mt-5 max-w-[700px] text-center" delay={80}>
          <h2
            className="text-[34px] leading-[1.2] font-bold tracking-[-0.02em] sm:text-[42px] lg:text-[52px]"
            style={{ color: "#102A43" }}
          >
            Trusted by Businesses Across Kenya
          </h2>
        </Reveal>

        {/* Subtitle */}
        <Reveal className="mx-auto mt-5 max-w-[760px] text-center" delay={160}>
          <p className="text-[18px] leading-[1.8]" style={{ color: "#52606D" }}>
            From corporate offices and hotels to schools, hospitals, restaurants, and retail businesses, organizations
            across Kenya trust Limah Fresh to deliver safe, clean, and reliable drinking water every day.
          </p>
        </Reveal>

        {/* Decorative divider */}
        <Reveal className="mt-8 text-center" delay={240}>
          <div className="mx-auto flex items-center justify-center gap-3">
            <span className="h-[2px] flex-1" style={{ maxWidth: 48, background: "linear-gradient(90deg, transparent, #00AEEF)" }} />
            <span className="relative flex items-center justify-center">
              <span className="absolute h-3 w-3 rounded-full bg-[rgba(0,174,239,0.15)] blur-sm" style={{ boxShadow: "0 0 8px rgba(0,174,239,0.3)" }} />
              <Droplets className="relative h-3.5 w-3.5 text-[#00AEEF]" />
            </span>
            <span className="h-[2px] flex-1" style={{ maxWidth: 48, background: "linear-gradient(90deg, #00AEEF, transparent)" }} />
          </div>
        </Reveal>

        {/* Logo grid */}
        <div className="mt-16">
          <div className="hidden sm:block">{renderPyramidDesktop()}</div>
          <div className="block sm:hidden">{renderMobileGrid()}</div>
        </div>

        {/* Trust message */}
        <Reveal className="mt-14 text-center" delay={800}>
          <p className="inline-flex items-center gap-2 text-[15px] font-medium" style={{ color: "#7B8794" }}>
            <CheckCircle className="h-4 w-4 text-[#00AEEF]" />
            Delivering clean drinking water to homes, businesses, schools, hospitals, hotels, restaurants, and
            institutions across Kenya.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
