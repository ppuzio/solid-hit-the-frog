module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,css,md,mdx,html,json,scss}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'palette-a': '#9AD9AB',
        'palette-b': '#A5A6D9',
        'palette-c': '#C1DA90',
        'palette-d': '#D9797B',
        'palette-e': '#D9B41C',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
