import { create } from 'zustand';
import type { SchemaState } from './types';
import { createSchemaActions } from './schema-actions';
import { createFieldActions } from './field-actions';
import { createPropertyActions } from './property-actions';
import { createHistoryActions } from './history-actions';
import { createLegacyActions } from './legacy-actions';
import { getFieldInfoMap } from './utils';
import defaultSchema from '../../default-schema';
import { createAccessMethods } from './access-methods';

const fieldInfo = getFieldInfoMap(defaultSchema.form.fields);

export const useSchemaStore = create<SchemaState>((set, getState) => {
  const stateSetters = { set, getState };

  const schemaActions = createSchemaActions(stateSetters);
  const fieldActions = createFieldActions(stateSetters);
  const propertyActions = createPropertyActions(stateSetters);
  const historyActions = createHistoryActions(stateSetters);
  const legacyActions = createLegacyActions(stateSetters);
  const accessMethods = createAccessMethods(stateSetters);

  return {
    // Initial state
    schema: defaultSchema,
    fieldParentMap: fieldInfo.fieldParentMap,
    fieldMap: fieldInfo.fieldMap,
    fieldKeyMap: fieldInfo.fieldKeyMap,

    // Combine all actions
    ...accessMethods,
    ...schemaActions,
    ...fieldActions,
    ...propertyActions,
    ...historyActions,
    ...legacyActions,
  };
});
