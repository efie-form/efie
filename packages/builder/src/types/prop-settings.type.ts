import type { PropertyDefinition } from '@efie-form/core';

export interface PropSettingsText {
  template: 'text';
  type: PropertyDefinition['type'];
  label: string;
  placeholder?: string;
}

export interface PropSettingsNumber {
  template: 'number';
  type: PropertyDefinition['type'];
  label: string;
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

export type PropSettings =
  | PropSettingsText
  | PropSettingsNumber
  | PropSettingsBoolean
  | PropSettingsFormKey
  | PropSettingsOption;
