"use client";

/**
 * Infinite right-to-left marquee of the tools the system is built on.
 *
 * The list is rendered twice back-to-back and the track is translated by -50%
 * on a linear infinite loop, so it scrolls seamlessly in one direction with no
 * snap. Edge fade masks soften both sides. Honors prefers-reduced-motion
 * (`motion-reduce:animate-none`) — the names simply sit static.
 */
const tools = [
  "OpenAI",
  "Meta",
  "Google",
  "WhatsApp Business",
  "n8n",
  "Make",
  "Notion",
  "Python",
  "Google Sheets",
];

export default function LogoMarquee() {
  return (
    <div
      className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
    >
      <div className="flex w-max animate-marquee items-center motion-reduce:animate-none">
        {[0, 1].map((copy) =>
          tools.map((name) => (
            <span
              key={`${copy}-${name}`}
              aria-hidden={copy === 1}
              className="flex shrink-0 items-center gap-3 px-8 font-display text-2xl font-semibold tracking-tight text-slate/55 transition-colors duration-200 hover:text-silver sm:px-12 sm:text-3xl"
            >
              <span aria-hidden className="h-2 w-2 rounded-full bg-slate/40" />
              {name}
            </span>
          )),
        )}
      </div>
    </div>
  );
}
