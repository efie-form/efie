// Units

export const SizeType = {
  AUTO: 'auto',
  LENGTH: 'length',
  PERCENTAGE: 'percentage',
  INITIAL: 'initial',
  INHERIT: 'inherit',
  ABSOLUTE: 'absolute',
  RELATIVE: 'relative',
} as const;

export const AbsoluteSize = {
  XXSmall: 'xx-small',
  XSmall: 'x-small',
  Small: 'small',
  Medium: 'medium',
  Large: 'large',
  XLarge: 'x-large',
  XXLarge: 'xx-large',
  XXXLarge: 'xxx-large',
} as const;

export const RelativeSize = {
  SMALLER: 'smaller',
  LARGER: 'larger',
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
  BACKGROUND_COLOR: 'backgroundColor',
  COLOR: 'color',
  BORDER_RADIUS: 'borderRadius',
  BORDER_WIDTH: 'borderWidth',
  BORDER_COLOR: 'borderColor',
  MARGIN: 'margin',
  PADDING: 'padding',
  BOX_SHADOW: 'boxShadow',
  LABEL: 'label',
  WIDTH: 'width',
  HEIGHT: 'height',
  TEXT_ALIGN: 'textAlign',
  REQUIRED: 'required',
  BORDER_STYLE: 'borderStyle',
  MAX_FILES: 'maxFiles',
  ACCEPT: 'accept',
  FONT_SIZE: 'fontSize',
  FONT_WEIGHT: 'fontWeight',
  TAG: 'tag',
  SRC: 'src',
  ALT: 'alt',
  OBJECT_FIT: 'objectFit',
  PLACEHOLDER: 'placeholder',
  OPTIONS: 'options',
  PAGE_NAME: 'pageName',
  BUTTON_TYPE: 'buttonType',
  CONTENT: 'content',
} as const;

// Size unit
export const SizeUnit = {
  PX: 'px',
  EM: 'em',
  REM: 'rem',
  VH: 'vh',
  VW: 'vw',
  // PT: 'pt',
  // PC: 'pc',
  // IN: 'in',
  // CM: 'cm',
  // MM: 'mm',
} as const;

export const ColorType = {
  HEX: 'hex',
  RGB: 'rgb',
  RGBA: 'rgba',
  HSL: 'hsl',
  HSLA: 'hsla',
} as const;

// Export types for all constants
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
export type SizeType = (typeof SizeType)[keyof typeof SizeType];
export type AbsoluteSize = (typeof AbsoluteSize)[keyof typeof AbsoluteSize];
export type RelativeSize = (typeof RelativeSize)[keyof typeof RelativeSize];
