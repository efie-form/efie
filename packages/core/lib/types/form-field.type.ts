import type { FieldType } from '../constants/field-type';

import type {
  FieldCustomProp,
  FieldSystemPropAccept,
  FieldSystemPropAddressField,
  FieldSystemPropButtonAction,
  FieldSystemPropColumnWidth,
  FieldSystemPropHeadingContent,
  FieldSystemPropHidden,
  FieldSystemPropImageSrc,
  FieldSystemPropLabel,
  FieldSystemPropName, // changed
  FieldSystemPropOptions,
  FieldSystemPropPasswordRules, // fixed name
  FieldSystemPropPlaceholder,
  FieldSystemPropRequired,
  FieldSystemPropSelectionLimit,
  FieldSystemPropTextConstraints,
} from './property-definition';

export interface FormInputField {
  form: {
    name: string;
  };
}

export interface ShortTextFormField extends FormInputField {
  sys: {
    id: string;
    type: typeof FieldType.SHORT_TEXT;
    name: string;
  };
  props: (
    | FieldSystemPropLabel
    | FieldSystemPropPlaceholder
    | FieldSystemPropRequired
    | FieldSystemPropHidden
    | FieldSystemPropTextConstraints
    | FieldCustomProp
  )[];
}

export interface LongTextFormField extends FormInputField {
  sys: {
    id: string;
    type: typeof FieldType.LONG_TEXT;
    name: string;
  };
  props: (
    | FieldSystemPropLabel
    | FieldSystemPropPlaceholder
    | FieldSystemPropRequired
    | FieldSystemPropHidden
    | FieldSystemPropTextConstraints
    | FieldCustomProp
  )[];
}

export interface NumberFormField extends FormInputField {
  sys: {
    id: string;
    type: typeof FieldType.NUMBER;
    name: string;
  };
  props: (
    | FieldSystemPropLabel
    | FieldSystemPropPlaceholder
    | FieldSystemPropRequired
    | FieldSystemPropHidden
    | FieldCustomProp
  )[];
}

export interface SingleChoiceFormField extends FormInputField {
  sys: {
    id: string;
    type: typeof FieldType.SINGLE_CHOICE;
    name: string;
  };
  props: (
    | FieldSystemPropLabel
    | FieldSystemPropOptions
    | FieldSystemPropRequired
    | FieldSystemPropHidden
    | FieldCustomProp
  )[];
}

export interface MultipleChoiceFormField extends FormInputField {
  sys: {
    id: string;
    type: typeof FieldType.MULTIPLE_CHOICES;
    name: string;
  };
  props: (
    | FieldSystemPropLabel
    | FieldSystemPropOptions
    | FieldSystemPropRequired
    | FieldSystemPropHidden
    | FieldSystemPropSelectionLimit
    | FieldCustomProp
  )[];
}

export interface DateFormField extends FormInputField {
  sys: {
    id: string;
    type: typeof FieldType.DATE;
    name: string;
  };
  props: (
    | FieldSystemPropLabel
    | FieldSystemPropRequired
    | FieldSystemPropHidden
    | FieldCustomProp
  )[];
}

export interface TimeFormField extends FormInputField {
  sys: {
    id: string;
    type: typeof FieldType.TIME;
    name: string;
  };
  props: (
    | FieldSystemPropLabel
    | FieldSystemPropRequired
    | FieldSystemPropHidden
    | FieldCustomProp
  )[];
}

export interface DateTimeFormField extends FormInputField {
  sys: {
    id: string;
    type: typeof FieldType.DATE_TIME;
    name: string;
  };
  props: (
    | FieldSystemPropLabel
    | FieldSystemPropRequired
    | FieldSystemPropHidden
    | FieldCustomProp
  )[];
}

// File field type
export interface FileFormField extends FormInputField {
  sys: {
    id: string;
    type: typeof FieldType.FILE;
    name: string;
  };
  props: (
    | FieldSystemPropLabel
    | FieldSystemPropAccept
    | FieldSystemPropRequired
    | FieldSystemPropHidden
    | FieldCustomProp
  )[];
}

