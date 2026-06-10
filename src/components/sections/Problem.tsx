import Container from "../Container";
import SectionHeading from "../SectionHeading";
import ScrollReveal from "../ScrollReveal";

const without = [
  "Inquiries sit unseen in the inbox",
  "Staff reply only when they remember",
  "Serious buyers look like casual questions",
  "Follow-up depends on memory",
  "Owners cannot see what happened",
];

const withAvenor = [
  "Every inquiry is captured instantly",
  "Buyers get a reply in seconds",
  "Real buyers are qualified and scored",
  "Hot leads are flagged for follow-up first",
  "Every step is tracked and reported",
];

export default function Problem() {
  return (
    <section className="section-pad bg-navy-deep">
      <Container>
        <SectionHeading
          eyebrow="Where growth leaks"
          title="The deal is usually lost before sales ever sees it."
          description="Customers message at night, on weekends, and long after you have closed. If the first reply takes hours, the fastest competitor has already won the conversation."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <ScrollReveal className="h-full">
            <div className="premium-card premium-card-hover h-full p-7">
              <h3 className="mb-5 font-display text-base font-medium text-silver">
                Without a system
              </h3>
              <ul className="flex flex-col gap-2.5">
                {without.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-body-sm text-slate">
                    <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border border-slate/25">
                      <span className="h-0.5 w-0.5 rounded-full bg-slate/50" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="h-full">
            <div className="h-full rounded-card border border-accent/20 bg-accent/[0.04] p-7 shadow-inset transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-glow">
              <h3 className="mb-5 font-display text-base font-medium text-accent-glow">
                With Avenor
              </h3>
              <ul className="flex flex-col gap-2.5">
                {withAvenor.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-body-sm text-ivory/90">
                    <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-accent/12 text-accent-glow">
                      <svg viewBox="0 0 20 20" fill="none" className="h-2 w-2" aria-hidden>
                        <path
                          d="M4 10.5 8 14 16 6"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>

        <p className="mx-auto mt-8 max-w-xl text-center font-display text-base font-medium text-ivory sm:text-lg">
          Avenor gives your team a clear path{" "}
          <span className="text-gradient">from inquiry to conversation</span>.
        </p>
      </Container>
    </section>
  );
}
