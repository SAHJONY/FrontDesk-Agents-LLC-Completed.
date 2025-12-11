import type { Config } from 'tailwindcss'

const config: Config = {
  // THIS IS THE LINE YOU NEED TO CORRECTLY CONFIGURE:
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ... rest of your theme
    },
  },
  plugins: [],
}
export default config
