import Image from "next/image";
import Container from "../Container";
import SectionHeading from "../SectionHeading";
import ScrollReveal from "../ScrollReveal";
import { founders } from "@/lib/content";

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

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {founders.map((person, i) => (
            <ScrollReveal key={person.name} delay={i * 0.08} className="h-full">
              <div
                className={`group relative flex h-full transform-gpu flex-col overflow-hidden rounded-2xl bg-panel shadow-card ring-1 transition-all duration-300 ease-out hover:-translate-y-1.5 ${
                  person.featured
                    ? "ring-accent/45 hover:ring-accent/70"
                    : "ring-white/[0.06] hover:ring-accent/35"
                }`}
              >
                {/* Photo — melts seamlessly into the card */}
                <div className="relative aspect-[3/4] w-full transform-gpu overflow-hidden [backface-visibility:hidden]">
                  <Image
                    src={person.photo}
                    alt={`${person.name}, ${person.role} at Avenor`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="transform-gpu object-cover transition-transform duration-700 ease-out will-change-transform [backface-visibility:hidden] group-hover:scale-[1.05]"
                    style={{ objectPosition: person.photoPosition ?? "center" }}
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-panel via-panel/70 to-transparent"
                  />
                </div>

                {/* Info — pulled up 1px to guarantee no seam line under the photo */}
                <div className="relative z-10 -mt-px flex flex-1 flex-col bg-panel px-6 pb-6 pt-3">
                  <h3 className="font-display text-xl font-semibold text-ivory">{person.name}</h3>
                  <div className="mt-2.5 flex items-center gap-2.5">
                    <span
                      aria-hidden
                      className="h-px w-6 shrink-0 bg-accent transition-all duration-300 ease-out group-hover:w-10"
                    />
                    <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-glow">
                      {person.role}
                    </span>
                  </div>

                  {person.linkedin && (
                    <div className="mt-5">
                      <LinkedIn url={person.linkedin} name={person.name} />
                    </div>
                  )}
                </div>
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
