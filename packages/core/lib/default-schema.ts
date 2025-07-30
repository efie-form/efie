import { FieldType } from './constants/field-type';
import { PropertyType } from './property-type';
import type { FormSchema } from './types/form-schema.type';

const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function generateId(length: number = 10) {
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

const defaultSchema: FormSchema = {
  version: 'v1',
  form: {
    fields: [
      {
        id: generateId(10),
        type: FieldType.PAGE,
        children: [],
        props: [
          {
            type: PropertyType.PAGE_NAME,
            value: 'Page 1',
          },
        ],
      },
    ],
    rules: [],
  },
};

export default defaultSchema;
