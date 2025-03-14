import type { FormField } from '../../types/formSchema.type.ts';

export const findFieldParentId = (
  fields: FormField[],
  fieldId: string
): string | undefined => {
  let parentId: string | undefined = undefined;

  for (const field of fields) {
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
