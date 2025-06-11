import type { SizeType, Unit } from './form-schema.constant';

export interface ColorRgba {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface ColorHsla {
  h: number; // 0-360
  s: number; // 0-100
  l: number; // 0-100
  a: number; // 0-1
}

export interface Color {
  rgba: ColorRgba;
  hsla: ColorHsla;
  hex: string;
}

export interface SizeAuto {
  type: typeof SizeType.AUTO;
}

export interface SizeLength {
  type: typeof SizeType.LENGTH;
  value: number;
  unit: (typeof Unit)[keyof typeof Unit];
}

export interface SizePercentage {
  type: typeof SizeType.PERCENTAGE;
  value: number;
}

export interface SizeInitial {
  type: typeof SizeType.INITIAL;
}

export interface SizeInherit {
  type: typeof SizeType.INHERIT;
}

export type WidthHeightSize = SizeAuto | SizeLength | SizePercentage | SizeInitial | SizeInherit;
export type MarginSize = SizeAuto | SizeLength | SizePercentage | SizeInherit;
export type PaddingSize = SizeLength | SizePercentage | SizeInherit;
export type Size = SizeAuto | SizeLength | SizePercentage | SizeInitial | SizeInherit;
