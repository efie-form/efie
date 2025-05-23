import type { FormField } from '@efie-form/core';
import type { FieldKeyPrefix } from './genFieldKey';

interface FindFieldByIdResult {
  field: FormField;
  key: FieldKeyPrefix;
}

export default function findFieldById(
  fields: FormField[],
  id?: string,
  key: string = 'form.fields',
): FindFieldByIdResult | undefined {
  if (!id) return;

  for (const index in fields) {
    const field = fields[index];
    if (field.id === id) {
      return {
        field,
        key: `${key}.${index}` as FieldKeyPrefix,
      };
    }
    if ('children' in field) {
      const found = findFieldById(
        field.children,
        id,
        `${key}.${index}.children`,
      );
      if (found) {
        return found;
      }
    }
  }
}
