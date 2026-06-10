"use client";

import { motion, useReducedMotion } from "framer-motion";
import Container from "../Container";
import { LinkButton } from "../Button";
import SignalGraph from "../SignalGraph";

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

const chips = ["First reply in under 60s", "Web, SMS, FB & IG", "Synced to your CRM"];

export default function Hero() {
  const reduce = useReducedMotion();
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-obsidian">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-[0.25]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-hero-grad" />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-8%] top-[8%] h-[400px] w-[440px] rounded-full bg-iris/[0.07] blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-10%] top-[42%] h-[360px] w-[400px] rounded-full bg-accent/[0.06] blur-[120px]"
      />

      <Container className="relative flex flex-col items-center pt-24 pb-20 text-center sm:pt-28 md:pt-32 md:pb-28">
        <motion.span
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1 text-[10px] font-medium uppercase tracking-eyebrow text-silver shadow-inset"
        >
          <span className="h-1.5 w-1.5 animate-node rounded-full bg-accent-glow" />
          Now onboarding founding clients
        </motion.span>

        <motion.h1
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mt-6 max-w-3xl font-display text-[2rem] font-semibold leading-[1.1] tracking-tight text-ivory sm:text-display-md md:text-display-lg lg:text-display-xl"
        >
          Every inquiry answered, qualified, and followed up.{" "}
          <span className="text-gradient">Even at 2 a.m.</span>
        </motion.h1>

        <motion.p
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="mx-auto mt-6 max-w-xl text-body text-slate lg:text-[1.0625rem]"
        >
          Avenor captures every inquiry, replies in seconds, qualifies real buyers, and hands your
          team a clear follow-up list. Around the clock.
        </motion.p>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.32 }}
          className="mt-7 flex flex-col items-center justify-center gap-2.5 sm:flex-row"
        >
          <LinkButton href="#contact">Book a system audit</LinkButton>
          <LinkButton href="#demo" variant="secondary">
            See it handle a live inquiry
          </LinkButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.46 }}
          className="mt-6 flex flex-wrap justify-center gap-2"
        >
          {chips.map((cap) => (
            <span
              key={cap}
              className="inline-flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 text-body-sm text-silver shadow-inset transition-colors duration-200 hover:border-white/[0.12]"
            >
              <span className="h-1 w-1 rounded-full bg-accent-glow" />
              {cap}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          className="mt-16 w-full max-w-5xl md:mt-20 lg:mt-24"
        >
          <SignalGraph startDelay={400} />
        </motion.div>
      </Container>

      <a
        href="#demo"
        aria-label="Scroll to the live demo"
        className="absolute bottom-5 left-1/2 -translate-x-1/2 text-slate/40 transition-colors duration-200 hover:text-slate motion-reduce:hidden"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 animate-bounce" aria-hidden>
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </section>
  );
}
