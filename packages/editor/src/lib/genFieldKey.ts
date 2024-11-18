import type { FieldPath, FieldPathValue } from 'react-hook-form';
import type { FormSchema } from '@efie-form/core';

export type FieldPropsKey =
  FieldPath<FormSchema> extends infer T
    ? T extends `${FieldKeyPrefix}.${infer U}`
      ? U
      : never
    : never;

export type FieldKeyPrefix = `form.fields.${number}`;

export type FieldPropsValueType = FieldPathValue<
  FormSchema,
  `form.fields.${number}.${FieldPropsKey}`
>;

function genFieldKey<T extends FieldPropsKey>(
  fieldKey: FieldKeyPrefix,
  fieldProperty: T
): `form.fields.${number}.${T}` {
  return `${fieldKey}.${fieldProperty}`;
}

export default genFieldKey;
