import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#04050A",
        ink: "#07080F",
        navy: {
          DEFAULT: "#07080F",
          deep: "#0A0C12",
        },
        panel: {
          DEFAULT: "#0C0E16",
          light: "#10131C",
        },
        ivory: "#F0F1F5",
        silver: "#C8CBD6",
        slate: {
          DEFAULT: "#7B8194",
        },
        accent: {
          DEFAULT: "#4B8EF5",
          glow: "#6BA3F7",
        },
        iris: {
          DEFAULT: "#7C5CE8",
          glow: "#9B7EF0",
        },
        gold: {
          DEFAULT: "#D4A05A",
          glow: "#E8BC7A",
        },
        line: "rgba(255,255,255,0.06)",
      },
      fontFamily: {
        display: ["var(--font-sora)", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["var(--font-hanken)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["3.25rem", { lineHeight: "1.08", letterSpacing: "-0.025em" }],
        "display-lg": ["2.75rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-md": ["2.25rem", { lineHeight: "1.12", letterSpacing: "-0.015em" }],
        "display-sm": ["1.625rem", { lineHeight: "1.25", letterSpacing: "-0.01em" }],
        body: ["1rem", { lineHeight: "1.7" }],
        "body-sm": ["0.875rem", { lineHeight: "1.65" }],
      },
      maxWidth: {
        container: "1280px",
      },
      screens: {
        nav: "1100px",
      },
      borderRadius: {
        card: "0.875rem",
        panel: "1rem",
      },
      boxShadow: {
        glow: "0 0 60px -24px rgba(75, 142, 245, 0.35)",
        "glow-iris": "0 0 60px -24px rgba(124, 92, 232, 0.3)",
        "glow-gold": "0 0 40px -20px rgba(212, 160, 90, 0.35)",
        card: "0 20px 50px -24px rgba(0, 0, 0, 0.65)",
        "card-hover": "0 24px 56px -20px rgba(0, 0, 0, 0.55)",
        inset: "inset 0 1px 0 0 rgba(255, 255, 255, 0.05)",
        "inset-strong": "inset 0 1px 0 0 rgba(255, 255, 255, 0.08)",
      },
      backgroundImage: {
        "accent-grad": "linear-gradient(135deg, #6BA3F7 0%, #7C5CE8 100%)",
        "ink-grad": "linear-gradient(180deg, #07080F 0%, #04050A 100%)",
        "panel-grad": "linear-gradient(160deg, rgba(255,255,255,0.035) 0%, rgba(255,255,255,0) 55%)",
        "hero-grad": "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(75,142,245,0.08) 0%, transparent 70%)",
      },
      letterSpacing: {
        eyebrow: "0.22em",
        wide: "0.14em",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseNode: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.6", transform: "scale(1.15)" },
        },
        sweep: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(120%)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        node: "pulseNode 2.8s ease-in-out infinite",
        sweep: "sweep 3.5s linear infinite",
        marquee: "marquee 35s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
