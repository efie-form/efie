import type { FormField, FormFieldPage, FormSchema } from '@efie-form/core';
import { create } from 'zustand';
import defaultSchema from '../defaultSchema';
import type { FieldPropsKey } from '../genFieldKey';
import type { FieldPathValue } from 'react-hook-form';

interface SchemaState {
  schema: FormSchema;
  setSchema: (schema: FormSchema) => void;
  setFields: (fields: FormField[]) => void;
  updateFieldProps: (
    fieldId: string,
    key: FieldPropsKey,
    value: unknown
  ) => void;
  getPage: (pageId?: string) => FormFieldPage | undefined;
  updatePages: (pages: FormFieldPage[]) => void;
  fieldMap: Map<string, FormField>;
  fieldKeyMap: Map<string, string>;
  getFieldById: (fieldId?: string) => FormField | undefined;
  getFieldKeyById: (fieldId?: string) => string | undefined;
  getFieldParentId: (fieldId?: string) => string | undefined;
  getFieldProps: <T extends FieldPropsKey>(
    fieldId: string,
    key: T
  ) => FieldPathValue<FormSchema, `form.fields.${number}.${T}`>;
  deleteField: (fieldId: string) => void;
  fieldParentMap: Map<string, string>;
  maxHistories: number;
  setMaxHistories: (maxHistories: number) => void;
  histories: string[];
  addHistory: (schema: FormSchema) => void;
  undo: () => void;
  redo: () => void;
  clearHistories: () => void;
  totalHistories: number;
  currentHistoryIndex: number;
  canUndo: () => boolean;
  canRedo: () => boolean;
}

const fieldInfo = getFieldInfoMap(defaultSchema.form.fields);

export const useSchemaStore = create<SchemaState>((set, getState) => ({
  schema: defaultSchema,
  fieldParentMap: fieldInfo.fieldParentMap,
  fieldMap: fieldInfo.fieldMap,
  fieldKeyMap: fieldInfo.fieldKeyMap,
  setSchema: (schema) => {
    const { addHistory } = getState();
    const { fieldKeyMap, fieldMap, fieldParentMap } = getFieldInfoMap(
      schema.form.fields
    );
    console.log(fieldMap);
    addHistory(schema);
    set({
      schema,
      fieldKeyMap,
      fieldMap,
      fieldParentMap,
    });
  },
  setFields: (fields) => {
    const { addHistory, schema } = getState();
    const { fieldKeyMap, fieldMap, fieldParentMap } = getFieldInfoMap(fields);
    const newSchema = { ...schema, form: { fields } };
    addHistory(newSchema);

    set(() => ({
      schema: newSchema,
      fieldKeyMap,
      fieldMap,
      fieldParentMap,
    }));
  },
  getPage: (pageId) => {
    if (!pageId) return;
    const { schema } = getState();
    return schema.form.fields
      .filter((field) => field.type === 'page')
      .find((field) => field.id === pageId);
  },
  updatePages: (pages) => {
    const { fieldMap, fieldKeyMap, schema, addHistory } = getState();
    for (const [index, page] of pages.entries()) {
      fieldMap.set(page.id, page);
      fieldKeyMap.set(page.id, `form.fields.${index}`);
    }
    const newSchema = { ...schema, form: { fields: pages } };
    addHistory(newSchema);
    set({
      fieldMap,
      fieldKeyMap,
      schema: newSchema,
    });
  },
  getFieldById: (fieldId) => {
    if (!fieldId) return;
    return getState().fieldMap.get(fieldId);
  },
  getFieldKeyById: (fieldId) => {
    if (!fieldId) return;
    return getState().fieldKeyMap.get(fieldId);
  },
  getFieldParentId: (fieldId) => {
    if (!fieldId) return;
    return getState().fieldParentMap.get(fieldId);
  },
  updateFieldProps: (fieldId, key, value) => {
    const { fieldMap, fieldParentMap, fieldKeyMap, schema, addHistory } =
      getState();
    const field = fieldMap.get(fieldId);
    if (!field) return;
    iterateSetValue(field, key.split('.'), value);
    fieldMap.set(fieldId, field);

    if (key === 'children' && 'children' in field) {
      for (const [index, child] of field.children.entries()) {
        fieldMap.set(child.id, child);
        fieldParentMap.set(child.id, fieldId);
        fieldKeyMap.set(
          child.id,
          fieldKeyMap.get(fieldId) + `.children.${index}`
        );
      }
    }

    addHistory(schema);

    set({ fieldMap, fieldParentMap, fieldKeyMap });
  },
  getFieldProps: (fieldId, key) => {
    const { fieldMap } = getState();
    const field = fieldMap.get(fieldId);
    if (!field) return;
    return iterateGetFieldProps(field, key.split('.'));
  },
  deleteField: (fieldId) => {
    const { fieldMap, fieldKeyMap, fieldParentMap, schema, addHistory } =
      getState();
    const parentId = fieldParentMap.get(fieldId);
    if (parentId) {
      const parent = fieldMap.get(parentId);
      if (parent && 'children' in parent) {
        parent.children = parent.children.filter(
          (child) => child.id !== fieldId
        );
        fieldMap.set(parentId, parent);
      }
    }
    fieldMap.delete(fieldId);
    fieldKeyMap.delete(fieldId);
    fieldParentMap.delete(fieldId);
    addHistory(schema);
    set({ fieldMap, fieldKeyMap, fieldParentMap });
  },
  maxHistories: 50,
  setMaxHistories: (maxHistories) => {
    set({ maxHistories });
  },
  histories: [JSON.stringify(defaultSchema)],
  redo: () => {
    const { histories, currentHistoryIndex } = getState();
    const nextHistoryIndex = currentHistoryIndex + 1;
    if (nextHistoryIndex >= histories.length) return;
    const nextHistory = histories[nextHistoryIndex];
    const newSchema = JSON.parse(nextHistory);

    const { fieldMap, fieldKeyMap, fieldParentMap } = getFieldInfoMap(
      newSchema.form.fields
    );

    set({
      fieldMap,
      fieldKeyMap,
      fieldParentMap,
      schema: newSchema,
      currentHistoryIndex: nextHistoryIndex,
    });
  },
  undo: () => {
    const { histories, currentHistoryIndex } = getState();
    const previousHistoryIndex = currentHistoryIndex - 1;
    if (previousHistoryIndex < 0) return;
    const previousHistory = histories[previousHistoryIndex];
    const newSchema = JSON.parse(previousHistory);

    const { fieldMap, fieldKeyMap, fieldParentMap } = getFieldInfoMap(
      newSchema.form.fields
    );

    set({
      fieldMap,
      fieldKeyMap,
      fieldParentMap,
      schema: newSchema,
      currentHistoryIndex: previousHistoryIndex,
    });
  },
  clearHistories: () => {
    set({ histories: [], totalHistories: 0, currentHistoryIndex: 0 });
  },
  totalHistories: 0,
  currentHistoryIndex: 0,
  addHistory: (schema) => {
    const { maxHistories, histories, currentHistoryIndex } = getState();
    debounce(() => {
      const stringifiedSchema = JSON.stringify(schema);

      let newHistories = histories.slice(0, currentHistoryIndex + 1);
      newHistories.push(stringifiedSchema);

      if (newHistories.length > maxHistories) {
        newHistories = newHistories.slice(newHistories.length - maxHistories);
      }

      set({
        histories: newHistories,
        totalHistories: newHistories.length,
        currentHistoryIndex: newHistories.length - 1,
      });
    }, 250);
  },
  canUndo: () => {
    const { currentHistoryIndex } = getState();
    return currentHistoryIndex > 0;
  },
  canRedo: () => {
    const { currentHistoryIndex, totalHistories } = getState();
    return currentHistoryIndex < totalHistories - 1;
  },
}));

