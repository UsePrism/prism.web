/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: () => ({
        brand: '#9747FF',
        "brand-white": '#FFFFFF',
        green: '#27BE63',
        "light-gray": "#DBDFE6",
        line: "#A5ADC0",
      "black-support": "#344054",
      "black-main":"#001219"
      }),
      fontFamily: {
        'ui-sans':
          'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans- serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji',
        sohne: 'Sohne, sans-serif',
      },
    },
  },
  plugins: [],
}

