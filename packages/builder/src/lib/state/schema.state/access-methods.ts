import type { FormField } from '@efie-form/core';
import type { SchemaStateAccessMethods, StateSetters } from './types';

export function createAccessMethods({ getState }: StateSetters): SchemaStateAccessMethods {
  return {
    // Core field access methods
    getFieldById: (fieldId) => {
      if (!fieldId) return;
      return getState().fieldMap.get(fieldId);
    },

    getFieldKeyById: (fieldId) => {
      if (!fieldId) return;
      return getState().fieldKeyMap.get(fieldId);
    },

    getFieldParentId: (fieldId) => {
      if (!fieldId) return;
      return getState().fieldParentMap.get(fieldId);
    },

    listChildrenId: (fieldId) => {
      const field = getState().fieldMap.get(fieldId);
      if (!field || !('children' in field)) return [];

      return getChildrenId(field);
    },
  };
}

const getChildrenId = (field: FormField): string[] => {
  if (!('children' in field) || !field.children || field.children.length === 0) {
    return [];
  }

  return field.children.flatMap((child) => {
    const childIds = getChildrenId(child);
    return [child.id, ...childIds];
  });
};
