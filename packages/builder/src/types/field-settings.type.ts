import type { SettingsConfig } from './settings-config.type';

type Level = 0 | 1 | 2 | 3 | 4 | 5 | 6;

interface Heading {
  level: Level;
  label: string;
}

interface FontSize {
  label: string;
  size: string;
}

interface BaseFieldConfig {
  settings?: SettingsConfig[];
}

export interface HeadingFieldConfig extends BaseFieldConfig {
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
    list?:
      | boolean
      | {
          ordered: boolean;
          bullet: boolean;
        };
    codeBlock?: boolean;
    align:
      | boolean
      | {
          left: boolean;
          center: boolean;
          right: boolean;
          justify: boolean;
        };
    heading?:
      | boolean
      | {
          options: Heading[];
          default?: Level;
        };
    fontSize?:
      | boolean
      | {
          options: FontSize[];
          default?: FontSize;
        };
  };
}

export interface FieldConfig {
  heading?: HeadingFieldConfig;
  // Create a individual config if needed for each field type
  short_text?: BaseFieldConfig;
  long_text?: BaseFieldConfig;
  number?: BaseFieldConfig;
  single_choice?: BaseFieldConfig;
  multiple_choices?: BaseFieldConfig;
  date?: BaseFieldConfig;
  time?: BaseFieldConfig;
  date_time?: BaseFieldConfig;
  file?: BaseFieldConfig;
  divider?: BaseFieldConfig;
  image?: BaseFieldConfig;
  row?: BaseFieldConfig;
  column?: BaseFieldConfig;
  block?: BaseFieldConfig;
  page?: BaseFieldConfig;
  button?: BaseFieldConfig;
}
