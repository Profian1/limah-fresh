/**
 * ProductArt — a bespoke SVG illustration system for the Limah Fresh catalog.
 * Every product is rendered in a consistent glass-and-water visual language
 * with branded labels, so the shop feels like one cohesive product family.
 */

const LABEL = "#0077B6";

function Defs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#F4FBFF" />
        <stop offset="55%" stopColor="#CFEBFA" />
        <stop offset="100%" stopColor="#A9DBF5" />
      </linearGradient>
      <linearGradient id={`${id}-water`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#6FD3F2" />
        <stop offset="55%" stopColor="#1FA8DE" />
        <stop offset="100%" stopColor="#0077B6" />
      </linearGradient>
      <linearGradient id={`${id}-cap`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#D3E9F6" />
      </linearGradient>
      <linearGradient id={`${id}-capblue`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#48CAE4" />
        <stop offset="100%" stopColor="#0096C7" />
      </linearGradient>
      <radialGradient id={`${id}-shadow`} cx="0.5" cy="0.5" r="0.5">
        <stop offset="0%" stopColor="#023E8A" stopOpacity="0.28" />
        <stop offset="100%" stopColor="#023E8A" stopOpacity="0" />
      </radialGradient>
      <linearGradient id={`${id}-cabinet`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#DCeefA" />
      </linearGradient>
    </defs>
  );
}

function Label({ y, w = 148, size = 15 }: { y: number; w?: number; size?: number }) {
  const x = 200 - w / 2;
  return (
    <g>
      <rect x={x} y={y} width={w} height={58} rx="14" fill="#FFFFFF" opacity="0.96" />
      <rect x={x} y={y} width={w} height={58} rx="14" fill="none" stroke="#BEE6F7" strokeWidth="1.5" />
      <text
        x="200"
        y={y + 24}
        textAnchor="middle"
        fontSize={size}
        fontWeight="800"
        fill={LABEL}
        letterSpacing="1"
        style={{ fontFamily: "Sora, system-ui, sans-serif" }}
      >
        LIMAH FRESH
      </text>
      <path
        d={`M ${200 - 34} ${y + 34} q 8.5 -7 17 0 t 17 0 t 17 0 t 17 0`}
        fill="none"
        stroke="#00B4D8"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <text x="200" y={y + 50} textAnchor="middle" fontSize="7.2" fontWeight="600" fill="#5B93AE" letterSpacing="2.2">
        PURE DRINKING WATER
      </text>
    </g>
  );
}

function Bubbles({ points }: { points: [number, number, number][] }) {
  return (
    <g fill="#90E0EF">
      {points.map(([cx, cy, r], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} opacity={0.55 - i * 0.06} />
      ))}
    </g>
  );
}

/** 18.9L returnable polycarbonate jug */
function Jug({ id }: { id: string }) {
  const body =
    "M174 96 L226 96 L226 116 C226 136 302 144 304 186 L304 332 Q304 356 280 356 L120 356 Q96 356 96 332 L96 186 C98 144 174 136 174 116 Z";
  return (
    <g>
      <clipPath id={`${id}-clip`}>
        <path d={body} />
      </clipPath>
      <rect x="178" y="62" width="44" height="26" rx="7" fill={`url(#${id}-cap)`} stroke="#BFDFF1" strokeWidth="1.5" />
      <rect x="170" y="86" width="60" height="11" rx="5.5" fill="#EAF6FD" stroke="#C4E4F4" strokeWidth="1.5" />
      <path d={body} fill={`url(#${id}-glass)`} />
      <g clipPath={`url(#${id}-clip)`}>
        <path d="M96 158 Q145 146 200 158 T304 158 L304 356 L96 356 Z" fill={`url(#${id}-water)`} opacity="0.9" />
        <path d="M96 220 H304 M96 300 H304" stroke="#FFFFFF" strokeWidth="5" opacity="0.35" />
        <rect x="118" y="150" width="17" height="180" rx="8.5" fill="#FFFFFF" opacity="0.5" />
      </g>
      <rect x="242" y="108" width="20" height="42" rx="10" fill="#C9EAF9" stroke="#8FD0EC" strokeWidth="2" />
      <path d={body} fill="none" stroke="#9AD4EE" strokeWidth="2" />
      <Label y={232} />
      <Bubbles points={[[150, 320, 4], [168, 288, 2.8], [250, 330, 3.4], [236, 262, 2.4]]} />
    </g>
  );
}

/** Handled PET bottle (10L / 5L) */
function HandledBottle({ id, big }: { id: string; big?: boolean }) {
  const body = big
    ? "M172 84 L228 84 L228 104 C228 124 286 132 288 168 L288 334 Q288 356 264 356 L136 356 Q112 356 112 334 L112 168 C114 132 172 124 172 104 Z"
    : "M176 108 L224 108 L224 126 C224 144 270 152 272 182 L272 334 Q272 356 248 356 L152 356 Q128 356 128 334 L128 182 C130 152 176 144 176 126 Z";
  const capY = big ? 48 : 74;
  const handleY = big ? 96 : 118;
  const labelY = big ? 240 : 250;
  return (
    <g>
      <clipPath id={`${id}-clip`}>
        <path d={body} />
      </clipPath>
      <rect x="180" y={capY} width="40" height="24" rx="6" fill={`url(#${id}-cap)`} stroke="#BFDFF1" strokeWidth="1.5" />
      <rect x="174" y={capY + 22} width="52" height="9" rx="4.5" fill="#EAF6FD" stroke="#C4E4F4" strokeWidth="1.4" />
      <path d={body} fill={`url(#${id}-glass)`} />
      <g clipPath={`url(#${id}-clip)`}>
        <path
          d={`M112 ${big ? 146 : 170} Q156 ${big ? 134 : 158} 200 ${big ? 146 : 170} T288 ${big ? 146 : 170} L288 356 L112 356 Z`}
          fill={`url(#${id}-water)`}
          opacity="0.88"
        />
        <path d={`M112 ${big ? 206 : 214} H288 M112 ${big ? 310 : 316} H288`} stroke="#FFFFFF" strokeWidth="4.5" opacity="0.35" />
        <rect x={big ? 128 : 142} y={big ? 148 : 172} width="14" height="170" rx="7" fill="#FFFFFF" opacity="0.5" />
      </g>
      <rect x={big ? 226 : 218} y={handleY} width={big ? 48 : 42} height="30" rx="14" fill="#EAF6FD" stroke="#8FD0EC" strokeWidth="2.5" />
      <path d={body} fill="none" stroke="#9AD4EE" strokeWidth="2" />
      <Label y={labelY} w={132} size={12.5} />
      <Bubbles points={[[148, big ? 322 : 326, 3.4], [162, big ? 292 : 296, 2.4], [250, big ? 328 : 330, 3], [240, big ? 284 : 288, 2.2]]} />
    </g>
  );
}

/** Classic PET bottle (1.5L / 1L / 500ml) */
function PetBottle({ id, size }: { id: string; size: "lg" | "md" | "sm" }) {
  const dims = {
    lg: { capY: 50, bodyTop: 108, half: 64, ribbs: [188, 232, 276, 316] },
    md: { capY: 72, bodyTop: 132, half: 58, ribbs: [206, 248, 290, 324] },
    sm: { capY: 106, bodyTop: 164, half: 52, ribbs: [232, 270, 304, 332] },
  }[size];
  const top = dims.capY + 58;
  const body = `M188 ${top} L212 ${top} L212 ${top + 12} C212 ${top + 30} ${200 + dims.half} ${top + 36} ${200 + dims.half} ${top + 58}
    L${200 + dims.half} 336 Q${200 + dims.half} 356 ${200 + dims.half - 20} 356 L${200 - dims.half + 20} 356 Q${200 - dims.half} 356 ${200 - dims.half} 336
    L${200 - dims.half} ${top + 58} C${200 - dims.half} ${top + 36} 188 ${top + 30} 188 ${top + 12} Z`;
  return (
    <g>
      <clipPath id={`${id}-clip`}>
        <path d={body} />
      </clipPath>
      <rect x="184" y={dims.capY} width="32" height="22" rx="6" fill={`url(#${id}-capblue)`} />
      <rect x="181" y={dims.capY + 21} width="38" height="8" rx="4" fill="#C4E7F6" />
      <path d={body} fill={`url(#${id}-glass)`} />
      <g clipPath={`url(#${id}-clip)`}>
        <path
          d={`M${200 - dims.half} ${dims.bodyTop + 60} Q${200 - dims.half / 2} ${dims.bodyTop + 48} 200 ${dims.bodyTop + 60} T${200 + dims.half} ${dims.bodyTop + 60} L${200 + dims.half} 356 L${200 - dims.half} 356 Z`}
          fill={`url(#${id}-water)`}
          opacity="0.85"
        />
        {dims.ribbs.map((y) => (
          <path key={y} d={`M${200 - dims.half} ${y} H${200 + dims.half}`} stroke="#FFFFFF" strokeWidth="4" opacity="0.4" />
        ))}
        <rect x={200 - dims.half + 12} y={dims.bodyTop + 30} width="12" height={356 - dims.bodyTop - 30} rx="6" fill="#FFFFFF" opacity="0.5" />
      </g>
      <path d={body} fill="none" stroke="#9AD4EE" strokeWidth="2" />
      <Label y={size === "lg" ? 226 : 238} w={size === "sm" ? 104 : 118} size={size === "sm" ? 10 : 11.5} />
      <Bubbles points={[[168, 330, 3], [178, 300, 2.2], [236, 336, 2.8], [230, 296, 2]]} />
    </g>
  );
}

/** Inverted jug that sits on top of a dispenser */
function TopBottle({ id, x, y, s = 1 }: { id: string; x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path
        d="M-44 6 L44 6 Q52 6 52 14 L52 74 Q52 98 30 104 L12 108 L12 122 L-12 122 L-12 108 L-30 104 Q-52 98 -52 74 L-52 14 Q-52 6 -44 6 Z"
        fill={`url(#${id}-glass)`}
        stroke="#9AD4EE"
        strokeWidth="2"
      />
      <path d="M-52 22 L52 22 L52 76 Q52 96 32 102 L-32 102 Q-52 96 -52 76 Z" fill={`url(#${id}-water)`} opacity="0.75" />
      <rect x="-36" y="18" width="10" height="70" rx="5" fill="#FFFFFF" opacity="0.55" />
      <rect x="-14" y="118" width="28" height="8" rx="4" fill="#EAF6FD" stroke="#C4E4F4" strokeWidth="1.2" />
    </g>
  );
}

function Taps({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x} y={y} width="56" height="16" rx="6" fill="#EAF3FA" stroke="#C4E0F0" strokeWidth="1.4" />
      <rect x={x + 6} y={y + 16} width="10" height="12" rx="4" fill="#F87171" />
      <rect x={x + 40} y={y + 16} width="10" height="12" rx="4" fill="#38BDF8" />
      <circle cx={x + 11} cy={y + 8} r="3.2" fill="#EF4444" />
      <circle cx={x + 45} cy={y + 8} r="3.2" fill="#0EA5E9" />
    </g>
  );
}

