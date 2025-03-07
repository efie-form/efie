import type { BoxShadow } from '../../../core-old';

export const toBoxShadowStyle = (shadows: BoxShadow[]) => {
  if (!shadows) return;

  return shadows.map((shadow) => toShadow(shadow)).join(', ');
};

const toShadow = (shadow: BoxShadow) => {
  if (!shadow) {
    return;
  }
  const { x, y, blur, spread, color, inset } = shadow;
  if (!x && !y && !blur && !spread && !color) {
    return;
  }
  const insetStr = inset ? ' inset' : '';
  return `${x}px ${y}px ${blur}px ${spread}px ${color}${insetStr}`;
};
