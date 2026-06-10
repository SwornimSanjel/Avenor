import Container from "./Container";
import Logo from "./Logo";
import { LinkButton } from "./Button";
import { site, nav } from "@/lib/site";
import { legalNote } from "@/lib/content";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-white/[0.06] bg-ink">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent"
      />

      <div className="border-b border-white/[0.06]">
        <Container className="flex flex-col items-center gap-4 py-14 text-center md:py-16">
          <h2 className="max-w-lg font-display text-display-sm font-semibold text-ivory">
            Stop losing inquiries to slow replies.
          </h2>
          <p className="max-w-sm text-body-sm text-slate">
            Book a system audit — we&apos;ll map how inquiries enter your business and where speed
            and follow-up can improve.
          </p>
          <LinkButton href="#contact">Book a system audit</LinkButton>
        </Container>
      </div>

      <div className="border-b border-white/[0.06] bg-navy-deep/30">
        <Container className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-2 py-4 text-center">
          {site.flow.map((step, i) => (
            <span key={step} className="flex items-center gap-2.5">
              <span className="text-[11px] font-medium uppercase tracking-eyebrow text-silver/90">
                {step}
              </span>
              {i < site.flow.length - 1 && <span className="text-accent/60">→</span>}
            </span>
          ))}
        </Container>
      </div>

      <Container className="grid gap-10 py-12 md:grid-cols-[1.7fr_1fr_1fr] md:py-14">
        <div className="flex flex-col items-start gap-3">
          <Logo tone="ivory" />
          <p className="max-w-xs text-body-sm leading-relaxed text-slate">{site.tagline}</p>
          <p className="text-[10px] uppercase tracking-eyebrow text-slate/70">{site.category}</p>
          <p className="text-body-sm text-slate">{site.contact.location}</p>
        </div>

        <div className="flex flex-col gap-2.5">
          <h3 className="text-[11px] font-medium uppercase tracking-eyebrow text-silver/70">Explore</h3>
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-body-sm text-slate transition-colors hover:text-ivory"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-2.5">
          <h3 className="text-[11px] font-medium uppercase tracking-eyebrow text-silver/70">
            Get in touch
          </h3>
          <a
            href={`mailto:${site.contact.email}`}
            className="text-body-sm text-slate transition-colors hover:text-ivory"
          >
            {site.contact.email}
          </a>
          <a href="#contact" className="text-body-sm text-slate transition-colors hover:text-ivory">
            Book a system audit
          </a>
          <a href="#faq" className="text-body-sm text-slate transition-colors hover:text-ivory">
            Questions &amp; answers
          </a>
        </div>
      </Container>

      <div className="border-t border-white/[0.06]">
        <Container className="py-4">
          <p className="mx-auto max-w-2xl text-center text-[11px] leading-relaxed text-slate/70">
            {legalNote}
          </p>
        </Container>
      </div>

      <div className="border-t border-white/[0.06]">
        <Container className="flex flex-col items-center justify-between gap-1.5 py-5 text-center text-[11px] text-slate/60 sm:flex-row sm:text-left">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p>AI inquiry systems for growth-focused businesses.</p>
        </Container>
      </div>
    </footer>
  );
}
