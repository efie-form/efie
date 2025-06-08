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
