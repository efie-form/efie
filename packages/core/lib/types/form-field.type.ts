import type { FormFieldType } from './../input-type';
import type { ValidationSchema } from './form-schema.type';

import type { PropValue } from './prop-value.type';

// Base form field interface
export interface BaseFormField {
  id: string;
  type: FormFieldType;
  props: PropValue[];
  container?: {
    props: PropValue[];
  };
}

export interface FormInputField {
  form: {
    key: string;
    validation?: ValidationSchema[];
  };
}

export interface ShortTextFormField extends BaseFormField, FormInputField {
  type: typeof FormFieldType.SHORT_TEXT;
}

export interface LongTextFormField extends BaseFormField, FormInputField {
  type: typeof FormFieldType.LONG_TEXT;
}

export interface NumberFormField extends BaseFormField, FormInputField {
  type: typeof FormFieldType.NUMBER;
}

export interface SingleChoiceFormField extends BaseFormField, FormInputField {
  type: typeof FormFieldType.SINGLE_CHOICE;
}

export interface MultipleChoiceFormField extends BaseFormField, FormInputField {
  type: typeof FormFieldType.MULTIPLE_CHOICES;
}

export interface DateFormField extends BaseFormField, FormInputField {
  type: typeof FormFieldType.DATE;
}

export interface TimeFormField extends BaseFormField, FormInputField {
  type: typeof FormFieldType.TIME;
}

export interface DateTimeFormField extends BaseFormField, FormInputField {
  type: typeof FormFieldType.DATE_TIME;
}

// File field type
export interface FileFormField extends BaseFormField, FormInputField {
  type: typeof FormFieldType.FILE;
}

// Layout field types
export interface BlockFormField extends BaseFormField {
  type: typeof FormFieldType.BLOCK;
  children: FormField[];
}

export interface RowFormField extends BaseFormField {
  type: typeof FormFieldType.ROW;
  children: ColumnFormField[];
}

export interface ColumnFormField extends BaseFormField {
  type: typeof FormFieldType.COLUMN;
  children: FormField[];
}

export interface HeaderFormField extends BaseFormField {
  type: typeof FormFieldType.HEADER;
}

export interface ParagraphFormField extends BaseFormField {
  type: typeof FormFieldType.PARAGRAPH;
}

// Image field type
export interface ImageFormField extends BaseFormField {
  type: typeof FormFieldType.IMAGE;
}

// Button field type
export interface ButtonFormField extends BaseFormField {
  type: typeof FormFieldType.BUTTON;
}

// Page field type
export interface PageFormField extends BaseFormField {
  type: typeof FormFieldType.PAGE;
  children: FormField[];
}

// Divider field type
export interface DividerFormField extends BaseFormField {
  type: typeof FormFieldType.DIVIDER;
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
  | HeaderFormField
  | ParagraphFormField
  | ImageFormField
  | DividerFormField
  | ButtonFormField
  | PageFormField
  | ColumnFormField
  | RowFormField
  | BlockFormField;
