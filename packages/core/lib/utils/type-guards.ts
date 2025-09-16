import type { FieldType } from '../constants/field-type';
import type { FormField } from '../types/form-field.type';

export function isFieldOfTypes<T extends FormField, K extends FieldType>(
  field: T,
  ...types: K[]
): field is Extract<T, { sys: { type: K } }> {
  return types.includes(field.sys.type as K);
}
