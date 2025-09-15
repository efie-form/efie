import {
  type CheckboxFormField,
  type EmailFormField,
  FieldType,
  type FormField,
  type PasswordFormField,
  type PhoneFormField,
} from '@efie-form/core';
import {
  AddressField,
  BlockField,
  ButtonField,
  CheckboxField,
  DateField,
  DateTimeField,
  DividerField,
  EmailField,
  FileField,
  GroupField,
  HeadingField,
  ImageField,
  LongTextField,
  MultipleChoicesField,
  NumberField,
  PasswordField,
  PhoneField,
  RowField,
  ShortTextField,
  SingleChoiceField,
  TimeField,
} from '../fields';
import ColumnsField from '../fields/column-field';

interface FieldItemProps {
  field: FormField;
}

export function FieldItem({ field }: FieldItemProps): JSX.Element | never {
  switch (field.sys.type) {
    case FieldType.ROW: {
      return <RowField field={field} />;
    }
    case FieldType.COLUMN: {
      return <ColumnsField field={field} />;
    }
    case FieldType.HEADING: {
      return <HeadingField field={field} />;
    }
    case FieldType.SHORT_TEXT: {
      return <ShortTextField field={field} />;
    }
    case FieldType.LONG_TEXT: {
      return <LongTextField field={field} />;
    }
    case FieldType.NUMBER: {
      return <NumberField field={field} />;
    }
    case FieldType.DIVIDER: {
      return <DividerField field={field} />;
    }
    case FieldType.IMAGE: {
      return <ImageField field={field} />;
    }
    case FieldType.SINGLE_CHOICE: {
      return <SingleChoiceField field={field} />;
    }
    case FieldType.MULTIPLE_CHOICES: {
      return <MultipleChoicesField field={field} />;
    }
    case FieldType.DATE: {
      return <DateField field={field} />;
    }
    case FieldType.TIME: {
      return <TimeField field={field} />;
    }
    case FieldType.DATE_TIME: {
      return <DateTimeField field={field} />;
    }
    case FieldType.FILE: {
      return <FileField field={field} />;
    }
    case FieldType.BUTTON: {
      return <ButtonField field={field} />;
    }
    case FieldType.BLOCK: {
      return <BlockField field={field} />;
    }
    case FieldType.ADDRESS: {
      return <AddressField field={field} />;
    }
    case FieldType.PASSWORD: {
      return <PasswordField field={field as PasswordFormField} />;
    }
    case FieldType.EMAIL: {
      return <EmailField field={field as EmailFormField} />;
    }
    case FieldType.PHONE: {
      return <PhoneField field={field as PhoneFormField} />;
    }
    case FieldType.CHECKBOX: {
      return <CheckboxField field={field as CheckboxFormField} />;
    }
    case FieldType.GROUP: {
      return <GroupField field={field} />;
    }
    case FieldType.PAGE: {
      return <span>Page</span>;
    }
    default: {
      return field;
    }
  }
}
