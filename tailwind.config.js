/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Defining a primary corporate color: Deep Indigo/Navy
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca', // Ideal for authoritative buttons/backgrounds
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        // Using a clean, professional grayscale
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          900: '#111827', // Black for primary text
        },
      },
      fontFamily: {
        // Setting a highly readable, modern font (like Inter)
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        // Adding a subtle premium shadow for cards and buttons
        'premium': '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
