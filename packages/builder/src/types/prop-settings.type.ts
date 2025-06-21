import type { PropertyDefinition } from '@efie-form/core';

export interface PropSettingsText {
  template: 'text';
  type: PropertyDefinition['type'];
  label: string;
  placeholder?: string;
}

export interface PropSettingsBoolean {
  template: 'boolean';
  type: PropertyDefinition['type'];
  label: string;
}

export interface PropSettingsFormKey {
  template: 'formKey';
}

export interface PropSettingsOption {
  template: 'option';
  type: PropertyDefinition['type'];
  label: string;
  defaultOptions: string[];
}

export interface PropSettingsNumber {
  template: 'number';
  type: PropertyDefinition['type'];
  label: string;
  placeholder?: string;
  min?: number;
  max?: number;
}

export interface PropSettingsAccept {
  template: 'accept';
  type: PropertyDefinition['type'];
  label: string;
}

export interface PropSettingsColor {
  template: 'color';
  type: PropertyDefinition['type'];
  label: string;
}

export interface PropSettingsImageUrl {
  template: 'imageUrl';
  type: PropertyDefinition['type'];
  label: string;
  placeholder?: string;
}

export interface PropSettingsSize {
  template: 'size';
  type: PropertyDefinition['type'];
  label: string;
}

export interface PropSettingsBorderRadius {
  template: 'borderRadius';
  type: PropertyDefinition['type'];
  label: string;
}

export interface PropSettingsMargin {
  template: 'margin';
  type: PropertyDefinition['type'];
  label: string;
}

export interface PropSettingsPadding {
  template: 'padding';
  type: PropertyDefinition['type'];
  label: string;
}

export interface PropSettingsBoxShadow {
  template: 'boxShadow';
  type: PropertyDefinition['type'];
  label: string;
}

export interface PropSettingsSelect {
  template: 'select';
  type: PropertyDefinition['type'];
  label: string;
  options: Array<{
    value: string | number;
    label: string;
  }>;
  placeholder?: string;
}

export interface PropSettingsButtonAction {
  template: 'buttonAction';
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
