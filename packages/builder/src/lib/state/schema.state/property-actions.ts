import {
  type FieldCustomProp,
  type FormField,
  type PropertyDefinition,
  PropertyType,
} from '@efie-form/core';
import type { StateSetters } from './types';

export interface SchemaStatePropertyActions {
  // Enhanced property management methods (optimized)
  updateFieldProperty: <T extends PropertyDefinition>(fieldId: string, property: T) => void;
  getFieldProperty: <T extends PropertyDefinition['type']>(
    fieldId: string,
    type: T,
  ) => Extract<PropertyDefinition, { type: T }> | undefined;

  findFieldCustomProperty: (fieldId: string, id: string) => FieldCustomProp | undefined;

  updateFieldCustomProperty: (fieldId: string, id: string, property: FieldCustomProp) => void;

  removeFieldProperty: (fieldId: string, type: PropertyDefinition['type']) => void;
}

export function createPropertyActions({ getState }: StateSetters): SchemaStatePropertyActions {
  return {
    // Enhanced property management methods
    updateFieldProperty: (fieldId, property) => {
      const { fieldMap, updateField } = getState();
      const field = fieldMap.get(fieldId);
      if (!field) return;

      const newProps = [...field.props] as PropertyDefinition[];
      const existingIndex = newProps.findIndex((p) => p.type === property.type);

      if (existingIndex === -1) {
        newProps.push(property);
      } else {
        newProps[existingIndex] = property;
      }

      // For property updates, we can optimize by only updating the specific field
      // without rebuilding all maps since the structure doesn't change
      const newField = { ...field, props: newProps } as FormField;

      updateField(fieldId, newField);
    },

    // Core field property access methods
    getFieldProperty: <T extends PropertyDefinition['type']>(fieldId: string, type: T) => {
      const { fieldMap } = getState();
      const field = fieldMap.get(fieldId);
      if (!field) return;

      const prop = field.props.find((prop) => prop.type === type);
      return prop as Extract<PropertyDefinition, { type: T }> | undefined;
    },

    findFieldCustomProperty: (fieldId, id) => {
      const { fieldMap } = getState();
      const field = fieldMap.get(fieldId);
      if (!field) return;

      return field.props
        .filter((prop) => prop.type === PropertyType.CUSTOM)
        .find((prop) => prop.id === id);
    },

    updateFieldCustomProperty: (fieldId, id, property) => {
      const { fieldMap, updateField } = getState();
      const field = fieldMap.get(fieldId);
      if (!field) return;

      const newProps = field.props;

      if (newProps.some((prop) => prop.type === PropertyType.CUSTOM && prop.id === id)) {
        const index = newProps.findIndex(
          (prop) => prop.type === PropertyType.CUSTOM && prop.id === id,
        );
        newProps[index] = { ...newProps[index], ...property };
      } else {
        newProps.push({ ...property, type: PropertyType.CUSTOM });
      }

      const updatedField = { ...field, props: newProps } as FormField;

      updateField(fieldId, updatedField);
    },

    removeFieldProperty: (fieldId, type) => {
      const { fieldMap, updateField } = getState();
      const field = fieldMap.get(fieldId);
      if (!field) return;

      const newProps = field.props.filter((prop) => prop.type !== type);

      const newField = { ...field, props: newProps } as FormField;

      updateField(fieldId, newField);
    },
  };
}
