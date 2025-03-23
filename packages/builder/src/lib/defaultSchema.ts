import { FormFieldType, PropertyType } from '@efie-form/core';
import type { FormSchema } from '@efie-form/core';
import { generateId } from './utils';

const defaultSchema: FormSchema = {
  version: 'v1',
  form: {
    fields: [
      {
        id: generateId(10),
        type: FormFieldType.PAGE,
        children: [
          {
            id: generateId(10),
            type: FormFieldType.BLOCK,
            children: [],
            props: [
              {
                type: PropertyType.PADDING,
                value: { value: 16, unit: 'px' },
              },
              {
                type: PropertyType.MARGIN,
                value: { value: 8, unit: 'px' },
              },
              {
                type: PropertyType.BG_COLOR,
                value: '#FFFFFF',
              },
              {
                type: PropertyType.COLOR,
                value: '#494949',
              },
            ],
          },
        ],
        props: [
          {
            type: PropertyType.NAME,
            value: 'Page 1',
          },
        ],
      },
    ],
    rules: [],
  },
};

export default defaultSchema;
