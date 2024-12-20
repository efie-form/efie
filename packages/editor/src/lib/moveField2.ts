import type { FormField } from '@efie-form/core';

interface MoveField2Props {
  fields: FormField[];
  fieldId: string;
  dropFieldId: string;
  direction: 'up' | 'down';
}

export default function moveField2({
  fields,
  dropFieldId,
  fieldId,
  direction,
}: MoveField2Props) {
  if (fieldId === dropFieldId) return null;
  const fieldParentId = findParentId(fields, fieldId);
  const dropFieldParentId = findParentId(fields, dropFieldId);
  if (!fieldParentId || !dropFieldParentId) return null;

  const isMoveBetweenSiblings = fieldParentId === dropFieldParentId;

  if (isMoveBetweenSiblings) {
    return swapFields(fields, fieldParentId, fieldId, dropFieldId, direction);
  }
}

const swapFields = (
  fields: FormField[],
  parentFieldId: string,
  fieldId: string,
  dropFieldId: string,
  direction: 'up' | 'down'
) => {
  const parentField = findField(fields, parentFieldId);

  if (!parentField || !('children' in parentField)) return fields;

  const fieldIndex = parentField.children.findIndex(
    (field) => field.id === fieldId
  );

  const temp = parentField.children.splice(fieldIndex, 1);

  const dropFieldIndex = parentField.children.findIndex(
    (field) => field.id === dropFieldId
  );

  if (direction === 'up') {
    parentField.children.splice(dropFieldIndex, 0, ...temp);
  } else {
    parentField.children.splice(dropFieldIndex + 1, 0, ...temp);
  }

  return fields;
};

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

const findParentId = (fields: FormField[], fieldId: string): string | null => {
  let parentId: string | null = null;

  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];

    if ('children' in field) {
      if (field.children.some((child) => child.id === fieldId)) {
        parentId = field.id;
        break;
      }
      parentId = findParentId(field.children, fieldId);
    }

    if (parentId) break;
  }
  return parentId;
};
