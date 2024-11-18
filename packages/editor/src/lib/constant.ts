import type { FormFieldType } from '@efie-form/core';

export const DATASET_FORM_FIELD = 'data-efie-field-id';

export const DATASET_FIELD_TYPE = 'data-efie-field-type';

export const DATASET_DROP_ZONE = 'data-efie-drop-zone';

export const DROP_ZONE_TYPE = {
  root: 'root',
  emptyColumn: 'empty-column',
  field: 'field',
} as const;

export const FIELDS_NAME = {
  shortText: 'Short Text',
  time: 'Time',
  singleChoice: 'Single Choice',
  paragraph: 'Paragraph',
  number: 'Number',
  row: 'Row',
  multipleChoices: 'Multiple Choices',
  image: 'Image',
  header: 'Header',
  file: 'File Upload',
  divider: 'Divider',
  block: 'Block',
  column: 'Column',
  longText: 'Long Text',
  date: 'Date',
  dateTime: 'Date & Time',
  button: 'Button',
} satisfies Record<FormFieldType, string>;

export const textAlignMap = {
  left: 'start',
  center: 'center',
  right: 'end',
} as const;
