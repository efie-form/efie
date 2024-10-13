import type { FormField } from '../types/formSchema.ts';
import insertField from './insertField.ts';
import { DROP_ZONE_TYPE } from './constant.ts';

const defaultFields: () => FormField[] = () => [
  {
    id: '0000000001',
    type: 'header',
    props: {
      value: '',
    },
  },
  {
    id: '0000000002',
    type: 'divider',
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
    value: 'Paragraph',
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
        value: '',
      },
    },
    {
      id: '0000000002',
      type: 'divider',
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
        value: '',
      },
    },
    {
      id: '0000000002',
      type: 'divider',
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
        value: '',
      },
    },
    {
      id: '0000000002',
      type: 'divider',
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
