/**
 * Layered animated wave divider used to transition between sections.
 * `fill` should match the background color of the section BELOW the wave.
 */
export function WaveDivider({
  fill = "#f2fafd",
  flip = false,
  className = "",
}: {
  fill?: string;
  flip?: boolean;
  className?: string;
}) {
  return (
    <div className={`pointer-events-none relative -mb-px w-full overflow-hidden ${flip ? "rotate-180" : ""} ${className}`}>
      <svg viewBox="0 0 1440 110" preserveAspectRatio="none" className="block h-[64px] w-full sm:h-[90px]">
        <path
          d="M0,64 C180,110 420,10 720,46 C1020,82 1260,20 1440,60 L1440,110 L0,110 Z"
          fill={fill}
          opacity="0.35"
          className="animate-float-slow"
        />
        <path
          d="M0,80 C240,120 480,30 760,62 C1040,94 1240,48 1440,78 L1440,110 L0,110 Z"
          fill={fill}
          opacity="0.6"
          className="animate-float"
        />
        <path
          d="M0,92 C260,126 520,54 800,78 C1080,102 1280,70 1440,92 L1440,110 L0,110 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}
