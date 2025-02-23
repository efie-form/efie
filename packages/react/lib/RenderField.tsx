import React from 'react';
import { FormFieldType, type FormField } from '@efie-form/core';
import type { FieldPropsMap } from '../types/FieldProps';
import {
  BlockProvider,
  ButtonProvider,
  ColumnProvider,
  DateProvider,
  DateTimeProvider,
  DividerProvider,
  FileProvider,
  HeaderProvider,
  ImageProvider,
  LongTextProvider,
  MultipleChoicesProvider,
  NumberProvider,
  PageProvider,
  ParagraphProvider,
  RowProvider,
  ShortTextProvider,
  SingleChoiceProvider,
  TimeProvider,
} from './field-provider';

interface RenderFieldProps extends Partial<FieldPropsMap> {
  field: FormField;
}

function RenderField({ field, ...props }: RenderFieldProps) {
  switch (field.type) {
    case FormFieldType.SHORT_TEXT:
      return <ShortTextProvider field={field} Component={props.shortText} />;
    case FormFieldType.LONG_TEXT:
      return <LongTextProvider field={field} Component={props.longText} />;
    case FormFieldType.DIVIDER:
      return <DividerProvider field={field} Component={props.divider} />;
    case FormFieldType.BLOCK:
      return <BlockProvider field={field} Component={props.block} {...props} />;
    case FormFieldType.IMAGE:
      return <ImageProvider field={field} Component={props.image} />;
    case FormFieldType.FILE:
      return <FileProvider field={field} Component={props.file} />;
    case FormFieldType.SINGLE_CHOICE:
      return (
        <SingleChoiceProvider field={field} Component={props.singleChoice} />
      );
    case FormFieldType.MULTIPLE_CHOICES:
      return (
        <MultipleChoicesProvider
          field={field}
          Component={props.multipleChoices}
        />
      );
    case FormFieldType.HEADER:
      return <HeaderProvider field={field} Component={props.header} />;
    case FormFieldType.PARAGRAPH:
      return <ParagraphProvider field={field} Component={props.paragraph} />;
    case FormFieldType.DATE:
      return <DateProvider field={field} Component={props.date} />;
    case FormFieldType.TIME:
      return <TimeProvider field={field} Component={props.time} />;
    case FormFieldType.DATE_TIME:
      return <DateTimeProvider field={field} Component={props.dateTime} />;
    case FormFieldType.COLUMN:
      return (
        <ColumnProvider field={field} Component={props.column} {...props} />
      );
    case FormFieldType.ROW:
      return <RowProvider field={field} Component={props.row} {...props} />;
    case FormFieldType.NUMBER:
      return <NumberProvider field={field} Component={props.number} />;
    case FormFieldType.BUTTON:
      return <ButtonProvider field={field} Component={props.button} />;
    case FormFieldType.PAGE:
      return <PageProvider field={field} Component={props.page} {...props} />;
    default:
      return null;
  }
}

export default RenderField;
