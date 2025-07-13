import type { SizeUnit } from '../constants/form-schema.constant';
import type { SizeLength } from '../types/common.type';

export const stringToSize = (value: string): SizeLength => {
  if (!value || typeof value !== 'string') {
    return { type: 'length', value: 0, unit: 'px' };
  }

  // Remove whitespace
  const trimmed = value.trim();

  // First check if it's just a number (no unit)
  const numberOnlyMatch = trimmed.match(/^(-?\d*\.?\d+)$/);
  if (numberOnlyMatch) {
    const numValue = Number.parseFloat(numberOnlyMatch[1]);
    if (!Number.isNaN(numValue)) {
      return { type: 'length', value: numValue, unit: 'px' };
    }
  }

  // Match number and unit - only support specific units
  const match = trimmed.match(/^(-?\d*\.?\d+)(px|em|rem|vh|vw)$/i);

  if (!match) {
    // If no valid match found, return default
    return { type: 'length', value: 0, unit: 'px' };
  }

  const [, numberPart, unitPart] = match;
  const numericValue = Number.parseFloat(numberPart);

  if (Number.isNaN(numericValue)) {
    return { type: 'length', value: 0, unit: 'px' };
  }

  // Unit is guaranteed to be valid from the regex
  const unit = unitPart.toLowerCase() as SizeUnit;

  return {
    type: 'length',
    value: numericValue,
    unit,
  };
};
