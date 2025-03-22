export const PropertyKey = {
  // Common property keys
  TEXT: 'text',
  NAME: 'name',
  LABEL: 'label',
  CONTENT: 'content',
  TYPE: 'type',
  VALUE: 'value',
  KEY: 'key',
  PLACEHOLDER: 'placeholder',
  IS_REQUIRED: 'isRequired',
  IS_ARRAY: 'isArray',
  ARRAY_ITEM_TYPE: 'arrayItemType',
  DEFAULT_VALUE: 'defaultValue',
  OPTIONS: 'options',
  VALIDATION: 'validation',

  // Input field specific keys
  MIN: 'min',
  MAX: 'max',
  FORMAT: 'format',
  ACCEPT: 'accept',
  MULTIPLE: 'multiple',
  NUMBER: 'number',
  SELECT: 'select',
  OBJECT: 'object',
  ARRAY: 'array',
  STRING: 'string',
  FILE: 'file',

  // Choice field specific keys
  CHOICE: 'choice',
  CHOICES: 'choices',
  IS_VALUE_DIFFERENT: 'isValueDifferent',

  // Layout field specific keys
  ROW: 'row',
  COLUMN: 'column',
  BLOCK: 'block',
  PAGE: 'page',
  GAP: 'gap',
  WIDTH: 'width',

  // Content field specific keys
  TAG: 'tag',
  TEXT_ALIGN: 'textAlign',
  COLOR: 'color',
  FONT: 'font',

  // Image field specific keys
  IMAGE: 'image',
  SRC: 'src',
  ALT: 'alt',
  OBJECT_FIT: 'objectFit',
  AUTO_WIDTH: 'autoWidth',

  // Button field specific keys
  BUTTON: 'button',
  BTN_TYPE: 'btnType',
  FULL_WIDTH: 'fullWidth',
  BG_COLOR: 'bgColor',
  ALIGN: 'align',

  // Divider field specific keys
  DIVIDER: 'divider',
  HEIGHT: 'height',
  STYLE: 'style',

  // Rich text specific keys
  RICH_TEXT: 'rich-text',

  // Form field specific keys
  EMAIL: 'email',
  TAX: 'tax',
  ADDRESS: 'address',
  CITY: 'city',
  STATE: 'state',
  ZIP: 'zip',
  DATE: 'date',
  TIME: 'time',
  DATE_TIME: 'datetime',
} as const;

export type PropertyKey = (typeof PropertyKey)[keyof typeof PropertyKey];
