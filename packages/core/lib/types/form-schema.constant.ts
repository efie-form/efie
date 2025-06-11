// Units
export const Unit = {
  PX: 'px',
  EM: 'em',
  REM: 'rem',
  PERCENT: '%',
  VH: 'vh',
  VW: 'vw',
  PT: 'pt',
  PC: 'pc',
  IN: 'in',
  CM: 'cm',
  MM: 'mm',
} as const;

// Field Condition Operators
export const FieldConditionOperator = {
  EQUALS: 'equals',
  NOT_EQUALS: 'notEquals',
  CONTAINS: 'contains',
  NOT_CONTAINS: 'notContains',
  GREATER_THAN: 'greaterThan',
  LESS_THAN: 'lessThan',
  GREATER_THAN_OR_EQUAL: 'greaterThanOrEqual',
  LESS_THAN_OR_EQUAL: 'lessThanOrEqual',
  REGEX: 'regex',
  IS_EMPTY: 'isEmpty',
  IS_NOT_EMPTY: 'isNotEmpty',
  IS_VALID: 'isValid',
  IS_INVALID: 'isInvalid',
  CUSTOM: 'custom',
} as const;

// Validation Operators
export const ValidationOperator = {
  EQUALS: 'equals',
  NOT_EQUALS: 'notEquals',
  CONTAINS: 'contains',
  NOT_CONTAINS: 'notContains',
  GREATER_THAN: 'greaterThan',
  LESS_THAN: 'lessThan',
  GREATER_THAN_OR_EQUAL: 'greaterThanOrEqual',
  LESS_THAN_OR_EQUAL: 'lessThanOrEqual',
  REGEX: 'regex',
} as const;

// Rule Types
export const RuleType = {
  GROUP: 'group',
  PAGE: 'page',
  VALIDATION: 'validation',
  ERROR: 'error',
  VISIBILITY: 'visibility',
  REQUIREMENT: 'requirement',
  ENABLE: 'enable',
  VALUE: 'value',
  STYLE: 'style',
  DEPENDENCY: 'dependency',
  BEHAVIOR: 'behavior',
  ACCESS: 'access',
  FORMAT: 'format',
  STATE: 'state',
} as const;

// Action Types
export const ActionType = {
  SHOW: 'show',
  HIDE: 'hide',
  REORDER: 'reorder',
  SKIP: 'skip',
  DISPLAY: 'display',
  HANDLE: 'handle',
  RECOVER: 'recover',
  SET: 'set',
  CLEAR: 'clear',
  COPY: 'copy',
  CALCULATE: 'calculate',
  WATCH: 'watch',
  UNWATCH: 'unwatch',
  FOCUS: 'focus',
  BLUR: 'blur',
  SCROLL_INTO_VIEW: 'scrollIntoView',
  TRIGGER_EVENT: 'triggerEvent',
  READONLY: 'readonly',
  EDITABLE: 'editable',
  HIDDEN: 'hidden',
  VISIBLE: 'visible',
  MASK: 'mask',
  UNMASK: 'unmask',
  TRANSFORM: 'transform',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
} as const;

// Display Positions
export const DisplayPosition = {
  INLINE: 'inline',
  TOAST: 'toast',
  MODAL: 'modal',
  BANNER: 'banner',
} as const;

// Text Alignment
export const TextAlign = {
  LEFT: 'left',
  CENTER: 'center',
  RIGHT: 'right',
} as const;

// Object Fit
export const ObjectFit = {
  FILL: 'fill',
  CONTAIN: 'contain',
  COVER: 'cover',
  NONE: 'none',
  SCALE_DOWN: 'scale-down',
} as const;

// Button Types
export const ButtonType = {
  SUBMIT: 'submit',
  BUTTON: 'button',
} as const;

// Divider Styles
export const DividerStyle = {
  SOLID: 'solid',
  DASHED: 'dashed',
  DOTTED: 'dotted',
} as const;

// Heading Tags
export const HeadingTag = {
  H1: 'h1',
  H2: 'h2',
  H3: 'h3',
  H4: 'h4',
  H5: 'h5',
  H6: 'h6',
} as const;

