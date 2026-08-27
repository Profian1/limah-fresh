export function Logo({ compact = false }: { dark?: boolean; compact?: boolean }) {
  return (
    <img
      src="/limahfresh-logo.webp"
      alt="Limah Fresh"
      width={compact ? 120 : 160}
      height={compact ? 48 : 64}
      className="shrink-0 object-contain"
    />
  );
}
