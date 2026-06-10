"use client";

import Image from "next/image";
import Container from "../Container";
import SectionHeading from "../SectionHeading";
import ScrollReveal from "../ScrollReveal";
import LogoMarquee from "../LogoMarquee";
import CountUp from "../CountUp";
import Mark from "../Mark";

/* ── Block A · Capability targets — DESIGN GOALS, not measured client results.
   Figures count up from 0 → target when scrolled into view. ─ */
type Capability = { lead?: string; to: number; suffix: string; sub: string };
const capabilities: Capability[] = [
  { lead: "Under ", to: 60, suffix: "s", sub: "Target first-reply time, day or night." },
  { to: 100, suffix: "%", sub: "Every inquiry captured to your CRM automatically." },
  { to: 24, suffix: " / 7", sub: "Coverage while your team is offline or asleep." },
];

/* Demo systems Avenor has built (illustrative — not client data). */
const demoShots = [
  {
    // TODO: add real demo screenshots at these paths (public/proof/…)
    src: "/proof/demo-crm.png",
    alt: "Demo CRM sheet built by Avenor showing captured and qualified inquiries",
    label: "Demo CRM sheet",
  },
  {
    src: "/proof/demo-bot-education.png",
    alt: "Demo AI assistant conversation built by Avenor for an education business",
    label: "Demo bot conversation",
  },
];

/*
 * Testimonials are intentionally EMPTY. Avenor is pre-revenue and onboarding
 * founding clients, so there are no real quotes yet. Drop a real, permissioned
 * testimonial into this array and the grid renders automatically — zero layout
 * work. Never invent quotes, names, or results.
 */
type Testimonial = { quote: string; name: string; role: string };
const testimonials: Testimonial[] = []; // TODO: add real, permissioned testimonials only

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="premium-card p-6">
      <blockquote className="text-body-sm leading-relaxed text-ivory/90">&ldquo;{t.quote}&rdquo;</blockquote>
      <figcaption className="mt-3 text-body-sm">
        <span className="font-medium text-ivory">{t.name}</span>
        <span className="text-slate"> · {t.role}</span>
      </figcaption>
    </figure>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/[0.08] bg-white/[0.02] px-2 py-0.5 text-[9px] font-medium uppercase tracking-wide text-slate">
      {children}
    </span>
  );
}

/*
 * Framed screenshot slot. The transparent placeholder PNG keeps the framed
 * label visible until a real (opaque) screenshot is dropped in at the same
 * path — so adding the real image later needs zero layout changes.
 */
function DemoShot({ src, alt, label }: { src: string; alt: string; label: string }) {
  return (
    <figure>
      <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-white/[0.06] bg-ink">
        <div className="absolute inset-0 grid place-items-center px-4 text-center">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-slate/50">{label}</span>
        </div>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 640px) 45vw, 90vw"
          className="object-cover"
        />
        <span className="absolute left-3 top-3 z-10">
          <Badge>Demo</Badge>
        </span>
      </div>
      <figcaption className="mt-3 text-xs leading-relaxed text-slate">
        Demo system built by Avenor — illustrative.
      </figcaption>
    </figure>
  );
}

export default function Proof() {
  return (
    <section id="proof" className="section-pad scroll-mt-24 bg-navy-deep">
      <Container>
        <SectionHeading
          eyebrow="Proof"
          title="Built and working."
          description="We are onboarding founding clients now. So instead of borrowed logos or invented numbers, here is exactly what the system does, what we have built, and what we promise."
        />

        {/* ── Block A — Capability proof ─────────────────────────────────── */}
        <ScrollReveal className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-2">
          <h3 className="font-display text-base font-medium text-ivory">
            What the system is built to do
          </h3>
          <Badge>Targets, not results</Badge>
        </ScrollReveal>
        <p className="mt-2 max-w-xl text-body-sm leading-relaxed text-slate">
          These are the design targets every Avenor system is built and tuned to hit — not averaged
          client outcomes.
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {capabilities.map((c, i) => (
            <ScrollReveal key={c.sub} delay={i * 0.08} className="h-full">
              <div className="premium-card premium-card-hover h-full p-6 hover:border-accent/20">
                <p className="font-display text-2xl font-semibold text-accent-glow sm:text-[1.75rem]">
                  {c.lead}
                  <CountUp to={c.to} suffix={c.suffix} duration={1200} />
                </p>
                <p className="mt-2 text-body-sm leading-relaxed text-slate">{c.sub}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {demoShots.map((s, i) => (
            <ScrollReveal key={s.src} delay={i * 0.08}>
              <DemoShot src={s.src} alt={s.alt} label={s.label} />
            </ScrollReveal>
          ))}
        </div>

        {/* ── Block B — Our promise (collective; the team is introduced once,
            in the Team section, so this stays a brand-level commitment) ──── */}
        <ScrollReveal className="relative mt-5 overflow-hidden rounded-card border border-accent/20 bg-panel-light p-6 shadow-glow sm:p-7">
          <span
            aria-hidden
            className="pointer-events-none absolute -right-10 -top-12 h-28 w-28 rounded-full bg-iris/10 blur-[60px]"
          />
          <div className="relative flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-panel-light shadow-inset">
              <Mark className="h-4 w-4 text-ivory" />
            </span>
            <p className="text-[10px] font-medium uppercase tracking-eyebrow text-accent">
              Our promise
            </p>
          </div>

          <p className="relative mt-3.5 max-w-xl text-body-sm leading-relaxed text-ivory/90">
            We guarantee the parts we control: your system delivered and live, fast replies to
            inbound inquiries, every lead tracked, and clear reporting you can see. We do not promise
            guaranteed sales — that depends on your offer, your pricing, and how your team follows
            up. We commit to the system; you stay in control of the close.
          </p>

          <div className="relative mt-4 flex flex-wrap gap-1.5">
            {["System delivery", "Response speed", "Lead tracking", "Reporting"].map((g) => (
              <span
                key={g}
                className="rounded-full border border-accent/20 bg-accent/[0.05] px-2.5 py-0.5 text-[11px] text-ivory/90"
              >
                ✓ {g}
              </span>
            ))}
            <span className="rounded-full border border-white/[0.08] bg-white/[0.02] px-2.5 py-0.5 text-[11px] text-slate">
              ✕ Guaranteed sales
            </span>
          </div>

          <p className="relative mt-4 text-body-sm font-medium text-slate">— The Avenor team</p>
        </ScrollReveal>

        <div className="mt-5 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <ScrollReveal className="premium-card p-6">
            <h3 className="font-display text-base font-medium text-ivory">
              Founding clients, this quarter
            </h3>
            <p className="mt-2 text-body-sm leading-relaxed text-slate">
              We are onboarding a limited number of founding clients this quarter with tailored setup
              support, in exchange for a case study. You get hands-on attention from the people who
              build the system; we earn a real, permissioned result to show.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="premium-card flex flex-col p-6">
            <div className="mb-2.5 flex items-center justify-between gap-3">
              <h3 className="font-display text-base font-medium text-ivory">Case studies</h3>
              <Badge>Coming soon</Badge>
            </div>
            <p className="text-body-sm leading-relaxed text-slate">
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
      <div className="mt-16 border-y border-white/[0.06] py-10 md:mt-20 md:py-12">
        <p className="mb-7 text-center text-[10px] font-medium uppercase tracking-eyebrow text-slate/70">
          Built on technology you already trust
        </p>
        <LogoMarquee />
      </div>
    </section>
  );
}
