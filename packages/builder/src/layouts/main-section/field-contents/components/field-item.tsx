import { FieldType, type FormField, isFieldOfTypes } from '@efie-form/core';
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
  if (isFieldOfTypes(field, FieldType.ROW)) return <RowField field={field} />;
  if (isFieldOfTypes(field, FieldType.COLUMN)) return <ColumnsField field={field} />;
  if (isFieldOfTypes(field, FieldType.HEADING)) return <HeadingField field={field} />;
  if (isFieldOfTypes(field, FieldType.SHORT_TEXT)) return <ShortTextField field={field} />;
  if (isFieldOfTypes(field, FieldType.LONG_TEXT)) return <LongTextField field={field} />;
  if (isFieldOfTypes(field, FieldType.NUMBER)) return <NumberField field={field} />;
  if (isFieldOfTypes(field, FieldType.DIVIDER)) return <DividerField field={field} />;
  if (isFieldOfTypes(field, FieldType.IMAGE)) return <ImageField field={field} />;
  if (isFieldOfTypes(field, FieldType.SINGLE_CHOICE)) return <SingleChoiceField field={field} />;
  if (isFieldOfTypes(field, FieldType.MULTIPLE_CHOICES))
    return <MultipleChoicesField field={field} />;
  if (isFieldOfTypes(field, FieldType.DATE)) return <DateField field={field} />;
  if (isFieldOfTypes(field, FieldType.TIME)) return <TimeField field={field} />;
  if (isFieldOfTypes(field, FieldType.DATE_TIME)) return <DateTimeField field={field} />;
  if (isFieldOfTypes(field, FieldType.FILE)) return <FileField field={field} />;
  if (isFieldOfTypes(field, FieldType.BUTTON)) return <ButtonField field={field} />;
  if (isFieldOfTypes(field, FieldType.BLOCK)) return <BlockField field={field} />;
  if (isFieldOfTypes(field, FieldType.ADDRESS)) return <AddressField field={field} />;
  if (isFieldOfTypes(field, FieldType.PASSWORD)) return <PasswordField field={field} />;
  if (isFieldOfTypes(field, FieldType.EMAIL)) return <EmailField field={field} />;
  if (isFieldOfTypes(field, FieldType.PHONE)) return <PhoneField field={field} />;
  if (isFieldOfTypes(field, FieldType.CHECKBOX)) return <CheckboxField field={field} />;
  if (isFieldOfTypes(field, FieldType.GROUP)) return <GroupField field={field} />;
  if (isFieldOfTypes(field, FieldType.PAGE)) return <span>Page</span>;

  return field;
}
