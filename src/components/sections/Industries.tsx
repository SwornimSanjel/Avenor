import Container from "../Container";
import SectionHeading from "../SectionHeading";
import ScrollReveal from "../ScrollReveal";
import { LinkButton } from "../Button";
import { industries, industriesNote } from "@/lib/content";

/* Simple line icons, in the same order as `industries` in content.ts. */
const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "h-5 w-5",
};

const icons = [
  // Education and training — graduation cap
  <svg key="edu" {...iconProps} aria-hidden>
    <path d="M3 9l9-4 9 4-9 4-9-4z" />
    <path d="M7 11v4.5c0 .9 2.2 1.8 5 1.8s5-.9 5-1.8V11" />
    <path d="M21 9v4" />
  </svg>,
  // Clinics and appointments — calendar
  <svg key="clinic" {...iconProps} aria-hidden>
    <rect x="4" y="5" width="16" height="16" rx="2" />
    <path d="M4 9h16M8 3v4M16 3v4" />
    <path d="M12 13v4M10 15h4" />
  </svg>,
  // Gyms and fitness — dumbbell
  <svg key="gym" {...iconProps} aria-hidden>
    <path d="M6.5 9v6M4 8v8M17.5 9v6M20 8v8M6.5 12h11" />
  </svg>,
  // Showrooms and considered buys — tag
  <svg key="shop" {...iconProps} aria-hidden>
    <path d="M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0l-6.8-6.8A2 2 0 0 1 3 12.4V5a2 2 0 0 1 2-2h7.4a2 2 0 0 1 1.4.6l6.8 6.8a2 2 0 0 1 0 2.8z" />
    <path d="M7.5 7.5h.01" />
  </svg>,
  // Real estate and high-ticket — building
  <svg key="estate" {...iconProps} aria-hidden>
    <path d="M4 21V8l8-5 8 5v13" />
    <path d="M9 21v-6h6v6" />
    <path d="M9 10h.01M15 10h.01" />
  </svg>,
  // Local and service businesses — storefront
  <svg key="local" {...iconProps} aria-hidden>
    <path d="M4 9l1.2-4.4A1 1 0 0 1 6.2 4h11.6a1 1 0 0 1 1 .6L20 9" />
    <path d="M4 9v10a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9" />
    <path d="M4 9h16" />
    <path d="M9 20v-5h6v5" />
  </svg>,
];

export default function Industries() {
  return (
    <section id="industries" className="scroll-mt-24 bg-ink py-28 md:py-40">
      <Container>
        <SectionHeading
          eyebrow="Use cases"
          title="Built for businesses where every inquiry is worth real money."
          description="If customers message before they buy, speed and follow-up decide who wins. Avernik is built for exactly that moment."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, i) => (
            <ScrollReveal key={industry.name} delay={(i % 3) * 0.08} className="h-full">
              <div className="border-sweep group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-panel/40 p-7 transition-all duration-200 hover:-translate-y-1 hover:border-gold/30 hover:shadow-glow-gold">
                {/* subtle surface sheen on hover */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-panel-grad opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
                {/* warm hairline that draws in on hover */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-gold/60 to-transparent transition-transform duration-300 group-hover:scale-x-100"
                />
                <span className="relative mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-gold/25 bg-gold/[0.08] text-gold-glow transition-colors duration-200 group-hover:border-gold/45">
                  {icons[i]}
                </span>
                <h3 className="relative mb-1.5 font-display text-base font-semibold text-ivory">
                  {industry.name}
                </h3>
                <p className="relative text-sm leading-relaxed text-slate">{industry.blurb}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="mx-auto mt-12 flex max-w-2xl flex-col items-center gap-5 text-center">
          <p className="text-sm leading-relaxed text-slate">{industriesNote}</p>
          <LinkButton href="#contact" variant="secondary">
            Book a system audit
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
