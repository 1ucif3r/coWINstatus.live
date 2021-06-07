const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
    	fontFamily: {
    		'heads': ['Chivo', 'Helvetica', 'Arial', 'sans-serif'],
    	},
    	colors: {
    		violet: colors.violet,
    	},
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
