import Image from "next/image";

export function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src="/limahfresh-logo.png"
      alt="Limah Fresh"
      width={64}
      height={64}
      className={`object-contain ${className || ""}`}
      sizes="64px"
      priority
    />
  );
}

export function Logo({ compact = false }: { dark?: boolean; compact?: boolean }) {
  return (
    <Image
      src="/limahfresh-logo.png"
      alt="Limah Fresh"
      width={compact ? 120 : 160}
      height={compact ? 48 : 64}
      className="shrink-0 object-contain"
      sizes={compact ? "120px" : "160px"}
      priority
    />
  );
}
