import type {
  FormField,
  FormInputField,
  FormSchema,
  PageFormField,
  PropertyDefinition,
} from '@efie-form/core';

export interface SchemaState {
  schema: FormSchema;
  setSchema: (schema: FormSchema) => void;
  setFields: (fields: FormField[]) => void;

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

  // Field management methods
  addField: (field: FormField, parentId?: string, index?: number) => void;
  updateField: (fieldId: string, updates: Partial<FormField>) => void;
  duplicateField: (fieldId: string) => FormField | undefined;
  moveField: (fieldId: string, newParentId: string, newIndex: number) => void;

  // Core field access methods
  fieldMap: Map<string, FormField>;
  fieldKeyMap: Map<string, string>;
  getFieldById: (fieldId?: string) => FormField | undefined;
  getFieldKeyById: (fieldId?: string) => string | undefined;
  getFieldParentId: (fieldId?: string) => string | undefined;
  getFieldProperty: <T extends PropertyDefinition['type']>(
    fieldId: string,
    type: T
  ) => Extract<PropertyDefinition, { type: T }> | undefined;
  getFieldProperties: (fieldId: string) => PropertyDefinition[];

  // Legacy methods (maintained for compatibility)
  updateFieldProps: (
    fieldId: string,
    type: PropertyDefinition['type'],
    props: Omit<PropertyDefinition, 'type'>
  ) => void;
  getPage: (pageId?: string) => PageFormField | undefined;
  updatePages: (pages: FormField[]) => void;
  updateFieldForm: (fieldId: string, form: FormInputField['form']) => void;
  replaceFieldChildren: (fieldId: string, children: FormField[]) => void;
  deleteField: (fieldId: string) => void;
  fieldParentMap: Map<string, string>;

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

  // Performance optimization flags
  enableOptimizations: boolean;
  setEnableOptimizations: (enabled: boolean) => void;
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
