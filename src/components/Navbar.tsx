"use client";

import { type MouseEvent, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Logo from "./Logo";
import { LinkButton } from "./Button";
import { nav } from "@/lib/site";

const sectionIds = nav.map((item) => item.href.slice(1));

export default function Navbar() {
  const reduce = useReducedMotion();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("demo");
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

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) return;

    const updateActiveSection = () => {
      const activationLine = window.innerHeight * 0.68;
      const current =
        sections.find((section) => {
          const rect = section.getBoundingClientRect();
          return rect.top <= activationLine && rect.bottom >= activationLine;
        }) ??
        sections
          .filter((section) => section.getBoundingClientRect().top <= activationLine)
          .at(-1) ??
        sections[0];

      setActiveSection(current.id);
    };

    const observer = new IntersectionObserver(updateActiveSection, {
      rootMargin: "-20% 0px -30% 0px",
      threshold: 0,
    });

    sections.forEach((section) => observer.observe(section));
    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  // Keep the bar shown when the mobile menu is open, or under reduced motion.
  const isHidden = hidden && !open && !reduce;

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;

    const id = href.slice(1);
    const section = document.getElementById(id);
    if (!section) return;

    event.preventDefault();
    setActiveSection(id);
    setOpen(false);
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/*
        The slide (transform) and the backdrop-blur live on the SAME element.
        backdrop-filter is broken by a *transformed ancestor*, so the glass must
        not sit inside a separately-transformed wrapper — otherwise the blur
        never samples the page and the bar reads as a solid block.
      */}
      <motion.header
        // On first load, enter from above using the SAME hidden→visible motion
        // the scroll behavior already uses (transition below). Skipped under
        // reduced motion, where the bar simply renders in place.
        initial={reduce ? false : { y: "-150%", opacity: 0 }}
        animate={{ y: isHidden ? "-150%" : 0, opacity: isHidden ? 0 : 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className={`fixed left-4 right-4 top-3 z-50 mx-auto flex max-w-6xl items-center justify-between gap-6 rounded-full border py-2 pl-5 pr-2 backdrop-blur-xl transition-colors duration-300 sm:left-6 sm:right-6 sm:top-4 sm:pl-7 sm:pr-2.5 ${
          scrolled
            ? "border-[#34488a]/45 bg-[#0a1330]/94 shadow-[0_22px_70px_-28px_rgba(0,0,0,0.98),inset_0_1px_0_rgba(130,160,255,0.10)]"
            : "border-[#34488a]/40 bg-[#0a1330]/85 shadow-[0_16px_54px_-26px_rgba(0,0,0,0.96),inset_0_1px_0_rgba(130,160,255,0.10)]"
        }`}
      >
        {/* Left: logo */}
        <Logo tone="ivory" />

        {/* Center: low-opacity nav links that brighten on hover */}
        <nav className="hidden items-center gap-2 md:flex">
          {nav.map((item) => {
            const id = item.href.slice(1);
            const isActive = activeSection === id;

            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => handleNavClick(event, item.href)}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink ${
                  isActive
                    ? "border border-[#4359a0]/50 bg-[#16224d]/90 text-white shadow-[inset_0_1px_0_rgba(150,175,255,0.16)]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right: primary CTA with an up-right (NE) arrow */}
        <div className="hidden md:block">
          <LinkButton href="#contact">
            Book an Audit
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
        <div className="fixed left-4 right-4 top-[4.75rem] z-50 mx-auto max-w-6xl rounded-2xl border border-[#34488a]/40 bg-[#0a1330]/95 p-3 backdrop-blur-2xl backdrop-saturate-150 md:hidden">
          <div className="flex flex-col gap-1">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => handleNavClick(event, item.href)}
                className="rounded-lg px-3 py-3 text-base font-medium text-ivory/85 transition-colors hover:bg-white/5 hover:text-accent-glow"
              >
                {item.label}
              </a>
            ))}
            <LinkButton href="#contact" className="mt-2 w-full">
              Book an Audit
            </LinkButton>
          </div>
        </div>
      )}
    </>
  );
}
