import type { Config } from "tailwindcss";

const config: Config = {
  // Ensure the engine scans all files for autonomous class generation
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    // Essential for your Revenue Dashboard components (Tremor integration)
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Elite Global Branding & Sovereign Palette
        brand: {
          dark: "#010204",
          cyan: "#06b6d4",
          slate: "#64748b",
          emergency: "#ef4444", // High-urgency red for critical system alerts
        }
      },
      // Autonomous Font Mapping
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
        // Dynamic fallback for RTL markets (MENA Region Sovereignty)
        arabic: ['Noto Sans Arabic', 'sans-serif'],
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        marquee2: 'marquee2 30s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        // Scanning effect for Shadow Scraper logs in the Command Center
        'scan': 'scan 2s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marquee2: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scan: {
          '0%': { top: '-10%' },
          '100%': { top: '110%' },
        }
      },
    },
  },
  plugins: [
    // Requirement for Worldwide Universal markets (Arabic, Hebrew, etc.)
    // Provides logical properties like ps (padding-start) and me (margin-end)
    require('tailwindcss-rtl'),
    // Form styling for Shadow Node activation pages
    require('@tailwindcss/forms'),
  ],
};

export default config;
