import type { PropertyDefinition, PropSettingsTemplate } from '@efie-form/core';

export interface PropSettingsText {
  template: typeof PropSettingsTemplate.TEXT;
  type: PropertyDefinition['type'];
  label: string;
  placeholder?: string;
}

export interface PropSettingsBoolean {
  template: typeof PropSettingsTemplate.BOOLEAN;
  type: PropertyDefinition['type'];
  label: string;
}

export interface PropSettingsFormKey {
  template: typeof PropSettingsTemplate.FORM_KEY;
}

export interface PropSettingsOption {
  template: typeof PropSettingsTemplate.OPTION;
  type: PropertyDefinition['type'];
  label: string;
  defaultOptions: string[];
}

export interface PropSettingsNumber {
  template: typeof PropSettingsTemplate.NUMBER;
  type: PropertyDefinition['type'];
  label: string;
  placeholder?: string;
  min?: number;
  max?: number;
}

export interface PropSettingsAccept {
  template: typeof PropSettingsTemplate.ACCEPT;
  type: PropertyDefinition['type'];
  label: string;
}

export interface PropSettingsColor {
  template: typeof PropSettingsTemplate.COLOR;
  type: PropertyDefinition['type'];
  label: string;
}

export interface PropSettingsImageUrl {
  template: typeof PropSettingsTemplate.IMAGE_URL;
  type: PropertyDefinition['type'];
  label: string;
  placeholder?: string;
}

export interface PropSettingsSize {
  template: typeof PropSettingsTemplate.SIZE;
  type: PropertyDefinition['type'];
  label: string;
}

export interface PropSettingsBorderRadius {
  template: typeof PropSettingsTemplate.BORDER_RADIUS;
  type: PropertyDefinition['type'];
  label: string;
}

export interface PropSettingsMargin {
  template: typeof PropSettingsTemplate.MARGIN;
  type: PropertyDefinition['type'];
  label: string;
}

export interface PropSettingsPadding {
  template: typeof PropSettingsTemplate.PADDING;
  type: PropertyDefinition['type'];
  label: string;
}

export interface PropSettingsBoxShadow {
  template: typeof PropSettingsTemplate.BOX_SHADOW;
  type: PropertyDefinition['type'];
  label: string;
}

export interface PropSettingsSelect {
  template: typeof PropSettingsTemplate.SELECT;
  type: PropertyDefinition['type'];
  label: string;
  options: Array<{
    value: string | number;
    label: string;
  }>;
  placeholder?: string;
}

export interface PropSettingsButtonAction {
  template: typeof PropSettingsTemplate.BUTTON_ACTION;
  type: PropertyDefinition['type'];
  label: string;
}

export type PropSettings =
  | PropSettingsText
  | PropSettingsNumber
  | PropSettingsBoolean
  | PropSettingsFormKey
  | PropSettingsOption
  | PropSettingsAccept
  | PropSettingsColor
  | PropSettingsImageUrl
  | PropSettingsSize
  | PropSettingsBorderRadius
  | PropSettingsMargin
  | PropSettingsPadding
  | PropSettingsBoxShadow
  | PropSettingsSelect
  | PropSettingsButtonAction;