function iterateSetValue(
  field: Record<string, any>,
  keys: string[],
  value: any
) {
  if (keys.length === 0) return;
  const key = keys[0];
  if (keys.length === 1) {
    field[key] = value;
    return;
  }
  if (Array.isArray(field[key]) && !Number.isNaN(Number(value))) {
    iterateSetValue(field[key], keys.slice(1), value);
  } else if (typeof field[key] === 'object') {
    iterateSetValue(field[key], keys.slice(1), value);
  } else {
    field[key] = value;
  }
}

function iterateGetFieldProps(field: Record<string, any>, keys: string[]) {
  if (keys.length === 0) return;
  const key = keys[0];
  if (keys.length === 1) {
    return field[key];
  }
  if (Array.isArray(field[key]) && !Number.isNaN(Number(key))) {
    return iterateGetFieldProps(field[key], keys.slice(1));
  } else if (typeof field[key] === 'object') {
    return iterateGetFieldProps(field[key], keys.slice(1));
  }
  return field[key];
}

function getFieldInfoMap(
  fields: FormField[],
  fieldKeyMap: Map<string, string> = new Map(),
  fieldMap: Map<string, FormField> = new Map(),
  fieldParentMap: Map<string, string> = new Map(),
  fieldKey: string = 'form.fields'
) {
  for (const i in fields) {
    const field = fields[i];
    fieldKeyMap.set(field.id, `${fieldKey}.${i}`);
    fieldMap.set(field.id, field);
    if ('children' in field) {
      for (const child of field.children) {
        fieldParentMap.set(child.id, field.id);
      }
      getFieldInfoMap(
        field.children,
        fieldKeyMap,
        fieldMap,
        fieldParentMap,
        `${fieldKey}.${i}.children`
      );
    }
  }
  return { fieldKeyMap, fieldMap, fieldParentMap };
}

let timeout: NodeJS.Timeout;

function debounce(fn: () => void, delay: number) {
  clearTimeout(timeout);
  timeout = setTimeout(fn, delay);
}
