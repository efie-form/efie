import type { FormField } from '@efie-form/core';
import type { StateSetters } from './types';
import { deepClone, generateId, getFieldInfoMap } from './utils';

export function createFieldActions({ set, getState }: StateSetters) {
  return {
    // Field management methods
    addField: (field: FormField, parentId?: string, index?: number) => {
      const { schema, addHistory } = getState();
      const newField = deepClone(field);
      newField.id = generateId();

      if (parentId) {
        const parent = getState().fieldMap.get(parentId);
        if (parent && 'children' in parent) {
          const newChildren = [...parent.children];
          if (index !== undefined && index >= 0 && index <= newChildren.length) {
            newChildren.splice(index, 0, newField);
          }
          else {
            newChildren.push(newField);
          }

          const updateFieldInSchema = (fields: FormField[]): FormField[] => {
            return fields.map((f) => {
              if (f.id === parentId) {
                return { ...f, children: newChildren } as FormField;
              }
              if ('children' in f && f.children) {
                return { ...f, children: updateFieldInSchema(f.children) } as FormField;
              }
              return f;
            });
          };

          const newSchema = {
            ...schema,
            form: { ...schema.form, fields: updateFieldInSchema(schema.form.fields) },
          };

          const { fieldKeyMap, fieldMap, fieldParentMap } = getFieldInfoMap(newSchema.form.fields);
          addHistory(newSchema);
          set({ schema: newSchema, fieldMap, fieldKeyMap, fieldParentMap });
        }
      }
      else {
        // Add to root level
        const newFields = [...schema.form.fields];
        if (index !== undefined && index >= 0 && index <= newFields.length) {
          newFields.splice(index, 0, newField);
        }
        else {
          newFields.push(newField);
        }

        const newSchema = {
          ...schema,
          form: { ...schema.form, fields: newFields },
        };

        const { fieldKeyMap, fieldMap, fieldParentMap } = getFieldInfoMap(newFields);
        addHistory(newSchema);
        set({ schema: newSchema, fieldMap, fieldKeyMap, fieldParentMap });
      }
    },

    updateField: (fieldId: string, updates: Partial<FormField>) => {
      const { schema, addHistory } = getState();
      const field = getState().fieldMap.get(fieldId);
      if (!field) return;

      const updatedField = deepClone({ ...field, ...updates }) as FormField;

      const updateFieldInSchema = (fields: FormField[]): FormField[] => {
        return fields.map((f) => {
          if (f.id === fieldId) {
            return updatedField;
          }
          if ('children' in f && f.children) {
            return { ...f, children: updateFieldInSchema(f.children) } as FormField;
          }
          return f;
        });
      };

      const newSchema = {
        ...schema,
        form: { ...schema.form, fields: updateFieldInSchema(schema.form.fields) },
      };

      const { fieldKeyMap, fieldMap, fieldParentMap } = getFieldInfoMap(newSchema.form.fields);
      addHistory(newSchema);
      set({ schema: newSchema, fieldMap, fieldKeyMap, fieldParentMap });
    },

    duplicateField: (fieldId: string): FormField | undefined => {
      const field = getState().fieldMap.get(fieldId);
      if (!field) return undefined;

      const duplicateFieldRecursive = (originalField: FormField): FormField => {
        const newField = deepClone(originalField) as FormField;
        newField.id = generateId();

        if ('children' in newField && newField.children) {
          newField.children = newField.children.map(child => duplicateFieldRecursive(child));
        }

        return newField;
      };

      return duplicateFieldRecursive(field);
    },

    moveField: (fieldId: string, newParentId: string, newIndex: number) => {
      const { schema, addHistory } = getState();
      const field = getState().fieldMap.get(fieldId);

      if (!field) return;

      // Create a new schema with the field moved
      const newSchema = deepClone(schema);

      // Remove from old location
      const removeFromParent = (fields: FormField[]): FormField[] => {
        return fields.filter(f => f.id !== fieldId).map((f) => {
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
      addHistory(newSchema);
      set({ schema: newSchema, fieldMap, fieldKeyMap, fieldParentMap });
    },

    deleteField: (fieldId: string) => {
      const { schema, addHistory } = getState();

      const removeFieldFromSchema = (fields: FormField[]): FormField[] => {
        return fields.filter(f => f.id !== fieldId).map((f) => {
          if ('children' in f && f.children) {
            return { ...f, children: removeFieldFromSchema(f.children) } as FormField;
          }
          return f;
        });
      };

      const newSchema = {
        ...schema,
        form: { ...schema.form, fields: removeFieldFromSchema(schema.form.fields) },
      };

      const { fieldKeyMap, fieldMap, fieldParentMap } = getFieldInfoMap(newSchema.form.fields);
      addHistory(newSchema);
      set({ schema: newSchema, fieldMap, fieldKeyMap, fieldParentMap });
    },

    // Core field access methods
    getFieldById: (fieldId?: string) => {
      if (!fieldId) return;
      return getState().fieldMap.get(fieldId);
    },

    getFieldKeyById: (fieldId?: string) => {
      if (!fieldId) return;
      return getState().fieldKeyMap.get(fieldId);
    },

    getFieldParentId: (fieldId?: string) => {
      if (!fieldId) return;
      return getState().fieldParentMap.get(fieldId);
    },
  };
}
