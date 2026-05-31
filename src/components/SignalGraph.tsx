"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

/**
 * Premium "inquiry pipeline" dashboard for the hero.
 *
 * A clean horizontal rail with six labelled stations (Inquiry → Report). The
 * rail draws left → right, the stations fade in, a soft signal pulse travels
 * the rail, and one station pulses. Labels are SVG <text> inside the viewBox so
 * they never clip. Floating glass cards compose around it.
 */

const W = 880;
const H = 280;
const RAIL = 118; // y of the horizontal rail

type Node = { x: number; label: string; sub: string; hot?: boolean };

const nodes: Node[] = [
  { x: 90, label: "Inquiry", sub: "message in" },
  { x: 230, label: "Reply", sub: "auto reply" },
  { x: 370, label: "Captured", sub: "saved to CRM" },
  { x: 510, label: "Qualified", sub: "intent checked" },
  { x: 650, label: "Follow-up", sub: "priority set", hot: true },
  { x: 790, label: "Report", sub: "owner view" },
];

// A gentle, symmetric signal wave that passes level through every station
// (no upward "growth chart" rise) — reads as a live signal flowing down the
// pipeline. The pulse + drawn line both follow this path.
const railPath =
  "M90 118 Q160 96 230 118 Q300 140 370 118 Q440 96 510 118 Q580 140 650 118 Q720 96 790 118";

