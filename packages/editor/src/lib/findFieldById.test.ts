import type { FormField } from '@efie-form/core';
import findFieldById from './findFieldById.ts';

const sampleFields: FormField[] = [
  {
    id: '00001',
    type: 'header',
    props: {
      text: '',
      tag: 'h1',
      textAlign: 'left',
      font: {
        size: 0,
        unit: 'px',
        weight: 0,
      },
    },
  },
  {
    id: '00002',
    type: 'row',
    children: [
      {
        id: '00003',
        type: 'column',
        props: {
          width: 50,
        },
        children: [
          {
            id: '00005',
            type: 'paragraph',
            props: {
              text: 'Hello, World! 0006',
              textAlign: 'left',
              font: {
                size: 0,
                unit: 'px',
                weight: 0,
              },
            },
          },
          {
            id: '00007',
            type: 'row',
            children: [
              {
                id: '00008',
                type: 'column',
                props: {
                  width: 50,
                },
                children: [
                  {
                    id: '00009',
                    type: 'paragraph',
                    props: {
                      text: 'Hello, World! 0007',
                      textAlign: 'left',
                      font: {
                        size: 0,
                        unit: 'px',
                        weight: 0,
                      },
                    },
                  },
                ],
              },
              {
                id: '00010',
                type: 'column',
                props: {
                  width: 50,
                },
                children: [
                  {
                    id: '00011',
                    type: 'paragraph',
                    props: {
                      text: 'Hello, World! 0008',
                      textAlign: 'left',
                      font: {
                        size: 0,
                        unit: 'px',
                        weight: 0,
                      },
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: '00004',
        type: 'column',
        props: {
          width: 50,
        },
        children: [
          {
            id: '00006',
            type: 'paragraph',
            props: {
              text: 'Hello, World! 0006',
              textAlign: 'left',
              font: {
                size: 0,
                unit: 'px',
                weight: 0,
              },
            },
          },
        ],
      },
    ],
  },
];

test('find and return key of a field from given fields: item at root', () => {
  const field = sampleFields[0];
  const key = 'form.fields.0';
  expect(findFieldById(sampleFields, field.id)).toEqual({ field, key });
});

test('find and return key of a field from given fields: item at second level', () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const field = sampleFields[1].children[0];
  const key = 'form.fields.1.children.0';
  expect(findFieldById(sampleFields, field.id)).toEqual({ field, key });
});

test('find and return key of a field from given fields: item at third level', () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const field = sampleFields[1].children[0].children[1].children[1];
  const key = 'form.fields.1.children.0.children.1.children.1';
  expect(findFieldById(sampleFields, field.id)).toEqual({ field, key });
});

test('return null if field is not found', () => {
  expect(findFieldById(sampleFields, '00000')).toBeNull();
});
