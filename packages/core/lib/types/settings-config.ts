import type { CustomPropertyType, PropertyType } from '../property-type';
import type { Color } from './common.type';

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

export interface FieldSystemConfigButtonAction {
  type: typeof PropertyType.BUTTON_ACTION;
  label: string;
}

export interface FieldSystemConfigColumnWidth {
  type: typeof PropertyType.COLUMN_WIDTH;
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
  defaultValue?: Color;
}

export interface FieldCustomConfigBoolean extends FieldCustomConfigBase {
  dataType: typeof CustomPropertyType.BOOLEAN;
  defaultValue?: boolean;
}

export interface FieldCustomConfigSelect extends FieldCustomConfigBase {
  dataType: typeof CustomPropertyType.SELECT;
  options: ({ label: string; value: string } | string)[];
  defaultValue?: string;
}

export interface FieldCustomConfigSize extends FieldCustomConfigBase {
  dataType: typeof CustomPropertyType.SIZE;
}

export type FieldSystemConfig =
  | FieldSystemConfigLabel
  | FieldSystemConfigPlaceholder
  | FieldSystemConfigRequired
  | FieldSystemConfigAccept
  | FieldSystemConfigInputName
  | FieldSystemConfigOptions
  | FieldSystemConfigImageSrc
  | FieldSystemConfigButtonAction
  | FieldSystemConfigColumnWidth;

export type FieldCustomConfig =
  | FieldCustomConfigText
  | FieldCustomConfigNumber
  | FieldCustomConfigColor
  | FieldCustomConfigBoolean
  | FieldCustomConfigSelect
  | FieldCustomConfigSize;

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

export interface FieldConfigSingleChoice {
  properties: Array<
    | FieldSystemConfigLabel
    | FieldSystemConfigOptions
    | FieldSystemConfigRequired
    | FieldCustomConfig
  >;
}

export interface FieldConfigMultipleChoices {
  properties: Array<
    | FieldSystemConfigLabel
    | FieldSystemConfigOptions
    | FieldSystemConfigRequired
    | FieldCustomConfig
  >;
}

export interface FieldConfigDate {
  properties: Array<
    | FieldSystemConfigLabel
    | FieldSystemConfigRequired
    | FieldCustomConfig
  >;
}

export interface FieldConfigTime {
  properties: Array<
    | FieldSystemConfigLabel
    | FieldSystemConfigRequired
    | FieldCustomConfig
  >;
}

export interface FieldConfigDateTime {
  properties: Array<
    | FieldSystemConfigLabel
    | FieldSystemConfigRequired
    | FieldCustomConfig
  >;
}

export interface FieldConfigFile {
  properties: Array<
    | FieldSystemConfigLabel
    | FieldSystemConfigAccept
    | FieldSystemConfigRequired
    | FieldCustomConfig
  >;
}

export interface FieldConfigImage {
  properties: Array<
    | FieldSystemConfigImageSrc
    | FieldCustomConfig
  >;
}

export interface FieldConfigDivider {
  properties: Array<FieldCustomConfig>;
}

export interface FieldConfigRow {
  properties: Array<FieldCustomConfig>;
}

export interface FieldConfigColumn {
  properties: Array<
    | FieldSystemConfigColumnWidth
    | FieldCustomConfig
  >;
}

export interface FieldConfigBlock {
  properties: Array<
    | FieldSystemConfigColumnWidth
    | FieldCustomConfig
  >;
}

export interface FieldConfigPage {
  properties: Array<FieldCustomConfig>;
}

export interface FieldConfigButton {
  properties: Array<
    | FieldSystemConfigLabel
    | FieldSystemConfigButtonAction
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
  heading: FieldConfigHeading;
  single_choice: FieldConfigSingleChoice;
  multiple_choices: FieldConfigMultipleChoices;
  date: FieldConfigDate;
  time: FieldConfigTime;
  date_time: FieldConfigDateTime;
  file: FieldConfigFile;
  image: FieldConfigImage;
  divider: FieldConfigDivider;
  row: FieldConfigRow;
  column: FieldConfigColumn;
  block: FieldConfigBlock;
  page: FieldConfigPage;
  button: FieldConfigButton;
}

export type FieldConfig = FieldSystemConfig | FieldCustomConfig;
