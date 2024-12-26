import type { FormFieldType } from '@efie-form/core';

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
  page: 'Page',
} satisfies Record<FormFieldType, string>;

export const textAlignMap = {
  left: 'start',
  center: 'center',
  right: 'end',
} as const;
