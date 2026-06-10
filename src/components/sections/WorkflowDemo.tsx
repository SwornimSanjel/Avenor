"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Container from "../Container";
import SectionHeading from "../SectionHeading";
import ScrollReveal from "../ScrollReveal";

/**
 * Illustrative AI demo — a Messenger-style conversation that visibly flows into
 * the CRM, fires an owner alert, and ends on a report tick. It demonstrates the
 * product rather than claiming results. Clearly labelled as a demo; no real
 * client data. Loops cleanly; respects prefers-reduced-motion (final state).
 *
 * Step map (advances on a fixed interval, then loops):
 *   0 reset · 1 customer msg · 2 seen + typing · 3 AI reply + CRM opens
 *   4 customer reply · 5 AI qualifies + CRM scores HOT · 6 owner alert · 7 report
 */
const STEPS = 8;
const INTERVAL = 1500;

export default function WorkflowDemo() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-100px" });
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduce) {
      setStep(STEPS - 1);
      return;
    }
    if (!inView) return;
    const id = window.setInterval(() => setStep((s) => (s + 1) % STEPS), INTERVAL);
    return () => window.clearInterval(id);
  }, [inView, reduce]);

  const at = (n: number) => step >= n;

  const crmRows: [string, string, boolean][] = [
    ["Name", "Rajesh T.", at(3)],
    ["Platform", "Facebook", at(3)],
    ["Interest", "Python weekend class", at(5)],
    ["Timeline", "This week", at(5)],
  ];

  return (
    <section
      id="demo"
      className="section-pad relative scroll-mt-24 overflow-hidden bg-[radial-gradient(125%_120%_at_50%_-10%,#0c1428_0%,#080c18_42%,#04050A_100%)]"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-[0.18]" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[360px] w-[700px] -translate-x-1/2 rounded-full bg-accent/[0.07] blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent"
      />
      <Container className="relative">
        <SectionHeading
          eyebrow="Live demo"
          title="Watch one inquiry move through the system."
          description="An illustrative example, not a real client chat. One message gets captured, answered, qualified, and flagged for follow-up in seconds."
        />

        <div
          ref={ref}
          className="mx-auto mt-12 grid max-w-4xl items-start gap-5 lg:grid-cols-[1.05fr_0.95fr]"
        >
          <ScrollReveal className="glass relative flex flex-col rounded-card shadow-card">
            <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-accent/60" />
                <span className="text-[10px] font-medium uppercase tracking-eyebrow text-slate">
                  Facebook · Messenger
                </span>
              </div>
              <span className="rounded-full border border-white/[0.08] bg-white/[0.02] px-2 py-0.5 text-[9px] font-medium uppercase tracking-wide text-slate">
                Demo
              </span>
            </div>

            <div className="flex min-h-[300px] flex-col gap-2.5 p-4">
              {/* customer message 1 */}
              <ChatBubble side="in" show={at(1)}>
                Hi, what are your course fees and class timings?
              </ChatBubble>
              <Cue side="in" show={at(1)} label={at(2) ? "Seen" : "Delivered"} />

              {/* AI reply 1 — the typing dots and the reply occupy the SAME
                  reserved space (dots overlay the reply area), so there is no
                  extra gap after the first message and the card never resizes. */}
              <div className="relative flex flex-col items-end">
                <Typing show={step === 2} />
                <ChatBubble side="out" show={at(3)}>
                  Thanks for reaching out. Which course are you interested in, and when are you
                  hoping to start?
                  <span className="mt-1.5 block text-[10px] text-accent-glow">Auto reply sent</span>
                </ChatBubble>
              </div>

              {/* customer message 2 */}
              <ChatBubble side="in" show={at(4)}>
                Python, the weekend batch. Hoping to join this week.
              </ChatBubble>

              {/* AI reply 2 */}
              <ChatBubble side="out" show={at(5)}>
                Great, the weekend batch is a good fit. I&apos;ll have a counsellor confirm your seat
                and timings shortly.
              </ChatBubble>
            </div>
          </ScrollReveal>

          {/* System side panel */}
          <ScrollReveal delay={0.1} className="flex flex-col gap-3">
            <div className="glass rounded-card p-4 shadow-card">
              <div className="mb-2.5 flex items-center justify-between">
                <span className="text-[10px] font-medium uppercase tracking-eyebrow text-slate">
                  CRM · lead captured
                </span>
                <motion.span
                  animate={{ opacity: at(5) ? 1 : 0, scale: at(5) ? 1 : 0.8 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-full bg-gold/12 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gold-glow"
                >
                  ● Hot
                </motion.span>
              </div>
              <dl className="grid grid-cols-2 gap-x-3 gap-y-2.5 text-body-sm">
                {crmRows.map(([k, v, on]) => (
                  <div key={k} className="flex flex-col">
                    <dt className="text-[10px] uppercase tracking-wide text-slate">{k}</dt>
                    <motion.dd
                      animate={{ opacity: on ? 1 : 0.25 }}
                      transition={{ duration: 0.3 }}
                      className="text-silver"
                    >
                      {on ? v : "·"}
                    </motion.dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Owner alert */}
            <motion.div
              animate={{
                opacity: at(6) ? 1 : 0.3,
                borderColor: at(6) ? "rgba(212,160,90,0.35)" : "rgba(255,255,255,0.06)",
              }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-3 rounded-card border bg-panel/50 p-3.5 shadow-inset backdrop-blur-sm"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gold/12 text-sm text-gold-glow">
                !
              </span>
              <div>
                <p className="text-body-sm font-medium text-ivory">Owner alert</p>
                <p className="text-[11px] text-slate">Qualified lead, flagged for the team to call first.</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ opacity: at(7) ? 1 : 0.3 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 gap-2.5 rounded-card border border-white/[0.06] bg-panel/30 p-3.5 sm:grid-cols-4"
            >
              {[
                ["Replied", at(3)],
                ["Captured", at(3)],
                ["Qualified", at(5)],
                ["Follow-up", at(7)],
              ].map(([label, on]) => (
                <div key={String(label)} className="flex flex-col items-center gap-1 text-center">
                  <motion.span
                    animate={{ opacity: on ? 1 : 0.3, scale: on ? 1 : 0.85 }}
                    transition={{ duration: 0.25 }}
                    className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/20 text-[10px] text-accent-glow"
                  >
                    ✓
                  </motion.span>
                  <span className="text-[10px] uppercase tracking-wide text-slate">{label}</span>
                </div>
              ))}
            </motion.div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}

function ChatBubble({
  children,
  side,
  show,
}: {
  children: React.ReactNode;
  side: "in" | "out";
  show: boolean;
}) {
  const isIn = side === "in";
  return (
    <motion.div
      initial={false}
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : 8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`max-w-[82%] rounded-xl px-3.5 py-2.5 text-body-sm ${
        isIn
          ? "self-start rounded-tl-sm bg-panel-light text-silver"
          : "self-end rounded-tr-sm bg-accent/12 text-ivory"
      }`}
      style={{ pointerEvents: show ? "auto" : "none" }}
    >
      {children}
    </motion.div>
  );
}

function Cue({ side, show, label }: { side: "in" | "out"; show: boolean; label: string }) {
  return (
    <motion.span
      animate={{ opacity: show ? 1 : 0 }}
      transition={{ duration: 0.25 }}
      className={`-mt-1 text-[10px] text-slate ${side === "in" ? "self-start pl-1" : "self-end pr-1"}`}
    >
      {label}
    </motion.span>
  );
}

/**
 * Typing indicator. Absolutely positioned over the top of the AI reply's
 * reserved area, so it adds no height and creates no extra gap. Only opacity
 * animates (no mount/unmount, no layout change), so the card never resizes.
 */
function Typing({ show }: { show: boolean }) {
  return (
    <motion.div
      aria-hidden
      animate={{ opacity: show ? 1 : 0 }}
      transition={{ duration: 0.2 }}
      style={{ pointerEvents: "none" }}
      className="absolute right-0 top-0 z-10 flex items-center gap-1.5 rounded-2xl rounded-tr-sm bg-accent/15 px-4 py-2.5"
    >
      {[0, 1, 2].map((d) => (
        <span
          key={d}
          className="h-1.5 w-1.5 animate-node rounded-full bg-accent-glow"
          style={{ animationDelay: `${d * 0.2}s` }}
        />
      ))}
    </motion.div>
  );
}