export default function SignalGraph({
  className = "",
  startDelay = 0,
}: {
  className?: string;
  startDelay?: number;
}) {
  const reduce = useReducedMotion();
  const [play, setPlay] = useState(false);

  useEffect(() => {
    if (reduce) {
      setPlay(true);
      return;
    }
    const t = window.setTimeout(() => setPlay(true), startDelay);
    return () => window.clearTimeout(t);
  }, [reduce, startDelay]);

  const dur = (s: number) => (reduce ? 0 : s);

  return (
    <div className={`relative ${className}`}>
      {/* soft radial glow behind the dashboard */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-10 -z-10 rounded-[40px] bg-[radial-gradient(55%_60%_at_50%_45%,rgba(96,130,246,0.16),transparent_70%)]"
      />

      {/* main graph card */}
      <div className="glass relative overflow-hidden rounded-2xl shadow-card">
        {/* faint glass sheen for depth */}
        <span aria-hidden className="pointer-events-none absolute inset-0 bg-panel-grad" />
        <div className="relative flex items-center justify-between border-b border-white/10 px-5 py-3.5">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-accent/80" />
            <span className="text-xs font-medium uppercase tracking-[0.22em] text-slate">
              Inquiry pipeline · live view
            </span>
          </div>
          <span className="flex items-center gap-1.5 text-xs text-slate">
            <span className="h-1.5 w-1.5 animate-node rounded-full bg-accent-glow" />
            Always on
          </span>
        </div>

        <div className="relative px-4 py-5 sm:px-6">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Animated inquiry pipeline flow">
            <defs>
              <linearGradient id="sigStroke" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#3B82F6" />
                <stop offset="0.55" stopColor="#6366F1" />
                <stop offset="1" stopColor="#8B5CF6" />
              </linearGradient>
              <filter id="sigGlow" x="-10%" y="-200%" width="120%" height="500%">
                <feGaussianBlur stdDeviation="6" />
              </filter>
            </defs>

            {/* static base rail — present immediately so the panel never looks blank */}
            <path
              d={railPath}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* soft glow under the rail */}
            <motion.path
              d={railPath}
              fill="none"
              stroke="url(#sigStroke)"
              strokeWidth="9"
              strokeLinecap="round"
              filter="url(#sigGlow)"
              opacity="0.4"
              initial={{ pathLength: reduce ? 1 : 0 }}
              animate={{ pathLength: play ? 1 : 0 }}
              transition={{ duration: dur(1.6), ease: "easeInOut" }}
            />

            {/* crisp rail */}
            <motion.path
              d={railPath}
              fill="none"
              stroke="url(#sigStroke)"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: reduce ? 1 : 0 }}
              animate={{ pathLength: play ? 1 : 0 }}
              transition={{ duration: dur(1.6), ease: "easeInOut" }}
            />

            {/* live signal pulse travelling the rail */}
            {play && !reduce && (
              <g>
                <circle r="10" fill="#A78BFA" opacity="0.25">
                  <animateMotion dur="4.5s" begin="0.6s" repeatCount="indefinite" path={railPath} />
                </circle>
                <circle r="4" fill="#A78BFA">
                  <animateMotion dur="4.5s" begin="0.6s" repeatCount="indefinite" path={railPath} />
                </circle>
              </g>
            )}

            {/* labels — present immediately so the panel reads as live from frame 1 */}
            <g>
              {nodes.map((n) => (
                <g key={n.label}>
                  <text x={n.x} y={RAIL + 34} textAnchor="middle" fill="#ECEEF4" fontSize="14" fontWeight="600">
                    {n.label}
                  </text>
                  <text x={n.x} y={RAIL + 52} textAnchor="middle" fill="#8A90A3" fontSize="12">
                    {n.sub}
                  </text>
                </g>
              ))}
            </g>

            {/* stations — draw in on top of the already-present rail */}
            {nodes.map((n, i) => (
              <motion.g
                key={n.label}
                initial={{ opacity: reduce ? 1 : 0 }}
                animate={{ opacity: play ? 1 : 0 }}
                transition={{ duration: 0.4, delay: dur(0.4 + i * 0.18) }}
              >
                {n.hot && !reduce && play && (
                  <motion.circle
                    cx={n.x}
                    cy={RAIL}
                    r="7"
                    fill="none"
                    stroke="#E0A95F"
                    strokeWidth="1.5"
                    initial={{ scale: 1, opacity: 0.8 }}
                    animate={{ scale: [1, 2.6], opacity: [0.8, 0] }}
                    transition={{ duration: 1.9, repeat: Infinity, delay: 1.6, ease: "easeOut" }}
                    style={
                      { transformOrigin: `${n.x}px ${RAIL}px`, transformBox: "fill-box" } as React.CSSProperties
                    }
                  />
                )}
                {/* Warm focal point: the priority/hot station glows gold against the cool rail. */}
                <circle cx={n.x} cy={RAIL} r="13" fill={n.hot ? "#E0A95F" : "#3B82F6"} opacity={n.hot ? 0.2 : 0.16} />
                <circle cx={n.x} cy={RAIL} r="5" fill={n.hot ? "#F2C886" : "#60A5FA"} />
                <circle
                  cx={n.x}
                  cy={RAIL}
                  r="5"
                  fill="none"
                  stroke={n.hot ? "#F2C886" : "#60A5FA"}
                  strokeOpacity="0.55"
                  strokeWidth="1.5"
                />
              </motion.g>
            ))}
          </svg>
        </div>
      </div>

      {/* floating dashboard cards (sit below the header so they never cover the title) */}
      <FloatCard className="left-3 top-[72px] sm:left-5" delay={dur(1.0)} play={play}>
        <span className="h-1.5 w-1.5 rounded-full bg-accent-glow" />
        <span className="text-xs text-silver">24/7 auto reply ready</span>
      </FloatCard>

      <FloatCard
        className="left-3 top-[120px] sm:left-5 sm:top-[124px]"
        delay={dur(1.4)}
        play={play}
      >
        <span className="flex h-5 w-5 items-center justify-center rounded-md bg-accent/15 text-[10px] text-accent-glow">
          ✓
        </span>
        <span className="text-xs text-silver">
          Lead captured <span className="text-slate">· Rajesh T.</span>
        </span>
      </FloatCard>

      <FloatCard className="bottom-5 right-3 sm:right-5" delay={dur(1.8)} play={play} accent="gold">
        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-gold/15 text-gold-glow">
          !
        </span>
        <span className="flex flex-col">
          <span className="text-xs font-semibold text-ivory">Qualified lead</span>
          <span className="text-[10px] text-slate">Priority follow-up</span>
        </span>
      </FloatCard>
    </div>
  );
}

function FloatCard({
  children,
  className,
  delay,
  play,
  accent = "accent",
}: {
  children: ReactNode;
  className: string;
  delay: number;
  play: boolean;
  accent?: "accent" | "iris" | "gold";
}) {
  const border =
    accent === "iris" ? "border-iris/30" : accent === "gold" ? "border-gold/35" : "border-white/[0.12]";
  return (
    <div className={`absolute z-10 ${className}`}>
      <motion.div
        className={`flex items-center gap-2 rounded-xl border ${border} bg-panel/90 px-3 py-2 shadow-card backdrop-blur-md`}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={play ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.5, delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}
