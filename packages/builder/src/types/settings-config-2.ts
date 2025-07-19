export const SYSTEM_PROPERTY = {
  LABEL: 'label',
  PLACEHOLDER: 'placeholder',
  REQUIRED: 'required',
  ACCEPT: 'accept',
  INPUT_NAME: 'inputName',
  OPTIONS: 'options',
  IMAGE_SRC: 'imageSrc',
  IMAGE_ALT: 'imageAlt',
} as const;

export const CUSTOM_PROPERTY = {
  TEXT: 'text',
  NUMBER: 'number',
  COLOR: 'color',
  BOOLEAN: 'boolean',
  SELECT: 'select',
  SIZE: 'size',
  BOX_SHADOW: 'boxShadow',
  MARGIN: 'margin',
  PADDING: 'padding',
} as const;

/**
 * System properties for form fields.
 */

export interface SystemPropertyLabel {
  system: typeof SYSTEM_PROPERTY.LABEL;
  label: string;
}

export interface SystemPropertyPlaceholder {
  system: typeof SYSTEM_PROPERTY.PLACEHOLDER;
  label: string;
}

export interface SystemPropertyRequired {
  system: typeof SYSTEM_PROPERTY.REQUIRED;
  label: string;
  defaultValue?: boolean;
}

export interface SystemPropertyAccept {
  system: typeof SYSTEM_PROPERTY.ACCEPT;
  label: string;
}

export interface SystemPropertyInputName {
  system: typeof SYSTEM_PROPERTY.INPUT_NAME;
  label: string;
}

export interface SystemPropertyOptions {
  system: typeof SYSTEM_PROPERTY.OPTIONS;
  label: string;
}

export interface SystemPropertyImageSrc {
  system: typeof SYSTEM_PROPERTY.IMAGE_SRC;
  label: string;
}

export interface SystemPropertyImageAlt {
  system: typeof SYSTEM_PROPERTY.IMAGE_ALT;
  label: string;
}

/**
 * Custom properties for form fields.
 */
export interface CustomPropertyText {
  custom: typeof CUSTOM_PROPERTY.TEXT;
  id: string;
  label: string;
}

export interface CustomPropertyNumber {
  custom: typeof CUSTOM_PROPERTY.NUMBER;
  id: string;
  label: string;
}

export interface CustomPropertyColor {
  custom: typeof CUSTOM_PROPERTY.COLOR;
  id: string;
  label: string;
}

export interface CustomPropertyBoolean {
  custom: typeof CUSTOM_PROPERTY.BOOLEAN;
  id: string;
  label: string;
}

export interface CustomPropertySelect {
  custom: typeof CUSTOM_PROPERTY.SELECT;
  id: string;
  label: string;
  options: ({ label: string; value: string } | string)[];
}

export interface CustomPropertyBoolean {
  custom: typeof CUSTOM_PROPERTY.BOOLEAN;
  id: string;
  label: string;
}
export interface CustomPropertySize {
  custom: typeof CUSTOM_PROPERTY.SIZE;
  id: string;
  label: string;
}

export interface CustomPropertyBoxShadow {
  custom: typeof CUSTOM_PROPERTY.BOX_SHADOW;
  id: string;
  label: string;
}

export interface CustomPropertyMargin {
  custom: typeof CUSTOM_PROPERTY.MARGIN;
  id: string;
  label: string;
}

export interface CustomPropertyPadding {
  custom: typeof CUSTOM_PROPERTY.PADDING;
  id: string;
  label: string;
}

export type CustomProperty =
  | CustomPropertyText
  | CustomPropertyNumber
  | CustomPropertyColor
  | CustomPropertyBoolean
  | CustomPropertySelect
  | CustomPropertySize
  | CustomPropertyBoxShadow
  | CustomPropertyMargin
  | CustomPropertyPadding;

export interface FieldConfigShortText {
  properties: Array<
    | SystemPropertyLabel
    | SystemPropertyPlaceholder
    | SystemPropertyRequired
    | CustomProperty
  >;
}

export interface FieldConfigLongText {
  properties: Array<
    | SystemPropertyLabel
    | SystemPropertyPlaceholder
    | SystemPropertyRequired
    | CustomProperty
  >;
}

export interface FieldConfigNumber {
  properties: Array<
    | SystemPropertyLabel
    | SystemPropertyPlaceholder
    | SystemPropertyRequired
    | CustomProperty
  >;
}

type Level = 0 | 1 | 2 | 3 | 4 | 5 | 6;

interface Heading {
  level: Level;
  label: string;
}

interface FontSize {
  label: string;
  size: string;
}

export interface FieldConfigHeading {
  properties: Array<
    | CustomProperty
  >;
  formats: {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
    link?: boolean;
    code?: boolean;
    blockquote?: boolean;
    superscript?: boolean;
    subscript?: boolean;
    list?: boolean | {
      ordered: boolean;
      bullet: boolean;
    };
    codeBlock?: boolean;
    align: boolean | {
      left: boolean;
      center: boolean;
      right: boolean;
      justify: boolean;
    };
    heading?: boolean | {
      options: Heading[];
      default?: Level;
    };
    fontSize?: boolean | {
      options: FontSize[];
      default?: FontSize;
    };
  };
}

export interface FieldsConfigs {
  shortText: FieldConfigShortText;
  longText: FieldConfigLongText;
  number: FieldConfigNumber;
  heading?: FieldConfigHeading;
}
