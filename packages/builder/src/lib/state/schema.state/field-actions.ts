import type { FormField } from '@efie-form/core';
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
  duplicateField: (fieldId: string) => FormField | undefined;
  moveField: (fieldId: string, newParentId: string, newIndex: number) => void;
  deleteField: (fieldId: string) => void;
}
export function createFieldActions({ set, getState }: StateSetters): SchemaStateFieldActions {
  return {
    // Field management methods
    addField: (field: FormField, parentId?: string, index?: number) => {
      const { schema } = getState();
      const newField = deepClone(field);
      newField.id = generateId();

      const newFields = addFieldToTree(schema.form.fields, newField, parentId, index);

      const newSchema = {
        ...schema,
        form: { ...schema.form, fields: newFields },
      };

      const { fieldKeyMap, fieldMap, fieldParentMap } = getFieldInfoMap(newFields);

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
        fieldKeyMap,
        fieldParentMap,
        histories: newHistories,
        totalHistories: newHistories.length,
        currentHistoryIndex: newHistories.length - 1,
      });
    },

    updateField: (fieldId, updatedField) => {
      const { fieldMap } = getState();
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
        ...getState().schema,
        form: {
          ...getState().schema.form,
          fields: updateFieldInTree(getState().schema.form.fields),
        },
      };

      const { fieldKeyMap, fieldParentMap } = getFieldInfoMap(newSchema.form.fields);

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
          fieldKeyMap,
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
          fieldKeyMap,
          fieldParentMap,
        });
      }
    },

    duplicateField: (fieldId: string): FormField | undefined => {
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

      return duplicateFieldRecursive(field);
    },

    moveField: (fieldId: string, newParentId: string, newIndex: number) => {
      const { schema } = getState();
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

      const { fieldKeyMap, fieldMap, fieldParentMap } = getFieldInfoMap(newSchema.form.fields);

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
        fieldKeyMap,
        fieldParentMap,
        histories: newHistories,
        totalHistories: newHistories.length,
        currentHistoryIndex: newHistories.length - 1,
      });
    },

    deleteField: (fieldId: string) => {
      const { schema } = getState();

      const newFields = removeFieldFromTree(schema.form.fields, fieldId);

      const newSchema = {
        ...schema,
        form: { ...schema.form, fields: newFields },
      };

      const { fieldKeyMap, fieldMap, fieldParentMap } = getFieldInfoMap(newFields);

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
        fieldKeyMap,
        fieldParentMap,
        histories: newHistories,
        totalHistories: newHistories.length,
        currentHistoryIndex: newHistories.length - 1,
      });
    },
  };
}
