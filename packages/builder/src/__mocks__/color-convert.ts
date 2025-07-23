// Mock for color-convert library

const hue2rgb = (p: number, q: number, t: number): number => {
  let adjustedT = t;
  if (adjustedT < 0) adjustedT += 1;
  if (adjustedT > 1) adjustedT -= 1;
  if (adjustedT < 1 / 6) return p + (q - p) * 6 * adjustedT;
  if (adjustedT < 1 / 2) return q;
  if (adjustedT < 2 / 3) return p + (q - p) * (2 / 3 - adjustedT) * 6;
  return p;
};

const colorConvert = {
  rgb: {
    hsl: (rgb: number[]): number[] => {
      const [r, g, b] = rgb.map((v) => v / 255);
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const diff = max - min;
      const sum = max + min;
      const l = sum / 2;

      let h = 0,
        s = 0;
      if (diff === 0) {
        h = s = 0;
      } else {
        s = l > 0.5 ? diff / (2 - sum) : diff / sum;
        switch (max) {
          case r: {
            h = (g - b) / diff + (g < b ? 6 : 0);
            break;
          }
          case g: {
            h = (b - r) / diff + 2;
            break;
          }
          case b: {
            h = (r - g) / diff + 4;
            break;
          }
        }
        h /= 6;
      }

      return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
    },
  },
  hsl: {
    rgb: (hsl: number[]): number[] => {
      const [h, s, l] = [hsl[0] / 360, hsl[1] / 100, hsl[2] / 100];

      let r: number, g: number, b: number;
      if (s === 0) {
        r = g = b = l;
      } else {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
      }

      return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    },
  },
};

export default colorConvert;
