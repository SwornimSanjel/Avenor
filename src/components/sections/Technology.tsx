import Container from "../Container";
import LogoMarquee from "../LogoMarquee";

/**
 * Quiet credibility band — an infinite marquee of the tools the system is built
 * on. (Not currently mounted in the page; kept in sync with the live band in
 * Proof.tsx for consistency.)
 */
export default function Technology() {
  return (
    <section className="border-y border-white/5 bg-obsidian py-12 md:py-14">
      <Container>
        <p className="mb-7 text-center text-xs font-medium uppercase tracking-[0.3em] text-slate/80">
          Built on technology you already trust
        </p>
        <LogoMarquee />
      </Container>
    </section>
  );
}
