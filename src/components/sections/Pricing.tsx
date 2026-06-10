"use client";

import Container from "../Container";
import SectionHeading from "../SectionHeading";
import ScrollReveal from "../ScrollReveal";
import { LinkButton } from "../Button";
import { packages, packagesNote } from "@/lib/content";

export default function Pricing() {
  return (
    <section id="pricing" className="relative scroll-mt-24 overflow-hidden bg-obsidian py-28 md:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/4 h-[360px] w-[620px] -translate-x-1/2 rounded-full bg-accent/10 blur-[140px]"
      />
      <Container className="relative">
        <SectionHeading
          eyebrow="Packages"
          title="Three depths of the same system"
          description="Each package builds on the last. The right fit is recommended after a system audit, not guessed from a price tag."
        />

        <div className="mt-16 grid items-stretch gap-6 lg:grid-cols-3">
          {packages.map((pkg, i) => (
            <ScrollReveal key={pkg.id} delay={i * 0.1} className="h-full">
              <div
                className={`border-sweep relative flex h-full flex-col rounded-2xl border p-8 transition-all duration-200 hover:-translate-y-1 ${
                  pkg.featured
                    ? "border-accent/50 bg-panel-light shadow-glow hover:border-accent/70 lg:z-10 lg:scale-[1.04]"
                    : "border-white/10 bg-panel/40 hover:border-accent/40"
                }`}
              >
                {pkg.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent-grad px-4 py-1 text-xs font-semibold uppercase tracking-wide text-ivory shadow-glow">
                    Recommended
                  </span>
                )}

                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                  {pkg.tier}
                </span>
                <h3 className="mt-2 font-display text-2xl font-bold text-ivory">{pkg.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{pkg.summary}</p>

                <div className="mt-6 flex flex-col gap-2 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-xs">
                  <div className="flex gap-2">
                    <span className="shrink-0 text-slate">Best for:</span>
                    <span className="text-silver">{pkg.whoFor}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="shrink-0 text-slate">System depth:</span>
                    <span className="text-silver">{pkg.depth}</span>
                  </div>
                </div>

                <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate">
                  Key inclusions
                </p>
                <ul className="mt-3 flex flex-1 flex-col gap-3">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-silver">
                      <span className="mt-0.5 text-accent-glow">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7">
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

        <p className="mx-auto mt-12 max-w-2xl rounded-xl border border-white/10 bg-panel/40 p-5 text-center text-sm leading-relaxed text-slate">
          {packagesNote}
        </p>
      </Container>
    </section>
  );
}
