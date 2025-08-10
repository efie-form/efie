import type { FormField, FormSchema } from '@efie-form/core';
import type { StateSetters } from './types';
import { getFieldInfoMap } from './utils';

export interface SchemaStateSchemaActions {
  setSchema: (schema: FormSchema) => void;
  setFields: (fields: FormField[]) => void;
}

export function createSchemaActions({ set, getState }: StateSetters): SchemaStateSchemaActions {
  return {
    setSchema: (schema: FormSchema) => {
      const { fieldKeyMap, fieldMap, fieldParentMap } = getFieldInfoMap(schema.form.fields);

      // Get current history state
      const { maxHistories, histories, currentHistoryIndex } = getState();
      const stringifiedSchema = JSON.stringify(schema);

      // Prepare new history
      let newHistories = histories.slice(0, currentHistoryIndex + 1);
      if (newHistories.length === 0 || newHistories.at(-1) !== stringifiedSchema) {
        newHistories.push(stringifiedSchema);
        if (newHistories.length > maxHistories) {
          newHistories = newHistories.slice(newHistories.length - maxHistories);
        }
      }

      // Single atomic state update
      set({
        schema,
        fieldKeyMap,
        fieldMap,
        fieldParentMap,
        histories: newHistories,
        totalHistories: newHistories.length,
        currentHistoryIndex: newHistories.length - 1,
      });
    },

    setFields: (fields: FormField[]) => {
      const { schema } = getState();
      if (!schema?.form.fields) return;
      const { fieldKeyMap, fieldMap, fieldParentMap } = getFieldInfoMap(fields);
      const newSchema = {
        ...schema,
        form: { fields, rules: schema?.form.rules },
      };

      // Get current history state
      const { maxHistories, histories, currentHistoryIndex } = getState();
      const stringifiedSchema = JSON.stringify(newSchema);

      // Prepare new history
      let newHistories = histories.slice(0, currentHistoryIndex + 1);
      if (newHistories.length === 0 || newHistories.at(-1) !== stringifiedSchema) {
        newHistories.push(stringifiedSchema);
        if (newHistories.length > maxHistories) {
          newHistories = newHistories.slice(newHistories.length - maxHistories);
        }
      }

      // Single atomic state update
      set({
        schema: newSchema,
        fieldKeyMap,
        fieldMap,
        fieldParentMap,
        histories: newHistories,
        totalHistories: newHistories.length,
        currentHistoryIndex: newHistories.length - 1,
      });
    },
  };
}
