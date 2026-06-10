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

const withAvernik = [
  "Every inquiry is captured instantly",
  "Buyers get a reply in seconds",
  "Real buyers are qualified and scored",
  "Hot leads are flagged for follow-up first",
  "Every step is tracked and reported",
];

// Capability chips — moved here from the hero to keep the hero lean.
const capabilities = [
  "First reply in under 60s",
  "Web, SMS, Facebook & Instagram",
  "Synced to your CRM",
];

export default function Problem() {
  return (
    <section className="bg-navy-deep py-28 md:py-40">
      <Container>
        <SectionHeading
          eyebrow="Where growth leaks"
          title="The deal is usually lost before sales ever sees it."
          description="Customers message at night, on weekends, and long after you have closed. If the first reply takes hours, the fastest competitor has already won the conversation."
        />

        {/* Capability chips */}
        <div className="mt-10 flex flex-wrap justify-center gap-2.5">
          {capabilities.map((cap) => (
            <span
              key={cap}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-panel/50 px-3.5 py-2 text-[13px] text-silver transition-colors duration-200 hover:border-accent/40"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent-glow" />
              {cap}
            </span>
          ))}
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {/* Hover lift/glow lives on the INNER div — ScrollReveal leaves an
              inline transform on its own node, which would override a hover
              translate placed on the same element. */}
          <ScrollReveal className="h-full">
            <div className="h-full rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.03] hover:shadow-[0_28px_60px_-34px_rgba(0,0,0,0.85),0_0_44px_-30px_rgba(255,255,255,0.18)]">
              <h3 className="mb-6 flex items-center gap-2 font-display text-lg font-semibold text-silver">
                <span className="text-slate">Without a system</span>
              </h3>
              <ul className="flex flex-col gap-3">
                {without.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate">
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-slate/30">
                      <span className="h-1 w-1 rounded-full bg-slate/60" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="h-full">
            <div className="h-full rounded-2xl border border-accent/25 bg-accent/[0.06] p-8 shadow-glow transition-all duration-300 hover:-translate-y-1 hover:border-accent/45 hover:shadow-[0_0_90px_-18px_rgba(59,130,246,0.6)]">
              <h3 className="mb-6 flex items-center gap-2 font-display text-lg font-semibold text-ivory">
                <span className="text-accent-glow">With Avernik</span>
              </h3>
              <ul className="flex flex-col gap-3">
                {withAvernik.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-ivory/90">
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent-glow">
                      <svg viewBox="0 0 20 20" fill="none" className="h-2.5 w-2.5" aria-hidden>
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

        <p className="mx-auto mt-10 max-w-2xl text-center font-display text-lg font-medium text-ivory sm:text-xl">
          Avernik gives your team a clear path{" "}
          <span className="text-gradient">from inquiry to conversation</span>.
        </p>
      </Container>
    </section>
  );
}
