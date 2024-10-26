/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'gray': {
        100: '#F9F9F9',
        200: '#F5F5F5',
        300: '#E8E8E8',
        400: '#BFBFBF',
        600: '#5E5E5E',
        800: '#353535'
      },
      'rose': { 600: '#F22539' },
      'red': { 700: '#C00E20' },
      'yellow': { 600: '#ECA539' },
      'white':'#FFFFFF',
      'transparent': 'transparent',
    },
    extend: {
      borderRadius:{
        DEFAULT: '5px',
      },
      fontFamily:{
        montserrat:['Montserrat'],
        lato:['Lato']
      }
    },
  },
  plugins: [],
}

