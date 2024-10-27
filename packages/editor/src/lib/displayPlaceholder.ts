import type { FormField } from '../types/formSchema.ts';

const elem = document.createElement('div');
elem.className = 'w-full h-1 w-full bg-primary absolute';
elem.id = 'efie-placeholder';

export function displayPlaceholder(
  fields: FormField[],
  parentId: string | null,
  index: number,
  movingFieldId: string | null
) {
  if (parentId === null) {
    // root

    if (movingFieldId && isSamePosition(fields, index, movingFieldId)) {
      removePlaceholder();
      return;
    }

    insertPlaceholder(removeField(fields, movingFieldId), index);
    return;
  }

  const parentField = findInsertField(fields, parentId);
  if (!parentField || !('children' in parentField)) return;

  if (
    movingFieldId &&
    isSamePosition(parentField.children, index, movingFieldId)
  ) {
    removePlaceholder();
    return;
  }

  insertPlaceholder(removeField(parentField.children, movingFieldId), index);
}

export function removePlaceholder() {
  const elem = document.getElementById('efie-placeholder');
  if (elem) elem.remove();
}

const isSamePosition = (
  fields: FormField[],
  index: number,
  movingFieldId: string
) => {
  const movingFieldIndex = fields.findIndex(
    (field) => field.id === movingFieldId
  );
  return movingFieldIndex === index;
};

const removeField = (
  fields: FormField[],
  fieldId: string | null
): FormField[] => {
  if (!fieldId) return fields;
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

const findInsertField = (
  fields: FormField[],
  parentId: string | null
): FormField | null => {
  let result: FormField | null = null;
  fields.forEach((field) => {
    if (field.id === parentId) {
      result = field;
    }
    if (!result && 'children' in field) {
      result = findInsertField(field.children, parentId);
    }
  });
  return result;
};

const insertPlaceholder = (fields: FormField[], index: number) => {
  let direction: InsertPosition = 'afterbegin';
  if (fields.length === index) {
    direction = 'beforeend';
    index--;
  }
  const field = fields[index];
  if (!field) return;
  const fieldElem = document.getElementById(field.id);
  if (!fieldElem) return;

  fieldElem.style.position = 'relative';
  fieldElem.insertAdjacentElement(direction, elem);
};
