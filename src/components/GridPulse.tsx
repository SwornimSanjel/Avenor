"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/**
 * Subtle "live network" overlay — a fixed grid of nodes where a few light up
 * and fade at a time, suggesting data moving through the system. Renders an
 * SVG overlay over its parent (which must be `relative`). Renders nothing for
 * reduced-motion users.
 */
const COLS = 8;
const ROWS = 6;

// Node positions as percentages, evenly inset across the grid.
const NODES = Array.from({ length: COLS * ROWS }, (_, i) => ({
  x: ((i % COLS) + 0.5) * (100 / COLS),
  y: (Math.floor(i / COLS) + 0.5) * (100 / ROWS),
}));

type Pulse = { id: string; node: number };

export default function GridPulse({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const [pulses, setPulses] = useState<Pulse[]>([]);
  // Persists across Strict Mode's dev remount so pulse ids never repeat.
  const idRef = useRef(0);

  useEffect(() => {
    if (reduce) return;
    const fire = () => {
      const used = new Set<number>();
      const picks: Pulse[] = [];
      while (picks.length < 3) {
        const node = Math.floor(Math.random() * NODES.length);
        if (used.has(node)) continue;
        used.add(node);
        picks.push({ id: `${idRef.current++}-${Math.random().toString(36).slice(2)}`, node });
      }
      setPulses((prev) => [...prev, ...picks]);
      const ids = new Set(picks.map((p) => p.id));
      // Remove after the full fade-up (1s) + hold (1.5s) + fade-out (2s).
      window.setTimeout(() => setPulses((prev) => prev.filter((p) => !ids.has(p.id))), 4600);
    };
    fire();
    const interval = window.setInterval(fire, 5000);
    return () => window.clearInterval(interval);
  }, [reduce]);

  if (reduce) return null;

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <filter id="gridPulseGlow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="0.6" />
          </filter>
        </defs>
        <AnimatePresence>
          {pulses.map((p) => {
            const n = NODES[p.node];
            return (
              <motion.circle
                key={p.id}
                cx={n.x}
                cy={n.y}
                r={0.7}
                fill="rgba(96,165,250,0.5)"
                filter="url(#gridPulseGlow)"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 4.5, times: [0, 0.22, 0.55, 1], ease: "easeInOut" }}
              />
            );
          })}
        </AnimatePresence>
      </svg>
    </div>
  );
}
