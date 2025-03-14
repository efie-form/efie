import type { Padding } from '@efie-form/core';

export const toPaddingStyle = (padding: Padding) => {
  if (!padding) return;
  const { top, right, bottom, left } = padding;

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
