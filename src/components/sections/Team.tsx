import Container from "../Container";
import SectionHeading from "../SectionHeading";
import ScrollReveal from "../ScrollReveal";
import { founders } from "@/lib/content";

function initials(name: string) {
  const first = name.split(" ")[0] ?? "";
  return first.slice(0, 2).replace(/^./, (c) => c.toUpperCase());
}

function LinkedIn({ url, name }: { url?: string; name: string }) {
  if (!url) return null;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${name} on LinkedIn`}
      className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-white/[0.08] text-slate transition-colors duration-200 hover:border-accent/30 hover:text-accent-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
    >
      <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor" aria-hidden>
        <path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5ZM3 9h4v12H3V9Zm6 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.4 8.65 22 10.5 22 14v7h-4v-6.2c0-1.48-.03-3.38-2.06-3.38-2.06 0-2.38 1.6-2.38 3.27V21H9V9Z" />
      </svg>
    </a>
  );
}

export default function Team() {
  return (
    <section className="section-pad bg-ink">
      <Container>
        <SectionHeading
          eyebrow="Core team"
          title="The minds behind the system."
          description="A small, senior team. Every founding client works directly with the three of us — no hand-offs, no juniors."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {founders.map((person, i) => (
            <ScrollReveal key={person.name} delay={i * 0.08} className="h-full">
              <div
                className={`group relative flex h-full flex-col overflow-hidden rounded-card border p-6 transition-all duration-300 hover:-translate-y-0.5 ${
                  person.featured
                    ? "border-accent/20 bg-accent/[0.03] shadow-glow hover:border-accent/30"
                    : "premium-card premium-card-hover"
                }`}
              >
                {person.featured && (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-iris/10 blur-[50px]"
                  />
                )}

                <div className="relative mb-4 flex items-center gap-3.5">
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border font-display text-sm font-semibold ${
                      person.featured
                        ? "border-accent/20 bg-accent/10 text-accent-glow"
                        : "border-white/[0.08] bg-white/[0.02] text-silver"
                    }`}
                  >
                    {initials(person.name)}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-base font-semibold text-ivory">{person.name}</h3>
                    <span
                      className={`mt-0.5 inline-flex rounded-full border px-2 py-0.5 text-[9px] font-medium uppercase tracking-wide ${
                        person.featured
                          ? "border-accent/20 bg-accent/[0.05] text-accent-glow"
                          : "border-white/[0.08] bg-white/[0.02] text-slate"
                      }`}
                    >
                      {person.role}
                    </span>
                  </div>
                </div>

                <p className="relative flex-1 text-body-sm leading-relaxed text-slate">{person.focus}</p>

                {person.linkedin && (
                  <div className="relative mt-4">
                    <LinkedIn url={person.linkedin} name={person.name} />
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-[52ch] text-center text-body-sm leading-relaxed text-slate">
          Three people, one system. The core team that designs, builds, and runs every Avenor setup
          — and the people you actually talk to.
        </p>
      </Container>
    </section>
  );
}
