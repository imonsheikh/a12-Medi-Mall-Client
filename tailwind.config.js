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
          'custom': '#f99a00',
        },
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
};
