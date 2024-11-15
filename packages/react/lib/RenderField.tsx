import React from 'react';
import type { FormField } from '@efie-form/core';
import ShortTextProvider from './FieldProvider/ShortTextProvider';
import type { FieldPropsMap } from '../types/FieldProps';
import LongTextProvider from './FieldProvider/LongTextProvider';
import DividerProvider from './FieldProvider/DividerProvider';
import BlockProvider from './FieldProvider/BlockProvider';
import ImageProvider from './FieldProvider/ImageProvider';
import FileProvider from './FieldProvider/FileProvider';
import SingleChoiceProvider from './FieldProvider/SingleChoiceProvider';
import MultipleChoicesProvider from './FieldProvider/MultipleChoicesProvider';
import HeaderProvider from './FieldProvider/HeaderProvider';
import ParagraphProvider from './FieldProvider/ParagraphProvider';
import DateProvider from './FieldProvider/DateProvider';
import DateTimeProvider from './FieldProvider/DateTimeProvider';
import TimeProvider from './FieldProvider/TimeProvider';
import ColumnProvider from './FieldProvider/ColumnProvider';
import RowProvider from './FieldProvider/RowProvider';
import NumberProvider from './FieldProvider/NumberProvider';

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
      return <BlockProvider field={field} Component={props.block} />;
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
    default:
      return <NumberProvider field={field} Component={props.number} />;
  }
}

export default RenderField;
