import type { Color, FormSchema } from '@efie-form/core';
import { FieldType, getColorObject, PropertyType } from '@efie-form/core';
import { create } from 'zustand';
import { createFieldActions } from '../lib/state/schema.state/field-actions';
import { createHistoryActions } from '../lib/state/schema.state/history-actions';
import { createLegacyActions } from '../lib/state/schema.state/legacy-actions';
import { createPropertyActions } from '../lib/state/schema.state/property-actions';
import { createSchemaActions } from '../lib/state/schema.state/schema-actions';
import type { SchemaState } from '../lib/state/schema.state/types';
import { getFieldInfoMap } from '../lib/state/schema.state/utils';

// Helper function to create Color objects from hex strings
const createColor = (hex: string): Color => getColorObject(hex);

export const createTestSchema = (): FormSchema => ({
  version: 'v1',
  form: {
    fields: [
      {
        id: 'page-1',
        type: FieldType.PAGE,
        children: [
          {
            id: 'block-1',
            type: FieldType.BLOCK,
            children: [],
            props: [
              {
                type: PropertyType.BACKGROUND_COLOR,
                value: createColor('#FFFFFF'),
              },
            ],
          },
        ],
        props: [
          {
            type: PropertyType.PAGE_NAME,
            value: 'Test Page',
          },
        ],
      },
    ],
    rules: [],
  },
});

export const createTestStore = (initialSchema?: FormSchema) => {
  const schema = initialSchema || createTestSchema();
  const fieldInfo = getFieldInfoMap(schema.form.fields);

  return create<SchemaState>((set, getState) => {
    const stateSetters = { set, getState };

    const schemaActions = createSchemaActions(stateSetters);
    const fieldActions = createFieldActions(stateSetters);
    const propertyActions = createPropertyActions(stateSetters);
    const historyActions = createHistoryActions(stateSetters);
    const legacyActions = createLegacyActions(stateSetters);

    return {
      // Initial state
      schema,
      fieldParentMap: fieldInfo.fieldParentMap,
      fieldMap: fieldInfo.fieldMap,
      fieldKeyMap: fieldInfo.fieldKeyMap,
      histories: [JSON.stringify(schema)],
      totalHistories: 1,
      currentHistoryIndex: 0,

      // Combine all actions
      ...schemaActions,
      ...fieldActions,
      ...propertyActions,
      ...historyActions,
      ...legacyActions,
    };
  });
};

export const createComplexTestSchema = (): FormSchema => ({
  version: 'v1',
  form: {
    fields: [
      {
        id: 'page-1',
        type: FieldType.PAGE,
        children: [
          {
            id: 'block-1',
            type: FieldType.BLOCK,
            children: [
              {
                id: 'field-1',
                type: FieldType.SHORT_TEXT,
                form: {
                  key: 'text-field-1',
                },
                props: [
                  {
                    type: PropertyType.LABEL,
                    value: 'Text Field 1',
                  },
                ],
              },
            ],
            props: [
              {
                type: PropertyType.BACKGROUND_COLOR,
                value: createColor('#FFFFFF'),
              },
            ],
          },
          {
            id: 'block-2',
            type: FieldType.BLOCK,
            children: [],
            props: [
              {
                type: PropertyType.BACKGROUND_COLOR,
                value: createColor('#F0F0F0'),
              },
            ],
          },
        ],
        props: [
          {
            type: PropertyType.PAGE_NAME,
            value: 'Test Page',
          },
        ],
      },
    ],
    rules: [],
  },
});

export const createPropertyTestSchema = (): FormSchema => ({
  version: 'v1',
  form: {
    fields: [
      {
        id: 'page-1',
        type: FieldType.PAGE,
        children: [
          {
            id: 'block-1',
            type: FieldType.BLOCK,
            children: [],
            props: [
              {
                type: PropertyType.BACKGROUND_COLOR,
                value: createColor('#FFFFFF'),
              },
              {
                type: PropertyType.COLOR,
                value: createColor('#000000'),
              },
            ],
          },
        ],
        props: [
          {
            type: PropertyType.PAGE_NAME,
            value: 'Test Page',
          },
        ],
      },
    ],
    rules: [],
  },
});
