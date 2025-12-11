import type { Config } from 'tailwindcss'

const config: Config = {
  // CRITICAL FIX: Ensure these paths cover all your source files
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}', // This path is crucial for Next.js 14 App Router
  ],
  theme: {
    extend: {
      // ... rest of your theme
    },
  },
  plugins: [],
}
export default config
