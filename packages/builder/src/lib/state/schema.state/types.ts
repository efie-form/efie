import type {
  FieldCustomProp,
  FormField,
  FormInputField,
  FormSchema,
  PageFormField,
  PropertyDefinition,
} from '@efie-form/core';

export interface SchemaStateHistory {
  // History management (optimized)
  maxHistories: number;
  setMaxHistories: (maxHistories: number) => void;
  histories: string[];
  addHistory: (schema: FormSchema, skipDebounce?: boolean) => void;
  undo: () => void;
  redo: () => void;
  clearHistories: () => void;
  totalHistories: number;
  currentHistoryIndex: number;
  canUndo: () => boolean;
  canRedo: () => boolean;
}

export interface SchemaStateFieldActions {
  // Field management methods
  addField: (field: FormField, parentId?: string, index?: number) => void;
  updateField: (fieldId: string, updates: Partial<FormField>) => void;
  duplicateField: (fieldId: string) => FormField | undefined;
  moveField: (fieldId: string, newParentId: string, newIndex: number) => void;
  deleteField: (fieldId: string) => void;
}

export interface SchemaStateAccessMethods {
  // Core field access methods

  getFieldById: (fieldId?: string) => FormField | undefined;
  getFieldKeyById: (fieldId?: string) => string | undefined;
  getFieldParentId: (fieldId?: string) => string | undefined;

  listChildrenId: (fieldId: string) => string[];
}
export interface SchemaStateFieldProperty {

  // Enhanced property management methods (optimized)
  updateFieldProperty: <T extends PropertyDefinition>(
    fieldId: string,
    property: T
  ) => void;
  addFieldProperty: <T extends PropertyDefinition>(
    fieldId: string,
    property: T
  ) => void;
  removeFieldProperty: (
    fieldId: string,
    propertyType: PropertyDefinition['type']
  ) => void;
  setFieldProperties: (
    fieldId: string,
    properties: PropertyDefinition[]
  ) => void;
  getFieldProperty: <T extends PropertyDefinition['type']>(
    fieldId: string,
    type: T
  ) => Extract<PropertyDefinition, { type: T }> | undefined;
  getFieldProps: (
    fieldId: string
  ) => PropertyDefinition[] | undefined;

  findFieldCustomProperty: (
    fieldId: string,
    id: string
  ) => FieldCustomProp | undefined;

  updateFieldCustomProperty: (
    fieldId: string,
    id: string,
    property: FieldCustomProp
  ) => void;
}

export interface SchemaState extends SchemaStateHistory, SchemaStateFieldActions, SchemaStateAccessMethods, SchemaStateFieldProperty {
  schema: FormSchema;
  setSchema: (schema: FormSchema) => void;
  setFields: (fields: FormField[]) => void;

  fieldMap: Map<string, FormField>;
  fieldKeyMap: Map<string, string>;

  // Legacy methods (maintained for compatibility)
  getPage: (pageId?: string) => PageFormField | undefined;
  updatePages: (pages: FormField[]) => void;
  updateFieldForm: (fieldId: string, form: FormInputField['form']) => void;
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
