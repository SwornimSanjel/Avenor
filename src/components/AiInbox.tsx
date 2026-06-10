"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/**
 * Hero product mockup — a stylised "AI inbox" that demonstrates what Avernik
 * does in ~3 seconds: a customer message arrives, the AI types, replies, the
 * lead is saved to the CRM, and a HOT tag appears.
 *
 * Driven by a single state machine (step 0..6) with timeouts cleared on unmount
 * and re-armed each cycle. Under prefers-reduced-motion the final state is shown
 * statically (all messages + toast + HOT chip, no animation).
 *
 * step: 0 hidden · 1 customer · 2 typing · 3 reply · 4 saved · 5 hot · 6 hold
 */
export default function AiInbox({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [toast, setToast] = useState(false);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (reduce) {
      setStep(6);
      setToast(true);
      return;
    }
    setStep(0);
    setToast(false);
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));
    at(500, () => setStep(1)); // customer message
    at(1300, () => setStep(2)); // typing dots
    at(2600, () => setStep(3)); // AI reply (dots vanish)
    at(3200, () => {
      setStep(4); // saved + response-time card
      setToast(true);
    });
    at(4400, () => setStep(5)); // HOT chip
    at(5400, () => setToast(false)); // toast slides out (held ~2.2s)
    at(6400, () => setStep(6)); // hold full state
    at(9200, () => setCycle((c) => c + 1)); // restart
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [reduce, cycle]);

  // Shared fade-up for message bubbles; under reduced motion they mount in place.
  const bubble = (delay = 0) =>
    reduce
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -6 },
          transition: { duration: 0.35, delay },
        };

  return (
    <div className={`relative mx-auto w-full max-w-md ${className}`}>
      {/* soft radial glow behind the panel */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-12 -z-10 rounded-[44px] bg-[radial-gradient(55%_60%_at_50%_45%,rgba(96,130,246,0.18),transparent_70%)]"
      />

      <div className="glass relative overflow-hidden rounded-2xl shadow-card">
        {/* faint glass sheen for depth */}
        <span aria-hidden className="pointer-events-none absolute inset-0 bg-panel-grad" />

        {/* Header */}
        <div className="relative flex items-center gap-3 border-b border-white/10 px-4 py-3">
          <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/15 text-sm font-semibold text-accent-glow">
            S
            <span
              aria-hidden
              className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 animate-node rounded-full border-2 border-panel bg-accent-glow"
            />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="text-sm font-semibold text-ivory">Sita Sharma</span>
              <AnimatePresence>
                {step >= 5 && (
                  <motion.span
                    key="hot"
                    initial={reduce ? false : { opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    transition={{ type: "spring", stiffness: 380, damping: 18 }}
                    className="relative inline-flex items-center rounded-full border border-gold/40 bg-gold/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gold-glow"
                  >
                    <span
                      aria-hidden
                      className="absolute inset-0 -z-10 rounded-full bg-gold/30 blur-md motion-safe:animate-pulse"
                    />
                    HOT · ready to enroll
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <span className="text-[11px] text-slate">Active now</span>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-medium text-slate">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-glow" />
            Instagram
          </span>
        </div>

        {/* Body */}
        <div className="relative flex min-h-[268px] flex-col gap-3 px-4 py-4">
          {/* Customer message */}
          <AnimatePresence>
            {step >= 1 && (
              <motion.div key="cust" {...bubble()} className="flex justify-start">
                <p className="max-w-[80%] rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-silver">
                  Hi, what&apos;s the fee for the IELTS weekend batch?
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Typing indicator */}
          <AnimatePresence>
            {step === 2 && (
              <motion.div key="typing" {...bubble()} className="flex justify-end">
                <span className="inline-flex items-center gap-1 rounded-2xl border border-accent/25 bg-accent/[0.08] px-4 py-3">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-1.5 w-1.5 animate-typing rounded-full bg-accent-glow"
                      style={{ animationDelay: `${i * 0.16}s` }}
                    />
                  ))}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* AI reply */}
          <AnimatePresence>
            {step >= 3 && (
              <motion.div key="reply" {...bubble()} className="flex justify-end">
                <p className="max-w-[80%] rounded-2xl border border-accent/25 bg-accent/[0.08] px-4 py-2.5 text-sm text-ivory">
                  Hi Sita! IELTS Weekend batch is NPR 12,000 for 8 weeks. Next batch
                  starts Nov 18. Want me to save your spot for a free demo class?
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Toast — saved to CRM */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key="toast"
            initial={reduce ? false : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 24 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute right-3 top-16 z-10 flex items-center gap-2 rounded-xl border border-accent/30 bg-panel/95 px-3 py-2 text-xs text-silver shadow-card backdrop-blur-md"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-accent/15 text-[11px] text-accent-glow">
              ✓
            </span>
            Saved to CRM
          </motion.div>
        )}
      </AnimatePresence>

      {/* Response time side card */}
      <AnimatePresence>
        {step >= 4 && (
          <motion.div
            key="rt"
            initial={reduce ? false : { opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="absolute -bottom-5 left-4 z-10 flex items-center gap-2 rounded-xl border border-white/[0.12] bg-panel/90 px-3 py-2 shadow-card backdrop-blur-md sm:left-6"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent-glow" />
            <span className="text-xs text-silver">
              Response time <span className="text-slate">· 14s</span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
