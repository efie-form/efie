import type { FormFieldType } from './../input-type';
import type { ValidationSchema } from './form-schema.type';
import type {
  LabelProperty,
  PlaceholderProperty,
  RequiredProperty,
  OptionsProperty,
  TagProperty,
  TextAlignProperty,
  ColorProperty,
  FontSizeProperty,
  SrcProperty,
  AltProperty,
  ObjectFitProperty,
  WidthProperty,
  HeightProperty,
  AcceptProperty,
  BgColorProperty,
  MarginProperty,
  PaddingProperty,
  BorderRadiusProperty,
  BoxShadowProperty,
  BorderStyleProperty,
  MaxFilesProperty,
  BorderWidthProperty,
  BorderColorProperty,
  NameProperty,
  ContentProperty,
  StyleProperty,
  BtnTypeProperty,
  FontWeightProperty,
  DividerHeightProperty,
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
      | FontSizeProperty
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
    | RequiredProperty
  )[];
}

export interface LongTextFormField extends BaseFormField, FormInputField {
  type: typeof FormFieldType.LONG_TEXT;
  props: (
    | LabelProperty
    | PlaceholderProperty
    | RequiredProperty
  )[];
}

export interface NumberFormField extends BaseFormField, FormInputField {
  type: typeof FormFieldType.NUMBER;
  props: (
    | LabelProperty
    | PlaceholderProperty
    | RequiredProperty
  )[];
}

export interface SingleChoiceFormField extends BaseFormField, FormInputField {
  type: typeof FormFieldType.SINGLE_CHOICE;
  props: (
    | LabelProperty
    | OptionsProperty
    | RequiredProperty
  )[];
}

export interface MultipleChoiceFormField extends BaseFormField, FormInputField {
  type: typeof FormFieldType.MULTIPLE_CHOICES;
  props: (
    | LabelProperty
    | OptionsProperty
    | RequiredProperty
  )[];
}

export interface DateFormField extends BaseFormField, FormInputField {
  type: typeof FormFieldType.DATE;
  props: (
    | LabelProperty
    | RequiredProperty
  )[];
}

export interface TimeFormField extends BaseFormField, FormInputField {
  type: typeof FormFieldType.TIME;
  props: (
    | LabelProperty
    | RequiredProperty
  )[];
}

export interface DateTimeFormField extends BaseFormField, FormInputField {
  type: typeof FormFieldType.DATE_TIME;
  props: (
    | LabelProperty
    | RequiredProperty
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
    | WidthProperty
    | HeightProperty
    | MarginProperty
    | PaddingProperty
    | BgColorProperty
    | ColorProperty
    | BoxShadowProperty
    | BorderRadiusProperty
    | BorderStyleProperty
    | BorderWidthProperty
    | BorderColorProperty
    | StyleProperty
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
    | TagProperty
    | TextAlignProperty
    | ColorProperty
    | FontSizeProperty
    | ContentProperty
  )[];
}

export interface ParagraphFormField extends BaseFormField {
  type: typeof FormFieldType.PARAGRAPH;
  props: (
    | TagProperty
    | TextAlignProperty
    | ColorProperty
    | FontSizeProperty
    | ContentProperty
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
    | WidthProperty
    | TextAlignProperty
  )[];
}

// Button field type
export interface ButtonFormField extends BaseFormField {
  type: typeof FormFieldType.BUTTON;
  props: (
    | LabelProperty
    | WidthProperty
    | BgColorProperty
    | ColorProperty
    | TextAlignProperty
    | FontSizeProperty
    | FontWeightProperty
    | BorderRadiusProperty
    | BorderStyleProperty
    | PaddingProperty
    | BtnTypeProperty
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
    | DividerHeightProperty
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
