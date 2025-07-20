import type { CustomPropertyType, PropertyType } from '../property-type';

/**
 * System properties for form fields.
 */

export interface FieldSystemConfigLabel {
  type: typeof PropertyType.LABEL;
  label: string;
  defaultValue?: string;
}

export interface FieldSystemConfigPlaceholder {
  type: typeof PropertyType.PLACEHOLDER;
  label: string;
  defaultValue?: string;
}

export interface FieldSystemConfigRequired {
  type: typeof PropertyType.REQUIRED;
  label: string;
  defaultValue?: boolean;
}

export interface FieldSystemConfigAccept {
  type: typeof PropertyType.ACCEPT;
  label: string;
}

export interface FieldSystemConfigInputName {
  type: typeof PropertyType.INPUT_NAME;
  label: string;
}

export interface FieldSystemConfigOptions {
  type: typeof PropertyType.OPTIONS;
  label: string;
}

export interface FieldSystemConfigImageSrc {
  type: typeof PropertyType.IMAGE_SRC;
  label: string;
}

export interface FieldSystemConfigImageAlt {
  type: typeof PropertyType.IMAGE_ALT;
  label: string;
}

interface FieldCustomConfigBase {
  id: string;
  type: typeof PropertyType.CUSTOM;
  label: string;
}
/**
 * Custom properties for form fields.
 */
export interface FieldCustomConfigText extends FieldCustomConfigBase {
  dataType: typeof CustomPropertyType.TEXT;
  defaultValue?: string;
  placeholder?: string;
}

export interface FieldCustomConfigNumber extends FieldCustomConfigBase {
  dataType: typeof CustomPropertyType.NUMBER;
  defaultValue?: number;
  placeholder?: string;
}

export interface FieldCustomConfigColor extends FieldCustomConfigBase {
  dataType: typeof CustomPropertyType.COLOR;
}

export interface FieldCustomConfigBoolean extends FieldCustomConfigBase {
  dataType: typeof CustomPropertyType.BOOLEAN;
  defaultValue?: boolean;
}

export interface FieldCustomConfigSelect extends FieldCustomConfigBase {
  dataType: typeof CustomPropertyType.SELECT;
  options: ({ label: string; value: string } | string)[];
}

export interface FieldCustomConfigSize extends FieldCustomConfigBase {
  dataType: typeof CustomPropertyType.SIZE;
}

export interface FieldCustomConfigBoxShadow extends FieldCustomConfigBase {
  dataType: typeof CustomPropertyType.BOX_SHADOW;
}

export interface FieldCustomConfigMargin extends FieldCustomConfigBase {
  dataType: typeof CustomPropertyType.MARGIN;
}

export interface FieldCustomConfigPadding extends FieldCustomConfigBase {
  dataType: typeof CustomPropertyType.PADDING;
}

export type FieldSystemConfig =
  | FieldSystemConfigLabel
  | FieldSystemConfigPlaceholder
  | FieldSystemConfigRequired
  | FieldSystemConfigAccept
  | FieldSystemConfigInputName
  | FieldSystemConfigOptions
  | FieldSystemConfigImageSrc
  | FieldSystemConfigImageAlt;

export type FieldCustomConfig =
  | FieldCustomConfigText
  | FieldCustomConfigNumber
  | FieldCustomConfigColor
  | FieldCustomConfigBoolean
  | FieldCustomConfigSelect
  | FieldCustomConfigSize
  | FieldCustomConfigBoxShadow
  | FieldCustomConfigMargin
  | FieldCustomConfigPadding;

export interface FieldConfigShortText {
  properties: Array<
    | FieldSystemConfigLabel
    | FieldSystemConfigPlaceholder
    | FieldSystemConfigRequired
    | FieldCustomConfig
  >;
}

export interface FieldConfigLongText {
  properties: Array<
    | FieldSystemConfigLabel
    | FieldSystemConfigPlaceholder
    | FieldSystemConfigRequired
    | FieldCustomConfig
  >;
}

export interface FieldConfigNumber {
  properties: Array<
    | FieldSystemConfigLabel
    | FieldSystemConfigPlaceholder
    | FieldSystemConfigRequired
    | FieldCustomConfig
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
    | FieldCustomConfig
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

export interface FieldsConfigsMap {
  short_text: FieldConfigShortText;
  long_text: FieldConfigLongText;
  number: FieldConfigNumber;
  heading?: FieldConfigHeading;
}

export type FieldConfig = FieldSystemConfig | FieldCustomConfig;