/** Floor-standing hot & cold dispenser */
function DispenserFloor({ id }: { id: string }) {
  return (
    <g>
      <TopBottle id={id} x={200} y={28} />
      <rect x="142" y="152" width="116" height="206" rx="18" fill={`url(#${id}-cabinet)`} stroke="#C4E4F4" strokeWidth="2" />
      <rect x="154" y="164" width="92" height="30" rx="10" fill="#F2FAFE" stroke="#D8ECF7" strokeWidth="1.2" />
      <text x="200" y="184" textAnchor="middle" fontSize="13" fontWeight="800" fill={LABEL} letterSpacing="2" style={{ fontFamily: "Sora, system-ui, sans-serif" }}>
        LIMAH
      </text>
      <Taps x={172} y={212} />
      <rect x="160" y="262" width="80" height="14" rx="7" fill="#DCEEF9" stroke="#BFDFF1" strokeWidth="1.4" />
      <rect x="160" y="296" width="80" height="46" rx="10" fill="#F4FBFE" stroke="#D8ECF7" strokeWidth="1.2" />
      <circle cx="166" cy="176" r="4" fill="#34D399" />
      <rect x="150" y="350" width="24" height="12" rx="4" fill="#B7D6E8" />
      <rect x="226" y="350" width="24" height="12" rx="4" fill="#B7D6E8" />
      <Bubbles points={[[164, 62, 3], [232, 46, 2.6], [218, 78, 2]]} />
    </g>
  );
}

