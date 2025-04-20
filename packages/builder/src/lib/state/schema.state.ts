import {
  FormFieldType,
  type FormField,
  type FormInputField,
  type FormSchema,
  type PageFormField,
  type PropertyDefinition,
} from '@efie-form/core';
import { create } from 'zustand';
import defaultSchema from '../defaultSchema';

interface SchemaState {
  schema: FormSchema;
  setSchema: (schema: FormSchema) => void;
  setFields: (fields: FormField[]) => void;
  updateFieldProps: (
    fieldId: string,
    type: PropertyDefinition['type'],
    props: Omit<PropertyDefinition, 'type'>
  ) => void;
  getPage: (pageId?: string) => PageFormField | undefined;
  updatePages: (pages: FormField[]) => void;
  fieldMap: Map<string, FormField>;
  fieldKeyMap: Map<string, string>;
  getFieldById: (fieldId?: string) => FormField | undefined;
  getFieldKeyById: (fieldId?: string) => string | undefined;
  getFieldParentId: (fieldId?: string) => string | undefined;
  getFieldProps: <T extends PropertyDefinition['type']>(
    fieldId: string,
    type: T
  ) => Extract<PropertyDefinition, { type: T }> | undefined;
  updateFieldForm: (fieldId: string, form: FormInputField['form']) => void;
  replaceFieldChildren: (fieldId: string, children: FormField[]) => void;
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
      schema.form.fields,
    );
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
    const newSchema = {
      ...schema,
      form: {
        fields,
        rules: schema.form.rules,
      },
    };
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
      .filter(field => field.type === FormFieldType.PAGE)
      .find(field => field.id === pageId);
  },
  updatePages: (pages) => {
    const { fieldMap, fieldKeyMap, schema, addHistory } = getState();
    for (const [index, page] of pages.entries()) {
      fieldMap.set(page.id, page);
      fieldKeyMap.set(page.id, `form.fields.${index}`);
    }
    const newSchema = {
      ...schema,
      form: {
        fields: pages,
        rules: schema.form.rules,
      },
    };
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
  updateFieldProps: (fieldId, type, props) => {
    const { fieldMap, schema, addHistory } = getState();
    const field = fieldMap.get(fieldId);
    if (!field) return;

    // Find the property with the matching type
    const propIndex = field.props.findIndex(prop => prop.type === type);

    // Create a new property with the correct type
    const newProp = {
      type,
      ...props,
    } as (typeof field.props)[number];

    if (propIndex === -1) {
      // Add new property if it doesn't exist
      // @ts-expect-error - This is a valid operation
      field.props.push(newProp);
    }
    else {
      // Update existing property
      field.props[propIndex] = newProp;
    }

    fieldMap.set(fieldId, field);
    addHistory(schema);
  },
  getFieldProps: <T extends PropertyDefinition['type']>(
    fieldId: string,
    type: T,
  ): Extract<PropertyDefinition, { type: T }> | undefined => {
    const { fieldMap } = getState();
    const field = fieldMap.get(fieldId);
    if (!field) return;

    // Find the property with the matching type
    const prop = field.props.find(prop => prop.type === type);
    if (!prop) return;

    // Type guard to ensure we're returning the correct property type
    return prop as Extract<PropertyDefinition, { type: T }>;
  },
  updateFieldForm: (fieldId, form) => {
    const { fieldMap, schema, addHistory } = getState();
    const field = fieldMap.get(fieldId);
    if (!field || !('form' in field)) return;
    field.form = form;
    fieldMap.set(fieldId, field);
    addHistory(schema);
  },
  replaceFieldChildren: (fieldId, children) => {
    const { fieldMap, schema, addHistory, fieldKeyMap, fieldParentMap }
      = getState();
    const field = fieldMap.get(fieldId);
    if (!field || !('children' in field)) return;
    const originalChildrenId = field.children.map(child => child.id);
    const newChildrenId = children.map(child => child.id);

    const childrenToDelete = originalChildrenId.filter(
      id => !newChildrenId.includes(id),
    );
    const childrenToAdd = newChildrenId.filter(
      id => !originalChildrenId.includes(id),
    );

    field.children = children;
    for (const child of childrenToDelete) {
      fieldMap.delete(child);
      fieldKeyMap.delete(child);
      fieldParentMap.delete(child);
    }

    for (const child of childrenToAdd) {
      const childField = children.find(c => c.id === child);
      if (!childField) continue;
      fieldMap.set(child, childField);
      fieldKeyMap.set(
        child,
        `form.fields.${children.findIndex(c => c.id === child)}`,
      );
      fieldParentMap.set(child, fieldId);
    }

    fieldMap.set(fieldId, field);
    addHistory(schema);
    set({ fieldMap, fieldKeyMap, fieldParentMap });
  },
  deleteField: (fieldId) => {
    const { fieldMap, fieldKeyMap, fieldParentMap, schema, addHistory }
      = getState();
    const parentId = fieldParentMap.get(fieldId);
    if (parentId) {
      const parent = fieldMap.get(parentId);
      if (parent && 'children' in parent) {
        parent.children = parent.children.filter(
          child => child.id !== fieldId,
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
      newSchema.form.fields,
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
      newSchema.form.fields,
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

function getFieldInfoMap(
  fields: FormField[],
  fieldKeyMap: Map<string, string> = new Map(),
  fieldMap: Map<string, FormField> = new Map(),
  fieldParentMap: Map<string, string> = new Map(),
  fieldKey: string = 'form.fields',
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
        `${fieldKey}.${i}.children`,
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
