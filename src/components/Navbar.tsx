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
        setHidden(false); // always visible near the top
        lastY.current = y;
        return;
      }
      // Accumulate within a small deadzone so SLOW scrolling still flips the
      // bar (we only move the reference once movement passes the deadzone).
      const delta = y - lastY.current;
      if (delta > 5) {
        setHidden(true); // scrolled down → hide
        lastY.current = y;
      } else if (delta < -5) {
        setHidden(false); // scrolled up → show
        lastY.current = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Keep the bar shown when the mobile menu is open, or under reduced motion.
  const isHidden = hidden && !open && !reduce;

  return (
    <>
      {/*
        The slide (transform) and the backdrop-blur live on the SAME element.
        backdrop-filter is broken by a *transformed ancestor*, so the glass must
        not sit inside a separately-transformed wrapper — otherwise the blur
        never samples the page and the bar reads as a solid block.
      */}
      <motion.header
        initial={false}
        animate={{ y: isHidden ? "-150%" : 0, opacity: isHidden ? 0 : 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className={`fixed left-4 right-4 top-3 z-50 mx-auto flex max-w-6xl items-center justify-between gap-6 rounded-full border py-2 pl-5 pr-2 backdrop-blur-2xl backdrop-saturate-150 transition-colors duration-300 sm:left-6 sm:right-6 sm:top-4 sm:pl-7 sm:pr-2.5 ${
          scrolled
            ? "border-white/[0.1] bg-ink/55 shadow-[0_18px_50px_-22px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.09)]"
            : "border-white/[0.07] bg-ink/30 shadow-[0_10px_34px_-16px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.07)]"
        }`}
      >
        {/* Left: logo */}
        <Logo tone="ivory" />

        {/* Center: low-opacity nav links that brighten on hover */}
        <nav className="hidden items-center gap-7 md:flex lg:gap-9">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ivory/55 transition-colors duration-200 hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right: primary CTA with an up-right (NE) arrow */}
        <div className="hidden md:block">
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

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-ivory transition-colors duration-200 hover:border-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink md:hidden"
        >
          <span className="sr-only">Menu</span>
          <div className="flex flex-col gap-1.5">
            <span className={`h-0.5 w-5 bg-ivory transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`h-0.5 w-5 bg-ivory transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-5 bg-ivory transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </div>
        </button>
      </motion.header>

      {/* Mobile menu — its own fixed element (no transformed ancestor) so its
          glass blur also works correctly. */}
      {open && (
        <div className="fixed left-4 right-4 top-[4.75rem] z-50 mx-auto max-w-6xl rounded-2xl border border-white/10 bg-ink/80 p-3 backdrop-blur-2xl backdrop-saturate-150 md:hidden">
          <div className="flex flex-col gap-1">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-ivory/85 transition-colors hover:bg-white/5 hover:text-accent-glow"
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
