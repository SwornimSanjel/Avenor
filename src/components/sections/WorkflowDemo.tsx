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
      className="relative scroll-mt-24 overflow-hidden bg-[radial-gradient(125%_120%_at_50%_-10%,#0f1838_0%,#0a1024_42%,#06070f_100%)] py-28 md:py-40"
    >
      {/* the one brighter, electric-blue "spotlight" section of the site */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-[0.22]" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-accent/12 blur-[150px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
      />
      <Container className="relative">
        <SectionHeading
          eyebrow="Live demo"
          title="Watch one inquiry move through the system."
          description="An illustrative example, not a real client chat. One message gets captured, answered, qualified, and flagged for follow-up in seconds."
        />

        <div
          ref={ref}
          className="mx-auto mt-14 grid max-w-5xl items-start gap-6 lg:grid-cols-[1.05fr_0.95fr]"
        >
          {/* Chat panel */}
          <ScrollReveal className="glass relative flex flex-col rounded-2xl shadow-card">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-slate">
                  Facebook · Messenger
                </span>
              </div>
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-slate">
                Demo
              </span>
            </div>

            <div className="flex min-h-[340px] flex-col gap-3 p-5">
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
          <ScrollReveal delay={0.1} className="flex flex-col gap-4">
            {/* CRM card */}
            <div className="glass rounded-2xl p-5 shadow-card">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate">
                  CRM · lead captured
                </span>
                <motion.span
                  animate={{ opacity: at(5) ? 1 : 0, scale: at(5) ? 1 : 0.8 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-full bg-gold/15 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-gold-glow"
                >
                  ● Hot
                </motion.span>
              </div>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
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
                borderColor: at(6) ? "rgba(224,169,95,0.5)" : "rgba(255,255,255,0.1)",
              }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-3 rounded-2xl border bg-panel/60 p-4 backdrop-blur-sm"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold/15 text-gold-glow">
                !
              </span>
              <div>
                <p className="text-sm font-semibold text-ivory">Owner alert</p>
                <p className="text-xs text-slate">Qualified lead, flagged for the team to call first.</p>
              </div>
            </motion.div>

            {/* Report tick */}
            <motion.div
              animate={{ opacity: at(7) ? 1 : 0.3 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 gap-3 rounded-2xl border border-white/10 bg-panel/40 p-4 sm:grid-cols-4"
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
      className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm ${
        isIn
          ? "self-start rounded-tl-sm bg-panel-light text-silver"
          : "self-end rounded-tr-sm bg-accent/15 text-ivory"
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
