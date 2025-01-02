import React from 'react';
import type { FormField } from '@efie-form/core';
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
    case 'shortText':
      return <ShortTextProvider field={field} Component={props.shortText} />;
    case 'longText':
      return <LongTextProvider field={field} Component={props.longText} />;
    case 'divider':
      return <DividerProvider field={field} Component={props.divider} />;
    case 'block':
      return <BlockProvider field={field} Component={props.block} {...props} />;
    case 'image':
      return <ImageProvider field={field} Component={props.image} />;
    case 'file':
      return <FileProvider field={field} Component={props.file} />;
    case 'singleChoice':
      return (
        <SingleChoiceProvider field={field} Component={props.singleChoice} />
      );
    case 'multipleChoices':
      return (
        <MultipleChoicesProvider
          field={field}
          Component={props.multipleChoices}
        />
      );
    case 'header':
      return <HeaderProvider field={field} Component={props.header} />;
    case 'paragraph':
      return <ParagraphProvider field={field} Component={props.paragraph} />;
    case 'date':
      return <DateProvider field={field} Component={props.date} />;
    case 'time':
      return <TimeProvider field={field} Component={props.time} />;
    case 'dateTime':
      return <DateTimeProvider field={field} Component={props.dateTime} />;
    case 'column':
      return (
        <ColumnProvider field={field} Component={props.column} {...props} />
      );
    case 'row':
      return <RowProvider field={field} Component={props.row} {...props} />;
    case 'number':
      return <NumberProvider field={field} Component={props.number} />;
    case 'button':
      return <ButtonProvider field={field} Component={props.button} />;
    case 'page':
      return <PageProvider field={field} Component={props.page} {...props} />;
    default:
      return null;
  }
}

export default RenderField;
