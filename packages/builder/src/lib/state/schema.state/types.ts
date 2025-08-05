import type { FormField, FormSchema, PageFormField } from '@efie-form/core';
import type { SchemaStateAccessMethods } from './access-methods';
import type { SchemaStateFieldActions } from './field-actions';
import type { SchemaStateFormDataActions } from './form-data-actions';
import type { SchemaStateHistory } from './history-actions';
import type { SchemaStatePropertyActions } from './property-actions';

export interface SchemaState
  extends SchemaStateHistory,
    SchemaStateFieldActions,
    SchemaStateAccessMethods,
    SchemaStateFormDataActions,
    SchemaStatePropertyActions {
  schema?: FormSchema;
  setSchema: (schema: FormSchema) => void;
  setFields: (fields: FormField[]) => void;

  fieldMap: Map<string, FormField>;
  fieldKeyMap: Map<string, string>;

  // Legacy methods (maintained for compatibility)
  getPage: (pageId?: string) => PageFormField | undefined;
  updatePages: (pages: FormField[]) => void;
  replaceFieldChildren: (fieldId: string, children: FormField[]) => void;
  deleteField: (fieldId: string) => void;
  fieldParentMap: Map<string, string>;
}

export interface FieldMaps {
  fieldKeyMap: Map<string, string>;
  fieldMap: Map<string, FormField>;
  fieldParentMap: Map<string, string>;
}

export interface StateSetters {
  set: (partial: Partial<SchemaState>) => void;
  getState: () => SchemaState;
}
