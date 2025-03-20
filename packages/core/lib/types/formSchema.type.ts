import type { FormFieldType } from '../InputType';
import type { JSONContent } from '@tiptap/core';

// Base types for units and measurements
export type Unit =
  | 'px'
  | 'em'
  | 'rem'
  | '%'
  | 'vh'
  | 'vw'
  | 'pt'
  | 'pc'
  | 'in'
  | 'cm'
  | 'mm';

export interface Size {
  value: number;
  unit: Unit;
}

// Field condition operators
export type FieldConditionOperator =
  | 'equals'
  | 'notEquals'
  | 'contains'
  | 'notContains'
  | 'greaterThan'
  | 'lessThan'
  | 'greaterThanOrEqual'
  | 'lessThanOrEqual'
  | 'regex'
  | 'isEmpty'
  | 'isNotEmpty'
  | 'isValid'
  | 'isInvalid'
  | 'custom';

export interface FieldCondition {
  fieldId: string;
  operator: FieldConditionOperator;
  value?: any;
  customValidator?: (value: any) => boolean;
}

export interface FieldConditionGroup {
  type: 'group';
  operator: 'and' | 'or';
  conditions: (FieldCondition | FieldConditionGroup)[];
}

export interface RootPageRule {
  type: 'page';
  conditions: FieldCondition | FieldConditionGroup;
  action: {
    type: 'show' | 'hide' | 'reorder' | 'skip';
    pages: string[];
    order?: string[];
    skipToPage?: string;
  };
}

export interface RootValidationRule {
  type: 'validation';
  conditions: FieldCondition | FieldConditionGroup;
  action: {
    type: 'crossField';
    fields: string[];
    rules: ValidationRule[];
    preventSubmission?: boolean;
  };
}

export interface RootErrorRule {
  type: 'error';
  conditions: FieldCondition | FieldConditionGroup;
  action: {
    type: 'display' | 'handle' | 'recover';
    fields: string[];
    display?: {
      position: 'inline' | 'toast' | 'modal' | 'banner';
      style?: {
        color?: string;
        backgroundColor?: string;
        position?: 'top' | 'bottom' | 'left' | 'right';
      };
    };
    handler?: {
      type: 'retry' | 'fallback' | 'redirect';
      maxRetries?: number;
      fallbackValue?: any;
      redirectUrl?: string;
    };
    recovery?: {
      type: 'auto' | 'manual';
      action?: () => void;
      message?: string;
    };
  };
}

export interface RootGroupRule {
  type: 'group';
  conditions: FieldCondition | FieldConditionGroup;
  action: {
    type: 'show' | 'hide' | 'reorder';
    fields: string[];
    order?: string[];
  };
}

export type RootRule =
  | RootGroupRule
  | RootPageRule
  | RootValidationRule
  | RootErrorRule;

// Field rule types
export interface FieldVisibilityRule {
  type: 'visibility';
  conditions: FieldCondition | FieldConditionGroup;
  action: 'show' | 'hide';
}

export interface FieldRequirementRule {
  type: 'requirement';
  conditions: FieldCondition | FieldConditionGroup;
  action: 'required' | 'optional';
}

export interface FieldEnableRule {
  type: 'enable';
  conditions: FieldCondition | FieldConditionGroup;
  action: 'enable' | 'disable';
}

export interface FieldValueRule {
  type: 'value';
  conditions: FieldCondition | FieldConditionGroup;
  action: {
    type: 'set' | 'clear' | 'copy' | 'calculate';
    value?: any;
    sourceFieldId?: string;
    calculation?: string;
  };
}

export interface FieldStyleRule {
  type: 'style';
  conditions: FieldCondition | FieldConditionGroup;
  action: {
    property: string;
    value: any;
  };
}

export interface FieldValidationRule {
  type: 'validation';
  conditions: FieldCondition | FieldConditionGroup;
  action: {
    add?: ValidationSchema[];
    remove?: string[];
  };
}

