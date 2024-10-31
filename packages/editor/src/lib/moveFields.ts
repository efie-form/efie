import type { FormField } from '@efie-form/core';

export default function moveField(
  fields: FormField[],
  fieldId: string,
  parentId: string | null,
  index: number
) {
  const fieldToMove = findField(fields, fieldId);
  if (!fieldToMove) return fields;

  fields = removeField(fields, fieldId);

  if (!parentId) {
    return insertFieldToRoot(fields, fieldToMove, index);
  }

  return insertField(fields, fieldToMove, parentId, index);
}

const findField = (fields: FormField[], fieldId: string): FormField | null => {
  let result: FormField | null = null;
  fields.forEach((field) => {
    if (field.id === fieldId) {
      result = field;
    }
    if (!result && 'children' in field) {
      result = findField(field.children, fieldId);
    }
  });
  return result;
};

const removeField = (fields: FormField[], fieldId: string): FormField[] => {
  return fields.filter((field) => {
    if (field.id === fieldId) {
      return false;
    }
    if ('children' in field) {
      field.children = removeField(field.children, fieldId);
    }
    return true;
  });
};

const insertFieldToRoot = (
  fields: FormField[],
  fieldToInsert: FormField,
  index: number
) => {
  fields.splice(index, 0, fieldToInsert);
  return fields;
};

const insertField = (
  fields: FormField[],
  fieldToInsert: FormField,
  parentId: string | null,
  index: number
) => {
  return fields.map((field) => {
    if (field.id === parentId && 'children' in field) {
      field.children.splice(index, 0, fieldToInsert);
    }
    if (field.id !== parentId && 'children' in field) {
      field.children = insertField(
        field.children,
        fieldToInsert,
        parentId,
        index
      );
    }
    return field;
  });
};
