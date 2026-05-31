import Container from "../Container";
import SectionHeading from "../SectionHeading";
import ScrollReveal from "../ScrollReveal";
import { founders } from "@/lib/content";

/** First two letters of the first name, first letter capitalised (e.g. "Sw"). */
function initials(name: string) {
  const first = name.split(" ")[0] ?? "";
  return first.slice(0, 2).replace(/^./, (c) => c.toUpperCase());
}

/** LinkedIn link — renders only when a URL is provided. */
function LinkedIn({ url, name }: { url?: string; name: string }) {
  if (!url) return null;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${name} on LinkedIn`}
      className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-white/10 text-slate transition-colors duration-200 hover:border-accent/50 hover:text-accent-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
    >
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
        <path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5ZM3 9h4v12H3V9Zm6 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.4 8.65 22 10.5 22 14v7h-4v-6.2c0-1.48-.03-3.38-2.06-3.38-2.06 0-2.38 1.6-2.38 3.27V21H9V9Z" />
      </svg>
    </a>
  );
}

export default function Team() {
  return (
    <section className="bg-ink py-28 md:py-40">
      <Container>
        <SectionHeading
          eyebrow="Core team"
          title="The minds behind the system."
          description="A small, senior team. Every founding client works directly with the three of us — no hand-offs, no juniors."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {founders.map((person, i) => (
            <ScrollReveal key={person.name} delay={i * 0.08} className="h-full">
              <div
                className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-panel/50 p-7 transition-all duration-200 hover:-translate-y-0.5 ${
                  person.featured
                    ? "border-accent/30 shadow-glow hover:border-accent/50"
                    : "border-white/10 hover:border-accent/40"
                }`}
              >
                {person.featured && (
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-iris/15 blur-[60px]"
                />
              )}

              <div className="relative mb-5 flex items-center gap-4">
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border font-display text-base font-bold ${
                    person.featured
                      ? "border-white/10 bg-accent/15 text-accent-glow"
                      : "border-white/10 bg-white/[0.03] text-silver"
                  }`}
                >
                  {initials(person.name)}
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-lg font-semibold text-ivory">{person.name}</h3>
                  <span
                    className={`mt-1 inline-flex rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                      person.featured
                        ? "border-accent/30 bg-accent/[0.06] text-accent-glow"
                        : "border-white/10 bg-white/[0.03] text-slate"
                    }`}
                  >
                    {person.role}
                  </span>
                </div>
              </div>

              <p className="relative flex-1 text-sm leading-relaxed text-slate">{person.focus}</p>

                {person.linkedin && (
                  <div className="relative mt-5">
                    <LinkedIn url={person.linkedin} name={person.name} />
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-[60ch] text-center text-sm leading-relaxed text-slate">
          Three people, one system. The core team that designs, builds, and runs every Avenor setup
          — and the people you actually talk to.
        </p>
      </Container>
    </section>
  );
}
