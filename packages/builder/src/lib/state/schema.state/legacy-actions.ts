import { FieldType, type FormField, type FormInputField, type PageFormField } from '@efie-form/core';
import type { StateSetters } from './types';

export function createLegacyActions({ getState }: StateSetters) {
  return {

    getPage: (pageId?: string): PageFormField | undefined => {
      if (!pageId) return;
      const { schema } = getState();
      return schema.form.fields
        .filter(field => field.type === FieldType.PAGE)
        .find(field => field.id === pageId) as PageFormField | undefined;
    },

    updatePages: (pages: FormField[]) => {
      getState().setFields(pages);
    },

    updateFieldForm: (fieldId: string, form: FormInputField['form']) => {
      const field = getState().fieldMap.get(fieldId);
      if (!field || !('form' in field)) return;
      getState().updateField(fieldId, { form } as Partial<FormField>);
    },

    replaceFieldChildren: (fieldId: string, children: FormField[]) => {
      const field = getState().fieldMap.get(fieldId);
      if (!field || !('children' in field)) return;
      getState().updateField(fieldId, { children } as Partial<FormField>);
    },
  };
}
