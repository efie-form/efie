import type { FormField, FormFieldType } from '@efie-form/core';
import { getDefaultField } from './getDefaultField.ts';
import { findFieldParentId } from './findFieldParentId.ts';

interface InsertFieldProps {
  fields: FormField[];
  newFieldType: FormFieldType;
  dropFieldType: FormFieldType;
  dropFieldId: string;
  direction: 'up' | 'down';
}

const isDropOnChildren = (newType: FormFieldType, dropType: FormFieldType) => {
  if (newType !== 'block' && dropType === 'block') return true;
  if (dropType === 'column' || dropType === 'page') return true;
  //
  return false;
};

export default function insertField({
  fields,
  newFieldType,
  dropFieldId,
  direction,
  dropFieldType,
}: InsertFieldProps) {
  const newField = getDefaultField({
    type: newFieldType,
  });

  const field = findField(fields, dropFieldId);
  if (!field) return fields;

  if (isDropOnChildren(newFieldType, dropFieldType)) {
    return appendFieldToChildren(fields, newField, dropFieldId);
  }
  return addFieldToSiblings(fields, newField, dropFieldId, direction);
}

const findField = (fields: FormField[], fieldId: string): FormField | null => {
  let result: FormField | null = null;
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

const appendFieldToChildren = (
  fields: FormField[],
  newField: FormField,
  dropFieldId: string
) => {
  const field = findField(fields, dropFieldId);
  if (!field || !('children' in field)) return fields;

  if (field.type === 'row') {
    if (newField.type === 'column') {
      field.children.push(newField);
    }
  } else {
    field.children.push(newField);
  }

  return fields;
};

const addFieldToSiblings = (
  fields: FormField[],
  newField: FormField,
  dropFieldId: string,
  direction: 'up' | 'down'
) => {
  const dropFieldParentId = findFieldParentId(fields, dropFieldId);
  if (!dropFieldParentId) return fields;

  const dropFieldParent = findField(fields, dropFieldParentId);
  if (!dropFieldParent || !('children' in dropFieldParent)) return fields;

  const dropFieldIndex = dropFieldParent.children.findIndex(
    (field) => field.id === dropFieldId
  );
  if (dropFieldIndex === -1) return fields;

  if (direction === 'up') {
    dropFieldParent.children.splice(dropFieldIndex, 0, newField);
  } else {
    dropFieldParent.children.splice(dropFieldIndex + 1, 0, newField);
  }

  return fields;
};
