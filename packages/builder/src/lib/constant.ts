import { FieldType } from '@efie-form/core';

export const FIELDS_NAME = {
  [FieldType.SHORT_TEXT]: 'Short Text',
  [FieldType.TIME]: 'Time',
  [FieldType.SINGLE_CHOICE]: 'Single Choice',
  [FieldType.NUMBER]: 'Number',
  [FieldType.ROW]: 'Row',
  [FieldType.MULTIPLE_CHOICES]: 'Multiple Choices',
  [FieldType.IMAGE]: 'Image',
  [FieldType.HEADING]: 'Heading',
  [FieldType.FILE]: 'File Upload',
  [FieldType.DIVIDER]: 'Divider',
  [FieldType.BLOCK]: 'Block',
  [FieldType.COLUMN]: 'Column',
  [FieldType.LONG_TEXT]: 'Long Text',
  [FieldType.DATE]: 'Date',
  [FieldType.DATE_TIME]: 'Date & Time',
  [FieldType.BUTTON]: 'Button',
  [FieldType.PAGE]: 'Page',
  [FieldType.ADDRESS]: 'Address',
  [FieldType.CHECKBOX]: 'Checkbox',
  [FieldType.EMAIL]: 'Email',
  [FieldType.URL]: 'URL',
  [FieldType.PHONE]: 'Phone',
  [FieldType.PASSWORD]: 'Password',
  [FieldType.GROUP]: 'Group',
} satisfies Record<FieldType, string>;

export const textAlignMap = {
  left: 'start',
  center: 'center',
  right: 'end',
} as const;

export const DEFAULT_IMAGE_URL =
  'https://via.assets.so/img.jpg?w=720&h=120&t=Image+Placeholder&tc=#555555&bg=#aaaaaa';

export const RIGHT_BAR_TABS = {
  PAGE: 'page',
  FORM: 'form',
  FIELD_SETTINGS: 'field-settings',
} as const;

export type RightBarTab = (typeof RIGHT_BAR_TABS)[keyof typeof RIGHT_BAR_TABS];
