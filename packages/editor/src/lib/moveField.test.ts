import type { FormField } from '@efie-form/core';
import moveField from './moveFields.ts';

const defaultFields: FormField[] = [
  {
    id: '0000000001',
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
    id: '0000000002',
    type: 'divider',
    props: {
      color: '',
      width: 0,
      style: 'solid',
    },
  },
  {
    id: '0000000003',
    type: 'row',
    children: [
      {
        id: '0000000004',
        type: 'column',
        children: [],
        props: {
          width: 50,
        },
      },
      {
        id: '0000000005',
        type: 'column',
        children: [],
        props: {
          width: 50,
        },
      },
    ],
  },
];

test('move first field from root to second place of root', () => {
  const newField = moveField(defaultFields, '0000000001', null, 1);

  expect(newField).toEqual([
    defaultFields[1],
    defaultFields[0],
    defaultFields[2],
  ]);
});

test('move first field from root to first place of root', () => {
  const newField = moveField(defaultFields, '0000000001', null, 0);

  expect(newField).toEqual(defaultFields);
});

test('move first field to children of column', () => {
  const newField = moveField(defaultFields, '0000000001', '0000000004', 0);

  expect(newField).toEqual([
    {
      id: '0000000002',
      type: 'divider',
      props: {
        color: '',
        width: 0,
        style: 'solid',
      },
    },
    {
      id: '0000000003',
      type: 'row',
      children: [
        {
          id: '0000000004',
          type: 'column',
          children: [
            {
              id: '0000000001',
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
          ],
          props: {
            width: 50,
          },
        },
        {
          id: '0000000005',
          type: 'column',
          children: [],
          props: {
            width: 50,
          },
        },
      ],
    },
  ]);
});

test('move field to children of column and then move it to root', () => {
  let newField = moveField(defaultFields, '0000000001', '0000000004', 0);
  newField = moveField(newField, '0000000001', null, 0);

  expect(newField).toEqual(defaultFields);
});

test('move field to root but out of bounds', () => {
  const newField = moveField(defaultFields, '0000000001', null, 100);

  expect(newField).toEqual([
    {
      id: '0000000002',
      type: 'divider',
      props: {
        color: '',
        width: 0,
        style: 'solid',
      },
    },
    {
      id: '0000000003',
      type: 'row',
      children: [
        {
          id: '0000000004',
          type: 'column',
          children: [],
          props: {
            width: 50,
          },
        },
        {
          id: '0000000005',
          type: 'column',
          children: [],
          props: {
            width: 50,
          },
        },
      ],
    },
    {
      id: '0000000001',
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
  ]);
});
