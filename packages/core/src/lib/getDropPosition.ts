import findNearestField from './findNearestField.ts';
import {
  DATASET_DROP_ZONE,
  DATASET_FORM_FIELD,
  DROP_ZONE_TYPE,
} from './constant.ts';

export default function getDropPosition(
  e: EventTarget,
  position: 1 | -1,
  movingFieldId: string | null
) {
  if (!isHTMLElement(e)) return null;
  const nearestField = findNearestField(e);
  if (!nearestField) return null;
  const {
    fieldId: overFieldId,
    dropZoneType: overDropZoneType,
    element: overFieldNode,
  } = nearestField;

  // check if over field is same element or its child
  if (overFieldId && movingFieldId && overFieldId === movingFieldId)
    return null;
  if (movingFieldId && isChildElement(e, movingFieldId)) return null;

  if (overDropZoneType === DROP_ZONE_TYPE.root) {
    // special case for handle root
    return {
      dropZoneType: DROP_ZONE_TYPE.root,
      parentId: null,
      index: getRootNodeCount() - 1,
    };
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
  const children = Array.from(parentNode.children).filter(
    (child) =>
      child.hasAttribute(DATASET_FORM_FIELD) &&
      isMovingFieldExcludeItself(child, movingFieldId)
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

const isMovingFieldExcludeItself = (
  child: Element,
  movingFieldId: string | null
) =>
  !movingFieldId ||
  (movingFieldId && child.getAttribute(DATASET_FORM_FIELD) !== movingFieldId);

function isChildElement(e: EventTarget | null, targetFieldId: string) {
  if (!e) return false;
  if (!(e instanceof HTMLElement)) return false;
  const fieldId = e.getAttribute(DATASET_FORM_FIELD);
  const dropZoneType = e.getAttribute(DATASET_DROP_ZONE);
  if (dropZoneType === DROP_ZONE_TYPE.field && fieldId === targetFieldId)
    return true;

  if (dropZoneType === DROP_ZONE_TYPE.root) return false;

  return isChildElement(e.parentElement, targetFieldId);
}

function getRootNodeCount() {
  const rootNodes = document.querySelector(`[${DATASET_DROP_ZONE}="field"]`);
  if (!rootNodes?.parentNode) return 0;
  return rootNodes.parentNode.childNodes.length;
}
