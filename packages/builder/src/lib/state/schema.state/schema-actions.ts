import type { FormField, FormSchema } from '@efie-form/core';
import type { StateSetters } from './types';
import { getFieldInfoMap } from './utils';

export function createSchemaActions({ set, getState }: StateSetters) {
  return {
    setSchema: (schema: FormSchema) => {
      const { addHistory } = getState();
      const { fieldKeyMap, fieldMap, fieldParentMap } = getFieldInfoMap(schema.form.fields);
      addHistory(schema, true); // Skip debounce for schema changes
      set({ schema, fieldKeyMap, fieldMap, fieldParentMap });
    },

    setFields: (fields: FormField[]) => {
      const { addHistory, schema } = getState();
      const { fieldKeyMap, fieldMap, fieldParentMap } = getFieldInfoMap(fields);
      const newSchema = {
        ...schema,
        form: { fields, rules: schema.form.rules },
      };
      addHistory(newSchema, true); // Skip debounce for field changes
      set({ schema: newSchema, fieldKeyMap, fieldMap, fieldParentMap });
    },
  };
}
