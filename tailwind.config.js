/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1E0E3E',
        'secondary': '#0D051C',
        'accent-purple': '#9B51E0',
        'accent-pink': '#FF00C7',
        'accent-blue': '#00B2FF',
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(to right, #9B51E0, #FF00C7, #00B2FF)',
      }
    },
  },
  plugins: [],
}