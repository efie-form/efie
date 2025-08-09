import { FieldType, type FormField, type FormSchema, PropertyType } from '@efie-form/core';
import { clearAllDebounceTimers, useSchemaStore } from '../../../lib/state/schema.state';

export const makePage = (id: string, name = 'Page'): FormField => ({
  id,
  type: FieldType.PAGE,
  children: [],
  props: [{ type: PropertyType.NAME, value: name }],
});

export const makeShort = (id: string, label = 'Short', name = 'short'): FormField => ({
  id,
  type: FieldType.SHORT_TEXT,
  form: { name },
  props: [{ type: PropertyType.LABEL, value: label }],
});

export const makeGroup = (id: string): FormField => ({
  id,
  type: FieldType.GROUP,
  children: [],
  props: [],
});

export const createSchema = (fields: FormField[] = []): FormSchema => ({
  version: '1.0.0',
  form: { fields },
});

export const resetStore = () => {
  // wipe debounces timers
  clearAllDebounceTimers();
  // reset only data parts; methods stay intact
  useSchemaStore.setState({
    schema: undefined,
    fieldMap: new Map(),
    fieldKeyMap: new Map(),
    fieldParentMap: new Map(),
    histories: [],
    totalHistories: 1,
    currentHistoryIndex: 0,
    maxHistories: 50,
  });
};

export const initSchema = (fields: FormField[] = []) => {
  const schema = createSchema(fields);
  useSchemaStore.getState().setSchema(schema);
  return schema;
};
