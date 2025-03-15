import type { FormSchema } from '@efie-form/vue';
import { FormFieldType } from '../../../../packages/core-old/src/InputType';

export const schema: FormSchema = {
  version: 'v1',
  form: {
    fields: [
      {
        id: 'flfCYesTVJ',
        type: 'page',
        children: [
          {
            id: 'dKodphlJIN',
            type: 'block',
            children: [
              {
                type: FormFieldType.LONG_TEXT,
                id: 'TLxvJNtKjf',
                props: {
                  label: 'Long Text',
                  placeholder: 'Enter the placeholder',
                  required: false,
                },
              },
              {
                type: FormFieldType.MULTIPLE_CHOICES,
                id: 'UctxtDDfYO',
                props: {
                  label: 'Multiple Choice',
                  options: [
                    {
                      label: 'Option 1',
                      value: 'Option 1',
                    },
                    {
                      label: 'Option 2',
                      value: 'Option 2',
                    },
                    {
                      label: 'Option 3',
                      value: 'Option 3',
                    },
                  ],
                  isValueDifferent: false,
                  required: false,
                },
              },
              {
                type: FormFieldType.ROW,
                id: 'WXHUMjPlGG',
                props: {},
                children: [
                  {
                    id: 'qkOhaZGcSO',
                    type: FormFieldType.COLUMN,
                    props: {
                      width: 50,
                    },
                    children: [],
                  },
                  {
                    id: 'kkPtOzRVnD',
                    type: FormFieldType.COLUMN,
                    props: {
                      width: 50,
                    },
                    children: [],
                  },
                ],
              },
            ],
            props: {
              padding: {
                bottom: 16,
                left: 16,
                right: 16,
                top: 16,
              },
              margin: {
                bottom: 0,
                left: 0,
                right: 0,
                top: 0,
              },
              border: {
                radius: {
                  bottomLeft: 8,
                  bottomRight: 8,
                  topLeft: 8,
                  topRight: 8,
                },
              },
              boxShadow: [
                {
                  x: 0,
                  y: 4,
                  blur: 6,
                  spread: -1,
                  color: '#00000019',
                  inset: false,
                },
                {
                  x: 0,
                  y: 2,
                  blur: 4,
                  spread: -2,
                  color: '#00000019',
                  inset: false,
                },
              ],
              bgColor: '#FFFFFF',
              color: '#494949',
            },
          },
        ],
        props: {
          name: 'Page 1',
        },
      },
    ],
  },
};
