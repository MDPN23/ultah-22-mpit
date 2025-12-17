/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      colors: {
        'rose-gold': '#B76E79',
        'warm-pink': '#FFB6C1',
        'deep-red': '#8B0000',
      },
    },
  },
  plugins: [],
};
