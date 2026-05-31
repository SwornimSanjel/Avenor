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
        // Avenor — dark / futuristic "AI command center" direction.
        obsidian: "#05060A", // deepest / near-black background
        ink: "#080910", // base background
        // Legacy aliases kept so existing utility names map to the obsidian panels.
        navy: {
          DEFAULT: "#080910",
          deep: "#0B0D14", // obsidian panel surface
        },
        panel: {
          DEFAULT: "#0B0D14",
          light: "#11131C",
        },
        ivory: "#ECEEF4", // silver-white (headings / strong text)
        silver: "#E5E7EB", // soft silver body text
        slate: {
          DEFAULT: "#8A90A3", // muted / secondary
        },
        // Accent system: cold electric blue → midnight violet.
        accent: {
          DEFAULT: "#3B82F6", // electric blue
          glow: "#60A5FA", // brighter blue highlight
        },
        iris: {
          DEFAULT: "#8B5CF6", // midnight violet
          glow: "#A78BFA",
        },
        // Warm secondary — used sparingly for "priority / hot / human attention".
        // Cool blue/violet = the system; warm gold = the moments that matter.
        gold: {
          DEFAULT: "#E0A95F", // refined champagne amber
          glow: "#F2C886",
        },
        line: "rgba(255,255,255,0.08)",
      },
      fontFamily: {
        display: ["var(--font-sora)", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["var(--font-hanken)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "1280px",
      },
      boxShadow: {
        glow: "0 0 80px -22px rgba(59, 130, 246, 0.5)",
        "glow-iris": "0 0 80px -22px rgba(139, 92, 246, 0.45)",
        "glow-gold": "0 18px 60px -30px rgba(224, 169, 95, 0.5)",
        card: "0 26px 70px -30px rgba(0, 0, 0, 0.8)",
      },
      backgroundImage: {
        "accent-grad": "linear-gradient(120deg, #60A5FA 0%, #8B5CF6 100%)",
        "ink-grad": "linear-gradient(180deg, #080910 0%, #05060A 100%)",
        "panel-grad": "linear-gradient(160deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0) 60%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseNode: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.55", transform: "scale(1.2)" },
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
        node: "pulseNode 2.6s ease-in-out infinite",
        sweep: "sweep 3.5s linear infinite",
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
