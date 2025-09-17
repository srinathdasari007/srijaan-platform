/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-purple': '#4A148C',
        'brand-yellow': '#FFD700',
        'brand-magenta': '#FF00FF',
        'brand-cyan': '#00FFFF'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
};