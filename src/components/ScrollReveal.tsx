"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  /** Delay in seconds before the reveal starts (use for grid stagger). */
  delay?: number;
};

/**
 * Reveal-on-scroll wrapper: content fades from 0 → 100% while rising a short
 * distance up into its final position (a clean "settle into place from just
 * below"). Fires once.
 *
 * Note: keep CSS `hover:-translate-y` on an INNER element, not on the same node
 * you pass `className` to here — framer leaves an inline transform once revealed,
 * which would otherwise override a hover translate on the same element.
 *
 * Under prefers-reduced-motion it fades only (no transform).
 */
export default function ScrollReveal({ children, className = "", delay = 0 }: ScrollRevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