export interface EmailFormField extends FormInputField {
  sys: {
    id: string;
    type: typeof FieldType.EMAIL;
    name: string;
  };
  props: (
    | FieldSystemPropLabel
    | FieldSystemPropPlaceholder
    | FieldSystemPropRequired
    | FieldSystemPropHidden
    | FieldCustomProp
  )[];
}

export interface PhoneFormField extends FormInputField {
  sys: {
    id: string;
    type: typeof FieldType.PHONE;
    name: string;
  };
  props: (
    | FieldSystemPropLabel
    | FieldSystemPropPlaceholder
    | FieldSystemPropRequired
    | FieldSystemPropHidden
    | FieldCustomProp
  )[];
}

export interface CheckboxFormField extends FormInputField {
  sys: {
    id: string;
    type: typeof FieldType.CHECKBOX;
    name: string;
  };
  props: (
    | FieldSystemPropLabel
    | FieldSystemPropOptions
    | FieldSystemPropRequired
    | FieldSystemPropHidden
    | FieldCustomProp
  )[];
}

export interface AddressFormField extends FormInputField {
  sys: {
    id: string;
    type: typeof FieldType.ADDRESS;
    name: string;
  };
  props: (
    | FieldSystemPropLabel
    | FieldSystemPropRequired
    | FieldSystemPropAddressField
    | FieldSystemPropHidden
    | FieldCustomProp
  )[];
}

export interface PasswordFormField extends FormInputField {
  sys: {
    id: string;
    type: typeof FieldType.PASSWORD;
    name: string;
  };
  props: (
    | FieldSystemPropLabel
    | FieldSystemPropPlaceholder
    | FieldSystemPropRequired
    | FieldSystemPropPasswordRules // fixed name
    | FieldSystemPropHidden
    | FieldCustomProp
  )[];
}

// Layout field types
export interface BlockFormField {
  sys: {
    id: string;
    type: typeof FieldType.BLOCK;
    name: string;
  };
  children: FormField[];
  props: (FieldSystemPropHidden | FieldCustomProp)[];
}

export interface RowFormField {
  sys: {
    id: string;
    type: typeof FieldType.ROW;
    name: string;
  };
  children: ColumnFormField[];
  props: (FieldSystemPropHidden | FieldCustomProp)[];
}

export interface ColumnFormField {
  sys: {
    id: string;
    type: typeof FieldType.COLUMN;
    name: string;
  };
  children: FormField[];
  props: (FieldSystemPropColumnWidth | FieldSystemPropHidden | FieldCustomProp)[];
}

export interface GroupFormField {
  sys: {
    id: string;
    type: typeof FieldType.GROUP;
    name: string;
  };
  children: FormField[];
  props: (FieldSystemPropHidden | FieldCustomProp)[];
}

export interface HeadingFormField {
  sys: {
    id: string;
    type: typeof FieldType.HEADING;
    name: string;
  };
  props: (FieldSystemPropHeadingContent | FieldSystemPropHidden | FieldCustomProp)[];
}

// Image field type
export interface ImageFormField {
  sys: {
    id: string;
    type: typeof FieldType.IMAGE;
    name: string;
  };
  props: (FieldSystemPropImageSrc | FieldSystemPropHidden | FieldCustomProp)[];
}

// Button field type
export interface ButtonFormField {
  sys: {
    id: string;
    type: typeof FieldType.BUTTON;
    name: string;
  };
  props: (
    | FieldSystemPropButtonAction
    | FieldSystemPropLabel
    | FieldSystemPropHidden
    | FieldCustomProp
  )[];
}

// Page field type
export interface PageFormField {
  sys: {
    id: string;
    type: typeof FieldType.PAGE;
    name: string;
  };
  children: FormField[];
  props: (FieldSystemPropName | FieldSystemPropHidden | FieldCustomProp)[];
}

// Divider field type
export interface DividerFormField {
  sys: {
    id: string;
    type: typeof FieldType.DIVIDER;
    name: string;
  };
  props: (FieldSystemPropHidden | FieldCustomProp)[];
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
  | BlockFormField
  | EmailFormField
  | PhoneFormField
  | CheckboxFormField
  | AddressFormField
  | PasswordFormField
  | GroupFormField;
