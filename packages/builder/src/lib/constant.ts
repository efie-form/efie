import { FieldInputType, FieldType, Operator } from '@efie-form/core';

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

export const OPERATOR_LABEL: Record<Operator, string> = {
  equal: 'Equals',
  not_equal: 'Does Not Equal',
  contains: 'Contains',
  not_contains: 'Does Not Contain',
  starts_with: 'Starts With',
  ends_with: 'Ends With',
  is_empty: 'Is Empty',
  is_filled: 'Is Filled',
  is_invalid: 'Is Invalid',
  is_valid: 'Is Valid',
  not_ends_with: 'Does Not End With',
  not_starts_with: 'Does Not Start With',
};

export const fieldTypeAvailableOperators: Record<FieldInputType, Operator[]> = {
  [FieldInputType.SHORT_TEXT]: [
    Operator.CONTAINS,
    Operator.NOT_EQUAL,
    Operator.NOT_CONTAINS,
    Operator.STARTS_WITH,
    Operator.NOT_STARTS_WITH,
    Operator.ENDS_WITH,
    Operator.NOT_ENDS_WITH,
    Operator.IS_EMPTY,
    Operator.IS_FILLED,
  ],
  [FieldInputType.LONG_TEXT]: [
    Operator.CONTAINS,
    Operator.NOT_EQUAL,
    Operator.NOT_CONTAINS,
    Operator.STARTS_WITH,
    Operator.NOT_STARTS_WITH,
    Operator.ENDS_WITH,
    Operator.NOT_ENDS_WITH,
    Operator.IS_EMPTY,
    Operator.IS_FILLED,
  ],
  [FieldInputType.DATE]: [
    Operator.IS_EMPTY,
    Operator.IS_FILLED,
    Operator.IS_INVALID,
    Operator.IS_VALID,
  ],
};
