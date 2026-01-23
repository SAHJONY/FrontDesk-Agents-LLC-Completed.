// tailwind.config.ts
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
        brand: {
          dark: "#010204",
          cyan: "#06b6d4",
          slate: "#64748b",
          emergency: "#ef4444",
        },
        tremor: {
          brand: {
            faint: colors.blue[50],
            muted: colors.blue[200],
            subtle: colors.blue[400],
            default: "#06b6d4",
            emphasis: colors.blue[700],
            inverted: colors.white,
          },
        },
      },
      fontFamily: {
        arabic: ["Noto Sans Arabic", "sans-serif"],
      },
    },
  },
  plugins: [rtl, forms],
};

export default config;
