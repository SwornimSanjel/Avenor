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
    <section className="bg-navy-deep py-28 md:py-40">
      <Container>
        <SectionHeading
          eyebrow="Where growth leaks"
          title="The deal is usually lost before sales ever sees it."
          description="Customers message at night, on weekends, and long after you have closed. If the first reply takes hours, the fastest competitor has already won the conversation."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <ScrollReveal className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
            <h3 className="mb-6 flex items-center gap-2 font-display text-lg font-semibold text-silver">
              <span className="text-slate">Without a system</span>
            </h3>
            <ul className="flex flex-col gap-3">
              {without.map((item) => (
                <li key={item} className="flex items-center gap-3 text-slate">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate/50" />
                  {item}
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="rounded-2xl border border-accent/25 bg-accent/[0.06] p-8 shadow-glow">
            <h3 className="mb-6 flex items-center gap-2 font-display text-lg font-semibold text-ivory">
              <span className="text-accent-glow">With Avenor</span>
            </h3>
            <ul className="flex flex-col gap-3">
              {withAvenor.map((item) => (
                <li key={item} className="flex items-center gap-3 text-ivory/90">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-glow" />
                  {item}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center font-display text-lg font-medium text-ivory sm:text-xl">
          Avenor gives your team a clear path{" "}
          <span className="text-gradient">from inquiry to conversation</span>.
        </p>
      </Container>
    </section>
  );
}