/** Compact desktop dispenser */
function DispenserDesktop({ id }: { id: string }) {
  return (
    <g>
      <TopBottle id={id} x={200} y={92} s={0.9} />
      <rect x="132" y="208" width="136" height="146" rx="18" fill={`url(#${id}-cabinet)`} stroke="#C4E4F4" strokeWidth="2" />
      <text x="200" y="236" textAnchor="middle" fontSize="13" fontWeight="800" fill={LABEL} letterSpacing="2" style={{ fontFamily: "Sora, system-ui, sans-serif" }}>
        LIMAH
      </text>
      <Taps x={172} y={252} />
      <rect x="156" y="300" width="88" height="14" rx="7" fill="#DCEEF9" stroke="#BFDFF1" strokeWidth="1.4" />
      <circle cx="152" cy="226" r="4" fill="#34D399" />
      <rect x="140" y="350" width="120" height="10" rx="5" fill="#B7D6E8" />
      <Bubbles points={[[168, 130, 2.8], [230, 118, 2.4]]} />
    </g>
  );
}

/** Manual press pump on a cropped jug */
function Pump({ id }: { id: string }) {
  return (
    <g>
      <path d="M96 262 C96 232 150 222 200 222 C250 222 304 232 304 262 L304 420 L96 420 Z" fill={`url(#${id}-glass)`} stroke="#9AD4EE" strokeWidth="2" />
      <path d="M96 288 Q148 276 200 288 T304 288 L304 420 L96 420 Z" fill={`url(#${id}-water)`} opacity="0.75" />
      <rect x="172" y="202" width="56" height="24" rx="8" fill="#EAF6FD" stroke="#C4E4F4" strokeWidth="2" />
      <rect x="181" y="150" width="38" height="56" rx="10" fill="#F2FAFE" stroke="#C4E4F4" strokeWidth="2" />
      <circle cx="200" cy="146" r="27" fill={`url(#${id}-cap)`} stroke="#C4E4F4" strokeWidth="2" />
      <path d="M200 132 C200 112 236 108 248 122" fill="none" stroke="#EAF6FD" strokeWidth="13" strokeLinecap="round" />
      <path d="M200 132 C200 112 236 108 248 122" fill="none" stroke="#A9D7EF" strokeWidth="13" strokeLinecap="round" opacity="0.5" transform="translate(0 4)" />
      <rect x="240" y="118" width="18" height="16" rx="6" fill="#48CAE4" />
      <rect x="182" y="104" width="36" height="16" rx="8" fill="#48CAE4" stroke="#1FA8DE" strokeWidth="1.5" />
      <path d="M249 136 q2 14 -2 22" stroke="#48CAE4" strokeWidth="3.5" fill="none" strokeLinecap="round" opacity="0.85" />
      <circle cx="247" cy="166" r="4.5" fill="#00B4D8" opacity="0.8" />
      <Bubbles points={[[150, 330, 3.4], [164, 300, 2.4], [248, 336, 3], [238, 302, 2.2]]} />
      <Label y={316} w={136} size={12} />
    </g>
  );
}

