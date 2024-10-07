import type { FormField, FormFieldType } from '../types/formSchema.ts';
import defaultFieldProps from './defaultFieldProps.ts';
import { generateId } from './utils.ts';

export default function insertField(
  fields: FormField[],
  type: FormFieldType,
  parentId: string,
  index: number
) {
  if (parentId === 'root') {
    fields.splice(index, 0, {
      id: generateId(10),
      ...defaultFieldProps[type],
    });
    return fields;
  }

  console.error('insertField not implemented');
  return fields;
}
