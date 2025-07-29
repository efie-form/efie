import type { StateSetters } from './types';

export interface SchemaStateFormDataActions {
  getFieldName: (fieldId: string) => string | undefined;
  setFieldName: (fieldId: string, name: string) => void;
}

export function createFormDataActions({ getState }: StateSetters): SchemaStateFormDataActions {
  return {
    // Placeholder for form data actions
    setFieldName: (fieldId, name) => {
      const { updateField, getFieldById } = getState();
      const field = getFieldById(fieldId);
      if (!field) return;

      if (!('form' in field)) return;

      field.form.name = name;
      updateField(fieldId, field);
    },
    getFieldName: (fieldId) => {
      const { getFieldById } = getState();
      const field = getFieldById(fieldId);
      if (!field || !('form' in field)) return undefined;

      return field.form.name;
    },
  };
}
