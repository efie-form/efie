import type { FormSchema } from './types/formSchema.type';
import { FormFieldType } from './InputType';

const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function generateId(length: number = 10) {
  return Array.from(
    { length },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join('');
}

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
            props: {
              padding: {
                bottom: 16,
                left: 16,
                right: 16,
                top: 16,
              },
              margin: {
                bottom: 8,
                left: 0,
                right: 0,
                top: 0,
              },
              border: {
                width: 1,
                color: '#00000019',
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

export default defaultSchema;
