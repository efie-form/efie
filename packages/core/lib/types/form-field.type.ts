import type { FormFieldType } from './../input-type';
import type { ValidationSchema } from './form-schema.type';
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
  BgColorProperty,
  AlignProperty,
  GapProperty,
  MarginProperty,
  PaddingProperty,
  BorderColorProperty,
  BorderWidthProperty,
  BorderRadiusProperty,
  BoxShadowProperty,
  BorderStyleProperty,
  MaxFilesProperty,
  NameProperty,
  ContentProperty,
} from './field-properties.type';

// Base form field interface
export interface BaseFormField {
  id: string;
  type: FormFieldType;
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
}

export interface FormInputField {
  form: {
    key: string;
    validation?: ValidationSchema[];
  };
}

export interface ShortTextFormField extends BaseFormField, FormInputField {
  type: typeof FormFieldType.SHORT_TEXT;
  props: (
    | LabelProperty
    | PlaceholderProperty
    | StringDefaultValueProperty
    | RequiredProperty
  )[];
}

export interface LongTextFormField extends BaseFormField, FormInputField {
  type: typeof FormFieldType.LONG_TEXT;
  props: (
    | LabelProperty
    | PlaceholderProperty
    | StringDefaultValueProperty
    | RequiredProperty
  )[];
}

export interface NumberFormField extends BaseFormField, FormInputField {
  type: typeof FormFieldType.NUMBER;
  props: (
    | LabelProperty
    | StringDefaultValueProperty
    | NumberDefaultValueProperty
    | PlaceholderProperty
    | RequiredProperty
    | MinProperty
    | MaxProperty
    | FormatProperty
  )[];
}

export interface SingleChoiceFormField extends BaseFormField, FormInputField {
  type: typeof FormFieldType.SINGLE_CHOICE;
  props: (
    | LabelProperty
    | OptionsProperty
    | StringDefaultValueProperty
    | ArrayDefaultValueProperty
    | RequiredProperty
    | MultipleProperty
  )[];
}

export interface MultipleChoiceFormField extends BaseFormField, FormInputField {
  type: typeof FormFieldType.MULTIPLE_CHOICES;
  props: (
    | LabelProperty
    | OptionsProperty
    | StringDefaultValueProperty
    | ArrayDefaultValueProperty
    | RequiredProperty
    | MultipleProperty
  )[];
}

export interface DateFormField extends BaseFormField, FormInputField {
  type: typeof FormFieldType.DATE;
  props: (
    | LabelProperty
    | StringDefaultValueProperty
    | RequiredProperty
    | FormatProperty
  )[];
}

export interface TimeFormField extends BaseFormField, FormInputField {
  type: typeof FormFieldType.TIME;
  props: (
    | LabelProperty
    | StringDefaultValueProperty
    | RequiredProperty
    | FormatProperty
  )[];
}

export interface DateTimeFormField extends BaseFormField, FormInputField {
  type: typeof FormFieldType.DATE_TIME;
  props: (
    | LabelProperty
    | StringDefaultValueProperty
    | RequiredProperty
    | FormatProperty
  )[];
}

// File field type
export interface FileFormField extends BaseFormField, FormInputField {
  type: typeof FormFieldType.FILE;
  props: (
    | LabelProperty
    | AcceptProperty
    | MaxFilesProperty
    | RequiredProperty
  )[];
}

// Layout field types
export interface BlockFormField extends BaseFormField {
  type: typeof FormFieldType.BLOCK;
  children: FormField[];
  props: (
    | GapProperty
    | WidthProperty
    | HeightProperty
    | MarginProperty
    | PaddingProperty
    | BgColorProperty
    | ColorProperty
    | BoxShadowProperty
    | BorderRadiusProperty
    | BorderWidthProperty
    | BorderColorProperty
    | BorderStyleProperty
  )[];
}

export interface RowFormField extends BaseFormField {
  type: typeof FormFieldType.ROW;
  children: ColumnFormField[];
  props: (WidthProperty | HeightProperty)[];
}

export interface ColumnFormField extends BaseFormField {
  type: typeof FormFieldType.COLUMN;
  children: FormField[];
  props: (WidthProperty | HeightProperty)[];
}

export interface HeaderFormField extends BaseFormField {
  type: typeof FormFieldType.HEADER;
  props: (
    | ContentProperty
    | TagProperty
    | TextAlignProperty
    | ColorProperty
    | FontSizeProperty
    | FontWeightProperty
  )[];
}

export interface ParagraphFormField extends BaseFormField {
  type: typeof FormFieldType.PARAGRAPH;
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
    | WidthProperty
    | BgColorProperty
    | ColorProperty
    | TextAlignProperty
    | FontSizeProperty
    | FontWeightProperty
    | BorderRadiusProperty
    | BorderWidthProperty
    | BorderColorProperty
    | BorderStyleProperty
    | PaddingProperty
    | BorderRadiusProperty
  )[];
}

// Page field type
export interface PageFormField extends BaseFormField {
  type: typeof FormFieldType.PAGE;
  children: FormField[];
  props: (WidthProperty | NameProperty)[];
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