/** Stack of food-grade disposable cups */
function Cups({ id }: { id: string }) {
  return (
    <g>
      <g opacity="0.75" transform="translate(-34 -26)">
        <path d="M150 152 L250 152 L236 330 Q234 348 218 348 L182 348 Q166 348 164 330 Z" fill={`url(#${id}-glass)`} stroke="#B7DFF2" strokeWidth="2" />
      </g>
      <g opacity="0.85" transform="translate(30 -12)">
        <path d="M150 152 L250 152 L236 330 Q234 348 218 348 L182 348 Q166 348 164 330 Z" fill={`url(#${id}-glass)`} stroke="#B7DFF2" strokeWidth="2" />
      </g>
      <clipPath id={`${id}-clip`}>
        <path d="M150 152 L250 152 L236 330 Q234 348 218 348 L182 348 Q166 348 164 330 Z" />
      </clipPath>
      <path d="M150 152 L250 152 L236 330 Q234 348 218 348 L182 348 Q166 348 164 330 Z" fill="#FFFFFF" opacity="0.6" />
      <path d="M150 152 L250 152 L236 330 Q234 348 218 348 L182 348 Q166 348 164 330 Z" fill={`url(#${id}-glass)`} opacity="0.9" stroke="#9AD4EE" strokeWidth="2" />
      <g clipPath={`url(#${id}-clip)`}>
        <path d="M146 236 Q172 226 200 234 T254 236 L254 350 L146 350 Z" fill={`url(#${id}-water)`} opacity="0.8" />
        <rect x="160" y="170" width="12" height="160" rx="6" fill="#FFFFFF" opacity="0.6" />
      </g>
      <ellipse cx="200" cy="152" rx="52" ry="11" fill="#FFFFFF" stroke="#9AD4EE" strokeWidth="2" />
      <ellipse cx="200" cy="152" rx="40" ry="7" fill="#D9F0FB" />
      <text x="200" y="216" textAnchor="middle" fontSize="12" fontWeight="800" fill={LABEL} letterSpacing="1.5" style={{ fontFamily: "Sora, system-ui, sans-serif" }}>
        LIMAH
      </text>
      <Bubbles points={[[176, 300, 3], [186, 268, 2.2], [222, 310, 2.6], [216, 258, 2]]} />
    </g>
  );
}

