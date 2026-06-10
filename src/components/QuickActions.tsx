"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Mark from "./Mark";
import AiHead from "./AiHead";
import { whatsappLink } from "@/lib/site";

/**
 * Visitor-facing floating quick-action button (bottom-right).
 *
 * Branded with the Avenor "A" mark. Opens a premium command panel with the two
 * highest-intent actions (book a system audit, watch the demo) plus a WhatsApp
 * shortcut. Subtle constant animation, respects prefers-reduced-motion, keyboard
 * accessible, mobile-safe.
 */
export default function QuickActions() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Close on outside click + Escape; focus the close button when opening.
  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    function onMouseDown(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div
      ref={wrapRef}
      className="fixed bottom-5 right-5 z-40 flex flex-col items-end sm:bottom-6 sm:right-6"
    >
      {/* Premium quick-action panel */}
      {open && (
        <motion.div
          role="dialog"
          aria-label="Avenor quick actions"
          initial={{ opacity: 0, y: 12, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-3 w-[19rem] max-w-[calc(100vw-2.5rem)] overflow-hidden rounded-card border border-white/[0.08] bg-ink/95 shadow-card backdrop-blur-xl"
        >
          {/* top accent hairline + soft corner glow */}
          <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-accent-grad opacity-70" />
          <span
            aria-hidden
            className="pointer-events-none absolute -right-10 -top-16 h-32 w-32 rounded-full bg-accent/15 blur-3xl"
          />

          {/* header */}
          <div className="relative flex items-start justify-between gap-3 border-b border-white/[0.06] px-4 py-3.5">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-panel-light shadow-inset">
                <Mark className="h-4 w-4 text-ivory" />
              </span>
              <div>
                <p className="font-display text-[13px] font-medium leading-tight text-ivory">
                  How can we help?
                </p>
                <p className="mt-0.5 text-[11px] leading-tight text-slate">Two ways to get started.</p>
              </div>
            </div>
            <button
              ref={closeRef}
              type="button"
              aria-label="Close quick actions"
              onClick={close}
              className="-mr-1 -mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-slate transition-colors hover:bg-white/5 hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden>
                <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* actions */}
          <div className="relative flex flex-col gap-1.5 p-2.5">
            <ActionRow
              href="#contact"
              onClick={close}
              title="Book a system audit"
              desc="Map your inquiry flow in one call."
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]" aria-hidden>
                <circle cx="10.5" cy="10.5" r="6" stroke="currentColor" strokeWidth="1.7" />
                <path d="m15 15 4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
            </ActionRow>

            <ActionRow
              href="#demo"
              onClick={close}
              title="Watch the live demo"
              desc="See one inquiry move through the system."
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]" aria-hidden>
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
                <path d="M10.5 8.5 16 12l-5.5 3.5z" fill="currentColor" />
              </svg>
            </ActionRow>
          </div>

          {/* footer — WhatsApp shortcut */}
          <div className="relative border-t border-white/[0.06] px-4 py-2.5">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-slate transition-colors hover:text-accent-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden>
                <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.02Zm-7.01 15.24h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24a8.2 8.2 0 0 1 8.23 8.25c0 4.54-3.7 8.23-8.24 8.23Z" />
              </svg>
              Prefer chat? Message us on WhatsApp
            </a>
          </div>
        </motion.div>
      )}

      {/* The floating assistant — just the robot head, no box / border / glow.
          A slow head-turn loop keeps it alive without a distracting halo. */}
      <motion.button
        type="button"
        aria-label="Open Avenor assistant"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian"
      >
        {/* soft low-opacity backlight so the head reads as part of the page,
            not pasted on — diffuse, no hard circle/border */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[4.75rem] w-[4.75rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(96,165,250,0.22),rgba(139,92,246,0.12)_45%,transparent_72%)] blur-md"
        />
        <span className={`relative flex items-center justify-center ${open ? "" : "ai-settle"}`}>
          <AiHead className="h-12 w-12" />
        </span>
      </motion.button>
    </div>
  );
}

/** A single premium action row inside the quick-action panel. */
function ActionRow({
  href,
  onClick,
  title,
  desc,
  children,
}: {
  href: string;
  onClick: () => void;
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="group/item flex items-center gap-2.5 rounded-lg border border-white/[0.08] bg-white/[0.02] p-2.5 transition-colors duration-200 hover:border-accent/25 hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-white/[0.08] bg-accent/10 text-accent-glow">
        {children}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[13px] font-medium text-ivory">{title}</span>
        <span className="block truncate text-[11px] text-slate">{desc}</span>
      </span>
      <svg
        viewBox="0 0 20 20"
        fill="none"
        className="h-4 w-4 shrink-0 text-slate transition-transform duration-200 group-hover/item:translate-x-0.5 group-hover/item:text-accent-glow"
        aria-hidden
      >
        <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}
