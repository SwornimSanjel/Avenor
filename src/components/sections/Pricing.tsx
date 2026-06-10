"use client";

import Container from "../Container";
import SectionHeading from "../SectionHeading";
import ScrollReveal from "../ScrollReveal";
import { LinkButton } from "../Button";
import { packages, packagesNote } from "@/lib/content";

export default function Pricing() {
  return (
    <section id="pricing" className="section-pad relative scroll-mt-24 overflow-hidden bg-obsidian">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/4 h-[300px] w-[520px] -translate-x-1/2 rounded-full bg-accent/[0.06] blur-[120px]"
      />
      <Container className="relative">
        <SectionHeading
          eyebrow="Packages"
          title="Three depths of the same system"
          description="Each package builds on the last. The right fit is recommended after a system audit, not guessed from a price tag."
        />

        <div className="mt-12 grid items-stretch gap-5 lg:grid-cols-3">
          {packages.map((pkg, i) => (
            <ScrollReveal key={pkg.id} delay={i * 0.1} className="h-full">
              <div
                className={`relative flex h-full flex-col rounded-card border p-7 transition-all duration-300 hover:-translate-y-0.5 ${
                  pkg.featured
                    ? "border-accent/30 bg-panel-light shadow-glow hover:border-accent/40 lg:z-10 lg:scale-[1.02]"
                    : "premium-card premium-card-hover"
                }`}
              >
                {pkg.featured && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-accent-grad px-3.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-ivory shadow-glow">
                    Recommended
                  </span>
                )}

                <span className="text-[10px] font-medium uppercase tracking-eyebrow text-accent">
                  {pkg.tier}
                </span>
                <h3 className="mt-1.5 font-display text-xl font-semibold text-ivory">{pkg.name}</h3>
                <p className="mt-2 text-body-sm leading-relaxed text-slate">{pkg.summary}</p>

                <div className="mt-5 flex flex-col gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] p-3.5 text-body-sm shadow-inset">
                  <div className="flex gap-2">
                    <span className="shrink-0 text-slate">Best for:</span>
                    <span className="text-silver">{pkg.whoFor}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="shrink-0 text-slate">System depth:</span>
                    <span className="text-silver">{pkg.depth}</span>
                  </div>
                </div>

                <p className="mt-5 text-[10px] font-medium uppercase tracking-eyebrow text-slate">
                  Key inclusions
                </p>
                <ul className="mt-2.5 flex flex-1 flex-col gap-2.5">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-body-sm text-silver">
                      <span className="mt-0.5 text-accent-glow">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  <LinkButton
                    href="#contact"
                    variant={pkg.featured ? "primary" : "secondary"}
                    className="w-full"
                  >
                    See if it&apos;s a fit
                  </LinkButton>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-lg rounded-card border border-white/[0.06] bg-white/[0.02] p-4 text-center text-body-sm leading-relaxed text-slate shadow-inset">
          {packagesNote}
        </p>
      </Container>
    </section>
  );
}
