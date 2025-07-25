import type { FormField } from '@efie-form/core';
import type { FieldMaps } from './types';

// Helper function to generate unique IDs
export const generateId = (): string => Math.random().toString(36).slice(2, 12);

// Helper function to deep clone objects
export const deepClone = <T>(obj: T): T => {
  if (typeof structuredClone !== 'undefined') {
    return structuredClone(obj);
  }
  // Fallback for older browsers that don't support structuredClone
  // eslint-disable-next-line unicorn/prefer-structured-clone
  return JSON.parse(JSON.stringify(obj));
};

// Helper function to rebuild field maps (optimized)
export function getFieldInfoMap(
  fields: FormField[],
  fieldKeyMap: Map<string, string> = new Map(),
  fieldMap: Map<string, FormField> = new Map(),
  fieldParentMap: Map<string, string> = new Map(),
  fieldKey: string = 'form.fields',
): FieldMaps {
  // Clear existing maps to ensure fresh state
  fieldKeyMap.clear();
  fieldMap.clear();
  fieldParentMap.clear();

  const buildMaps = (currentFields: FormField[], currentKey: string, parentId?: string) => {
    for (const [i, field] of currentFields.entries()) {
      const fieldPath = `${currentKey}.${i}`;

      fieldKeyMap.set(field.id, fieldPath);
      fieldMap.set(field.id, field);

      if (parentId) {
        fieldParentMap.set(field.id, parentId);
      }

      if ('children' in field && field.children) {
        buildMaps(field.children, `${fieldPath}.children`, field.id);
      }
    }
  };

  buildMaps(fields, fieldKey);
  return { fieldKeyMap, fieldMap, fieldParentMap };
}

// Helper function to update a single field in maps
export function updateFieldInMaps(
  fieldId: string,
  updatedField: FormField,
  fieldMaps: FieldMaps,
): FieldMaps {
  const { fieldKeyMap, fieldMap, fieldParentMap } = fieldMaps;

  // Create new maps with updated field
  const newFieldMap = new Map(fieldMap);
  newFieldMap.set(fieldId, updatedField);

  return {
    fieldKeyMap: new Map(fieldKeyMap),
    fieldMap: newFieldMap,
    fieldParentMap: new Map(fieldParentMap),
  };
}

// Helper function to find field in tree structure efficiently
export function findFieldInTree(
  fields: FormField[],
  fieldId: string,
  callback: (field: FormField, index: number, parent?: FormField) => FormField | undefined,
  parent?: FormField,
): FormField[] {
  const newFields = [...fields];

  for (let i = 0; i < newFields.length; i++) {
    const field = newFields[i];

    if (field.id === fieldId) {
      const result = callback(field, i, parent);
      if (result) {
        newFields[i] = result;
      }
      return newFields;
    }

    if ('children' in field && field.children) {
      const updatedChildren = findFieldInTree(field.children, fieldId, callback, field);
      if (updatedChildren !== field.children) {
        newFields[i] = { ...field, children: updatedChildren } as FormField;
        return newFields;
      }
    }
  }

  return newFields;
}

// Helper function to remove field from tree structure efficiently
export function removeFieldFromTree(fields: FormField[], fieldId: string): FormField[] {
  return fields
    .filter((field) => field.id !== fieldId)
    .map((field) => {
      if ('children' in field && field.children) {
        field.children = removeFieldFromTree(field.children, fieldId);
      }
      return field;
    });
}

// Helper function to add field to tree structure efficiently
export function addFieldToTree(
  fields: FormField[],
  newField: FormField,
  parentId?: string,
  index?: number,
): FormField[] {
  if (!parentId) {
    // Add to root level
    const newFields = [...fields];
    if (index !== undefined && index >= 0 && index <= newFields.length) {
      newFields.splice(index, 0, newField);
    } else {
      newFields.push(newField);
    }
    return newFields;
  }

  // Add to specific parent
  return fields.map((field) => {
    if (field.id === parentId && 'children' in field) {
      const newChildren = [...field.children];
      if (index !== undefined && index >= 0 && index <= newChildren.length) {
        newChildren.splice(index, 0, newField);
      } else {
        newChildren.push(newField);
      }
      return { ...field, children: newChildren } as FormField;
    }

    if ('children' in field && field.children) {
      const updatedChildren = addFieldToTree(field.children, newField, parentId, index);
      if (updatedChildren !== field.children) {
        return { ...field, children: updatedChildren } as FormField;
      }
    }

    return field;
  });
}

// Helper function to move field in tree structure efficiently
export function moveFieldInTree(
  fields: FormField[],
  fieldId: string,
  newParentId: string,
  newIndex: number,
  fieldToMove: FormField,
): FormField[] {
  // First remove the field from its current location
  const fieldsWithoutTarget = removeFieldFromTree(fields, fieldId);

  // Then add it to the new location
  return addFieldToTree(fieldsWithoutTarget, fieldToMove, newParentId, newIndex);
}

// Optimized debounce helper with cleanup
const debounceTimers = new Map<string, NodeJS.Timeout>();

export function debounce(fn: () => void, delay: number, key: string = 'default') {
  const existingTimer = debounceTimers.get(key);
  if (existingTimer) {
    clearTimeout(existingTimer);
  }

  const timer = setTimeout(() => {
    fn();
    debounceTimers.delete(key);
  }, delay);

  debounceTimers.set(key, timer);
}

// Cleanup function for debounce timers
export function clearAllDebounceTimers() {
  for (const timer of debounceTimers.values()) {
    clearTimeout(timer);
  }
  debounceTimers.clear();
}
