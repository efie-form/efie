import { fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Inter', ...fontFamily.sans],
    },
    extend: {},
    colors: {
      white: '#FFFFFF',
      success: '#34D399',
      primary: {
        50: hexWithOpacity('--color-primary-50'),
        100: hexWithOpacity('--color-primary-100'),
        200: hexWithOpacity('--color-primary-200'),
        300: hexWithOpacity('--color-primary-300'),
        400: hexWithOpacity('--color-primary-400'),
        DEFAULT: hexWithOpacity('--color-primary-500'),
        600: hexWithOpacity('--color-primary-600'),
        700: hexWithOpacity('--color-primary-700'),
        800: hexWithOpacity('--color-primary-800'),
        900: hexWithOpacity('--color-primary-900'),
      },
      neutral: {
        50: hexWithOpacity('--color-neutral-50'),
        100: hexWithOpacity('--color-neutral-100'),
        200: hexWithOpacity('--color-neutral-200'),
        300: hexWithOpacity('--color-neutral-300'),
        400: hexWithOpacity('--color-neutral-400'),
        500: hexWithOpacity('--color-neutral-500'),
        600: hexWithOpacity('--color-neutral-600'),
        700: hexWithOpacity('--color-neutral-700'),
        800: hexWithOpacity('--color-neutral-800'),
        900: hexWithOpacity('--color-neutral-900'),
      },
      danger: {
        50: hexWithOpacity('--color-red-50'),
        100: hexWithOpacity('--color-red-100'),
        200: hexWithOpacity('--color-red-200'),
        300: hexWithOpacity('--color-red-300'),
        400: hexWithOpacity('--color-red-400'),
        DEFAULT: hexWithOpacity('--color-red-500'),
        600: hexWithOpacity('--color-red-600'),
        700: hexWithOpacity('--color-red-700'),
        800: hexWithOpacity('--color-red-800'),
        900: hexWithOpacity('--color-red-900'),
      },
    },
  },
  plugins: [],
};

function hexWithOpacity(hex) {
  return `rgb(from var(${hex}) r g b / <alpha-value>)`;
}
