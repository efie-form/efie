import { FieldType, type FormField, isFieldOfTypes } from '@efie-form/core';
import { useController } from 'react-hook-form';
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
  const {
    field: { value, onChange },
  } = useController({
    name: field.sys.id,
  });

  if (isFieldOfTypes(field, FieldType.SHORT_TEXT)) {
    return (
      <ShortTextProvider
        field={field}
        Component={props.shortText}
        value={value}
        onChange={onChange}
      />
    );
  }

  if (isFieldOfTypes(field, FieldType.LONG_TEXT)) {
    return (
      <LongTextProvider
        field={field}
        Component={props.longText}
        value={value}
        onChange={onChange}
      />
    );
  }
  if (isFieldOfTypes(field, FieldType.DIVIDER)) {
    return <DividerProvider field={field} Component={props.divider} />;
  }
  if (isFieldOfTypes(field, FieldType.BLOCK)) {
    return <BlockProvider field={field} Component={props.block} {...props} />;
  }
  if (isFieldOfTypes(field, FieldType.IMAGE)) {
    return <ImageProvider field={field} Component={props.image} />;
  }
  if (isFieldOfTypes(field, FieldType.FILE)) {
    return <FileProvider field={field} Component={props.file} value={value} onChange={onChange} />;
  }
  if (isFieldOfTypes(field, FieldType.SINGLE_CHOICE)) {
    return (
      <SingleChoiceProvider
        field={field}
        Component={props.singleChoice}
        value={value}
        onChange={onChange}
      />
    );
  }
  if (isFieldOfTypes(field, FieldType.MULTIPLE_CHOICES)) {
    return (
      <MultipleChoicesProvider
        field={field}
        Component={props.multipleChoices}
        value={value}
        onChange={onChange}
      />
    );
  }
  if (isFieldOfTypes(field, FieldType.HEADING)) {
    return <HeadingProvider field={field} Component={props.heading} />;
  }
  if (isFieldOfTypes(field, FieldType.DATE)) {
    return <DateProvider field={field} Component={props.date} value={value} onChange={onChange} />;
  }
  if (isFieldOfTypes(field, FieldType.TIME)) {
    return <TimeProvider field={field} Component={props.time} value={value} onChange={onChange} />;
  }
  if (isFieldOfTypes(field, FieldType.DATE_TIME)) {
    return (
      <DateTimeProvider
        field={field}
        Component={props.dateTime}
        value={value}
        onChange={onChange}
      />
    );
  }
  if (isFieldOfTypes(field, FieldType.COLUMN)) {
    return <ColumnProvider field={field} Component={props.column} {...props} />;
  }
  if (isFieldOfTypes(field, FieldType.ROW)) {
    return <RowProvider field={field} Component={props.row} {...props} />;
  }
  if (isFieldOfTypes(field, FieldType.NUMBER)) {
    return (
      <NumberProvider field={field} Component={props.number} value={value} onChange={onChange} />
    );
  }
  if (isFieldOfTypes(field, FieldType.BUTTON)) {
    return <ButtonProvider field={field} Component={props.button} />;
  }
  if (isFieldOfTypes(field, FieldType.PAGE)) {
    return <PageProvider field={field} Component={props.page} {...props} />;
  }
  if (isFieldOfTypes(field, FieldType.ADDRESS)) {
    return <></>;
  }
}

export default RenderField;
