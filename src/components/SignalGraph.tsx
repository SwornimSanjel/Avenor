"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

const W = 880;
const H = 280;
const RAIL = 118;

type Node = { x: number; label: string; sub: string; hot?: boolean };

const nodes: Node[] = [
  { x: 90, label: "Inquiry", sub: "message in" },
  { x: 230, label: "Reply", sub: "auto reply" },
  { x: 370, label: "Captured", sub: "saved to CRM" },
  { x: 510, label: "Qualified", sub: "intent checked" },
  { x: 650, label: "Follow-up", sub: "priority set", hot: true },
  { x: 790, label: "Report", sub: "owner view" },
];

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
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-10 -z-10 rounded-[40px] bg-[radial-gradient(55%_60%_at_50%_45%,rgba(96,130,246,0.16),transparent_70%)]"
      />

      <div className="glass relative overflow-hidden rounded-card shadow-card">
        <span aria-hidden className="pointer-events-none absolute inset-0 bg-panel-grad" />

        <div className="relative flex items-center justify-between border-b border-white/[0.06] px-4 py-3 sm:px-5">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-accent/70" />
            <span className="text-[11px] font-medium uppercase tracking-eyebrow text-slate sm:text-xs">
              Inquiry pipeline · live view
            </span>
          </div>
          <span className="flex items-center gap-1.5 text-[11px] text-slate sm:text-xs">
            <span className="h-1.5 w-1.5 animate-node rounded-full bg-accent-glow" />
            Always on
          </span>
        </div>

        {/* Mobile: vertical stepper — avoids squished horizontal labels */}
        <div className="px-4 py-4 md:hidden">
          <MobilePipeline play={play} reduce={reduce} dur={dur} />
        </div>

        {/* Tablet+: horizontal SVG rail */}
        <div className="relative hidden px-4 py-5 md:block sm:px-6">
          <HorizontalGraph play={play} reduce={reduce} dur={dur} />
        </div>
      </div>

      {/* Floating cards — only on wide screens where they have room */}
      <FloatCard className="left-4 top-[76px] hidden lg:block xl:left-5" delay={dur(1.0)} play={play}>
        <span className="h-1.5 w-1.5 rounded-full bg-accent-glow" />
        <span className="text-xs text-silver">24/7 auto reply ready</span>
      </FloatCard>

      <FloatCard
        className="left-4 top-[128px] hidden lg:block xl:left-5"
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

      <FloatCard className="bottom-5 right-4 hidden lg:block xl:right-5" delay={dur(1.8)} play={play} accent="gold">
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

function MobilePipeline({
  play,
  reduce,
  dur,
}: {
  play: boolean;
  reduce: boolean | null;
  dur: (s: number) => number;
}) {
  return (
    <ol className="flex flex-col gap-0" aria-label="Inquiry pipeline flow">
      {nodes.map((n, i) => (
        <li key={n.label} className="flex gap-3">
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: reduce ? 1 : 0, scale: reduce ? 1 : 0.8 }}
              animate={{ opacity: play ? 1 : 0, scale: play ? 1 : 0.8 }}
              transition={{ duration: 0.35, delay: dur(0.15 + i * 0.1) }}
              className="relative flex h-8 w-8 shrink-0 items-center justify-center"
            >
              <span
                className={`absolute inset-0 rounded-full ${n.hot ? "bg-gold/20" : "bg-accent/15"}`}
              />
              <span
                className={`relative h-2.5 w-2.5 rounded-full ${n.hot ? "bg-gold-glow" : "bg-accent-glow"}`}
              />
            </motion.div>
            {i < nodes.length - 1 && (
              <motion.span
                initial={{ scaleY: reduce ? 1 : 0 }}
                animate={{ scaleY: play ? 1 : 0 }}
                transition={{ duration: 0.3, delay: dur(0.2 + i * 0.1) }}
                className="my-0.5 w-px flex-1 origin-top bg-gradient-to-b from-accent/40 to-accent/10"
                style={{ minHeight: "1.25rem" }}
                aria-hidden
              />
            )}
          </div>
          <motion.div
            initial={{ opacity: reduce ? 1 : 0, x: reduce ? 0 : 8 }}
            animate={{ opacity: play ? 1 : 0, x: play ? 0 : 8 }}
            transition={{ duration: 0.35, delay: dur(0.15 + i * 0.1) }}
            className={`pb-4 ${i === nodes.length - 1 ? "pb-0" : ""}`}
          >
            <p className="text-sm font-semibold text-ivory">{n.label}</p>
            <p className="text-xs text-slate">{n.sub}</p>
          </motion.div>
        </li>
      ))}
    </ol>
  );
}

function HorizontalGraph({
  play,
  reduce,
  dur,
}: {
  play: boolean;
  reduce: boolean | null;
  dur: (s: number) => number;
}) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Animated inquiry pipeline flow"
    >
      <defs>
        <linearGradient id="sigStroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#4B8EF5" />
          <stop offset="0.55" stopColor="#6366F1" />
          <stop offset="1" stopColor="#7C5CE8" />
        </linearGradient>
        <filter id="sigGlow" x="-10%" y="-200%" width="120%" height="500%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      <path
        d={railPath}
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="2"
        strokeLinecap="round"
      />

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

      {play && !reduce && (
        <g>
          <circle r="10" fill="#9B7EF0" opacity="0.25">
            <animateMotion dur="4.5s" begin="0.6s" repeatCount="indefinite" path={railPath} />
          </circle>
          <circle r="4" fill="#9B7EF0">
            <animateMotion dur="4.5s" begin="0.6s" repeatCount="indefinite" path={railPath} />
          </circle>
        </g>
      )}

      <g>
        {nodes.map((n) => (
          <g key={n.label}>
            <text x={n.x} y={RAIL + 34} textAnchor="middle" fill="#F0F1F5" fontSize="14" fontWeight="600">
              {n.label}
            </text>
            <text x={n.x} y={RAIL + 52} textAnchor="middle" fill="#7B8194" fontSize="12">
              {n.sub}
            </text>
          </g>
        ))}
      </g>

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
              stroke="#E8BC7A"
              strokeWidth="1.5"
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: [1, 2.6], opacity: [0.8, 0] }}
              transition={{ duration: 1.9, repeat: Infinity, delay: 1.6, ease: "easeOut" }}
              style={
                { transformOrigin: `${n.x}px ${RAIL}px`, transformBox: "fill-box" } as React.CSSProperties
              }
            />
          )}
          <circle cx={n.x} cy={RAIL} r="13" fill={n.hot ? "#D4A05A" : "#4B8EF5"} opacity={n.hot ? 0.2 : 0.16} />
          <circle cx={n.x} cy={RAIL} r="5" fill={n.hot ? "#E8BC7A" : "#6BA3F7"} />
          <circle
            cx={n.x}
            cy={RAIL}
            r="5"
            fill="none"
            stroke={n.hot ? "#E8BC7A" : "#6BA3F7"}
            strokeOpacity="0.55"
            strokeWidth="1.5"
          />
        </motion.g>
      ))}
    </svg>
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
        className={`flex items-center gap-2 rounded-lg border ${border} bg-panel/90 px-3 py-2 shadow-card backdrop-blur-md`}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={play ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.5, delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}
