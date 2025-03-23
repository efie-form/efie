import type { JSONContent } from '@tiptap/core';
import type {
  FormFieldType,
  RuleType,
  ActionType,
  DisplayPosition,
  SizeUnit,
} from './formSchema.constant';
import type {
  LabelProperty,
  PlaceholderProperty,
  StringDefaultValueProperty,
  NumberDefaultValueProperty,
  ArrayDefaultValueProperty,
  RequiredProperty,
  MinProperty,
  MaxProperty,
  FormatProperty,
  OptionsProperty,
  TagProperty,
  TextAlignProperty,
  ColorProperty,
  FontSizeProperty,
  FontWeightProperty,
  SrcProperty,
  AltProperty,
  ObjectFitProperty,
  AutoWidthProperty,
  WidthProperty,
  HeightProperty,
  StyleProperty,
  AcceptProperty,
  MultipleProperty,
  ButtonTypeProperty,
  FullWidthProperty,
  BgColorProperty,
  AlignProperty,
  GapProperty,
} from './fieldProperties.type';
import type { RootRule } from './RootRule.type';
import type { ContentProperty } from './fieldProperties.type';

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
  props: (
    | LabelProperty
    | PlaceholderProperty
    | StringDefaultValueProperty
    | NumberDefaultValueProperty
    | ArrayDefaultValueProperty
    | RequiredProperty
    | MinProperty
    | MaxProperty
    | FormatProperty
    | OptionsProperty
    | TagProperty
    | TextAlignProperty
    | ColorProperty
    | FontSizeProperty
    | FontWeightProperty
    | SrcProperty
    | AltProperty
    | ObjectFitProperty
    | AutoWidthProperty
    | WidthProperty
    | HeightProperty
    | StyleProperty
    | AcceptProperty
    | MultipleProperty
    | ButtonTypeProperty
    | FullWidthProperty
    | BgColorProperty
    | AlignProperty
    | GapProperty
  )[];
  container?: {
    props: (
      | WidthProperty
      | HeightProperty
      | ColorProperty
      | BgColorProperty
      | TextAlignProperty
      | AlignProperty
      | GapProperty
      | FontSizeProperty
      | FontWeightProperty
      | StyleProperty
    )[];
  };
  rules?: FieldRule[];
}

// Input field types
export interface InputFormField extends BaseFormField {
  type:
    | typeof FormFieldType.SHORT_TEXT
    | typeof FormFieldType.LONG_TEXT
    | typeof FormFieldType.NUMBER;
  props: (
    | LabelProperty
    | PlaceholderProperty
    | StringDefaultValueProperty
    | NumberDefaultValueProperty
    | RequiredProperty
    | MinProperty
    | MaxProperty
    | FormatProperty
  )[];
}

// Choice field types
export interface ChoiceFormField extends BaseFormField {
  type:
    | typeof FormFieldType.SINGLE_CHOICE
    | typeof FormFieldType.MULTIPLE_CHOICES;
  props: (
    | LabelProperty
    | OptionsProperty
    | StringDefaultValueProperty
    | ArrayDefaultValueProperty
    | RequiredProperty
    | MultipleProperty
  )[];
}

// Date/Time field types
export interface DateTimeFormField extends BaseFormField {
  type:
    | typeof FormFieldType.DATE
    | typeof FormFieldType.TIME
    | typeof FormFieldType.DATE_TIME;
  props: (
    | LabelProperty
    | StringDefaultValueProperty
    | RequiredProperty
    | FormatProperty
  )[];
}

// File field type
export interface FileFormField extends BaseFormField {
  type: typeof FormFieldType.FILE;
  props: (
    | LabelProperty
    | AcceptProperty
    | MultipleProperty
    | RequiredProperty
  )[];
}

// Layout field types
export interface LayoutFormField extends BaseFormField {
  type:
    | typeof FormFieldType.ROW
    | typeof FormFieldType.COLUMN
    | typeof FormFieldType.BLOCK;
  children: FormField[];
  props: (GapProperty | WidthProperty)[];
}

// Content field types
export interface ContentFormField extends BaseFormField {
  type: typeof FormFieldType.HEADER | typeof FormFieldType.PARAGRAPH;
  props: (
    | ContentProperty
    | TagProperty
    | TextAlignProperty
    | ColorProperty
    | FontSizeProperty
    | FontWeightProperty
  )[];
}

// Image field type
export interface ImageFormField extends BaseFormField {
  type: typeof FormFieldType.IMAGE;
  props: (
    | LabelProperty
    | SrcProperty
    | AltProperty
    | ObjectFitProperty
    | AutoWidthProperty
    | WidthProperty
    | TextAlignProperty
  )[];
}

// Button field type
export interface ButtonFormField extends BaseFormField {
  type: typeof FormFieldType.BUTTON;
  props: (
    | LabelProperty
    | ButtonTypeProperty
    | FullWidthProperty
    | BgColorProperty
    | ColorProperty
    | AlignProperty
    | FontSizeProperty
    | FontWeightProperty
  )[];
}

// Page field type
export interface PageFormField extends BaseFormField {
  type: typeof FormFieldType.PAGE;
  children: FormField[];
  props: WidthProperty[];
}

// Divider field type
export interface DividerFormField extends BaseFormField {
  type: typeof FormFieldType.DIVIDER;
  props: (
    | LabelProperty
    | ColorProperty
    | WidthProperty
    | HeightProperty
    | StyleProperty
  )[];
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

export type {
  FormSchema,
  FormField,
  Size,
  FieldCondition,
  FieldConditionGroup,
  FieldConditionValue,
  FieldConditionOperator,
  FieldValue,
  FieldRule,
  ValidationOperator,
  ValidationRule,
  ValidationGroup,
  ValidationCondition,
  ValidationCase,
  ValidationSchema,
  PropertyValue,
  ContainerStyle,
  BaseFormField,
  InputFormField,
  ChoiceFormField,
  DateTimeFormField,
  FileFormField,
  LayoutFormField,
  ContentFormField,
  ImageFormField,
  ButtonFormField,
  PageFormField,
  DividerFormField,
  RootRule,
};
