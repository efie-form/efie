import type { FieldPath } from 'react-hook-form';
import type { FormSchema } from '@efie-form/core';

type PickFieldProperty =
  FieldPath<FormSchema> extends infer T
    ? T extends `${FieldKeyPrefix}.${infer U}`
      ? U
      : never
    : never;

export type FieldKeyPrefix = `form.fields.${number}`;

function genFieldKey<T extends PickFieldProperty>(
  fieldKey: FieldKeyPrefix,
  fieldProperty: T
): `form.fields.${number}.${T}` {
  return `${fieldKey}.${fieldProperty}`;
}

export default genFieldKey;
