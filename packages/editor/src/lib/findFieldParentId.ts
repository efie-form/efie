import type { FormField } from '@efie-form/core';

export const findFieldParentId = (
  fields: FormField[],
  fieldId: string
): string | null => {
  let parentId: string | null = null;

  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];

    if ('children' in field) {
      if (field.children.some((child) => child.id === fieldId)) {
        parentId = field.id;
        break;
      }
      parentId = findFieldParentId(field.children, fieldId);
    }

    if (parentId) break;
  }
  return parentId;
};
