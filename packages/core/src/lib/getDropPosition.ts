import findNearestField from './findNearestField.ts';
import { DATASET_FORM_FIELD, DROP_ZONE_TYPE } from './constant.ts';

export default function getDropPosition(e: EventTarget, position: 1 | -1) {
  if (!isHTMLElement(e)) return null;
  const nearestField = findNearestField(e);
  if (!nearestField) return null;
  const {
    fieldId: overFieldId,
    dropZoneType: overDropZoneType,
    element: overFieldNode,
  } = nearestField;

  if (overDropZoneType === DROP_ZONE_TYPE.root) {
    // special case for handle root
    return DROP_ZONE_TYPE.root;
  }

  if (overDropZoneType === DROP_ZONE_TYPE.emptyColumn) {
    // special case for handle empty column
    return {
      dropZoneType: DROP_ZONE_TYPE.emptyColumn,
      parentId: overFieldId,
      index: 0,
    };
  }

  // find parent field id
  const parentId = findNearestField(overFieldNode.parentElement);
  if (!parentId) return null;
  const { fieldId: parentFieldId, dropZoneType: parentDropZoneType } = parentId;

  if (!parentDropZoneType) return null;

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
    parentId: parentFieldId,
    dropZoneType: parentDropZoneType,
    index: insertIndex,
  };
}

const isHTMLElement = (e: EventTarget | null): e is HTMLElement =>
  e instanceof HTMLElement;
