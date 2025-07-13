import { PropertyType, type FormField, type PropertyDefinition } from '@efie-form/core';
import type { StateSetters } from './types';
import { getFieldInfoMap } from './utils';

export function createPropertyActions({ set, getState }: StateSetters) {
  return {
    // Enhanced property management methods
    updateFieldProperty: <T extends PropertyDefinition>(fieldId: string, property: T) => {
      const { schema, addHistory, fieldMap } = getState();
      const field = fieldMap.get(fieldId);
      if (!field) return;

      const newProps = [...field.props] as PropertyDefinition[];
      const existingIndex = newProps.findIndex(p => p.type === property.type);

      if (existingIndex === -1) {
        newProps.push(property);
      }
      else {
        newProps[existingIndex] = property;
      }

      // For property updates, we can optimize by only updating the specific field
      // without rebuilding all maps since the structure doesn't change
      const updatedField = { ...field, props: newProps } as FormField;

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

      const newFields = updateFieldInTree(schema.form.fields);
      const newSchema = {
        ...schema,
        form: { ...schema.form, fields: newFields },
      };

      // Only update the specific field in fieldMap for better performance
      const newFieldMap = new Map(fieldMap);
      newFieldMap.set(fieldId, updatedField);

      addHistory(newSchema);
      set({ schema: newSchema, fieldMap: newFieldMap });
    },

    addFieldProperty: <T extends PropertyDefinition>(fieldId: string, property: T) => {
      const field = getState().fieldMap.get(fieldId);
      if (!field) return;

      const existingIndex = field.props.findIndex(p => p.type === property.type);
      if (existingIndex === -1) {
        getState().updateFieldProperty(fieldId, property);
      }
    },

    removeFieldProperty: (fieldId: string, propertyType: PropertyDefinition['type']) => {
      const { schema, addHistory } = getState();
      const field = getState().fieldMap.get(fieldId);
      if (!field) return;

      const newProps = field.props.filter(p => p.type !== propertyType);

      const updateFieldInSchema = (fields: FormField[]): FormField[] => {
        return fields.map((f) => {
          if (f.id === fieldId) {
            return { ...f, props: newProps } as FormField;
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

    setFieldProperties: (fieldId: string, properties: PropertyDefinition[]) => {
      const { schema, addHistory } = getState();
      const field = getState().fieldMap.get(fieldId);
      if (!field) return;

      const updateFieldInSchema = (fields: FormField[]): FormField[] => {
        return fields.map((f) => {
          if (f.id === fieldId) {
            return { ...f, props: [...properties] } as FormField;
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

    // Core field property access methods
    getFieldProperty: <T extends PropertyDefinition['type']>(
      fieldId: string,
      type: T,
    ): Extract<PropertyDefinition, { type: T }> | undefined => {
      const { fieldMap } = getState();
      const field = fieldMap.get(fieldId);
      if (!field) return;

      const prop = field.props.find(prop => prop.type === type);
      return prop as Extract<PropertyDefinition, { type: T }> | undefined;
    },

    getFieldCustomProperty: (
      fieldId: string,
      id: string,
    ): Extract<PropertyDefinition, { type: typeof PropertyType.CUSTOM }> | undefined => {
      const { fieldMap } = getState();
      const field = fieldMap.get(fieldId);
      if (!field) return;

      const prop = field.props.find(prop => prop.type === PropertyType.CUSTOM && prop.value.id === id);
      return prop as Extract<PropertyDefinition, { type: typeof PropertyType.CUSTOM }> | undefined;
    },

    getFieldProperties: (fieldId: string): PropertyDefinition[] => {
      const { fieldMap } = getState();
      const field = fieldMap.get(fieldId);
      return field ? [...field.props] : [];
    },
  };
}
