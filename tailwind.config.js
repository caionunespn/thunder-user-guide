/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        evaluation: {
          500: '#3B82F6',
          600: '#2563EB',
        }
      }
    },
  },
  plugins: [],
} 