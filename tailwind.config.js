// tailwind.config.js

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        raleway: ['Raleway', 'sans-serif'],
      },
      colors: {
        custom: {
          'custom': '#E23E57',
          'secondary': '#88304E',
          'accent': '#522546',
        },
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
};
