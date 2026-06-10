"use client";

import Container from "../Container";
import SectionHeading from "../SectionHeading";
import ScrollReveal from "../ScrollReveal";
import LogoMarquee from "../LogoMarquee";
import CountUp from "../CountUp";
import Mark from "../Mark";
import BrowserFrame from "../BrowserFrame";
import GridPulse from "../GridPulse";

/* ── Block A · Capability targets — DESIGN GOALS, not measured client results.
   Figures count up from 0 → target when scrolled into view. ─ */
type Capability = { lead?: string; to: number; suffix: string; sub: string };
const capabilities: Capability[] = [
  { lead: "Under ", to: 60, suffix: "s", sub: "Target first-reply time, day or night." },
  { to: 100, suffix: "%", sub: "Every inquiry captured to your CRM automatically." },
  { to: 24, suffix: " / 7", sub: "Coverage while your team is offline or asleep." },
];

/* Selected work — real clients, shown as framed screenshots (no metrics).
   Drop the real screenshots at the src paths below. */
const selectedWork = [
  {
    name: "Sports Center Nepal",
    sector: "Sports & fitness, Kathmandu",
    url: "https://sportscenter.com.np/",
    domain: "sportscenter.com.np",
    src: "/proof/client-sportscenter.webp",
    alt: "Sports Center Nepal website homepage",
  },
  {
    name: "Mountain Routes",
    sector: "Adventure travel, Nepal",
    url: "https://mountainroutes.com/",
    domain: "mountainroutes.com",
    src: "/proof/client-mountainroutes.webp",
    alt: "Mountain Routes website homepage",
  },
];

/*
 * Testimonials are intentionally EMPTY. Avernik is pre-revenue and onboarding
 * founding clients, so there are no real quotes yet. Drop a real, permissioned
 * testimonial into this array and the grid renders automatically — zero layout
 * work. Never invent quotes, names, or results.
 */
type Testimonial = { quote: string; name: string; role: string };
const testimonials: Testimonial[] = []; // TODO: add real, permissioned testimonials only

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="rounded-2xl border border-white/10 bg-panel/50 p-7">
      <blockquote className="text-sm leading-relaxed text-ivory/90">&ldquo;{t.quote}&rdquo;</blockquote>
      <figcaption className="mt-4 text-sm">
        <span className="font-semibold text-ivory">{t.name}</span>
        <span className="text-slate"> · {t.role}</span>
      </figcaption>
    </figure>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-slate">
      {children}
    </span>
  );
}

