import type { PropertyDefinition } from '@efie-form/core';
import { FieldInputType, FieldType, type FormField, type PropertyType } from '@efie-form/core';
import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';

export function cn(...args: classNames.ArgumentArray) {
  return twMerge(classNames(args));
}

const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function generateId(length: number = 10) {
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

export function isValidFieldType(type: string) {
  return Object.values(FieldType).includes(type as FieldType);
}

export function getFieldProp<T extends PropertyType>(
  field: FormField,
  type: T,
): Extract<PropertyDefinition, { type: T }> | undefined {
  // Find the property with the matching type
  const prop = field.props.find((prop) => prop.type === type);
  if (!prop) return;

  // Type guard to ensure we're returning the correct property type
  return prop as Extract<PropertyDefinition, { type: T }>;
}

export function isInputField(
  field: FormField,
): field is Extract<FormField, { type: FieldInputType }> {
  return Object.values(FieldInputType).some((f) => f === field.type);
}
