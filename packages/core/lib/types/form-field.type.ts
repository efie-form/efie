import type { FieldType } from '../constants/field-type';
import type { ValidationSchema } from './field-conditions.type';

import type {
  FieldCustomProp,
  FieldSystemPropAccept,
  FieldSystemPropButtonAction,
  FieldSystemPropColumnWidth,
  FieldSystemPropHeadingContent,
  FieldSystemPropImageSrc,
  FieldSystemPropLabel,
  FieldSystemPropOptions,
  FieldSystemPropPageName,
  FieldSystemPropPlaceholder,
  FieldSystemPropRequired,
} from './property-definition';

// Base form field interface
export interface BaseFormField {
  id: string;
  type: FieldType;
}

export interface FormInputField {
  form: {
    name: string;
    validation?: ValidationSchema[];
  };
}

export interface ShortTextFormField extends BaseFormField, FormInputField {
  type: typeof FieldType.SHORT_TEXT;
  props: (
    | FieldSystemPropLabel
    | FieldSystemPropPlaceholder
    | FieldSystemPropRequired
    | FieldCustomProp
  )[];
}

export interface LongTextFormField extends BaseFormField, FormInputField {
  type: typeof FieldType.LONG_TEXT;
  props: (
    | FieldSystemPropLabel
    | FieldSystemPropPlaceholder
    | FieldSystemPropRequired
    | FieldCustomProp
  )[];
}

export interface NumberFormField extends BaseFormField, FormInputField {
  type: typeof FieldType.NUMBER;
  props: (
    | FieldSystemPropLabel
    | FieldSystemPropPlaceholder
    | FieldSystemPropRequired
    | FieldCustomProp
  )[];
}

export interface SingleChoiceFormField extends BaseFormField, FormInputField {
  type: typeof FieldType.SINGLE_CHOICE;
  props: (
    | FieldSystemPropLabel
    | FieldSystemPropOptions
    | FieldSystemPropRequired
    | FieldCustomProp
  )[];
}

export interface MultipleChoiceFormField extends BaseFormField, FormInputField {
  type: typeof FieldType.MULTIPLE_CHOICES;
  props: (
    | FieldSystemPropLabel
    | FieldSystemPropOptions
    | FieldSystemPropRequired
    | FieldCustomProp
  )[];
}

export interface DateFormField extends BaseFormField, FormInputField {
  type: typeof FieldType.DATE;
  props: (FieldSystemPropLabel | FieldSystemPropRequired | FieldCustomProp)[];
}

export interface TimeFormField extends BaseFormField, FormInputField {
  type: typeof FieldType.TIME;
  props: (FieldSystemPropLabel | FieldSystemPropRequired | FieldCustomProp)[];
}

export interface DateTimeFormField extends BaseFormField, FormInputField {
  type: typeof FieldType.DATE_TIME;
  props: (FieldSystemPropLabel | FieldSystemPropRequired | FieldCustomProp)[];
}

// File field type
export interface FileFormField extends BaseFormField, FormInputField {
  type: typeof FieldType.FILE;
  props: (
    | FieldSystemPropLabel
    | FieldSystemPropAccept
    | FieldSystemPropRequired
    | FieldCustomProp
  )[];
}

// Layout field types
export interface BlockFormField extends BaseFormField {
  type: typeof FieldType.BLOCK;
  children: FormField[];
  props: FieldCustomProp[];
}

export interface RowFormField extends BaseFormField {
  type: typeof FieldType.ROW;
  children: ColumnFormField[];
  props: FieldCustomProp[];
}

export interface ColumnFormField extends BaseFormField {
  type: typeof FieldType.COLUMN;
  children: FormField[];
  props: (FieldSystemPropColumnWidth | FieldCustomProp)[];
}

export interface HeadingFormField extends BaseFormField {
  type: typeof FieldType.HEADING;
  props: (FieldSystemPropHeadingContent | FieldCustomProp)[];
}

// Image field type
export interface ImageFormField extends BaseFormField {
  type: typeof FieldType.IMAGE;
  props: (FieldSystemPropImageSrc | FieldCustomProp)[];
}

// Button field type
export interface ButtonFormField extends BaseFormField {
  type: typeof FieldType.BUTTON;
  props: (FieldSystemPropButtonAction | FieldSystemPropLabel | FieldCustomProp)[];
}

// Page field type
export interface PageFormField extends BaseFormField {
  type: typeof FieldType.PAGE;
  children: FormField[];
  props: (FieldSystemPropPageName | FieldCustomProp)[];
}

// Divider field type
export interface DividerFormField extends BaseFormField {
  type: typeof FieldType.DIVIDER;
  props: FieldCustomProp[];
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
