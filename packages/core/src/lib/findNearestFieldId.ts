import { DATASET_FORM_FIELD } from './constant.ts';

export default function findNearestFieldId(e: EventTarget | null) {
  if (!e) return null;
  if (!(e instanceof HTMLElement)) return null;
  const fieldId = e.getAttribute(DATASET_FORM_FIELD);
  if (!fieldId) return findNearestFieldId(e.parentElement);
  return fieldId;
}
