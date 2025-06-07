import { FormFieldType, PropertyType } from '@efie-form/core';
import type { FormSchema } from '@efie-form/core';
import { create } from 'zustand';
import type { SchemaState } from '../lib/state/schema.state/types';
import { createSchemaActions } from '../lib/state/schema.state/schema-actions';
import { createFieldActions } from '../lib/state/schema.state/field-actions';
import { createPropertyActions } from '../lib/state/schema.state/property-actions';
import { createHistoryActions } from '../lib/state/schema.state/history-actions';
import { createLegacyActions } from '../lib/state/schema.state/legacy-actions';
import { getFieldInfoMap } from '../lib/state/schema.state/utils';

export const createTestSchema = (): FormSchema => ({
  version: 'v1',
  form: {
    fields: [
      {
        id: 'page-1',
        type: FormFieldType.PAGE,
        children: [
          {
            id: 'block-1',
            type: FormFieldType.BLOCK,
            children: [],
            props: [
              {
                type: PropertyType.BG_COLOR,
                value: '#FFFFFF',
              },
            ],
          },
        ],
        props: [
          {
            type: PropertyType.NAME,
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
        type: FormFieldType.PAGE,
        children: [
          {
            id: 'block-1',
            type: FormFieldType.BLOCK,
            children: [
              {
                id: 'field-1',
                type: FormFieldType.SHORT_TEXT,
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
                type: PropertyType.BG_COLOR,
                value: '#FFFFFF',
              },
            ],
          },
          {
            id: 'block-2',
            type: FormFieldType.BLOCK,
            children: [],
            props: [
              {
                type: PropertyType.BG_COLOR,
                value: '#F0F0F0',
              },
            ],
          },
        ],
        props: [
          {
            type: PropertyType.NAME,
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
        type: FormFieldType.PAGE,
        children: [
          {
            id: 'block-1',
            type: FormFieldType.BLOCK,
            children: [],
            props: [
              {
                type: PropertyType.BG_COLOR,
                value: '#FFFFFF',
              },
              {
                type: PropertyType.COLOR,
                value: '#000000',
              },
            ],
          },
        ],
        props: [
          {
            type: PropertyType.NAME,
            value: 'Test Page',
          },
        ],
      },
    ],
    rules: [],
  },
});
