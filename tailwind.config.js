/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Ensure all your file paths are listed here
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // 🌟 CRITICAL: Define the custom 'primary' colors here
      colors: {
        primary: {
          50: '#F5F9FF',   // Very light blue/white
          100: '#E0E7FF',
          200: '#C3D0FF',
          300: '#93C5FD',   // Bright blue highlight (e.g., text-primary-300)
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',   // Main button/CTA blue (e.g., bg-primary-600)
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#0A1930',   // Deep Corporate Blue/Grey (e.g., bg-primary-900 for Navbar)
        },
        // Optionally, you can define your secondary accent colors here as well
      },
      // Optional: Add custom shadow for the 'shadow-premium' class
      boxShadow: {
        premium: '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.05), 0 0 40px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
