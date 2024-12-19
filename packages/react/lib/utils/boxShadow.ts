import type { BoxShadow } from '@efie-form/core';

export const toBoxShadowStyle = (shadows: BoxShadow[]) => {
  if (!shadows) return;

  return shadows.map(toShadow).join(', ');
};

const toShadow = (shadow: BoxShadow) => {
  if (!shadow) {
    return null;
  }
  const { x, y, blur, spread, color, inset } = shadow;
  if (!x && !y && !blur && !spread && !color) {
    return null;
  }
  const insetStr = inset ? ' inset' : '';
  return `${x}px ${y}px ${blur}px ${spread}px ${color}${insetStr}`;
};
