import { FieldType, type FormField } from '@efie-form/core';
import type { FieldPropsMap } from '../types/field-props';
import {
  BlockProvider,
  ButtonProvider,
  ColumnProvider,
  DateProvider,
  DateTimeProvider,
  DividerProvider,
  FileProvider,
  HeadingProvider,
  ImageProvider,
  LongTextProvider,
  MultipleChoicesProvider,
  NumberProvider,
  PageProvider,
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
    case FieldType.SHORT_TEXT: {
      return <ShortTextProvider field={field} Component={props.shortText} />;
    }
    case FieldType.LONG_TEXT: {
      return <LongTextProvider field={field} Component={props.longText} />;
    }
    case FieldType.DIVIDER: {
      return <DividerProvider field={field} Component={props.divider} />;
    }
    case FieldType.BLOCK: {
      return <BlockProvider field={field} Component={props.block} {...props} />;
    }
    case FieldType.IMAGE: {
      return <ImageProvider field={field} Component={props.image} />;
    }
    case FieldType.FILE: {
      return <FileProvider field={field} Component={props.file} />;
    }
    case FieldType.SINGLE_CHOICE: {
      return <SingleChoiceProvider field={field} Component={props.singleChoice} />;
    }
    case FieldType.MULTIPLE_CHOICES: {
      return <MultipleChoicesProvider field={field} Component={props.multipleChoices} />;
    }
    case FieldType.HEADING: {
      return <HeadingProvider field={field} Component={props.heading} />;
    }
    case FieldType.DATE: {
      return <DateProvider field={field} Component={props.date} />;
    }
    case FieldType.TIME: {
      return <TimeProvider field={field} Component={props.time} />;
    }
    case FieldType.DATE_TIME: {
      return <DateTimeProvider field={field} Component={props.dateTime} />;
    }
    case FieldType.COLUMN: {
      return <ColumnProvider field={field} Component={props.column} {...props} />;
    }
    case FieldType.ROW: {
      return <RowProvider field={field} Component={props.row} {...props} />;
    }
    case FieldType.NUMBER: {
      return <NumberProvider field={field} Component={props.number} />;
    }
    case FieldType.BUTTON: {
      return <ButtonProvider field={field} Component={props.button} />;
    }
    case FieldType.PAGE: {
      return <PageProvider field={field} Component={props.page} {...props} />;
    }
    default: {
      return <></>;
    }
  }
}

export default RenderField;
