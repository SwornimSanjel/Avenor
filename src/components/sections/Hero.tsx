"use client";

import { motion, useReducedMotion } from "framer-motion";
import Container from "../Container";
import { LinkButton } from "../Button";
import AiInbox from "../AiInbox";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

// PLACEHOLDER chips — confirm or replace before launch. These are meant to add
// specifics the headline does not already say (speed target, channels, CRM).
const chips = ["First reply in under 60s", "Web, SMS, FB & IG", "Synced to your CRM"];

export default function Hero() {
  const reduce = useReducedMotion();
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-obsidian">
      {/* background: faint grid + two capped radial glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-[0.35]" />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-[6%] h-[520px] w-[560px] rounded-full bg-iris/12 blur-[150px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-12%] top-[38%] h-[420px] w-[460px] rounded-full bg-accent/10 blur-[150px]"
      />

      <Container className="relative flex flex-col items-center pt-28 pb-28 text-center sm:pt-32 md:pt-36 md:pb-40">
        {/* 1. Availability pill */}
        <motion.span
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-silver"
        >
          <span className="h-1.5 w-1.5 animate-node rounded-full bg-accent-glow" />
          Now onboarding founding clients
        </motion.span>

        {/* 2. H1 */}
        <motion.h1
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mt-6 max-w-3xl font-display text-[2rem] font-bold leading-[1.07] tracking-tight text-ivory sm:text-[2.5rem] md:text-[3rem] lg:text-[3.25rem]"
        >
          Every inquiry answered, qualified, and followed up.{" "}
          <span className="text-gradient">Even at 2 a.m.</span>
        </motion.h1>

        {/* 3. Subhead */}
        <motion.p
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-silver"
        >
          Avernik captures every inquiry, replies in seconds, qualifies real buyers, and hands your
          team a clear follow-up list. Around the clock.
        </motion.p>

        {/* 4. CTA row */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.32 }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <LinkButton href="#contact">Book a system audit</LinkButton>
          <LinkButton href="#demo" variant="secondary">
            See it handle a live inquiry
          </LinkButton>
        </motion.div>

        {/* 5. Benefit chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.46 }}
          className="mt-7 flex flex-wrap justify-center gap-2.5"
        >
          {chips.map((cap) => (
            <span
              key={cap}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-panel/50 px-3.5 py-2 text-[13px] text-silver transition-colors duration-200 hover:border-accent/40"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent-glow" />
              {cap}
            </span>
          ))}
        </motion.div>

        {/* 6. Pipeline graph — below the text, larger, centered. It is tall
            enough that its lower half sits past the fold, inviting scroll. */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          className="mt-24 w-full max-w-5xl md:mt-32"
        >
          {/* Looping AI inbox mockup — shows the product doing its job. */}
          <AiInbox />
        </motion.div>
      </Container>

      {/* Scroll cue — understated, bounces gently, hidden under reduced motion */}
      <a
        href="#demo"
        aria-label="Scroll to the live demo"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-slate/50 transition-colors duration-200 hover:text-slate motion-reduce:hidden"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 animate-bounce" aria-hidden>
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </section>
  );
}
