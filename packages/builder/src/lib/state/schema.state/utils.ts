import type { FormField } from '@efie-form/core';
import type { FieldMaps } from './types';

// Helper function to generate unique IDs
export const generateId = (): string => Math.random().toString(36).slice(2, 12);

// Helper function to deep clone objects
export const deepClone = <T>(obj: T): T => {
  if (typeof structuredClone !== 'undefined') {
    return structuredClone(obj);
  }
  return structuredClone(obj);
};

// Helper function to rebuild field maps
export function getFieldInfoMap(
  fields: FormField[],
  fieldKeyMap: Map<string, string> = new Map(),
  fieldMap: Map<string, FormField> = new Map(),
  fieldParentMap: Map<string, string> = new Map(),
  fieldKey: string = 'form.fields',
): FieldMaps {
  for (const i in fields) {
    const field = fields[i];
    fieldKeyMap.set(field.id, `${fieldKey}.${i}`);
    fieldMap.set(field.id, field);
    if ('children' in field) {
      for (const child of field.children) {
        fieldParentMap.set(child.id, field.id);
      }
      getFieldInfoMap(
        field.children,
        fieldKeyMap,
        fieldMap,
        fieldParentMap,
        `${fieldKey}.${i}.children`,
      );
    }
  }
  return { fieldKeyMap, fieldMap, fieldParentMap };
}

// Debounce helper
let timeout: NodeJS.Timeout;
export function debounce(fn: () => void, delay: number) {
  clearTimeout(timeout);
  timeout = setTimeout(fn, delay);
}
