import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";
import rtl from "tailwindcss-rtl";
import forms from "@tailwindcss/forms";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core Corporate Identity
        obsidian: '#050505',
        'cyber-cyan': '#06b6d4',
        'silver-frost': '#94a3b8',
        brand: {
          dark: "#010204",
          cyan: "#06b6d4",
          slate: "#64748b",
          emergency: "#ef4444",
        },
        // Tremor Analytics Integration
        tremor: {
          brand: {
            faint: colors.blue[50],
            muted: colors.blue[200],
            subtle: colors.blue[400],
            default: "#06b6d4", // Unified with Cyber-Cyan
            emphasis: colors.blue[700],
            inverted: colors.white,
          },
          background: {
            muted: "#050505", // Mapped to Obsidian
            subtle: colors.gray[800],
            default: "#010204", // Mapped to Brand Dark
            emphasis: colors.gray[300],
          },
          border: {
            default: "#1e293b",
          },
          ring: {
            default: "#1e293b",
          },
          content: {
            subtle: "#94a3b8", // Mapped to Silver Frost
            default: colors.gray[300],
            emphasis: colors.white,
            strong: colors.white,
            inverted: colors.black,
          },
        },
      },
      backgroundImage: {
        'hero-pattern': "url('/images/hero-corporate.jpg')",
        'ai-mesh': "url('/images/ai-network.jpg')",
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui'],
        arabic: ["Noto Sans Arabic", "sans-serif"],
      },
    },
  },
  plugins: [rtl, forms],
};

export default config;