// Property Types
export const PropertyType = {
  // Common
  TEXT: 'text',
  NAME: 'name',
  LABEL: 'label',
  CONTENT: 'content',
  TYPE: 'type',
  VALUE: 'value',
  KEY: 'key',
  PLACEHOLDER: 'placeholder',
  REQUIRED: 'required',
  IS_ARRAY: 'isArray',
  ARRAY_ITEM_TYPE: 'arrayItemType',
  DEFAULT_VALUE: 'defaultValue',
  OPTIONS: 'options',
  VALIDATION: 'validation',
  // Input field specific
  MIN: 'min',
  MAX: 'max',
  FORMAT: 'format',
  ACCEPT: 'accept',
  MULTIPLE: 'multiple',
  MAX_FILES: 'maxFiles',
  // Choice field specific
  CHOICE: 'choice',
  CHOICES: 'choices',
  IS_VALUE_DIFFERENT: 'isValueDifferent',
  // Layout field specific
  ROW: 'row',
  COLUMN: 'column',
  BLOCK: 'block',
  PAGE: 'page',
  GAP: 'gap',
  WIDTH: 'width',
  // Content field specific
  TAG: 'tag',
  TEXT_ALIGN: 'textAlign',
  COLOR: 'color',
  FONT: 'font',
  FONT_SIZE: 'fontSize',
  FONT_WEIGHT: 'fontWeight',
  // Image field specific
  IMAGE: 'image',
  SRC: 'src',
  ALT: 'alt',
  OBJECT_FIT: 'objectFit',
  AUTO_WIDTH: 'autoWidth',
  // Button field specific
  BUTTON: 'button',
  BTN_TYPE: 'btnType',
  FULL_WIDTH: 'fullWidth',
  BG_COLOR: 'bgColor',
  ALIGN: 'align',
  // Divider field specific
  DIVIDER: 'divider',
  HEIGHT: 'height',
  DIVIDER_HEIGHT: 'dividerHeight',
  STYLE: 'style',
  // Container specific
  MARGIN: 'margin',
  PADDING: 'padding',
  DISPLAY: 'display',
  FLEX_DIRECTION: 'flexDirection',
  ALIGN_ITEMS: 'alignItems',
  JUSTIFY_CONTENT: 'justifyContent',
  // Rich text specific
  RICH_TEXT: 'rich-text',
  // Form field specific
  NUMBER: 'number',
  SELECT: 'select',
  OBJECT: 'object',
  ARRAY: 'array',
  STRING: 'string',
  EMAIL: 'email',
  TAX: 'tax',
  ADDRESS: 'address',
  CITY: 'city',
  STATE: 'state',
  ZIP: 'zip',
  DATE: 'date',
  TIME: 'time',
  DATE_TIME: 'date_time',
  FILE: 'file',
  // Border field specific
  BORDER_RADIUS: 'borderRadius',
  BOX_SHADOW: 'boxShadow',
  BORDER_WIDTH: 'borderWidth',
  BORDER_COLOR: 'borderColor',
  BORDER_STYLE: 'borderStyle',
} as const;

// Size unit
export const SizeUnit = {
  PX: 'px',
  EM: 'em',
  REM: 'rem',
  PERCENT: '%',
  VH: 'vh',
  VW: 'vw',
  PT: 'pt',
  PC: 'pc',
  IN: 'in',
  CM: 'cm',
  MM: 'mm',
} as const;

export const ColorType = {
  HEX: 'hex',
  RGB: 'rgb',
  RGBA: 'rgba',
  HSL: 'hsl',
  HSLA: 'hsla',
} as const;

// Export types for all constants
export type Unit = (typeof Unit)[keyof typeof Unit];
export type FieldConditionOperator =
  (typeof FieldConditionOperator)[keyof typeof FieldConditionOperator];
export type ValidationOperator =
  (typeof ValidationOperator)[keyof typeof ValidationOperator];
export type RuleType = (typeof RuleType)[keyof typeof RuleType];
export type ActionType = (typeof ActionType)[keyof typeof ActionType];
export type DisplayPosition =
  (typeof DisplayPosition)[keyof typeof DisplayPosition];
export type TextAlign = (typeof TextAlign)[keyof typeof TextAlign];
export type ObjectFit = (typeof ObjectFit)[keyof typeof ObjectFit];
export type ButtonType = (typeof ButtonType)[keyof typeof ButtonType];
export type DividerStyle = (typeof DividerStyle)[keyof typeof DividerStyle];
export type HeadingTag = (typeof HeadingTag)[keyof typeof HeadingTag];
export type PropertyType = (typeof PropertyType)[keyof typeof PropertyType];
export type SizeUnit = (typeof SizeUnit)[keyof typeof SizeUnit];
export type ColorType = (typeof ColorType)[keyof typeof ColorType];
