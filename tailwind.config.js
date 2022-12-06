/* eslint-disable */
module.exports = {
  content: ['./pages/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        woody_modal: "url('../public/image/modal_woody.png')",
        woody_banner: "url('../public/image/banner_woody.png')",
        woody_button: "url('../public/image/button_woody.png)",
        white_banner: "url('../public/image/banner_white.png')",
        white_modal: "url('../public/image/modal_white.png')",
        white_button: "url('../public/image/button_white.png)",
        dark_banner: "url('../public/image/banner_dark.png')",
        dark_modal: "url('../public/image/modal_dark.png')",
        dark_button: "url('../public/image/button_dark.png)",
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
