import type { AbsoluteSize, RelativeSize, SizeType, SizeUnit } from '../constants/form-schema.constant';

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
  unit: (typeof SizeUnit)[keyof typeof SizeUnit];
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

export interface SizeAbsolute {
  type: typeof SizeType.ABSOLUTE;
  value: AbsoluteSize;
}

export interface SizeRelative {
  type: typeof SizeType.RELATIVE;
  value: RelativeSize;
}

export type WidthHeightSize = SizeAuto | SizeLength | SizePercentage | SizeInitial | SizeInherit;
export type MarginSize = SizeAuto | SizeLength | SizePercentage | SizeInherit;
export type PaddingSize = SizeLength | SizePercentage | SizeInherit;
export type FontSize = SizeAbsolute | SizeRelative | SizeAuto | SizeLength | SizePercentage | SizeInitial | SizeInherit;
export type Size = SizeAuto | SizeLength | SizePercentage | SizeInitial | SizeInherit | SizeAbsolute | SizeRelative;

export interface BoxShadow {
  x: Size;
  y: Size;
  blur: Size;
  spread: Size;
  color: Color;
  inset: boolean;
}
