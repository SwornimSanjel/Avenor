"use client";

import { motion, useReducedMotion } from "framer-motion";
import Container from "../Container";
import { LinkButton } from "../Button";
import InquiryOrbit from "../InquiryOrbit";
import AmbientBackground from "../AmbientBackground";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

export default function Hero() {
  const reduce = useReducedMotion();
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-obsidian">
      {/* Ambient light blooms + diagonal ray — the "neon in a dark room" finish. */}
      <AmbientBackground variant="hero" />

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
          className="mt-6 max-w-3xl font-display text-[2rem] font-bold leading-[1.05] tracking-tight text-ivory sm:text-[2.75rem] md:text-[3.25rem] lg:text-[3.75rem]"
        >
          We answer, qualify and follow up on every inquiry —{" "}
          <span className="text-gradient">even at 2 a.m.</span>
        </motion.h1>

        {/* 3. Subhead */}
        <motion.p
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-silver"
        >
          Avernik captures every customer message, replies in seconds, scores intent, and hands
          your team a clear follow-up list. Around the clock.
        </motion.p>

        {/* 4. CTA row */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.32 }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <LinkButton href="#contact">Book a system audit</LinkButton>
          <a
            href="#demo"
            className="text-sm text-silver underline-offset-4 transition-colors hover:text-ivory hover:underline"
          >
            See how it handles a live inquiry →
          </a>
        </motion.div>

        {/* 5. Abstract "inquiry orbit" centerpiece — atmosphere, not a chat UI.
            The live messenger demo lives lower down in #demo. */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          className="mt-16 w-full max-w-2xl md:mt-20"
        >
          <InquiryOrbit />
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
