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
    name: string;
    type: (typeof FieldType)['SHORT_TEXT'];
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
    name: string;
    type: (typeof FieldType)['LONG_TEXT'];
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
    name: string;
    type: (typeof FieldType)['NUMBER'];
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
    name: string;
    type: (typeof FieldType)['SINGLE_CHOICE'];
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
    name: string;
    type: (typeof FieldType)['MULTIPLE_CHOICES'];
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
    name: string;
    type: (typeof FieldType)['DATE'];
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
    name: string;
    type: (typeof FieldType)['TIME'];
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
    name: string;
    type: (typeof FieldType)['DATE_TIME'];
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
    name: string;
    type: (typeof FieldType)['FILE'];
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
    name: string;
    type: (typeof FieldType)['EMAIL'];
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
    name: string;
    type: (typeof FieldType)['PHONE'];
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
    name: string;
    type: (typeof FieldType)['CHECKBOX'];
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
    name: string;
    type: (typeof FieldType)['ADDRESS'];
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
    name: string;
    type: (typeof FieldType)['PASSWORD'];
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
    name: string;
    type: (typeof FieldType)['BLOCK'];
  };
  children: FormField[];
  props: (FieldSystemPropHidden | FieldCustomProp)[];
}

export interface RowFormField {
  sys: {
    id: string;
    name: string;
    type: (typeof FieldType)['ROW'];
  };
  children: ColumnFormField[];
  props: (FieldSystemPropHidden | FieldCustomProp)[];
}

export interface ColumnFormField {
  sys: {
    id: string;
    name: string;
    type: (typeof FieldType)['COLUMN'];
  };
  children: FormField[];
  props: (FieldSystemPropColumnWidth | FieldSystemPropHidden | FieldCustomProp)[];
}

export interface GroupFormField {
  sys: {
    id: string;
    name: string;
    type: (typeof FieldType)['GROUP'];
  };
  children: FormField[];
  props: (FieldSystemPropHidden | FieldCustomProp)[];
}

export interface HeadingFormField {
  sys: {
    id: string;
    name: string;
    type: (typeof FieldType)['HEADING'];
  };
  props: (FieldSystemPropHeadingContent | FieldSystemPropHidden | FieldCustomProp)[];
}

// Image field type
export interface ImageFormField {
  sys: {
    id: string;
    name: string;
    type: (typeof FieldType)['IMAGE'];
  };
  props: (FieldSystemPropImageSrc | FieldSystemPropHidden | FieldCustomProp)[];
}

// Button field type
export interface ButtonFormField {
  sys: {
    id: string;
    name: string;
    type: (typeof FieldType)['BUTTON'];
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
    name: string;
    type: (typeof FieldType)['PAGE'];
  };
  children: FormField[];
  props: (FieldSystemPropName | FieldSystemPropHidden | FieldCustomProp)[];
}

// Divider field type
export interface DividerFormField {
  sys: {
    id: string;
    name: string;
    type: (typeof FieldType)['DIVIDER'];
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
