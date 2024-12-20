import type { FormFieldType } from '@efie-form/core';

const getHoverFieldId = (target: HTMLElement, accepts?: FormFieldType[]) => {
  const id = target.getAttribute('data-dnd-id');
  const type = target.getAttribute('data-dnd-type') as FormFieldType;
  if (!id && !accepts?.includes(type) && target.parentElement)
    return getHoverFieldId(target.parentElement);
  if (id) return id;
  if (target.parentElement) return getHoverFieldId(target.parentElement);
  return null;
};

export default getHoverFieldId;
