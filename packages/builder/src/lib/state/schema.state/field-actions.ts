import { FieldType, type FormField, type FormSchema } from '@efie-form/core';
import type { StateSetters } from './types';
import {
  addFieldToTree,
  deepClone,
  generateId,
  getFieldInfoMap,
  removeFieldFromTree,
} from './utils';

export interface SchemaStateFieldActions {
  // Field management methods
  addField: (field: FormField, parentId?: string, index?: number) => void;
  updateField: (fieldId: string, updates: FormField) => void;
  duplicateField: (fieldId: string) => string | undefined;
  moveField: (fieldId: string, newParentId: string, newIndex: number) => void;
  deleteField: (fieldId: string) => void;
  movePage: (from: number, to: number) => void;
}
export function createFieldActions({ set, getState }: StateSetters): SchemaStateFieldActions {
  return {
    // Field management methods
    addField: (field: FormField, parentId?: string, index?: number) => {
      const { schema } = getState();
      if (!schema?.form.fields) return;
      const newField = deepClone(field);
      newField.id = generateId();

      const newFields = addFieldToTree(schema.form.fields, newField, parentId, index);

      const newSchema = {
        ...schema,
        form: { ...schema.form, fields: newFields },
      };

      const { fieldMap, fieldParentMap } = getFieldInfoMap(newFields);

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
        fieldMap,
        fieldParentMap,
        histories: newHistories,
        totalHistories: newHistories.length,
        currentHistoryIndex: newHistories.length - 1,
      });
    },

    updateField: (fieldId, updatedField) => {
      const { fieldMap, schema } = getState();
      if (!schema?.form.fields) return;

      // Update field in schema using optimized tree traversal
      const updateFieldInTree = (fields: FormField[]): FormField[] => {
        return fields.map((f) => {
          if (f.id === fieldId) {
            return updatedField;
          }
          if ('children' in f && f.children) {
            const updatedChildren = updateFieldInTree(f.children);
            if (updatedChildren !== f.children) {
              return { ...f, children: updatedChildren } as FormField;
            }
          }
          return f;
        });
      };

      const newSchema = {
        ...schema,
        form: {
          ...schema.form,
          fields: updateFieldInTree(schema.form.fields),
        },
      };

      const { fieldParentMap } = getFieldInfoMap(newSchema.form.fields);

      // Get current history state
      const { maxHistories, histories, currentHistoryIndex } = getState();
      const stringifiedSchema = JSON.stringify(newSchema);

      // Prepare new history (with debounce effect by checking if schema actually changed)
      let newHistories = histories.slice(0, currentHistoryIndex + 1);
      let shouldUpdateHistory = true;

      if (newHistories.length > 0 && newHistories.at(-1) === stringifiedSchema) {
        shouldUpdateHistory = false; // Schema hasn't changed, don't add to history
      }

      if (shouldUpdateHistory) {
        newHistories.push(stringifiedSchema);
        if (newHistories.length > maxHistories) {
          newHistories = newHistories.slice(newHistories.length - maxHistories);
        }
      }

      // Single atomic state update
      if (shouldUpdateHistory) {
        set({
          schema: newSchema,
          fieldMap: new Map(fieldMap).set(fieldId, updatedField),
          fieldParentMap,
          histories: newHistories,
          totalHistories: newHistories.length,
          currentHistoryIndex: newHistories.length - 1,
        });
      } else {
        // Update only the essential state without history changes
        set({
          schema: newSchema,
          fieldMap: new Map(fieldMap).set(fieldId, updatedField),
          fieldParentMap,
        });
      }
    },

    duplicateField: (fieldId: string): string | undefined => {
      const { schema, fieldParentMap } = getState();
      if (!schema?.form.fields) return undefined;

      const field = getState().fieldMap.get(fieldId);
      if (!field) return undefined;

      const duplicateFieldRecursive = (originalField: FormField): FormField => {
        const newField = deepClone(originalField) as FormField;
        newField.id = generateId();

        if ('children' in newField && newField.children) {
          newField.children = newField.children.map((child) => duplicateFieldRecursive(child));
        }

        return newField;
      };

      const duplicatedField = duplicateFieldRecursive(field);

      // Find the parent and index of the original field
      const parentId = fieldParentMap.get(fieldId);
      let insertIndex: number | undefined;

      if (parentId) {
        const parent = getState().fieldMap.get(parentId);
        if (parent && 'children' in parent && parent.children) {
          const originalIndex = parent.children.findIndex((child) => child.id === fieldId);
          insertIndex = originalIndex + 1; // Insert right after the original
        }
      } else {
        // Root level field
        const originalIndex = schema.form.fields.findIndex((field) => field.id === fieldId);
        insertIndex = originalIndex + 1; // Insert right after the original
      }

      // Add the duplicated field to the schema
      const newFields = addFieldToTree(schema.form.fields, duplicatedField, parentId, insertIndex);

      const newSchema = {
        ...schema,
        form: { ...schema.form, fields: newFields },
      };

      const { fieldMap, fieldParentMap: newFieldParentMap } = getFieldInfoMap(newFields);

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
        fieldMap,
        fieldParentMap: newFieldParentMap,
        histories: newHistories,
        totalHistories: newHistories.length,
        currentHistoryIndex: newHistories.length - 1,
      });

      return duplicatedField.id;
    },

    moveField: (fieldId: string, newParentId: string, newIndex: number) => {
      const { schema } = getState();
      if (!schema?.form.fields) return;
      const field = getState().fieldMap.get(fieldId);

      if (!field) return;

      // Create a new schema with the field moved
      const newSchema = deepClone(schema);

      // Remove from old location
      const removeFromParent = (fields: FormField[]): FormField[] => {
        return fields
          .filter((f) => f.id !== fieldId)
          .map((f) => {
            if ('children' in f && f.children) {
              return { ...f, children: removeFromParent(f.children) } as FormField;
            }
            return f;
          });
      };

      // Add to new location
      const addToParent = (fields: FormField[]): FormField[] => {
        return fields.map((f) => {
          if (f.id === newParentId && 'children' in f) {
            const newChildren = [...f.children];
            newChildren.splice(newIndex, 0, field);
            return { ...f, children: newChildren } as FormField;
          }
          if ('children' in f && f.children) {
            return { ...f, children: addToParent(f.children) } as FormField;
          }
          return f;
        });
      };

      newSchema.form.fields = removeFromParent(newSchema.form.fields);
      newSchema.form.fields = addToParent(newSchema.form.fields);

      const { fieldMap, fieldParentMap } = getFieldInfoMap(newSchema.form.fields);

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
        fieldMap,
        fieldParentMap,
        histories: newHistories,
        totalHistories: newHistories.length,
        currentHistoryIndex: newHistories.length - 1,
      });
    },

    deleteField: (fieldId: string) => {
      const { schema } = getState();
      if (!schema?.form.fields) return;

      const newFields = removeFieldFromTree(schema.form.fields, fieldId);

      const newSchema = {
        ...schema,
        form: { ...schema.form, fields: newFields },
      };

      const { fieldMap, fieldParentMap } = getFieldInfoMap(newFields);

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
        fieldMap,
        fieldParentMap,
        histories: newHistories,
        totalHistories: newHistories.length,
        currentHistoryIndex: newHistories.length - 1,
      });
    },

    movePage: (from: number, to: number) => {
      const { schema } = getState();
      if (!schema?.form.fields) return;
      const pages = schema?.form.fields.filter((field) => field.type === FieldType.PAGE) || [];

      if (from < 0 || from >= pages.length || to < 0 || to >= pages.length || from === to) {
        return; // Invalid indices or no change needed
      }

      const newPages = [...pages];
      const [movedPage] = newPages.splice(from, 1);
      newPages.splice(to, 0, movedPage);

      const newSchema: FormSchema = {
        ...schema,
        form: {
          ...schema?.form,
          fields: newPages,
        },
      };

      set({ schema: newSchema });
    },
  };
}
