import { create } from 'zustand';
import { createAccessMethods } from './access-methods';
import { createFieldActions } from './field-actions';
import { createFormDataActions } from './form-data-actions';
import { createHistoryActions } from './history-actions';
import { createPropertyActions } from './property-actions';
import { createRuleActions } from './rule-actions';
import { createSchemaActions } from './schema-actions';
import type { SchemaState } from './types';
import { getFieldInfoMap } from './utils';

export const useSchemaStore = create<SchemaState>((set, getState) => {
  const fieldInfo = getFieldInfoMap([]);
  const stateSetters = { set, getState };

  const schemaActions = createSchemaActions(stateSetters);
  const fieldActions = createFieldActions(stateSetters);
  const propertyActions = createPropertyActions(stateSetters);
  const historyActions = createHistoryActions(stateSetters);
  const ruleActions = createRuleActions(stateSetters);
  const accessMethods = createAccessMethods(stateSetters);
  const formDataActions = createFormDataActions(stateSetters);

  return {
    // Initial state
    schema: undefined,
    fieldParentMap: fieldInfo.fieldParentMap,
    fieldMap: fieldInfo.fieldMap,

    // Combine all actions
    ...accessMethods,
    ...schemaActions,
    ...fieldActions,
    ...propertyActions,
    ...historyActions,
    ...ruleActions,
    ...formDataActions,
  };
});
