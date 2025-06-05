import type { FormField } from '@efie-form/core';
import type { StateSetters } from './types';
import {
  deepClone,
  generateId,
  getFieldInfoMap,
} from './utils';
// Import optimized utilities

export function createFieldActions({ set, getState }: StateSetters) {
  return {
    // Field management methods (optimized)
    addField: (field: FormField, parentId?: string, index?: number) => {
      const { schema, addHistory, enableOptimizations } = getState();
      const newField = deepClone(field);
      newField.id = generateId();

      // Use optimized tree operations if enabled
      if (enableOptimizations) {
        // Use optimized addFieldToTree function
        const addFieldToTree = (fields: FormField[], newField: FormField, parentId?: string, index?: number): FormField[] => {
          if (!parentId) {
            // Add to root level
            const newFields = [...fields];
            if (index !== undefined && index >= 0 && index <= newFields.length) {
              newFields.splice(index, 0, newField);
            }
            else {
              newFields.push(newField);
            }
            return newFields;
          }

          // Add to specific parent
          return fields.map((field) => {
            if (field.id === parentId && 'children' in field) {
              const newChildren = [...field.children];
              if (index !== undefined && index >= 0 && index <= newChildren.length) {
                newChildren.splice(index, 0, newField);
              }
              else {
                newChildren.push(newField);
              }
              return { ...field, children: newChildren } as FormField;
            }

            if ('children' in field && field.children) {
              const updatedChildren = addFieldToTree(field.children, newField, parentId, index);
              if (updatedChildren !== field.children) {
                return { ...field, children: updatedChildren } as FormField;
              }
            }

            return field;
          });
        };

        const newFields = addFieldToTree(schema.form.fields, newField, parentId, index);

        const newSchema = {
          ...schema,
          form: { ...schema.form, fields: newFields },
        };

        const { fieldKeyMap, fieldMap, fieldParentMap } = getFieldInfoMap(newFields);

        // Add to history BEFORE updating state
        addHistory(newSchema, true); // Skip debounce for field additions

        // Then update state
        set({ schema: newSchema, fieldMap, fieldKeyMap, fieldParentMap });
        return;
      }

      // Fallback to original implementation
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
          addHistory(newSchema, true); // Skip debounce for field additions
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
        addHistory(newSchema, true); // Skip debounce for field additions
        set({ schema: newSchema, fieldMap, fieldKeyMap, fieldParentMap });
      }
    },

    updateField: (fieldId: string, updates: Partial<FormField>) => {
      const { schema, addHistory, enableOptimizations, fieldMap } = getState();
      const field = fieldMap.get(fieldId);
      if (!field) return;

      const updatedField = deepClone({ ...field, ...updates }) as FormField;

      if (enableOptimizations) {
        // Use optimized findFieldInTree function
        const findFieldInTree = (
          fields: FormField[],
          targetId: string,
          callback: (field: FormField, index: number, parent?: FormField) => FormField | void,
          parent?: FormField,
        ): FormField[] => {
          const newFields = [...fields];

          for (let i = 0; i < newFields.length; i++) {
            const currentField = newFields[i];

            if (currentField.id === targetId) {
              const result = callback(currentField, i, parent);
              if (result) {
                newFields[i] = result;
              }
              return newFields;
            }

            if ('children' in currentField && currentField.children) {
              const updatedChildren = findFieldInTree(currentField.children, targetId, callback, currentField);
              if (updatedChildren !== currentField.children) {
                newFields[i] = { ...currentField, children: updatedChildren } as FormField;
                return newFields;
              }
            }
          }

          return newFields;
        };

        const newFields = findFieldInTree(schema.form.fields, fieldId, () => updatedField);

        const newSchema = {
          ...schema,
          form: { ...schema.form, fields: newFields },
        };

        const { fieldKeyMap, fieldMap: newFieldMap, fieldParentMap } = getFieldInfoMap(newFields);
        addHistory(newSchema);
        set({ schema: newSchema, fieldMap: newFieldMap, fieldKeyMap, fieldParentMap });
        return;
      }

      // Fallback to original implementation
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

      const { fieldKeyMap, fieldMap: newFieldMap, fieldParentMap } = getFieldInfoMap(newSchema.form.fields);
      addHistory(newSchema);
      set({ schema: newSchema, fieldMap: newFieldMap, fieldKeyMap, fieldParentMap });
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
      addHistory(newSchema, true); // Skip debounce for field moves
      set({ schema: newSchema, fieldMap, fieldKeyMap, fieldParentMap });
    },

    deleteField: (fieldId: string) => {
      const { schema, addHistory, enableOptimizations } = getState();

      if (enableOptimizations) {
        // Use optimized removeFieldFromTree function
        const removeFieldFromTree = (fields: FormField[], targetId: string): FormField[] => {
          return fields
            .filter(field => field.id !== targetId)
            .map((field) => {
              if ('children' in field && field.children) {
                const updatedChildren = removeFieldFromTree(field.children, targetId);
                if (updatedChildren.length !== field.children.length) {
                  return { ...field, children: updatedChildren } as FormField;
                }
              }
              return field;
            });
        };

        const newFields = removeFieldFromTree(schema.form.fields, fieldId);

        const newSchema = {
          ...schema,
          form: { ...schema.form, fields: newFields },
        };

        const { fieldKeyMap, fieldMap, fieldParentMap } = getFieldInfoMap(newFields);
        addHistory(newSchema, true); // Skip debounce for field deletions
        set({ schema: newSchema, fieldMap, fieldKeyMap, fieldParentMap });
        return;
      }

      // Fallback to original implementation
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
      addHistory(newSchema, true); // Skip debounce for field deletions
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