export default function Proof() {
  return (
    <section id="proof" className="relative scroll-mt-24 overflow-hidden bg-navy-deep py-28 md:py-40">
      <GridPulse className="opacity-40" />
      <Container className="relative">
        <SectionHeading
          eyebrow="Proof"
          title="Built and working."
          description="We're early but we're not theoretical. Here's the work we've shipped and the standards every Avernik system is built to."
        />

        {/* ── Block A — Capability proof ─────────────────────────────────── */}
        <ScrollReveal className="mt-14 flex flex-wrap items-center gap-x-3 gap-y-2">
          <h3 className="font-display text-lg font-semibold text-ivory">
            What the system is built to do
          </h3>
          <Badge>Targets, not results</Badge>
        </ScrollReveal>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate">
          These are the design targets every Avernik system is built and tuned to hit — not averaged
          client outcomes.
        </p>

        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {capabilities.map((c, i) => (
            <ScrollReveal key={c.sub} delay={i * 0.08} className="h-full">
              <div className="border-sweep h-full rounded-2xl border border-white/10 bg-panel/50 p-7 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40">
                <p className="font-display text-3xl font-bold text-accent-glow sm:text-[2rem]">
                  {c.lead}
                  <CountUp to={c.to} suffix={c.suffix} duration={1200} />
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate">{c.sub}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* ── Block B — Our promise (collective; the team is introduced once,
            in the Team section, so this stays a brand-level commitment) ──── */}
        <ScrollReveal className="relative mt-6 overflow-hidden rounded-2xl border border-accent/30 bg-panel-light p-7 shadow-glow sm:p-9">
          <span
            aria-hidden
            className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full bg-iris/15 blur-[70px]"
          />
          <div className="relative flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-panel-light shadow-card">
              <Mark className="h-5 w-5 text-ivory" />
            </span>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Our promise
            </p>
          </div>

          <p className="relative mt-4 max-w-2xl text-sm leading-relaxed text-ivory/90">
            We guarantee the parts we control: your system delivered and live, fast replies to
            inbound inquiries, every lead tracked, and clear reporting you can see. We do not promise
            guaranteed sales — that depends on your offer, your pricing, and how your team follows
            up. We commit to the system; you stay in control of the close.
          </p>

          <div className="relative mt-5 flex flex-wrap gap-2">
            {["System delivery", "Response speed", "Lead tracking", "Reporting"].map((g) => (
              <span
                key={g}
                className="rounded-full border border-accent/30 bg-accent/[0.06] px-3 py-1 text-xs text-ivory/90"
              >
                ✓ {g}
              </span>
            ))}
            <span className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-xs text-slate">
              ✕ Guaranteed sales
            </span>
          </div>

          <p className="relative mt-5 text-sm font-medium text-slate">— The Avernik team</p>
        </ScrollReveal>

        {/* ── Selected work — real clients, framed screenshots, no metrics ── */}
        <ScrollReveal className="mt-14 flex flex-wrap items-center gap-x-3 gap-y-2">
          <h3 className="font-display text-lg font-semibold text-ivory">Selected work</h3>
          <Badge>Live sites</Badge>
        </ScrollReveal>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {selectedWork.map((c, i) => (
            <ScrollReveal key={c.url} delay={i * 0.08}>
              <BrowserFrame url={c.domain} src={c.src} alt={c.alt} />
              <div className="mt-4 flex items-start justify-between gap-3">
                <div>
                  <h4 className="font-display text-lg font-semibold text-ivory">{c.name}</h4>
                  <p className="mt-0.5 text-sm text-slate">{c.sector}</p>
                </div>
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 text-xs text-silver underline-offset-4 transition-colors hover:text-accent-glow hover:underline"
                >
                  Visit site ↗
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* ── Block C — Founding-client frame ────────────────────────────── */}
        <div className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <ScrollReveal className="rounded-2xl border border-white/10 bg-panel/50 p-7">
            <h3 className="font-display text-lg font-semibold text-ivory">
              Founding clients, this quarter
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate">
              We are onboarding a limited number of founding clients this quarter with tailored setup
              support, in exchange for a case study. You get hands-on attention from the people who
              build the system; we earn a real, permissioned result to show.
            </p>
          </ScrollReveal>

          <ScrollReveal
            delay={0.1}
            className="flex flex-col rounded-2xl border border-white/10 bg-panel/50 p-7"
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="font-display text-lg font-semibold text-ivory">Case studies</h3>
              <Badge>Coming soon</Badge>
            </div>
            <p className="text-sm leading-relaxed text-slate">
              Real, permissioned client results will appear here as our founding clients complete
              their first cycles. We will never publish numbers we cannot stand behind.
            </p>
          </ScrollReveal>
        </div>

        {/* Testimonials — renders only once a real, permissioned quote exists. */}
        {testimonials.length > 0 && (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <TestimonialCard key={t.name} t={t} />
            ))}
          </div>
        )}
      </Container>

      {/* Technology band — full-bleed, edge-to-edge marquee with top/bottom hairlines only */}
      <div className="mt-20 border-y border-white/10 py-12 md:mt-28 md:py-14">
        <p className="mb-9 text-center text-xs font-medium uppercase tracking-[0.3em] text-slate/80">
          Built on technology you already trust
        </p>
        <LogoMarquee />
      </div>
    </section>
  );
}
