/* eslint-disable */
module.exports = {
  content: ['./pages/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        woody: "url('../public/image/modal_background.png')",
      },
      keyframes: {
        modal_appear: {
          '0%': {
            transform: 'translateY(-100%) rotate(10deg)',
          },
          '60%': {
            transform: 'translateY(0) rotate(-5deg)',
          },
          '65%': {
            transform: 'rotate(-8deg)',
          },
          '80%': {
            transform: 'rotate(2deg)',
          },
          '100%': {
            transform: 'translateY(0) rotate(0deg)',
          },
        },
      },
      animation: {
        modal_appear: 'modal_appear 1s ease-in',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
