import { FormField, FormFieldPage, FormSchema } from '@efie-form/core';
import { create } from 'zustand';
import defaultSchema from '../defaultSchema';
import { FieldPropsKey } from '../genFieldKey';
import { FieldPathValue } from 'react-hook-form';

interface SchemaState {
  schema: FormSchema;
  setSchema: (schema: FormSchema) => void;
  setFields: (fields: FormField[]) => void;
  updateFieldProps: (
    fieldId: string,
    key: FieldPropsKey,
    value: unknown
  ) => void;
  getPage: (pageId: string | null) => FormFieldPage | undefined;
  fieldMap: Map<string, FormField>;
  fieldKeyMap: Map<string, string>;
  getFieldById: (fieldId: string | null) => FormField | undefined;
  getFieldKeyById: (fieldId: string | null) => string | undefined;
  getFieldProps: <T extends FieldPropsKey>(
    fieldId: string,
    key: T
  ) => FieldPathValue<FormSchema, `form.fields.${number}.${T}`>;
  deleteField: (fieldId: string) => void;
  fieldParentMap: Map<string, string>;
}

const fieldInfo = getFieldInfoMap(defaultSchema.form.fields);

export const useSchemaStore = create<SchemaState>((set, getState) => ({
  schema: defaultSchema,
  fieldParentMap: fieldInfo.fieldParentMap,
  fieldMap: fieldInfo.fieldMap,
  fieldKeyMap: fieldInfo.fieldKeyMap,
  setSchema: (schema) => {
    const { fieldKeyMap, fieldMap, fieldParentMap } = getFieldInfoMap(
      schema.form.fields
    );
    set({
      schema,
      fieldKeyMap,
      fieldMap,
      fieldParentMap,
    });
  },
  setFields: (fields) => {
    const { fieldKeyMap, fieldMap, fieldParentMap } = getFieldInfoMap(fields);
    set((state) => ({
      schema: { ...state.schema, form: { fields } },
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
  getFieldById: (fieldId) => {
    if (!fieldId) return;
    return getState().fieldMap.get(fieldId);
  },
  getFieldKeyById: (fieldId) => {
    if (!fieldId) return;
    return getState().fieldKeyMap.get(fieldId);
  },
  updateFieldProps: (fieldId, key, value) => {
    const { fieldMap } = getState();
    const field = fieldMap.get(fieldId);
    if (!field) return;
    iterateSetValue(field, key.split('.'), value);
    fieldMap.set(fieldId, field);
    set({ fieldMap });
  },
  getFieldProps: (fieldId, key) => {
    const { fieldMap } = getState();
    const field = fieldMap.get(fieldId);
    if (!field) return;
    return iterateGetFieldProps(field, key.split('.'));
  },
  deleteField: (fieldId) => {
    const { fieldMap, fieldKeyMap, fieldParentMap } = getState();
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
    set({ fieldMap, fieldKeyMap, fieldParentMap });
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
  if (Array.isArray(field[key]) && !isNaN(Number(value))) {
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
  if (Array.isArray(field[key]) && !isNaN(Number(key))) {
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
      field.children.forEach((child) => {
        fieldParentMap.set(child.id, field.id);
      });
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
