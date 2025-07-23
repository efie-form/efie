import type { Color, PropSettingsTemplate, Size } from '@efie-form/core';

export interface BaseSettingsConfig {
  id: string;
  label: string;
}

export interface TextSettingsConfig extends BaseSettingsConfig {
  type: typeof PropSettingsTemplate.TEXT;
  options: {
    placeholder?: string;
  };
  defaultValue?: string;
}

export interface BooleanSettingsConfig extends BaseSettingsConfig {
  type: typeof PropSettingsTemplate.BOOLEAN;
  defaultValue?: boolean;
}

export interface FormKeySettingsConfig extends BaseSettingsConfig {
  type: typeof PropSettingsTemplate.FORM_KEY;
}

export interface OptionsSettingsConfig extends BaseSettingsConfig {
  type: typeof PropSettingsTemplate.OPTIONS;
  defaultValue?: string[];
}

export interface NumberSettingsConfig extends BaseSettingsConfig {
  type: typeof PropSettingsTemplate.NUMBER;
  options: {
    placeholder?: string;
    min?: number;
    max?: number;
    step?: number;
  };
  defaultValue?: number;
}

export interface AcceptSettingsConfig extends BaseSettingsConfig {
  type: typeof PropSettingsTemplate.ACCEPT;
}

export interface ColorSettingsConfig extends BaseSettingsConfig {
  type: typeof PropSettingsTemplate.COLOR;
  defaultValue?: string;
}

export interface ImageUrlSettingsConfig extends BaseSettingsConfig {
  type: typeof PropSettingsTemplate.IMAGE_URL;
  options: {
    placeholder?: string;
    // s3 options can be added here if needed
  };
  defaultValue?: string;
}
export interface SizeSettingsConfig extends BaseSettingsConfig {
  type: typeof PropSettingsTemplate.SIZE;
  defaultValue?: Size;
}

export interface BorderRadiusSettingsConfig extends BaseSettingsConfig {
  type: typeof PropSettingsTemplate.BORDER_RADIUS;
  defaultValue?: {
    topLeft?: Size;
    topRight?: Size;
    bottomLeft?: Size;
    bottomRight?: Size;
  };
}

export interface MarginSettingsConfig extends BaseSettingsConfig {
  type: typeof PropSettingsTemplate.MARGIN;
  defaultValue?: {
    top?: Size;
    right?: Size;
    bottom?: Size;
    left?: Size;
  };
}

export interface PaddingSettingsConfig extends BaseSettingsConfig {
  type: typeof PropSettingsTemplate.PADDING;
  defaultValue?: {
    top?: Size;
    right?: Size;
    bottom?: Size;
    left?: Size;
  };
}

export interface BoxShadowSettingsConfig extends BaseSettingsConfig {
  type: typeof PropSettingsTemplate.BOX_SHADOW;
  defaultValue?: {
    offsetX?: Size;
    offsetY?: Size;
    blur?: Size;
    spread?: Size;
    color?: Color;
  };
}

export interface SelectSettingsConfig extends BaseSettingsConfig {
  type: typeof PropSettingsTemplate.SELECT;
  options: {
    options: Array<{
      value: string | number;
      label: string;
    }>;
  };
  defaultValue?: string | number;
}

export interface ButtonActionSettingsConfig extends BaseSettingsConfig {
  type: typeof PropSettingsTemplate.BUTTON_ACTION;
}

export type SettingsConfig =
  | TextSettingsConfig
  | BooleanSettingsConfig
  | FormKeySettingsConfig
  | OptionsSettingsConfig
  | NumberSettingsConfig
  | AcceptSettingsConfig
  | ColorSettingsConfig
  | ImageUrlSettingsConfig
  | SizeSettingsConfig
  | BorderRadiusSettingsConfig
  | MarginSettingsConfig
  | PaddingSettingsConfig
  | BoxShadowSettingsConfig
  | SelectSettingsConfig
  | ButtonActionSettingsConfig;
