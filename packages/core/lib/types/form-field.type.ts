import type { FieldType } from '../constants/field-type';
import type { ValidationSchema } from './field-conditions.type';
import type {
  AcceptProperty,
  AltProperty,
  BgColorProperty,
  BorderColorProperty,
  BorderRadiusProperty,
  BorderStyleProperty,
  BorderWidthProperty,
  BoxShadowProperty,
  ButtonActionProperty,
  ColorProperty,
  ContentProperty,
  FontSizeProperty,
  FontWeightProperty,
  HeightProperty,
  LabelProperty,
  MarginProperty,
  MaxFilesProperty,
  ObjectFitProperty,
  OptionsProperty,
  PaddingProperty,
  PageNameProperty,
  PlaceholderProperty,
  RequiredProperty,
  SrcProperty,
  TextAlignProperty,
  WidthProperty,
} from './property-definition';

// Base form field interface
export interface BaseFormField {
  id: string;
  type: FieldType;
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
  type: typeof FieldType.SHORT_TEXT;
  props: (LabelProperty | PlaceholderProperty | RequiredProperty)[];
}

export interface LongTextFormField extends BaseFormField, FormInputField {
  type: typeof FieldType.LONG_TEXT;
  props: (LabelProperty | PlaceholderProperty | RequiredProperty)[];
}

export interface NumberFormField extends BaseFormField, FormInputField {
  type: typeof FieldType.NUMBER;
  props: (LabelProperty | PlaceholderProperty | RequiredProperty)[];
}

export interface SingleChoiceFormField extends BaseFormField, FormInputField {
  type: typeof FieldType.SINGLE_CHOICE;
  props: (LabelProperty | OptionsProperty | RequiredProperty)[];
}

export interface MultipleChoiceFormField extends BaseFormField, FormInputField {
  type: typeof FieldType.MULTIPLE_CHOICES;
  props: (LabelProperty | OptionsProperty | RequiredProperty)[];
}

export interface DateFormField extends BaseFormField, FormInputField {
  type: typeof FieldType.DATE;
  props: (LabelProperty | RequiredProperty)[];
}

export interface TimeFormField extends BaseFormField, FormInputField {
  type: typeof FieldType.TIME;
  props: (LabelProperty | RequiredProperty)[];
}

export interface DateTimeFormField extends BaseFormField, FormInputField {
  type: typeof FieldType.DATE_TIME;
  props: (LabelProperty | RequiredProperty)[];
}

// File field type
export interface FileFormField extends BaseFormField, FormInputField {
  type: typeof FieldType.FILE;
  props: (LabelProperty | AcceptProperty | MaxFilesProperty | RequiredProperty)[];
}

// Layout field types
export interface BlockFormField extends BaseFormField {
  type: typeof FieldType.BLOCK;
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
  )[];
}

export interface RowFormField extends BaseFormField {
  type: typeof FieldType.ROW;
  children: ColumnFormField[];
  props: (WidthProperty | HeightProperty)[];
}

export interface ColumnFormField extends BaseFormField {
  type: typeof FieldType.COLUMN;
  children: FormField[];
  props: (WidthProperty | HeightProperty)[];
}

export interface HeadingFormField extends BaseFormField {
  type: typeof FieldType.HEADING;
  props: (TextAlignProperty | ColorProperty | FontSizeProperty | ContentProperty)[];
}

// Image field type
export interface ImageFormField extends BaseFormField {
  type: typeof FieldType.IMAGE;
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
  type: typeof FieldType.BUTTON;
  props: (
    | LabelProperty
    | WidthProperty
    | BgColorProperty
    | ColorProperty
    | TextAlignProperty
    | FontSizeProperty
    | FontWeightProperty
    | ButtonActionProperty
    | BorderRadiusProperty
    | BorderStyleProperty
    | PaddingProperty
  )[];
}

// Page field type
export interface PageFormField extends BaseFormField {
  type: typeof FieldType.PAGE;
  children: FormField[];
  props: (WidthProperty | PageNameProperty)[];
}

// Divider field type
export interface DividerFormField extends BaseFormField {
  type: typeof FieldType.DIVIDER;
  props: (LabelProperty | ColorProperty | WidthProperty | HeightProperty | BorderStyleProperty)[];
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
