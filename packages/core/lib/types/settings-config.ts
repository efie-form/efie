export const SYSTEM_PROPERTY = {
  LABEL: 'label',
  PLACEHOLDER: 'placeholder',
  REQUIRED: 'required',
  ACCEPT: 'accept',
  INPUT_NAME: 'inputName',
  OPTIONS: 'options',
  IMAGE_SRC: 'imageSrc',
  IMAGE_ALT: 'imageAlt',
  COLUMN_WIDTH: 'columnWidth',
  HEADING_CONTENT: 'headingContent',
  BUTTON_ACTION: 'buttonAction',
  PAGE_NAME: 'pageName',
} as const;

export type SystemFieldPropType = typeof SYSTEM_PROPERTY[keyof typeof SYSTEM_PROPERTY];

export const CUSTOM_PROPERTY = {
  TEXT: 'text',
  NUMBER: 'number',
  COLOR: 'color',
  BOOLEAN: 'boolean',
  SELECT: 'select',
  MULTI_SELECT: 'multiSelect',
  SIZE: 'size',
  BOX_SHADOW: 'boxShadow',
  MARGIN: 'margin',
  PADDING: 'padding',
} as const;

/**
 * System properties for form fields.
 */

export interface SystemFieldPropLabel {
  system: typeof SYSTEM_PROPERTY.LABEL;
  label: string;
}

export interface SystemFieldPropPlaceholder {
  system: typeof SYSTEM_PROPERTY.PLACEHOLDER;
  label: string;
}

export interface SystemFieldPropRequired {
  system: typeof SYSTEM_PROPERTY.REQUIRED;
  label: string;
  defaultValue?: boolean;
}

export interface SystemFieldPropAccept {
  system: typeof SYSTEM_PROPERTY.ACCEPT;
  label: string;
}

export interface SystemFieldPropInputName {
  system: typeof SYSTEM_PROPERTY.INPUT_NAME;
  label: string;
}

export interface SystemFieldPropOptions {
  system: typeof SYSTEM_PROPERTY.OPTIONS;
  label: string;
}

export interface SystemFieldPropImageSrc {
  system: typeof SYSTEM_PROPERTY.IMAGE_SRC;
  label: string;
}

export interface SystemFieldPropImageAlt {
  system: typeof SYSTEM_PROPERTY.IMAGE_ALT;
  label: string;
}

/**
 * Custom properties for form fields.
 */
export interface CustomFieldPropText {
  custom: typeof CUSTOM_PROPERTY.TEXT;
  id: string;
  label: string;
}

export interface CustomFieldPropNumber {
  custom: typeof CUSTOM_PROPERTY.NUMBER;
  id: string;
  label: string;
}

export interface CustomFieldPropColor {
  custom: typeof CUSTOM_PROPERTY.COLOR;
  id: string;
  label: string;
}

export interface CustomFieldPropBoolean {
  custom: typeof CUSTOM_PROPERTY.BOOLEAN;
  id: string;
  label: string;
}

export interface CustomFieldPropSelect {
  custom: typeof CUSTOM_PROPERTY.SELECT;
  id: string;
  label: string;
  options: ({ label: string; value: string } | string)[];
}

export interface CustomFieldPropBoolean {
  custom: typeof CUSTOM_PROPERTY.BOOLEAN;
  id: string;
  label: string;
}
export interface CustomFieldPropSize {
  custom: typeof CUSTOM_PROPERTY.SIZE;
  id: string;
  label: string;
}

export interface CustomFieldPropBoxShadow {
  custom: typeof CUSTOM_PROPERTY.BOX_SHADOW;
  id: string;
  label: string;
}

export interface CustomFieldPropMargin {
  custom: typeof CUSTOM_PROPERTY.MARGIN;
  id: string;
  label: string;
}

export interface CustomFieldPropPadding {
  custom: typeof CUSTOM_PROPERTY.PADDING;
  id: string;
  label: string;
}

export type CustomFieldProp =
  | CustomFieldPropText
  | CustomFieldPropNumber
  | CustomFieldPropColor
  | CustomFieldPropBoolean
  | CustomFieldPropSelect
  | CustomFieldPropSize
  | CustomFieldPropBoxShadow
  | CustomFieldPropMargin
  | CustomFieldPropPadding;

export interface FieldConfigShortText {
  properties: Array<
    | SystemFieldPropLabel
    | SystemFieldPropPlaceholder
    | SystemFieldPropRequired
    | CustomFieldProp
  >;
}

export interface FieldConfigLongText {
  properties: Array<
    | SystemFieldPropLabel
    | SystemFieldPropPlaceholder
    | SystemFieldPropRequired
    | CustomFieldProp
  >;
}

export interface FieldConfigNumber {
  properties: Array<
    | SystemFieldPropLabel
    | SystemFieldPropPlaceholder
    | SystemFieldPropRequired
    | CustomFieldProp
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
    | CustomFieldProp
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
