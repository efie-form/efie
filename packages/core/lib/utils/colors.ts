import convert from 'color-convert';
import type { Color, ColorHsla, ColorRgba } from '../types/common.type.js';

/**
 * Converts any valid color format to a complete Color object with rgba, hsla, and hex properties.
 * @param color A color value in any supported format (hex string, RGB, RGBA, HSL, HSLA)
 * @returns A complete Color object with all color format representations
 */
export function getColorObject(color: Color[keyof Color]): Color {
  // Determine the input color type
  const isHex = typeof color === 'string' && color.startsWith('#');
  const isRgb = typeof color === 'object' && 'r' in color && 'g' in color && 'b' in color;
  const isRgba = isRgb && 'a' in color;
  const isHsl = typeof color === 'object' && 'h' in color && 's' in color && 'l' in color;
  const isHsla = isHsl && 'a' in color;

  // Convert based on input color type
  if (isHex) {
    return fromHex(color as string);
  }

  if (isRgba) {
    return fromRgba(color as ColorRgba);
  }

  if (isRgb) {
    // Handle RGB without alpha
    const rgbColor = color as { r: number; g: number; b: number };
    return fromRgba({ ...rgbColor, a: 1 });
  }

  if (isHsla) {
    return fromHsla(color as ColorHsla);
  }

  if (isHsl) {
    // Handle HSL without alpha
    const hslColor = color as { h: number; s: number; l: number };
    return fromHsla({ ...hslColor, a: 1 });
  }

  // Default fallback to black if invalid input
  return {
    rgba: { r: 0, g: 0, b: 0, a: 1 },
    hsla: { h: 0, s: 0, l: 0, a: 1 },
    hex: '#000000',
  };
}

/**
 * Converts a hex color string to a complete Color object
 * @param color A hex color string (3, 4, 6, or 8 characters with # prefix)
 * @returns A complete Color object with rgba, hsla, and hex properties
 */
function fromHex(color: string): Color {
  // Remove '#' if present
  const hexColor = color.startsWith('#') ? color.slice(1) : color;

  let r = 0;
  let g = 0;
  let b = 0;
  let a = 1;

  switch (hexColor.length) {
    case 3: {
      // #RGB format
      r = Number.parseInt(hexColor[0] + hexColor[0], 16);
      g = Number.parseInt(hexColor[1] + hexColor[1], 16);
      b = Number.parseInt(hexColor[2] + hexColor[2], 16);
      break;
    }
    case 4: {
      // #RGBA format
      r = Number.parseInt(hexColor[0] + hexColor[0], 16);
      g = Number.parseInt(hexColor[1] + hexColor[1], 16);
      b = Number.parseInt(hexColor[2] + hexColor[2], 16);
      a = Number.parseInt(hexColor[3] + hexColor[3], 16) / 255;
      break;
    }
    case 6: {
      // #RRGGBB format
      r = Number.parseInt(hexColor.slice(0, 2), 16);
      g = Number.parseInt(hexColor.slice(2, 4), 16);
      b = Number.parseInt(hexColor.slice(4, 6), 16);
      break;
    }
    case 8: {
      // #RRGGBBAA format
      r = Number.parseInt(hexColor.slice(0, 2), 16);
      g = Number.parseInt(hexColor.slice(2, 4), 16);
      b = Number.parseInt(hexColor.slice(4, 6), 16);
      a = Number.parseInt(hexColor.slice(6, 8), 16) / 255;
      break;
    }
    default: {
      // Invalid hex, fallback to black
      r = 0;
      g = 0;
      b = 0;
      break;
    }
  }

  // Convert RGB to HSL
  const hsl = convert.rgb.hsl([r, g, b]);

  return {
    rgba: { r, g, b, a },
    hsla: { h: Math.round(hsl[0]), s: Math.round(hsl[1]), l: Math.round(hsl[2]), a },
    hex: color.startsWith('#') ? color : `#${color}`,
  };
}

/**
 * Converts RGBA color values to a complete Color object
 * @param rgba An object containing r, g, b, a values
 * @returns A complete Color object with rgba, hsla, and hex properties
 */
function fromRgba(rgba: ColorRgba): Color {
  const { r, g, b, a } = rgba;

  // Convert to hex
  const hexWithoutAlpha = convert.rgb.hex([r, g, b]);
  const hex = a < 1 ? `#${hexWithoutAlpha}${numToHex(a * 255)}` : `#${hexWithoutAlpha}`;

  // Convert to HSL
  const hsl = convert.rgb.hsl([r, g, b]);

  return toColor({
    rgba: { r, g, b, a },
    hsla: { h: hsl[0], s: hsl[1], l: hsl[2], a },
    hex,
  });
}

/**
 * Converts HSLA color values to a complete Color object
 * @param hsla An object containing h, s, l, a values
 * @returns A complete Color object with rgba, hsla, and hex properties
 */
function fromHsla(hsla: ColorHsla): Color {
  const { h, s, l, a } = hsla;

  // Convert to RGB
  const [r, g, b] = convert.hsl.rgb([h, s, l]);

  // Convert to hex
  const hexWithoutAlpha = convert.hsl.hex([h, s, l]);
  const hex = a < 1 ? `#${hexWithoutAlpha}${numToHex(a * 255)}` : `#${hexWithoutAlpha}`;

  return toColor({
    rgba: { r, g, b, a },
    hsla,
    hex,
  });
}

/**
 * Converts RGB values with alpha to hex format
 * @param r Red component (0-255)
 * @param g Green component (0-255)
 * @param b Blue component (0-255)
 * @param a Alpha component (0-1), defaults to 1
 * @returns Hex color string with optional alpha
 */
export function rgbaToHex(r: number, g: number, b: number, a = 1): string {
  const hexR = numToHex(r);
  const hexG = numToHex(g);
  const hexB = numToHex(b);

  // Only include alpha in the result if it's less than 1
  if (a < 1) {
    const hexA = numToHex(a * 255);
    return `#${hexR}${hexG}${hexB}${hexA}`;
  }

  return `#${hexR}${hexG}${hexB}`;
}

/**
 * Converts HSL values with alpha to hex format
 * @param h Hue component (0-360)
 * @param s Saturation component (0-100)
 * @param l Lightness component (0-100)
 * @param a Alpha component (0-1), defaults to 1
 * @returns Hex color string with optional alpha
 */
export function hslaToHex(h: number, s: number, l: number, a = 1): string {
  // First convert HSL to RGB
  const [r, g, b] = convert.hsl.rgb([h, s, l]);

  // Then convert RGB to hex with alpha
  return rgbaToHex(Math.round(r), Math.round(g), Math.round(b), a);
}

// Helper function for converting numbers to hex strings
function numToHex(value: number): string {
  return Math.round(value).toString(16).padStart(2, '0');
}

function toColor(color: Color): Color {
  return {
    rgba: {
      r: Math.round(color.rgba.r),
      g: Math.round(color.rgba.g),
      b: Math.round(color.rgba.b),
      a: color.rgba.a,
    },
    hsla: {
      h: Math.round(color.hsla.h),
      s: Math.round(color.hsla.s),
      l: Math.round(color.hsla.l),
      a: color.hsla.a,
    },
    hex: color.hex,
  };
}
