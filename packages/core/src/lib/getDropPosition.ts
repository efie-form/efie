import findNearestFieldId from './findNearestFieldId.ts';
import { DATASET_FORM_FIELD } from './constant.ts';

export default function getDropPosition(e: EventTarget, position: 1 | -1) {
  if (!isHTMLElement(e)) return null;
  const overFieldId = findNearestFieldId(e);
  if (!overFieldId) return null;
  const overFieldNode = document.querySelector(
    `[${DATASET_FORM_FIELD}="${overFieldId}"]`
  );
  if (!overFieldNode) return null;

  if (overFieldId === 'root') {
    // special case for handle root
    return 'root';
  }

  // find parent field id
  const parentId = findNearestFieldId(overFieldNode.parentElement);
  if (!parentId) return null;

  // list children but exclude placeholder/field to move itself if there is
  const parentNode = overFieldNode.parentNode;
  if (!parentNode) return null;
  const children = Array.from(parentNode.children).filter((child) =>
    child.hasAttribute(DATASET_FORM_FIELD)
  );

  // find over field index
  const overFieldIndex = children.findIndex(
    (child) => child.getAttribute(DATASET_FORM_FIELD) === overFieldId
  );

  // determine insert before or after
  const insertIndex = position === 1 ? overFieldIndex + 1 : overFieldIndex;

  return {
    parentId,
    index: insertIndex,
  };
}

const isHTMLElement = (e: EventTarget | null): e is HTMLElement =>
  e instanceof HTMLElement;
