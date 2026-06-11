"use client";

import { useReducedMotion } from "framer-motion";

/**
 * InquiryOrbit — the hero's abstract centerpiece.
 *
 * A glowing system "core" with three concentric orbit rings. Small dots
 * ("inquiries") travel around each ring and feed toward the core; faint lines
 * pulse inward (data flowing in). Pure SVG + CSS keyframes — no images, on a
 * transparent background so the hero's AmbientBackground shows through.
 *
 * Accent-blue → iris-violet throughout; a single gold dot = a hot lead reaching
 * the core. Motion is slow and calm (40s / 60s / 80s rings). Under
 * prefers-reduced-motion the global rule in globals.css freezes every keyframe
 * to its formed resting state (rings + dots placed, core glowing, no spin).
 */
const C = 300; // center

function Dot({
  radius,
  color = "var(--accent-glow, #60A5FA)",
  r = 5,
}: {
  radius: number;
  color?: string;
  r?: number;
}) {
  // Placed at the top of its ring; the parent <g> rotation carries it around.
  return <circle cx={C} cy={C - radius} r={r} fill={color} filter="url(#orbitGlow)" />;
}

export default function InquiryOrbit() {
  const reduce = useReducedMotion();

  return (
    <div className="mx-auto w-full max-w-2xl">
      <svg
        viewBox="0 0 600 600"
        className="h-auto w-full"
        role="img"
        aria-label="An abstract system core with inquiries orbiting and feeding in"
      >
        <defs>
          <linearGradient id="orbitRing" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
          <radialGradient id="orbitCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#EAF2FF" />
            <stop offset="35%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.15" />
          </radialGradient>
          <filter id="orbitGlow" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
          <filter id="orbitCoreGlow" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
        </defs>

        {/* Faint connecting lines from the outer ring toward the core. */}
        <g stroke="url(#orbitRing)" strokeWidth="1" strokeLinecap="round">
          <line className="orbit-line" x1={C} y1={C - 240} x2={C} y2={C - 30} />
          <line className="orbit-line orbit-line-2" x1={C + 208} y1={C + 120} x2={C + 26} y2={C + 15} />
          <line className="orbit-line orbit-line-3" x1={C - 208} y1={C + 120} x2={C - 26} y2={C + 15} />
        </g>

        {/* Three orbit rings. */}
        <g fill="none" stroke="url(#orbitRing)">
          <circle cx={C} cy={C} r={110} strokeOpacity="0.22" strokeWidth="1" />
          <circle cx={C} cy={C} r={175} strokeOpacity="0.16" strokeWidth="1" />
          <circle cx={C} cy={C} r={240} strokeOpacity="0.12" strokeWidth="1" />
        </g>

        {/* Core halo + bright center. */}
        <circle cx={C} cy={C} r={70} fill="url(#orbitCore)" opacity="0.5" filter="url(#orbitCoreGlow)" />
        <circle className="orbit-core" cx={C} cy={C} r={30} fill="url(#orbitCore)" />
        <circle cx={C} cy={C} r={12} fill="#EAF2FF" filter="url(#orbitGlow)" />

        {/* Travelling inquiries. Each group spins around the centre; reduced-
            motion freezes them at their formed positions. */}
        <g
          className={reduce ? undefined : "orbit-spin orbit-40"}
          style={{ transformOrigin: `${C}px ${C}px` }}
        >
          <Dot radius={110} />
        </g>
        <g
          className={reduce ? undefined : "orbit-spin-rev orbit-60"}
          style={{ transformOrigin: `${C}px ${C}px` }}
        >
          <Dot radius={175} />
          <g transform={`rotate(150 ${C} ${C})`}>
            {/* The one hot lead reaching the core — gold. */}
            <Dot radius={175} color="#F2C886" r={6} />
          </g>
        </g>
        <g
          className={reduce ? undefined : "orbit-spin orbit-80"}
          style={{ transformOrigin: `${C}px ${C}px` }}
        >
          <Dot radius={240} />
          <g transform={`rotate(200 ${C} ${C})`}>
            <Dot radius={240} r={4} />
          </g>
        </g>
      </svg>
    </div>
  );
}
