import Container from "./Container";
import Logo from "./Logo";
import { LinkButton } from "./Button";
import { site, nav } from "@/lib/site";
import { legalNote } from "@/lib/content";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-white/10 bg-ink">
      {/* faint accent hairline along the very top */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
      />

      {/* Closing CTA band */}
      <div className="border-b border-white/10">
        <Container className="flex flex-col items-center gap-5 py-16 text-center md:py-20">
          <h2 className="max-w-2xl font-display text-2xl font-bold leading-tight text-ivory sm:text-3xl">
            Stop losing inquiries to slow replies.
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-slate">
            Book a system audit — we&apos;ll map how inquiries enter your business and where speed
            and follow-up can improve.
          </p>
          <LinkButton href="#contact">Book a system audit</LinkButton>
        </Container>
      </div>

      {/* Flow strip */}
      <div className="border-b border-white/10 bg-navy-deep/40">
        <Container className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 py-5 text-center">
          {site.flow.map((step, i) => (
            <span key={step} className="flex items-center gap-3">
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-ivory/90">
                {step}
              </span>
              {i < site.flow.length - 1 && <span className="text-accent">→</span>}
            </span>
          ))}
        </Container>
      </div>

      {/* Columns */}
      <Container className="grid gap-10 py-14 md:grid-cols-[1.7fr_1fr_1fr] md:py-16">
        <div className="flex flex-col items-start gap-4">
          <Logo tone="ivory" />
          <p className="max-w-xs text-sm leading-relaxed text-slate">{site.tagline}</p>
          <p className="text-xs uppercase tracking-[0.2em] text-slate/80">{site.category}</p>
          <p className="text-sm text-slate">{site.contact.location}</p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-ivory/70">Explore</h3>
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-slate transition-colors hover:text-accent-glow"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-ivory/70">
            Get in touch
          </h3>
          <a
            href={`mailto:${site.contact.email}`}
            className="text-sm text-slate transition-colors hover:text-accent-glow"
          >
            {site.contact.email}
          </a>
          <a href="#contact" className="text-sm text-slate transition-colors hover:text-accent-glow">
            Book a system audit
          </a>
          <a href="#faq" className="text-sm text-slate transition-colors hover:text-accent-glow">
            Questions &amp; answers
          </a>
          {/*
            Social links intentionally omitted until real profiles exist.
            Add the Instagram / Facebook handles here once they are live.
          */}
        </div>
      </Container>

      {/* Legal / trust disclaimer */}
      <div className="border-t border-white/10">
        <Container className="py-5">
          <p className="mx-auto max-w-3xl text-center text-xs leading-relaxed text-slate/80">
            {legalNote}
          </p>
        </Container>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-2 py-6 text-center text-xs text-slate sm:flex-row sm:text-left">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p className="text-slate/70">AI inquiry systems for growth-focused businesses.</p>
        </Container>
      </div>
    </footer>
  );
}
