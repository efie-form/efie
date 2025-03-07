import type { FormFieldType } from '../../../core-old';
import { useSchemaStore } from './state/schema.state';

export default function getSettingsParentField(fieldId: string) {
  const parentField = getSelectableParentField(fieldId);

  if (!parentField) return;

  return parentField;
}

const nonSelectableFields: Set<FormFieldType> = new Set(['column']);

function getSelectableParentField(fieldId: string) {
  const { getFieldParentId, getFieldById } = useSchemaStore.getState();
  const parentId = getFieldParentId(fieldId);
  if (!parentId) return;

  const parentField = getFieldById(parentId);
  if (!parentField || nonSelectableFields.has(parentField.type)) {
    return getSelectableParentField(parentId);
  }

  return parentField;
}
