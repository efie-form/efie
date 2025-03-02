import type { FormFieldType } from '@efie-form/core';
import { useSchemaStore } from './state/schema.state';

export default function getSettingsParentField(fieldId: string) {
  const parentField = getSelectableParentField(fieldId);

  if (!parentField) return;

  return parentField;
}

const nonSelectableFields: FormFieldType[] = ['column'];

function getSelectableParentField(fieldId: string) {
  const { getFieldParentId, getFieldById } = useSchemaStore.getState();
  const parentId = getFieldParentId(fieldId);
  if (!parentId) return;

  const parentField = getFieldById(parentId);
  if (!parentField || nonSelectableFields.includes(parentField.type)) {
    return getSelectableParentField(parentId);
  }

  return parentField;
}
