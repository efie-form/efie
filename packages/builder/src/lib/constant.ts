import { FieldType } from '@efie-form/core';

export const FIELDS_NAME = {
  [FieldType.SHORT_TEXT]: 'Short Text',
  [FieldType.TIME]: 'Time',
  [FieldType.SINGLE_CHOICE]: 'Single Choice',
  [FieldType.NUMBER]: 'Number',
  [FieldType.ROW]: 'Row',
  [FieldType.MULTIPLE_CHOICES]: 'Multiple Choices',
  [FieldType.IMAGE]: 'Image',
  [FieldType.HEADER]: 'Header',
  [FieldType.FILE]: 'File Upload',
  [FieldType.DIVIDER]: 'Divider',
  [FieldType.BLOCK]: 'Block',
  [FieldType.COLUMN]: 'Column',
  [FieldType.LONG_TEXT]: 'Long Text',
  [FieldType.DATE]: 'Date',
  [FieldType.DATE_TIME]: 'Date & Time',
  [FieldType.BUTTON]: 'Button',
  [FieldType.PAGE]: 'Page',
} satisfies Record<FieldType, string>;

export const textAlignMap = {
  left: 'start',
  center: 'center',
  right: 'end',
} as const;

export const DEFAULT_IMAGE_URL
  = 'https://via.assets.so/img.jpg?w=720&h=120&t=Image+Placeholder&tc=#555555&bg=#aaaaaa';
