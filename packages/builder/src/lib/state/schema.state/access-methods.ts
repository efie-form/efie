import type { FormField } from '@efie-form/core';
import type { StateSetters } from './types';
import { getAllFields } from './utils';

export interface SchemaStateAccessMethods {
  // Core field access methods

  getFieldById: (fieldId?: string) => FormField | undefined;
  getFieldParentId: (fieldId?: string) => string | undefined;

  listChildrenId: (fieldId: string) => string[];
  getAllFields: () => FormField[];
}

export function createAccessMethods({ getState }: StateSetters): SchemaStateAccessMethods {
  return {
    // Core field access methods
    getFieldById: (fieldId) => {
      if (!fieldId) return;
      return getState().fieldMap.get(fieldId);
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

    getAllFields: () => {
      const { schema } = getState();
      return getAllFields(schema?.form.fields || []);
    },
  };
}

const getChildrenId = (field: FormField): string[] => {
  if (!('children' in field) || !field.children || field.children.length === 0) {
    return [];
  }

  return field.children.flatMap((child) => {
    const childIds = getChildrenId(child);
    return [child.sys.id, ...childIds];
  });
};
