import Container from "../Container";
import SectionHeading from "../SectionHeading";
import ScrollReveal from "../ScrollReveal";
import { serviceGroups } from "@/lib/content";

export default function Services() {
  return (
    <section id="services" className="relative scroll-mt-24 bg-obsidian py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="Capabilities"
          title="What we set up and run for you"
          description="The concrete pieces we build and manage, grouped by the job each one does."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {serviceGroups.map((group, i) => (
            <ScrollReveal key={group.title} delay={(i % 3) * 0.08} className="h-full">
              <div className="group flex h-full flex-col rounded-2xl border border-white/10 bg-panel/50 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-glow">
                <div className="mb-4 flex items-center gap-3">
                  <span className="font-display text-sm font-bold tracking-[0.22em] text-accent">
                    {group.phase}
                  </span>
                  <span className="h-px flex-1 bg-white/10" />
                </div>
                <h3 className="font-display text-lg font-semibold text-ivory">{group.title}</h3>
                <p className="mt-1.5 text-sm text-slate">{group.blurb}</p>

                <ul className="mt-5 flex flex-1 flex-col gap-4">
                  {group.services.map((s) => (
                    <li key={s.name} className="flex flex-col gap-0.5">
                      <span className="flex items-center gap-2 text-sm font-medium text-silver">
                        <span className="h-1 w-1 rounded-full bg-accent-glow" />
                        {s.name}
                      </span>
                      <span className="pl-3 text-xs leading-relaxed text-slate">{s.why}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
