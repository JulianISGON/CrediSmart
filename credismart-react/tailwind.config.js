/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          900: '#081c15',
          800: '#1b4332',
          700: '#2d6a4f',
          500: '#40916c',
          300: '#74c69d',
          200: '#95d5b2',
          100: '#d8f3dc',
        },
        grayz: {
          100: '#f3f4f6',
          300: '#e5e7eb',
        }
      }
    },
  },
  plugins: [],
}
