import type { FormField } from '@efie-form/core';
import { FormFieldType } from '@efie-form/core';
import { findFieldParentId } from './findFieldParentId';

interface MoveFieldProps {
  fields: FormField[];
  fieldId: string;
  fieldType: FormFieldType;
  dropFieldType: FormFieldType;
  dropFieldId: string;
  direction: 'up' | 'down';
}

const isDropOnChildren = (moveType: FormFieldType, dropType: FormFieldType) => {
  if (moveType !== FormFieldType.BLOCK && dropType === FormFieldType.BLOCK) return true;
  if (dropType === FormFieldType.COLUMN || dropType === FormFieldType.PAGE) return true;
  //
  return false;
};

export default function moveField({
  fields,
  dropFieldId,
  fieldId,
  direction,
  fieldType,
  dropFieldType,
}: MoveFieldProps) {
  if (fieldId === dropFieldId) return;
  const fieldParentId = findFieldParentId(fields, fieldId);
  const dropFieldParentId = findFieldParentId(fields, dropFieldId);

  if (!fieldParentId) return;

  if (isDropOnChildren(fieldType, dropFieldType)) {
    return moveFieldToChildrenEnd(fields, fieldId, fieldParentId, dropFieldId);
  }

  if (!dropFieldParentId) return;

  const isMoveBetweenSiblings = fieldParentId === dropFieldParentId;

  if (isMoveBetweenSiblings) {
    return swapBetweenSiblings(
      fields,
      fieldParentId,
      fieldId,
      dropFieldId,
      direction,
    );
  }

  return swapAcrossDifferentParents(
    fields,
    fieldId,
    fieldParentId,
    dropFieldId,
    dropFieldParentId,
    direction,
  );
}

const moveFieldToChildrenEnd = (
  fields: FormField[],
  fieldId: string,
  fieldParentId: string,
  columnId: string,
) => {
  const fieldParent = findField(fields, fieldParentId);
  const dropFieldParent = findField(fields, columnId);

  if (!fieldParent || !dropFieldParent) return fields;
  if (!('children' in fieldParent) || !('children' in dropFieldParent))
    return fields;

  const fieldIndex = fieldParent.children.findIndex(
    field => field.id === fieldId,
  );

  // Early return if field not found to prevent accidental deletion
  if (fieldIndex === -1) return fields;

  const temp = fieldParent.children.splice(fieldIndex, 1);

  if (dropFieldParent.type === FormFieldType.ROW) {
    // For ROW containers, find the first column and add the field there
    // If no columns exist, create one or add to the end
    const firstColumn = dropFieldParent.children.find(
      field => field.type === FormFieldType.COLUMN,
    );

    if (firstColumn && 'children' in firstColumn) {
      // Add the field to the first column
      firstColumn.children.push(...temp);
    }
    else {
      // Fallback: add directly to ROW (this shouldn't normally happen)
      dropFieldParent.children.push(...temp);
    }
  }
  else {
    dropFieldParent.children.push(...temp);
  }

  return fields;
};

const swapAcrossDifferentParents = (
  fields: FormField[],
  fieldId: string,
  fieldParentId: string,
  dropFieldId: string,
  dropFieldParentId: string,
  direction: 'up' | 'down',
) => {
  const fieldParent = findField(fields, fieldParentId);
  const dropFieldParent = findField(fields, dropFieldParentId);

  if (!fieldParent || !dropFieldParent) return fields;

  if (!('children' in fieldParent) || !('children' in dropFieldParent))
    return fields;

  const fieldIndex = fieldParent.children.findIndex(
    field => field.id === fieldId,
  );

  // Early return if field not found to prevent accidental deletion
  if (fieldIndex === -1) return fields;

  const dropFieldIndex = dropFieldParent.children.findIndex(
    field => field.id === dropFieldId,
  );

  // Early return if drop target not found to prevent accidental deletion
  if (dropFieldIndex === -1) return fields;

  const temp = fieldParent.children.splice(fieldIndex, 1);

  if (direction === 'up') {
    dropFieldParent.children.splice(dropFieldIndex, 0, ...temp);
  }
  else {
    dropFieldParent.children.splice(dropFieldIndex + 1, 0, ...temp);
  }

  return fields;
};

const swapBetweenSiblings = (
  fields: FormField[],
  parentFieldId: string,
  fieldId: string,
  dropFieldId: string,
  direction: 'up' | 'down',
) => {
  const parentField = findField(fields, parentFieldId);

  if (!parentField || !('children' in parentField)) return fields;

  const fieldIndex = parentField.children.findIndex(
    field => field.id === fieldId,
  );

  // Early return if field not found to prevent accidental deletion
  if (fieldIndex === -1) return fields;

  const dropFieldIndex = parentField.children.findIndex(
    field => field.id === dropFieldId,
  );

  // Early return if drop target not found to prevent accidental deletion
  if (dropFieldIndex === -1) return fields;

  const temp = parentField.children.splice(fieldIndex, 1);

  // Recalculate dropFieldIndex after removing the field
  const newDropFieldIndex = parentField.children.findIndex(
    field => field.id === dropFieldId,
  );

  if (direction === 'up') {
    parentField.children.splice(newDropFieldIndex, 0, ...temp);
  }
  else {
    parentField.children.splice(newDropFieldIndex + 1, 0, ...temp);
  }

  return fields;
};

const findField = (
  fields: FormField[],
  fieldId: string,
): FormField | undefined => {
  let result: FormField | undefined;
  for (const field of fields) {
    if (field.id === fieldId) {
      result = field;
    }
    if (!result && 'children' in field) {
      result = findField(field.children, fieldId);
    }
  }
  return result;
};
