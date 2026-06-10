"use client";

import Container from "../Container";
import SectionHeading from "../SectionHeading";
import ScrollReveal from "../ScrollReveal";
import { flowSteps } from "@/lib/content";

export default function SystemFlow() {
  return (
    <section id="system" className="section-pad relative scroll-mt-24 overflow-hidden bg-ink">
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/3 h-[360px] w-[360px] rounded-full bg-iris/[0.06] blur-[120px]"
      />
      <Container className="relative">
        <SectionHeading
          eyebrow="How it works"
          title="One system, from first message to follow-up."
          description="Each step hands off to the next automatically, so no inquiry stalls between your ads and your sales team."
        />

        <div className="relative mt-12 grid gap-x-5 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {flowSteps.map((step, i) => (
            <ScrollReveal key={step.step} delay={(i % 3) * 0.1} className="group relative">
              {i < flowSteps.length - 1 && (i + 1) % 3 !== 0 && (
                <span
                  aria-hidden
                  className="absolute right-[-22px] top-8 hidden h-px w-[22px] bg-gradient-to-r from-accent/30 to-transparent lg:block"
                />
              )}

              <div className="premium-card premium-card-hover group-hover:border-accent/20 group-hover:shadow-glow relative h-full overflow-hidden p-6">
                <span className="absolute inset-x-0 top-0 h-px scale-x-0 bg-accent-grad transition-transform duration-300 group-hover:scale-x-100" />

                <div className="mb-4 flex items-center justify-between">
                  <span className="font-display text-[11px] font-semibold tracking-eyebrow text-accent">
                    {step.step}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-accent/30 transition-all duration-300 group-hover:bg-accent-glow group-hover:shadow-[0_0_8px_rgba(107,163,247,0.6)]" />
                </div>

                <h3 className="mb-2 font-display text-base font-semibold text-ivory">{step.title}</h3>
                <p className="text-body-sm leading-relaxed text-slate">{step.description}</p>

                <div className="mt-4 flex items-start gap-2 border-t border-white/[0.06] pt-3.5">
                  <span className="mt-0.5 text-[10px] text-accent-glow">▸</span>
                  <p className="text-body-sm leading-relaxed text-silver">{step.benefit}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
