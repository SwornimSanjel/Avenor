"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Logo from "./Logo";
import { LinkButton } from "./Button";
import { nav } from "@/lib/site";

export default function Navbar() {
  const reduce = useReducedMotion();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      if (y < 80) {
        setHidden(false);
        lastY.current = y;
        return;
      }
      const delta = y - lastY.current;
      if (delta > 5) {
        setHidden(true);
        lastY.current = y;
      } else if (delta < -5) {
        setHidden(false);
        lastY.current = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHidden = hidden && !open && !reduce;

  return (
    <>
      <motion.header
        initial={reduce ? false : { y: "-150%", opacity: 0 }}
        animate={{ y: isHidden ? "-150%" : 0, opacity: isHidden ? 0 : 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className={`fixed left-4 right-4 top-3 z-50 mx-auto flex max-w-container items-center justify-between gap-4 rounded-full border py-2 pl-4 pr-2 backdrop-blur-xl backdrop-saturate-150 transition-colors duration-300 sm:left-6 sm:right-6 sm:pl-5 sm:pr-2 lg:gap-6 lg:py-2.5 lg:pl-6 ${
          scrolled
            ? "border-white/[0.08] bg-ink/70 shadow-[0_12px_40px_-16px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.06)]"
            : "border-white/[0.05] bg-ink/40 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.04)]"
        }`}
      >
        <Logo tone="ivory" className="shrink-0" />

        {/* Full nav only when there is room for logo + 6 links + CTA (~1100px) */}
        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-5 nav:flex xl:gap-7">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-sm font-medium text-silver/80 transition-colors duration-200 hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden shrink-0 nav:block">
          <LinkButton href="#contact">
            Book a system audit
            <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5" aria-hidden>
              <path
                d="M6 14 14 6M8 6h6v6"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </LinkButton>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/[0.1] text-ivory transition-colors duration-200 hover:border-white/[0.18] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink nav:hidden"
        >
          <span className="sr-only">Menu</span>
          <div className="flex flex-col gap-1.5">
            <span className={`h-0.5 w-5 bg-ivory transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`h-0.5 w-5 bg-ivory transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-5 bg-ivory transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </div>
        </button>
      </motion.header>

      {open && (
        <div className="fixed left-4 right-4 top-[4.25rem] z-50 mx-auto max-w-container rounded-panel border border-white/[0.08] bg-ink/90 p-2 shadow-card backdrop-blur-xl backdrop-saturate-150 nav:hidden">
          <div className="flex flex-col gap-0.5">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3.5 py-3 text-base font-medium text-silver transition-colors hover:bg-white/[0.04] hover:text-ivory"
              >
                {item.label}
              </a>
            ))}
            <LinkButton href="#contact" className="mt-2 w-full">
              Book a system audit
            </LinkButton>
          </div>
        </div>
      )}
    </>
  );
}
