/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f5f7ff",
          100: "#eef2ff",
          500: "#2b6ef6",
          700: "#1f4bd8"
        }
      },
      backgroundImage: {
        'premium-gradient': 'linear-gradient(90deg, rgba(43,110,246,0.06), rgba(31,75,216,0.04))'
      },
      boxShadow: {
        'soft-xl': '0 10px 30px rgba(15,23,42,0.10)'
      }
    }
  },
  plugins: []
};
