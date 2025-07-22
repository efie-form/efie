import { FieldType } from './constants/field-type';
import { PropertyType, SizeType } from './constants/form-schema.constant';
import type { FormSchema } from './types/form-schema.type';
import { getColorObject } from './utils/colors';

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
        children: [
          {
            id: generateId(10),
            type: FieldType.BLOCK,
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
                value: {
                  hex: '#000000',
                  rgba: { r: 0, g: 0, b: 0, a: 1 },
                  hsla: { h: 0, s: 0, l: 0, a: 1 },
                },
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
