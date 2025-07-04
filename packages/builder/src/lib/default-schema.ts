import { FieldType, PropertyType } from '@efie-form/core';
import type { FormSchema } from '@efie-form/core';
import { generateId } from './utils';

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
