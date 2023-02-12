/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media',
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          100: '#FF7A00',
          200: '#f65300',
          300: '#fd350d',
          400: '#f70000',
          500: '#de2702',
        },
        dark: {
          100: '#1c1c1c',
          200: '#232323',
          300: '#343434',
          400: '#7e7e7e',
        },
        white: {
          100: '#fbfcfd',
          200: '#f8f9fa',
          300: '#dfe3e6',
          400: '#7e868c',
        },
        gray: {
          100: '#f8f9fa',
          200: '#f1f3f5',
          300: '#e9ecef',
        },
      },
      fontSize: { base: '1.2rem', lg: '2rem' },
      fontFamily: {
        sans: ['Rubik', 'sans-serif'],
      },
      boxShadow: { shadow_light: '0px 0px 5px 0px rgba(0,0,0,0.1)' },
      borderRadius: { none: '0', xs: '0.3125rem', sm: '0.625rem' },
      animation: {
        'spin-slow': 'spin 2s linear infinite',
        'show-panel': 'showPanel 0.3s ease-in-out',
        'hide-panel': 'hidePanel 0.3s ease-in-out',
      },
      transitionDuration: {
        0: '0ms',
        2000: '2000ms',
      },
      keyframes: {
        showPanel: {
          '0%': { opacity: '0', transform: 'translateX(100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        hidePanel: {
          '0%': { opacity: '1', transform: 'translateX(0)' },
          '100%': { opacity: '0', transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
};
