import { DATASET_DROP_ZONE, DATASET_FORM_FIELD } from './constant.ts';

export default function findNearestField(e: EventTarget | null) {
  if (!e) return null;
  if (!(e instanceof HTMLElement)) return null;
  const fieldId = e.getAttribute(DATASET_FORM_FIELD);
  const dropZoneType = e.getAttribute(DATASET_DROP_ZONE);
  if (!dropZoneType) return findNearestField(e.parentElement);
  return { dropZoneType, fieldId, element: e };
}
