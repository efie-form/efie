import type { FormField } from '@efie-form/core';

interface MoveFieldProps {
  fields: FormField[];
  fieldId: string;
  dropFieldId: string;
  direction: 'up' | 'down';
  dropOnEmptyColumn?: boolean;
  columnId?: string;
  isDropOnColumn: boolean;
}

export default function moveField({
  fields,
  dropFieldId,
  fieldId,
  direction,
  dropOnEmptyColumn,
  columnId,
  isDropOnColumn,
}: MoveFieldProps) {
  if (fieldId === dropFieldId) return null;
  const fieldParentId = findParentId(fields, fieldId);
  const dropFieldParentId = findParentId(fields, dropFieldId);

  if (dropOnEmptyColumn && columnId) {
    return moveFieldToEmptyColumn(fields, fieldId, columnId);
  }

  if (!fieldParentId || !dropFieldParentId) return null;

  if (isDropOnColumn) {
    return moveFieldToColumnEnd(fields, fieldId, fieldParentId, dropFieldId);
  }

  const isMoveBetweenSiblings = fieldParentId === dropFieldParentId;

  if (isMoveBetweenSiblings) {
    return swapBetweenSiblings(
      fields,
      fieldParentId,
      fieldId,
      dropFieldId,
      direction
    );
  }

  return swapAcrossDifferentParents(
    fields,
    fieldId,
    fieldParentId,
    dropFieldId,
    dropFieldParentId,
    direction
  );
}

const moveFieldToColumnEnd = (
  fields: FormField[],
  fieldId: string,
  fieldParentId: string,
  columnId: string
) => {
  const fieldParent = findField(fields, fieldParentId);
  const dropFieldParent = findField(fields, columnId);

  if (!fieldParent || !dropFieldParent) return fields;
  if (!('children' in fieldParent) || !('children' in dropFieldParent))
    return fields;

  const fieldIndex = fieldParent.children.findIndex(
    (field) => field.id === fieldId
  );
  const temp = fieldParent.children.splice(fieldIndex, 1);

  dropFieldParent.children.push(...temp);

  return fields;
};

const moveFieldToEmptyColumn = (
  fields: FormField[],
  fieldId: string,
  dropParentId: string
) => {
  const fieldParentId = findParentId(fields, fieldId);
  const dropFieldParentId = findField(fields, dropParentId);

  if (!fieldParentId || !dropFieldParentId) return fields;

  const fieldParent = findField(fields, fieldParentId);

  if (!fieldParent || !('children' in fieldParent)) return fields;

  const fieldIndex = fieldParent.children.findIndex(
    (field) => field.id === fieldId
  );

  const temp = fieldParent.children.splice(fieldIndex, 1);

  if (!('children' in dropFieldParentId)) return fields;

  dropFieldParentId.children.push(...temp);

  return fields;
};

const swapAcrossDifferentParents = (
  fields: FormField[],
  fieldId: string,
  fieldParentId: string,
  dropFieldId: string,
  dropFieldParentId: string,
  direction: 'up' | 'down'
) => {
  const fieldParent = findField(fields, fieldParentId);
  const dropFieldParent = findField(fields, dropFieldParentId);

  if (!fieldParent || !dropFieldParent) return fields;

  if (!('children' in fieldParent) || !('children' in dropFieldParent))
    return fields;

  const fieldIndex = fieldParent.children.findIndex(
    (field) => field.id === fieldId
  );
  const temp = fieldParent.children.splice(fieldIndex, 1);

  const dropFieldIndex = dropFieldParent.children.findIndex(
    (field) => field.id === dropFieldId
  );

  if (direction === 'up') {
    dropFieldParent.children.splice(dropFieldIndex, 0, ...temp);
  } else {
    dropFieldParent.children.splice(dropFieldIndex + 1, 0, ...temp);
  }

  return fields;
};

const swapBetweenSiblings = (
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
