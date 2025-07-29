import { create } from 'zustand';
import defaultSchema from '../../default-schema';
import { createAccessMethods } from './access-methods';
import { createFieldActions } from './field-actions';
import { createFormDataActions } from './form-data-actions';
import { createHistoryActions } from './history-actions';
import { createLegacyActions } from './legacy-actions';
import { createPropertyActions } from './property-actions';
import { createSchemaActions } from './schema-actions';
import type { SchemaState } from './types';
import { getFieldInfoMap } from './utils';

const fieldInfo = getFieldInfoMap(defaultSchema.form.fields);

export const useSchemaStore = create<SchemaState>((set, getState) => {
  const stateSetters = { set, getState };

  const schemaActions = createSchemaActions(stateSetters);
  const fieldActions = createFieldActions(stateSetters);
  const propertyActions = createPropertyActions(stateSetters);
  const historyActions = createHistoryActions(stateSetters);
  const legacyActions = createLegacyActions(stateSetters);
  const accessMethods = createAccessMethods(stateSetters);
  const formDataActions = createFormDataActions(stateSetters);

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
    ...formDataActions,
  };
});
