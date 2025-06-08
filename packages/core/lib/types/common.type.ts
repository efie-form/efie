import type { ColorType } from './form-schema.constant';

export interface ColorRgb {
  type: typeof ColorType.RGB;
  r: number;
  g: number;
  b: number;
}

export interface ColorRgba {
  type: typeof ColorType.RGBA;
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface ColorHsl {
  type: typeof ColorType.HSL;
  h: number; // 0-360
  s: number; // 0-100
  l: number; // 0-100
}

export interface ColorHsla {
  type: typeof ColorType.HSLA;
  h: number; // 0-360
  s: number; // 0-100
  l: number; // 0-100
  a: number; // 0-1
}

export interface ColorHex {
  type: typeof ColorType.HEX;
  hex: string; // e.g., "#ff0000"
}

export type Color = ColorRgb | ColorRgba | ColorHsl | ColorHsla | ColorHex;
