"use client";

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Container from "../Container";
import ScrollReveal from "../ScrollReveal";
import { ActionButton } from "../Button";
import Turnstile from "../Turnstile";
import { site, whatsappLink } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

const improveOptions = [
  "Faster inquiry replies",
  "Better lead qualification",
  "Follow-up tracking",
  "Missed leads after hours",
  "AI automation for operations",
  "Not sure yet",
];

const sourceOptions = [
  "Website forms",
  "Facebook / Instagram",
  "WhatsApp",
  "Phone calls",
  "Paid ads",
  "Multiple channels",
  "Not sure yet",
];

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const form = e.currentTarget;
    const fd = new FormData(form);
    const data: Record<string, FormDataEntryValue> = Object.fromEntries(fd.entries());
    // Map the Turnstile field (present only when bot protection is enabled).
    const cf = fd.get("cf-turnstile-response");
    if (cf) data.turnstileToken = cf;

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.message ?? "Something went wrong.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  const fieldClass =
    "w-full rounded-lg border border-white/[0.08] bg-white/[0.02] px-3.5 py-2.5 text-body-sm text-ivory shadow-inset placeholder:text-slate/60 transition-colors hover:border-white/[0.14] focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/40";
  const labelClass = "mb-1 block text-[10px] font-medium uppercase tracking-eyebrow text-slate";

  return (
    <section id="contact" className="section-pad scroll-mt-24 bg-navy-deep">
      <Container className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
        <ScrollReveal className="flex flex-col gap-5">
          <span className="eyebrow">System audit</span>
          <h2 className="font-display text-display-sm font-semibold text-ivory md:text-display-md lg:text-display-lg">
            See where your inquiries are leaking.
          </h2>
          <p className="text-body leading-relaxed text-slate">
            In one short call, we map how inquiries enter your business, how fast they get handled,
            and where automation can improve response, qualification, and follow-up.
          </p>

          <div className="mt-1 flex flex-col gap-2.5 rounded-card border border-white/[0.06] bg-ink/30 p-5 shadow-inset">
            <p className="text-[10px] uppercase tracking-eyebrow text-slate">Founding-client slots</p>
            <p className="text-body-sm leading-relaxed text-ivory/85">
              We are onboarding a limited number of early businesses with tailored setup support
              while we build our portfolio. If your team depends on inquiries, follow-up, and lead
              quality, this audit will show where the system can improve.
            </p>
          </div>

          <p className="flex items-start gap-2 text-body-sm leading-relaxed text-slate">
            <span className="mt-0.5 text-accent-glow">▸</span>
            <span>
              <span className="text-silver">Best fit:</span> businesses that receive inquiries
              through calls, forms, DMs, ads, or WhatsApp, and want a clearer system for response,
              qualification, and follow-up.
            </span>
          </p>

          <div className="mt-1 flex flex-col gap-1.5 text-body-sm text-slate">
            <a href={`mailto:${site.contact.email}`} className="hover:text-accent-glow">
              {site.contact.email}
            </a>
            <span>{site.contact.location}</span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          {status === "success" ? (
            <div className="flex h-full flex-col items-center justify-center rounded-card border border-accent/20 bg-accent/[0.04] p-8 text-center shadow-inset">
              <div className="mb-3.5 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-xl text-ink">
                ✓
              </div>
              <h3 className="font-display text-lg font-semibold text-ivory">Request received</h3>
              <p className="mt-2 max-w-sm text-body-sm text-slate">
                Thanks, we will review your inquiry flow and get back to you shortly. Keep an eye on
                your inbox.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-6 text-sm font-medium text-accent-glow hover:underline"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-card border border-white/[0.06] bg-ink/30 p-5 shadow-inset sm:p-6"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className={labelClass}>
                    Your name
                  </label>
                  <input id="name" name="name" required className={fieldClass} placeholder="Full name" />
                </div>
                <div>
                  <label htmlFor="business" className={labelClass}>
                    Business name
                  </label>
                  <input
                    id="business"
                    name="business"
                    required
                    className={fieldClass}
                    placeholder="Your business"
                  />
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>
                    Work email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className={fieldClass}
                    placeholder="you@business.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className={labelClass}>
                    Phone / WhatsApp
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    className={fieldClass}
                    placeholder="Best contact number"
                  />
                </div>
              </div>

              <div className="mt-4 grid gap-4">
                <SelectField
                  id="improve"
                  label="What do you want to improve first?"
                  placeholder="Select one"
                  options={improveOptions}
                />
                <SelectField
                  id="source"
                  label="Where do most inquiries come from today?"
                  placeholder="Select one"
                  options={sourceOptions}
                />
              </div>

              <div className="mt-4">
                <label htmlFor="message" className={labelClass}>
                  What happens after someone inquires?
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className={fieldClass}
                  placeholder="Briefly describe your current reply/follow-up process. Example: who replies, how fast, and where leads are tracked."
                />
              </div>

              {/* Honeypot field for basic spam protection */}
              <input
                type="text"
                name="company_website"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden
              />

              {/* Optional bot protection — renders only when configured */}
              <Turnstile />

              {status === "error" && (
                <div
                  role="alert"
                  className="mt-4 rounded-lg border border-red-400/30 bg-red-400/[0.06] p-3 text-sm"
                >
                  <p className="text-red-400">{error}</p>
                  <p className="mt-1 text-slate">
                    Trouble sending? You can{" "}
                    <a
                      href={whatsappLink("Hi Avenor, the audit form didn't go through. I'd like a system audit.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-accent-glow hover:underline"
                    >
                      message us on WhatsApp
                    </a>{" "}
                    or email{" "}
                    <a href={`mailto:${site.contact.email}`} className="font-medium text-accent-glow hover:underline">
                      {site.contact.email}
                    </a>
                    .
                  </p>
                </div>
              )}

              <ActionButton type="submit" className="mt-5 w-full" disabled={status === "submitting"}>
                {status === "submitting" ? "Sending…" : "Book my system audit"}
              </ActionButton>

              <p className="mt-3 text-center text-[11px] text-slate/80">
                We only use this information to prepare for your audit. Sensitive business details can
                be discussed on the call.
              </p>
            </form>
          )}
        </ScrollReveal>
      </Container>
    </section>
  );
}

/**
 * Fully custom, on-brand dropdown. A native <select> only lets us style the
 * closed box; this renders the option list ourselves so the open menu matches
 * the dark theme. The chosen value is mirrored into a hidden input so the
 * existing FormData submission still captures the field with no API change.
 */
function SelectField({
  id,
  label,
  placeholder,
  options,
}: {
  id: string;
  label: string;
  placeholder: string;
  options: string[];
}) {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(-1);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Close on outside click and on Escape.
  useEffect(() => {
    if (!open) return;
    function onMouseDown(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: globalThis.KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function openMenu() {
    setHighlight(value ? Math.max(options.indexOf(value), 0) : 0);
    setOpen(true);
  }

  function select(i: number) {
    const opt = options[i];
    if (opt == null) return;
    setValue(opt);
    setOpen(false);
  }

  function onTriggerKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) return openMenu();
      setHighlight((h) => Math.min(h + 1, options.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) return openMenu();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter" || e.key === " ") {
      if (open && highlight >= 0) {
        e.preventDefault();
        select(highlight);
      } else if (!open) {
        e.preventDefault();
        openMenu();
      }
    }
  }

  return (
    <div ref={wrapRef} className="relative">
      <label htmlFor={id} className="mb-1 block text-[10px] font-medium uppercase tracking-eyebrow text-slate">
        {label}
      </label>

      <button
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={onTriggerKeyDown}
        className={`relative w-full rounded-lg border border-white/[0.08] bg-white/[0.02] px-3.5 py-2.5 pr-10 text-left text-body-sm shadow-inset transition-colors hover:border-white/[0.14] focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/40 ${
          value ? "text-ivory" : "text-slate/70"
        }`}
      >
        {value || placeholder}
        <svg
          aria-hidden
          viewBox="0 0 20 20"
          fill="none"
          className={`pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        >
          <path
            d="M5.5 8 10 12.5 14.5 8"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Mirror the value for the existing FormData submission */}
      <input type="hidden" name={id} value={value} />

      {/* Conditionally rendered (no AnimatePresence) so the panel always unmounts
          on close. Entrance animation only; closing is instant and reliable. */}
      {open && (
        <motion.div
          role="listbox"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="absolute left-0 right-0 top-full z-30 mt-1.5 max-h-64 overflow-y-auto rounded-lg border border-white/[0.08] bg-ink p-1 shadow-card"
        >
            {options.map((opt, i) => {
              const selected = opt === value;
              return (
                <button
                  key={opt}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onMouseEnter={() => setHighlight(i)}
                  onClick={() => select(i)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-white/5 ${
                    selected ? "text-accent-glow" : "text-silver"
                  } ${highlight === i ? "bg-white/5" : ""}`}
                >
                  <span>{opt}</span>
                  {selected && (
                    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 text-accent-glow" aria-hidden>
                      <path
                        d="M4 10.5 8 14.5 16 6"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              );
            })}
        </motion.div>
      )}
    </div>
  );
}
