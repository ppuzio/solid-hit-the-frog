/** @type {import('tailwindcss/types').Config} */
const config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,css,md,mdx,html,json,scss}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'palette-a': '#0F0F0F',
        'palette-b': '#BABEDB',
        'palette-c': '#F2CDCE',
        'palette-d': '#ABFFBF',
        'palette-e': '#DED4B4',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

module.exports = config;