export type ArtVariant =
  | "jug"
  | "bottle-lg"
  | "bottle-md"
  | "pet-lg"
  | "pet-md"
  | "pet-sm"
  | "dispenser-floor"
  | "dispenser-desktop"
  | "pump"
  | "cups";

export function ProductArt({ variant, className }: { variant: string; className?: string }) {
  const id = `pa-${variant}`;
  return (
    <svg viewBox="0 0 400 420" className={className} role="img" aria-label={`Limah Fresh ${variant} illustration`}>
      <Defs id={id} />
      <ellipse cx="200" cy="374" rx="104" ry="16" fill="#023E8A" opacity="0.1" />
      {variant === "jug" && <Jug id={id} />}
      {variant === "bottle-lg" && <HandledBottle id={id} big />}
      {variant === "bottle-md" && <HandledBottle id={id} />}
      {variant === "pet-lg" && <PetBottle id={id} size="lg" />}
      {variant === "pet-md" && <PetBottle id={id} size="md" />}
      {variant === "pet-sm" && <PetBottle id={id} size="sm" />}
      {variant === "dispenser-floor" && <DispenserFloor id={id} />}
      {variant === "dispenser-desktop" && <DispenserDesktop id={id} />}
      {variant === "pump" && <Pump id={id} />}
      {variant === "cups" && <Cups id={id} />}
    </svg>
  );
}
