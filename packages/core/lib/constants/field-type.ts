export const FormInputType = {
  SHORT_TEXT: 'short_text',
  LONG_TEXT: 'long_text',
  NUMBER: 'number',
  SINGLE_CHOICE: 'single_choice',
  MULTIPLE_CHOICES: 'multiple_choices',
  DATE: 'date',
  TIME: 'time',
  DATE_TIME: 'date_time',
  FILE: 'file',
} as const;

export const FormStaticType = {
  DIVIDER: 'divider',
  HEADER: 'header',
  IMAGE: 'image',
} as const;

export const FormLayoutType = {
  ROW: 'row',
  COLUMN: 'column',
  BLOCK: 'block',
  PAGE: 'page',
} as const;

export const FormActionType = {
  BUTTON: 'button',
} as const;

export const FieldType = {
  ...FormInputType,
  ...FormStaticType,
  ...FormLayoutType,
  ...FormActionType,
} as const;

export type FieldType = (typeof FieldType)[keyof typeof FieldType];
