import type { FormField } from '@lib/types/formSchema.type.ts';
import type { FormFieldType } from '@lib/InputType';
import { findFieldParentId } from '@form-builder/lib/findFieldParentId';

interface MoveFieldProps {
  fields: FormField[];
  fieldId: string;
  fieldType: FormFieldType;
  dropFieldType: FormFieldType;
  dropFieldId: string;
  direction: 'up' | 'down';
}

const isDropOnChildren = (moveType: FormFieldType, dropType: FormFieldType) => {
  if (moveType !== 'block' && dropType === 'block') return true;
  if (dropType === 'column' || dropType === 'page') return true;
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

const moveFieldToChildrenEnd = (
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

  if (dropFieldParent.type === 'row') {
    const columnFieldsOnly = dropFieldParent.children.filter(
      (field) => field.type === 'column'
    );
    dropFieldParent.children.push(...columnFieldsOnly);
  } else {
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

const findField = (
  fields: FormField[],
  fieldId: string
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
