import { PropertyType } from '../property-type';
import type { FormField } from '../types/form-field.type';
import type { FieldSystemPropHidden, FieldSystemPropRequired } from '../types/property-definition';

/**
 * Get a property value from a field by its type
 */
export function getFieldProperty(field: FormField, propertyType: PropertyType): unknown {
  const prop = field.props.find((p) => p.type === propertyType);
  return prop?.value;
}

/**
 * Check if a field is hidden by its HIDDEN property
 */
export function isFieldHidden(field: FormField): boolean {
  const hiddenProp = field.props.find((p) => p.type === PropertyType.HIDDEN) as
    | FieldSystemPropHidden
    | undefined;

  return hiddenProp?.value === true;
}

/**
 * Check if a field is required by its REQUIRED property
 */
export function isFieldRequired(field: FormField): boolean {
  const requiredProp = field.props.find((p) => p.type === PropertyType.REQUIRED) as
    | FieldSystemPropRequired
    | undefined;

  return requiredProp?.value === true;
}
