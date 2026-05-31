"use client";

import Container from "../Container";
import SectionHeading from "../SectionHeading";
import ScrollReveal from "../ScrollReveal";
import { flowSteps } from "@/lib/content";

export default function SystemFlow() {
  return (
    <section id="system" className="relative scroll-mt-24 overflow-hidden bg-ink py-28 md:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/3 h-[420px] w-[420px] rounded-full bg-iris/10 blur-[150px]"
      />
      <Container className="relative">
        <SectionHeading
          eyebrow="How it works"
          title="One system, from first message to follow-up."
          description="Each step hands off to the next automatically, so no inquiry stalls between your ads and your sales team."
        />

        <div className="relative mt-16 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {flowSteps.map((step, i) => (
            <ScrollReveal key={step.step} delay={(i % 3) * 0.1} className="group relative">
              {/* connector to next step (desktop) */}
              {i < flowSteps.length - 1 && (i + 1) % 3 !== 0 && (
                <span
                  aria-hidden
                  className="absolute right-[-26px] top-9 hidden h-px w-[26px] bg-gradient-to-r from-accent/50 to-transparent lg:block"
                />
              )}

              <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-panel/50 p-7 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-accent/40 group-hover:shadow-glow">
                {/* top accent bar */}
                <span className="absolute inset-x-0 top-0 h-px scale-x-0 bg-accent-grad transition-transform duration-300 group-hover:scale-x-100" />

                <div className="mb-5 flex items-center justify-between">
                  <span className="font-display text-sm font-bold tracking-[0.22em] text-accent">
                    {step.step}
                  </span>
                  <span className="h-2 w-2 rounded-full bg-accent/40 transition-all duration-300 group-hover:bg-accent-glow group-hover:shadow-[0_0_12px_rgba(96,165,250,0.8)]" />
                </div>

                <h3 className="mb-2.5 font-display text-xl font-semibold text-ivory">{step.title}</h3>
                <p className="text-sm leading-relaxed text-slate">{step.description}</p>

                <div className="mt-5 flex items-start gap-2 border-t border-white/10 pt-4">
                  <span className="mt-0.5 text-accent-glow">▸</span>
                  <p className="text-sm leading-relaxed text-silver">{step.benefit}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
