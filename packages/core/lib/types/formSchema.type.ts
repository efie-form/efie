import type { JSONContent } from '@tiptap/core';
import type {
  FormFieldType,
  PropertyType,
  RuleType,
  ActionType,
  DisplayPosition,
  SizeUnit,
} from '../Constants';

// Base types for units and measurements
export interface Size {
  value: number;
  unit: SizeUnit;
}

// Field condition types
export interface FieldCondition {
  fieldId: string;
  operator: string;
  value: FieldConditionValue;
}

export interface FieldConditionGroup {
  operator: 'and' | 'or';
  conditions: (FieldCondition | FieldConditionGroup)[];
}

export type FieldConditionValue = FieldValue | RegExp;

// Field rule types
export interface FieldVisibilityRule {
  type: typeof RuleType.VISIBILITY;
  conditions: FieldCondition | FieldConditionGroup;
  action: {
    type: typeof ActionType.SHOW | typeof ActionType.HIDE;
    fields: string[];
  };
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

// Field value types
export type FieldValue = string | number | boolean | null | undefined;

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
      fallbackValue?: FieldValue;
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
export interface FieldRequirementRule {
  type: typeof RuleType.REQUIREMENT;
  conditions: FieldCondition | FieldConditionGroup;
  action: {
    type: typeof ActionType.READONLY | typeof ActionType.EDITABLE;
    fields: string[];
  };
}

export interface FieldEnableRule {
  type: typeof RuleType.ENABLE;
  conditions: FieldCondition | FieldConditionGroup;
  action: {
    type: typeof ActionType.READONLY | typeof ActionType.EDITABLE;
    fields: string[];
  };
}

export interface FieldValueRule {
  type: typeof RuleType.VALUE;
  conditions: FieldCondition | FieldConditionGroup;
  action: {
    type:
      | typeof ActionType.SET
      | typeof ActionType.CLEAR
      | typeof ActionType.COPY
      | typeof ActionType.CALCULATE;
    fields: string[];
    value?: FieldConditionValue;
  };
}

export interface FieldStyleRule {
  type: typeof RuleType.STYLE;
  conditions: FieldCondition | FieldConditionGroup;
  action: {
    type: typeof ActionType.TRANSFORM;
    fields: string[];
    style: Record<string, string | number>;
  };
}

export interface FieldValidationRule {
  type: typeof RuleType.VALIDATION;
  conditions: FieldCondition | FieldConditionGroup;
  action: {
    type: 'crossField';
    fields: string[];
    rules: ValidationSchema[];
    preventSubmission?: boolean;
  };
}

export interface FieldDependencyRule {
  type: typeof RuleType.DEPENDENCY;
  conditions: FieldCondition | FieldConditionGroup;
  action: {
    type: typeof ActionType.WATCH | typeof ActionType.UNWATCH;
    fields: string[];
  };
}

export interface FieldBehaviorRule {
  type: typeof RuleType.BEHAVIOR;
  conditions: FieldCondition | FieldConditionGroup;
  action: {
    type:
      | typeof ActionType.FOCUS
      | typeof ActionType.BLUR
      | typeof ActionType.SCROLL_INTO_VIEW
      | typeof ActionType.TRIGGER_EVENT;
    fields: string[];
    event?: string;
  };
}

export interface FieldAccessRule {
  type: typeof RuleType.ACCESS;
  conditions: FieldCondition | FieldConditionGroup;
  action: {
    type: typeof ActionType.HIDDEN | typeof ActionType.VISIBLE;
    fields: string[];
  };
}

export interface FieldFormatRule {
  type: typeof RuleType.FORMAT;
  conditions: FieldCondition | FieldConditionGroup;
  action: {
    type: typeof ActionType.MASK | typeof ActionType.UNMASK;
    fields: string[];
    format?: string;
  };
}

export interface FieldErrorRule {
  type: typeof RuleType.ERROR;
  conditions: FieldCondition | FieldConditionGroup;
  action: {
    type: typeof ActionType.DISPLAY;
    fields: string[];
    display: {
      position: DisplayPosition;
      style?: Record<string, string | number>;
    };
  };
}

export interface FieldStateRule {
  type: typeof RuleType.STATE;
  conditions: FieldCondition | FieldConditionGroup;
  action: {
    type:
      | typeof ActionType.LOADING
      | typeof ActionType.SUCCESS
      | typeof ActionType.ERROR
      | typeof ActionType.WARNING;
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
  value: FieldConditionValue;
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
  value: FieldConditionValue;
  then: ValidationRule | ValidationGroup;
  else?: ValidationRule | ValidationGroup;
}

export interface ValidationCase {
  type: 'case';
  fieldId: string;
  cases: {
    value: FieldConditionValue;
    rules: ValidationRule | ValidationGroup;
  }[];
  default?: ValidationRule | ValidationGroup;
}

export type ValidationSchema =
  | ValidationRule
  | ValidationGroup
  | ValidationCondition
  | ValidationCase;

// Property value types
export type PropertyValue =
  | string
  | number
  | boolean
  | JSONContent
  | Record<string, string | number | boolean | JSONContent>
  | (string | number | boolean | JSONContent)[]
  | null
  | undefined;

// Property types
export interface PropertyDefinition {
  type: PropertyType;
  label: string;
  defaultValue?: PropertyValue;
  options?: { label: string; value: string | number }[];
  validation?: ValidationSchema[];
  isRequired?: boolean;
  isArray?: boolean;
  arrayItemType?: PropertyDefinition;
  content?: JSONContent; // For rich-text type
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
    format?: string;
  })[];
}

// File field type
export interface FileFormField extends BaseFormField {
  type: typeof FormFieldType.FILE;
  props: (PropertyDefinition & {
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
    gap?: Size;
    width?: Size;
  })[];
}

// Content field types
export interface ContentFormField extends BaseFormField {
  type: typeof FormFieldType.HEADER | typeof FormFieldType.PARAGRAPH;
  props: (PropertyDefinition & {
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
    name?: string;
  })[];
}

// Divider field type
export interface DividerFormField extends BaseFormField {
  type: typeof FormFieldType.DIVIDER;
  props: (PropertyDefinition & {
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
