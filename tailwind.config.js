/* eslint-disable */
module.exports = {
  content: ['./pages/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        woody_modal: "url('../public/image/modal_woody.png')",
        woody_banner: "url('../public/image/banner_woody.png')",
        woody_button: "url('../public/image/button_woody.png')",
        woody_rounded_button: "url('../public/image/rounded_button_woody.png')",
        white_banner: "url('../public/image/banner_white.png')",
        white_modal: "url('../public/image/modal_white.png')",
        white_button: "url('../public/image/button_white.png')",
        dark_banner: "url('../public/image/banner_dark.png')",
        dark_modal: "url('../public/image/modal_dark.png')",
        rounded_white: "url('../public/image/rounded_button_background_white.png)",
        rounded_dark: "url('../public/image/rounded_button_dark.png)",
        rounded_woody: "url('../public/image/rounded_button_woody.png)",
        dark_button: "url('../public/image/button_dark.png')",
        cuckoo_character: "url('../public/image/cuckoo_character.png')",
      },
      keyframes: {
        loading_spin: {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '50%': {
            transform: 'rotate(180deg)',
          },
          '100%': {
            transform: 'rotate(360deg)',
          },
        },
        modal_topdown: {
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
        menu_apper: {
          '0%': { right: '-33.333333%' },
          '100%': { right: 0 },
        },
      },
      animation: {
        modal_topdown: 'modal_topdown 1s ease-in',
        loading_spin: 'loading_spin infinite linear',
        menu_apper: 'menu_apper 0.3s ease-in-out',
      },
    },
  },

  plugins: [require('tailwind-scrollbar-hide'), require('daisyui')],
};