export interface FieldDependencyRule {
  type: 'dependency';
  conditions: FieldCondition | FieldConditionGroup;
  action: {
    type: 'watch' | 'unwatch';
    fields: string[];
  };
}

export interface FieldBehaviorRule {
  type: 'behavior';
  conditions: FieldCondition | FieldConditionGroup;
  action: {
    type: 'focus' | 'blur' | 'scrollIntoView' | 'triggerEvent';
    event?: string;
    options?: Record<string, any>;
  };
}

export interface FieldAccessRule {
  type: 'access';
  conditions: FieldCondition | FieldConditionGroup;
  action: {
    type: 'readonly' | 'editable' | 'hidden' | 'visible';
  };
}

export interface FieldFormatRule {
  type: 'format';
  conditions: FieldCondition | FieldConditionGroup;
  action: {
    type: 'mask' | 'unmask' | 'transform';
    format?: string;
    transform?: (value: any) => any;
  };
}

export interface FieldErrorRule {
  type: 'error';
  conditions: FieldCondition | FieldConditionGroup;
  action: {
    type: 'show' | 'hide' | 'clear';
    message?: string;
  };
}

export interface FieldStateRule {
  type: 'state';
  conditions: FieldCondition | FieldConditionGroup;
  action: {
    type: 'loading' | 'success' | 'error' | 'warning';
    message?: string;
  };
}

export type FieldRule =
  | FieldVisibilityRule
  | FieldRequirementRule
  | FieldEnableRule
  | FieldValueRule
  | FieldStyleRule
  | FieldValidationRule
  | FieldDependencyRule
  | FieldBehaviorRule
  | FieldAccessRule
  | FieldFormatRule
  | FieldErrorRule
  | FieldStateRule;

// Validation types
export type ValidationOperator =
  | 'equals'
  | 'notEquals'
  | 'contains'
  | 'notContains'
  | 'greaterThan'
  | 'lessThan'
  | 'greaterThanOrEqual'
  | 'lessThanOrEqual'
  | 'regex';

// Base validation rule interface
export interface BaseValidationRule {
  type: string;
  message: string;
}

// Standard validation rule
export interface StandardValidationRule extends BaseValidationRule {
  type: 'standard';
  operator: ValidationOperator;
  value: any;
}

// Future extensibility: Add new validation rule types here
export type ValidationRule = StandardValidationRule;

export interface ValidationGroup {
  type: 'group';
  operator: 'and' | 'or';
  rules: (ValidationRule | ValidationGroup)[];
}

export interface ValidationCondition {
  type: 'condition';
  fieldId: string;
  operator: ValidationOperator;
  value: any;
  then: ValidationRule | ValidationGroup;
  else?: ValidationRule | ValidationGroup;
}

export interface ValidationCase {
  type: 'case';
  fieldId: string;
  cases: {
    value: any;
    rules: ValidationRule | ValidationGroup;
  }[];
  default?: ValidationRule | ValidationGroup;
}

export type ValidationSchema =
  | ValidationRule
  | ValidationGroup
  | ValidationCondition
  | ValidationCase;

// Property types
export interface PropertyDefinition {
  key: string;
  type:
    | 'string'
    | 'number'
    | 'boolean'
    | 'object'
    | 'array'
    | 'color'
    | 'size'
    | 'select'
    | 'rich-text';
  label: string;
  defaultValue?: any;
  options?: { label: string; value: any }[];
  validation?: ValidationSchema[];
  isRequired?: boolean;
  isArray?: boolean;
  arrayItemType?: PropertyDefinition;
}

// Common container styles
export interface ContainerStyle {
  margin: Size;
  padding: Size;
  border: {
    width: Size;
    color: string;
    radius: {
      topLeft: Size;
      topRight: Size;
      bottomRight: Size;
      bottomLeft: Size;
    };
  };
  boxShadow?: {
    x: Size;
    y: Size;
    blur: Size;
    spread: Size;
    color: string;
    inset: boolean;
  }[];
  backgroundColor?: string;
}

