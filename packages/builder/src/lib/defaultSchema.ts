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
                value: {
                  top: { value: 16, unit: 'px' },
                  right: { value: 16, unit: 'px' },
                  bottom: { value: 16, unit: 'px' },
                  left: { value: 16, unit: 'px' },
                },
              },
              {
                type: PropertyType.MARGIN,
                value: {
                  top: { value: 0, unit: 'px' },
                  right: { value: 0, unit: 'px' },
                  bottom: { value: 8, unit: 'px' },
                  left: { value: 0, unit: 'px' },
                },
              },
              {
                type: PropertyType.BG_COLOR,
                value: '#FFFFFF',
              },
              {
                type: PropertyType.COLOR,
                value: '#494949',
              },
              {
                type: PropertyType.BORDER_WIDTH,
                value: { value: 1, unit: 'px' },
              },
              {
                type: PropertyType.BORDER_COLOR,
                value: '#00000019',
              },
              {
                type: PropertyType.BORDER_RADIUS,
                value: {
                  topLeft: { value: 8, unit: 'px' },
                  topRight: { value: 8, unit: 'px' },
                  bottomLeft: { value: 8, unit: 'px' },
                  bottomRight: { value: 8, unit: 'px' },
                },
              },
              {
                type: PropertyType.BOX_SHADOW,
                value: [
                  {
                    x: { value: 0, unit: 'px' },
                    y: { value: 4, unit: 'px' },
                    blur: { value: 6, unit: 'px' },
                    spread: { value: 0, unit: 'px' },
                    color: '#00000019',
                    inset: false,
                  },
                  {
                    x: { value: 0, unit: 'px' },
                    y: { value: 2, unit: 'px' },
                    blur: { value: 4, unit: 'px' },
                    spread: { value: -2, unit: 'px' },
                    color: '#00000019',
                    inset: false,
                  },
                ],
              },
            ],
          },
        ],
        props: [],
      },
    ],
    rules: [],
  },
};

export default defaultSchema;
