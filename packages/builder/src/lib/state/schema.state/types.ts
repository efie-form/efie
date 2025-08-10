import type { FormField, FormSchema } from '@efie-form/core';
import type { SchemaStateAccessMethods } from './access-methods';
import type { SchemaStateFieldActions } from './field-actions';
import type { SchemaStateFormDataActions } from './form-data-actions';
import type { SchemaStateHistory } from './history-actions';
import type { SchemaStatePropertyActions } from './property-actions';
import type { SchemaStateRuleActions } from './rule-actions';
import type { SchemaStateSchemaActions } from './schema-actions';

export interface SchemaState
  extends SchemaStateHistory,
    SchemaStateFieldActions,
    SchemaStateAccessMethods,
    SchemaStateFormDataActions,
    SchemaStateSchemaActions,
    SchemaStatePropertyActions,
    SchemaStateRuleActions {
  schema?: FormSchema;

  fieldMap: Map<string, FormField>;
  fieldParentMap: Map<string, string>;
}

export interface FieldMaps {
  fieldMap: Map<string, FormField>;
  fieldParentMap: Map<string, string>;
}

export interface StateSetters {
  set: (partial: Partial<SchemaState>) => void;
  getState: () => SchemaState;
}
