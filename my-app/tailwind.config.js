/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,svelte,ts}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'bgColor': '#436268',
      'textColor': '#F4FBF8',
      'CTA':'#2E5157',
      'CTA-Hover':'#778E91',
      'Card-Background' : '#31565E',
      'red' : '#FF0000',
      'green' : '#00FF00',
          
    },
    extend: {},
  },
  plugins: [],
}

