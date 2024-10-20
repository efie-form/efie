import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Inter', ...fontFamily.sans],
    },
    extend: {},
    colors: {
      white: '#FFFFFF',
      primary: {
        50: hexWithOpacity('--color-primary-50'),
        100: hexWithOpacity('--color-primary-100'),
        200: hexWithOpacity('--color-primary-200'),
        300: hexWithOpacity('--color-primary-300'),
        400: hexWithOpacity('--color-primary-400'),
        DEFAULT: hexWithOpacity('--color-primary'),
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
    },
  },
  plugins: [],
} satisfies Config;

function hexWithOpacity(hex) {
  return `rgb(from var(${hex}) r g b / <alpha-value>)`;
}
