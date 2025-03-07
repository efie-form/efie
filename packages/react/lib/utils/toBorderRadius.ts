import type { BorderRadius } from '../../../core-old';

export const toBorderRadius = (radius: BorderRadius) => {
  if (!radius) return;

  const { topLeft, topRight, bottomRight, bottomLeft } = radius;

  if (
    topLeft === topRight &&
    bottomRight === bottomLeft &&
    topLeft === bottomRight
  ) {
    return `${topLeft}px`;
  }

  if (topLeft === bottomRight && topRight === bottomLeft) {
    return `${topLeft}px ${topRight}px`;
  }

  if (topRight === bottomLeft) {
    return `${topLeft}px ${topRight}px ${bottomRight}px`;
  }

  return `${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px`;
};
