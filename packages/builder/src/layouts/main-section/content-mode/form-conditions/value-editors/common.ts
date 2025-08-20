import type { Operator } from '@efie-form/core';

export const operatorNeedsNoValue = (op?: Operator) => {
  if (!op) return false;
  return (
    // shared
    (op as string) === 'is_empty' ||
    (op as string) === 'is_filled' ||
    (op as string) === 'is_valid' ||
    (op as string) === 'is_invalid' ||
    // boolean helpers
    (op as string) === 'is_true' ||
    (op as string) === 'is_false'
  );
};
