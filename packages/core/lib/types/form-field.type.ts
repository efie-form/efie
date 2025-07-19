import type { FieldType } from '../constants/field-type';
import type { ValidationSchema } from './field-conditions.type';
import type {
  WidthProperty,
  HeightProperty,
} from './property-definition';
import type { CustomProperty, SystemPropertyAccept, SystemPropertyButtonAction, SystemPropertyColumnWidth, SystemPropertyHeadingContent, SystemPropertyImageAlt, SystemPropertyImageSrc, SystemPropertyLabel, SystemPropertyOptions, SystemPropertyPageName, SystemPropertyPlaceholder, SystemPropertyRequired } from './property-definition-2';

// Base form field interface
export interface BaseFormField {
  id: string;
  type: FieldType;
}

export interface FormInputField {
  form: {
    key: string;
    validation?: ValidationSchema[];
  };
}

export interface ShortTextFormField extends BaseFormField, FormInputField {
  type: typeof FieldType.SHORT_TEXT;
  props: (
    | SystemPropertyLabel
    | SystemPropertyPlaceholder
    | SystemPropertyRequired
    | CustomProperty
  )[];
}

export interface LongTextFormField extends BaseFormField, FormInputField {
  type: typeof FieldType.LONG_TEXT;
  props: (
    | SystemPropertyLabel
    | SystemPropertyPlaceholder
    | SystemPropertyRequired
  )[];
}

export interface NumberFormField extends BaseFormField, FormInputField {
  type: typeof FieldType.NUMBER;
  props: (
    | SystemPropertyLabel
    | SystemPropertyPlaceholder
    | SystemPropertyRequired
  )[];
}

export interface SingleChoiceFormField extends BaseFormField, FormInputField {
  type: typeof FieldType.SINGLE_CHOICE;
  props: (
    | SystemPropertyLabel
    | SystemPropertyOptions
    | SystemPropertyRequired
  )[];
}

export interface MultipleChoiceFormField extends BaseFormField, FormInputField {
  type: typeof FieldType.MULTIPLE_CHOICES;
  props: (
    | SystemPropertyLabel
    | SystemPropertyOptions
    | SystemPropertyRequired
  )[];
}

export interface DateFormField extends BaseFormField, FormInputField {
  type: typeof FieldType.DATE;
  props: (
    | SystemPropertyLabel
    | SystemPropertyRequired
  )[];
}

export interface TimeFormField extends BaseFormField, FormInputField {
  type: typeof FieldType.TIME;
  props: (
    | SystemPropertyLabel
    | SystemPropertyRequired
  )[];
}

export interface DateTimeFormField extends BaseFormField, FormInputField {
  type: typeof FieldType.DATE_TIME;
  props: (
    | SystemPropertyLabel
    | SystemPropertyRequired
  )[];
}

// File field type
export interface FileFormField extends BaseFormField, FormInputField {
  type: typeof FieldType.FILE;
  props: (
    | SystemPropertyLabel
    | SystemPropertyAccept
    | SystemPropertyRequired
  )[];
}

// Layout field types
export interface BlockFormField extends BaseFormField {
  type: typeof FieldType.BLOCK;
  children: FormField[];
  props: [];
}

export interface RowFormField extends BaseFormField {
  type: typeof FieldType.ROW;
  children: ColumnFormField[];
  props: (
    | WidthProperty
    | HeightProperty
  )[];
}

export interface ColumnFormField extends BaseFormField {
  type: typeof FieldType.COLUMN;
  children: FormField[];
  props: (
    | SystemPropertyColumnWidth
  )[];
}

export interface HeadingFormField extends BaseFormField {
  type: typeof FieldType.HEADING;
  props: (
    | SystemPropertyHeadingContent
  )[];
}

// Image field type
export interface ImageFormField extends BaseFormField {
  type: typeof FieldType.IMAGE;
  props: (
    | SystemPropertyImageSrc
    | SystemPropertyImageAlt
  )[];
}

// Button field type
export interface ButtonFormField extends BaseFormField {
  type: typeof FieldType.BUTTON;
  props: (
    | SystemPropertyButtonAction
    | SystemPropertyLabel
  )[];
}

// Page field type
export interface PageFormField extends BaseFormField {
  type: typeof FieldType.PAGE;
  children: FormField[];
  props: (
    | SystemPropertyPageName
  )[];
}

// Divider field type
export interface DividerFormField extends BaseFormField {
  type: typeof FieldType.DIVIDER;
  props: [];
}

export type FormField =
  | ShortTextFormField
  | LongTextFormField
  | DateFormField
  | TimeFormField
  | DateTimeFormField
  | SingleChoiceFormField
  | MultipleChoiceFormField
  | NumberFormField
  | FileFormField
  | HeadingFormField
  | ImageFormField
  | DividerFormField
  | ButtonFormField
  | PageFormField
  | ColumnFormField
  | RowFormField
  | BlockFormField;
