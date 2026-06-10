import Container from "../Container";
import SectionHeading from "../SectionHeading";
import ScrollReveal from "../ScrollReveal";
import { LinkButton } from "../Button";
import { industries, industriesNote } from "@/lib/content";

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "h-4 w-4",
};

const icons = [
  <svg key="edu" {...iconProps} aria-hidden>
    <path d="M3 9l9-4 9 4-9 4-9-4z" />
    <path d="M7 11v4.5c0 .9 2.2 1.8 5 1.8s5-.9 5-1.8V11" />
    <path d="M21 9v4" />
  </svg>,
  <svg key="clinic" {...iconProps} aria-hidden>
    <rect x="4" y="5" width="16" height="16" rx="2" />
    <path d="M4 9h16M8 3v4M16 3v4" />
    <path d="M12 13v4M10 15h4" />
  </svg>,
  <svg key="gym" {...iconProps} aria-hidden>
    <path d="M6.5 9v6M4 8v8M17.5 9v6M20 8v8M6.5 12h11" />
  </svg>,
  <svg key="shop" {...iconProps} aria-hidden>
    <path d="M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0l-6.8-6.8A2 2 0 0 1 3 12.4V5a2 2 0 0 1 2-2h7.4a2 2 0 0 1 1.4.6l6.8 6.8a2 2 0 0 1 0 2.8z" />
    <path d="M7.5 7.5h.01" />
  </svg>,
  <svg key="estate" {...iconProps} aria-hidden>
    <path d="M4 21V8l8-5 8 5v13" />
    <path d="M9 21v-6h6v6" />
    <path d="M9 10h.01M15 10h.01" />
  </svg>,
  <svg key="local" {...iconProps} aria-hidden>
    <path d="M4 9l1.2-4.4A1 1 0 0 1 6.2 4h11.6a1 1 0 0 1 1 .6L20 9" />
    <path d="M4 9v10a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9" />
    <path d="M4 9h16" />
    <path d="M9 20v-5h6v5" />
  </svg>,
];

export default function Industries() {
  return (
    <section id="industries" className="section-pad scroll-mt-24 bg-ink">
      <Container>
        <SectionHeading
          eyebrow="Use cases"
          title="Built for businesses where every inquiry is worth real money."
          description="If customers message before they buy, speed and follow-up decide who wins. Avenor is built for exactly that moment."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, i) => (
            <ScrollReveal key={industry.name} delay={(i % 3) * 0.08} className="h-full">
              <div className="group premium-card premium-card-hover relative h-full overflow-hidden p-6 hover:border-gold/20 hover:shadow-glow-gold">
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-panel-grad opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-gold/40 to-transparent transition-transform duration-300 group-hover:scale-x-100"
                />
                <span className="relative mb-3.5 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gold/20 bg-gold/[0.06] text-gold-glow transition-colors duration-200 group-hover:border-gold/35">
                  {icons[i]}
                </span>
                <h3 className="relative mb-1 font-display text-[15px] font-semibold text-ivory">
                  {industry.name}
                </h3>
                <p className="relative text-body-sm leading-relaxed text-slate">{industry.blurb}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="mx-auto mt-10 flex max-w-lg flex-col items-center gap-4 text-center">
          <p className="text-body-sm leading-relaxed text-slate">{industriesNote}</p>
          <LinkButton href="#contact" variant="secondary">
            Book a system audit
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
