import { FormFieldType, getColorObject, PropertyType, SizeType } from '@efie-form/core';
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
                  top: { type: SizeType.LENGTH, value: 16, unit: 'px' },
                  right: { type: SizeType.LENGTH, value: 16, unit: 'px' },
                  bottom: { type: SizeType.LENGTH, value: 16, unit: 'px' },
                  left: { type: SizeType.LENGTH, value: 16, unit: 'px' },
                },
              },
              {
                type: PropertyType.MARGIN,
                value: {
                  top: { type: SizeType.LENGTH, value: 0, unit: 'px' },
                  right: { type: SizeType.LENGTH, value: 0, unit: 'px' },
                  bottom: { type: SizeType.LENGTH, value: 8, unit: 'px' },
                  left: { type: SizeType.LENGTH, value: 0, unit: 'px' },
                },
              },
              {
                type: PropertyType.BACKGROUND_COLOR,
                value: getColorObject('#FFFFFF'),
              },
              {
                type: PropertyType.COLOR,
                value: getColorObject('#000000'),
              },
              {
                type: PropertyType.BORDER_WIDTH,
                value: { type: SizeType.LENGTH, value: 1, unit: 'px' },
              },
              {
                type: PropertyType.BORDER_COLOR,
                value: getColorObject('#00000019'),
              },
              {
                type: PropertyType.BORDER_RADIUS,
                value: {
                  topLeft: { type: SizeType.LENGTH, value: 8, unit: 'px' },
                  topRight: { type: SizeType.LENGTH, value: 8, unit: 'px' },
                  bottomLeft: { type: SizeType.LENGTH, value: 8, unit: 'px' },
                  bottomRight: { type: SizeType.LENGTH, value: 8, unit: 'px' },
                },
              },
              {
                type: PropertyType.BOX_SHADOW,
                value: [
                  {
                    x: { type: SizeType.LENGTH, value: 0, unit: 'px' },
                    y: { type: SizeType.LENGTH, value: 4, unit: 'px' },
                    blur: { type: SizeType.LENGTH, value: 6, unit: 'px' },
                    spread: { type: SizeType.LENGTH, value: 0, unit: 'px' },
                    color: getColorObject('#00000019'),
                    inset: false,
                  },
                  {
                    x: { type: SizeType.LENGTH, value: 0, unit: 'px' },
                    y: { type: SizeType.LENGTH, value: 2, unit: 'px' },
                    blur: { type: SizeType.LENGTH, value: 4, unit: 'px' },
                    spread: { type: SizeType.LENGTH, value: -2, unit: 'px' },
                    color: getColorObject('#00000019'),
                    inset: false,
                  },
                ],
              },
            ],
          },
        ],
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
