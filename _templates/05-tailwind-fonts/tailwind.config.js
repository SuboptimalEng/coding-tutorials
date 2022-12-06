const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      primary: 'var(--theme-primary)',
      secondary: 'var(--theme-secondary)',
      'text-base': 'var(--theme-text-base)',
    },
    extend: {
      fontFamily: {
        serif: ["'Dancing Script', cursive;", ...defaultTheme.fontFamily.serif],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
