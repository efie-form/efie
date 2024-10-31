import type { FormField } from '@efie-form/core';
import insertField from './insertField.ts';
import { DROP_ZONE_TYPE } from './constant.ts';

const defaultFields: () => FormField[] = () => [
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

const newField: FormField = {
  id: '0000000006',
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
};

test('insert field to first index of root', () => {
  const newFields = insertField(
    defaultFields(),
    newField,
    DROP_ZONE_TYPE.root,
    null,
    0
  );

  expect(newFields).toEqual([
    newField,
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
  ]);
});

test('insert field to first index of column', () => {
  const newFields = insertField(
    defaultFields(),
    newField,
    DROP_ZONE_TYPE.field,
    '0000000004',
    0
  );

  expect(newFields).toEqual([
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
          children: [newField],
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

test('insert field to last index of root', () => {
  const newFields = insertField(
    defaultFields(),
    newField,
    DROP_ZONE_TYPE.root,
    null,
    100
  );

  expect(newFields).toEqual([
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
    newField,
  ]);
});
