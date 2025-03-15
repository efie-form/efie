import { FormFieldType } from '@efie-form/core';

export const FIELDS_NAME = {
  [FormFieldType.SHORT_TEXT]: 'Short Text',
  [FormFieldType.TIME]: 'Time',
  [FormFieldType.SINGLE_CHOICE]: 'Single Choice',
  [FormFieldType.PARAGRAPH]: 'Paragraph',
  [FormFieldType.NUMBER]: 'Number',
  [FormFieldType.ROW]: 'Row',
  [FormFieldType.MULTIPLE_CHOICES]: 'Multiple Choices',
  [FormFieldType.IMAGE]: 'Image',
  [FormFieldType.HEADER]: 'Header',
  [FormFieldType.FILE]: 'File Upload',
  [FormFieldType.DIVIDER]: 'Divider',
  [FormFieldType.BLOCK]: 'Block',
  [FormFieldType.COLUMN]: 'Column',
  [FormFieldType.LONG_TEXT]: 'Long Text',
  [FormFieldType.DATE]: 'Date',
  [FormFieldType.DATE_TIME]: 'Date & Time',
  [FormFieldType.BUTTON]: 'Button',
  [FormFieldType.PAGE]: 'Page',
} satisfies Record<FormFieldType, string>;

export const textAlignMap = {
  left: 'start',
  center: 'center',
  right: 'end',
} as const;
