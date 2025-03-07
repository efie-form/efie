import type { Margin } from '../../../core-old';

export const toMarginStyle = (margin: Margin) => {
  if (!margin) return;

  const { top, right, bottom, left } = margin;
  if (!top && !right && !bottom && !left) return;

  if (top === bottom && right === left && top === right) {
    return `${top}px`;
  }

  if (top === bottom && right === left) {
    return `${top}px ${right}px`;
  }

  if (right === left) {
    return `${top}px ${right}px ${bottom}px`;
  }

  return `${top}px ${right}px ${bottom}px ${left}px`;
};