// Base form field interface
export interface BaseFormField {
  id: string;
  type: FormFieldType;
  form?: {
    key: string;
    validation?: ValidationSchema[];
  };
  props: PropertyDefinition[];
  container?: ContainerStyle;
  rules?: FieldRule[];
}

// Input field types
export interface InputFormField extends BaseFormField {
  type:
    | typeof FormFieldType.SHORT_TEXT
    | typeof FormFieldType.LONG_TEXT
    | typeof FormFieldType.NUMBER;
  props: (PropertyDefinition & {
    type: 'string' | 'number';
    placeholder?: string;
    min?: number;
    max?: number;
  })[];
}

// Choice field types
export interface ChoiceFormField extends BaseFormField {
  type:
    | typeof FormFieldType.SINGLE_CHOICE
    | typeof FormFieldType.MULTIPLE_CHOICES;
  props: (PropertyDefinition & {
    type: 'select';
    options: { label: string; value: string }[];
    isValueDifferent?: boolean;
  })[];
}

// Date/Time field types
export interface DateTimeFormField extends BaseFormField {
  type:
    | typeof FormFieldType.DATE
    | typeof FormFieldType.TIME
    | typeof FormFieldType.DATE_TIME;
  props: (PropertyDefinition & {
    type: 'string';
    format?: string;
  })[];
}

// File field type
export interface FileFormField extends BaseFormField {
  type: typeof FormFieldType.FILE;
  props: (PropertyDefinition & {
    type: 'array';
    accept?: string;
    multiple?: boolean;
  })[];
}

// Layout field types
export interface LayoutFormField extends BaseFormField {
  type:
    | typeof FormFieldType.ROW
    | typeof FormFieldType.COLUMN
    | typeof FormFieldType.BLOCK;
  children: FormField[];
  props: (PropertyDefinition & {
    type: 'object';
    gap?: Size;
    width?: Size;
  })[];
}

// Content field types
export interface ContentFormField extends BaseFormField {
  type: typeof FormFieldType.HEADER | typeof FormFieldType.PARAGRAPH;
  props: (PropertyDefinition & {
    type: 'rich-text';
    tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    textAlign?: 'left' | 'center' | 'right';
    color?: string;
    font?: {
      size: Size;
      weight: number;
    };
  })[];
}

// Image field type
export interface ImageFormField extends BaseFormField {
  type: typeof FormFieldType.IMAGE;
  props: (PropertyDefinition & {
    type: 'object';
    src?: string;
    alt?: string;
    textAlign?: 'left' | 'center' | 'right';
    objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
    width?: {
      value: Size;
      autoWidth: boolean;
    };
  })[];
}

// Button field type
export interface ButtonFormField extends BaseFormField {
  type: typeof FormFieldType.BUTTON;
  props: (PropertyDefinition & {
    type: 'object';
    label?: string;
    color?: string;
    bgColor?: string;
    btnType?: 'submit' | 'button';
    fullWidth?: boolean;
    font?: {
      size: Size;
      weight: number;
    };
    align?: 'left' | 'center' | 'right';
  })[];
}

// Page field type
export interface PageFormField extends BaseFormField {
  type: typeof FormFieldType.PAGE;
  children: FormField[];
  props: (PropertyDefinition & {
    type: 'object';
    name?: string;
  })[];
}

// Divider field type
export interface DividerFormField extends BaseFormField {
  type: typeof FormFieldType.DIVIDER;
  props: (PropertyDefinition & {
    type: 'object';
    color?: string;
    width?: Size;
    height?: Size;
    style?: 'solid' | 'dashed' | 'dotted';
  })[];
}

export type FormField =
  | InputFormField
  | ChoiceFormField
  | DateTimeFormField
  | FileFormField
  | LayoutFormField
  | ContentFormField
  | ImageFormField
  | ButtonFormField
  | PageFormField
  | DividerFormField;

export interface FormSchema {
  version: string;
  form: {
    fields: FormField[];
    rules: RootRule[];
  };
}
