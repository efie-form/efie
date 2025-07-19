import type { PropValueAccept, PropValueBoolean, PropValueBoxShadow, PropValueButtonAction, PropValueColor, PropValueJsonContent, PropValueMargin, PropValueNumber, PropValueOptions, PropValuePadding, PropValueSize, PropValueString } from './field-property-value.type';
import type { SYSTEM_PROPERTY } from './settings-config';
import { type CUSTOM_PROPERTY } from './settings-config';

export type CustomProperty =
  | CustomPropertyString
  | CustomPropertyNumber
  | CustomPropertyColor
  | CustomPropertyBoolean
  | CustomPropertySize
  | CustomPropertyBoxShadow
  | CustomPropertyMargin
  | CustomPropertyPadding
  | CustomPropertySelect
  | CustomPropertyMultiSelect;

export type SystemProperty =
  | SystemPropertyLabel
  | SystemPropertyPlaceholder
  | SystemPropertyImageSrc
  | SystemPropertyImageAlt
  | SystemPropertyInputName
  | SystemPropertyRequired
  | SystemPropertyOptions
  | SystemPropertyAccept;

export interface SystemPropertyLabel {
  type: 'system';
  id: typeof SYSTEM_PROPERTY.LABEL;
  value: PropValueString;
}

export interface SystemPropertyPlaceholder {
  type: 'system';
  id: typeof SYSTEM_PROPERTY.PLACEHOLDER;
  value: PropValueString;
}

export interface SystemPropertyImageSrc {
  type: 'system';
  id: typeof SYSTEM_PROPERTY.IMAGE_SRC;
  value: PropValueString;
}

export interface SystemPropertyImageAlt {
  type: 'system';
  id: typeof SYSTEM_PROPERTY.IMAGE_ALT;
  value: PropValueString;
}

export interface SystemPropertyInputName {
  type: 'system';
  id: typeof SYSTEM_PROPERTY.INPUT_NAME;
  value: PropValueString;
}

export interface SystemPropertyRequired {
  type: 'system';
  id: typeof SYSTEM_PROPERTY.REQUIRED;
  value: PropValueBoolean;
}

export interface SystemPropertyOptions {
  type: 'system';
  id: typeof SYSTEM_PROPERTY.OPTIONS;
  value: PropValueOptions;
}

export interface SystemPropertyAccept {
  type: 'system';
  id: typeof SYSTEM_PROPERTY.ACCEPT;
  value: PropValueAccept;
}

export interface SystemPropertyColumnWidth {
  type: 'system';
  id: typeof SYSTEM_PROPERTY.COLUMN_WIDTH;
  value: PropValueSize;
}

export interface SystemPropertyHeadingContent {
  type: 'system';
  id: typeof SYSTEM_PROPERTY.HEADING_CONTENT;
  value: PropValueJsonContent;
}

export interface SystemPropertyButtonAction {
  type: 'system';
  id: typeof SYSTEM_PROPERTY.BUTTON_ACTION;
  value: PropValueButtonAction;
}

export interface SystemPropertyPageName {
  type: 'system';
  id: typeof SYSTEM_PROPERTY.PAGE_NAME;
  value: PropValueString;
}

/**
 * Custom properties for form fields.
 */
export interface CustomPropertyString {
  id: string;
  type: 'custom';
  dataType: typeof CUSTOM_PROPERTY.TEXT;
  value: PropValueString;
}

export interface CustomPropertySelect {
  id: string;
  type: 'custom';
  dataType: typeof CUSTOM_PROPERTY.SELECT;
  value: PropValueString;
}

export interface CustomPropertyMultiSelect {
  id: string;
  type: 'custom';
  dataType: typeof CUSTOM_PROPERTY.MULTI_SELECT;
  value: PropValueString[];
}

export interface CustomPropertyNumber {
  id: string;
  type: 'custom';
  dataType: typeof CUSTOM_PROPERTY.NUMBER;
  value: PropValueNumber;
}

export interface CustomPropertyColor {
  id: string;
  type: 'custom';
  dataType: typeof CUSTOM_PROPERTY.COLOR;
  value: PropValueColor;
}

export interface CustomPropertyBoolean {
  id: string;
  type: 'custom';
  dataType: typeof CUSTOM_PROPERTY.BOOLEAN;
  value: PropValueBoolean;
}

export interface CustomPropertySize {
  id: string;
  type: 'custom';
  dataType: typeof CUSTOM_PROPERTY.SIZE;
  value: PropValueSize;
}

export interface CustomPropertyBoxShadow {
  id: string;
  type: 'custom';
  dataType: typeof CUSTOM_PROPERTY.BOX_SHADOW;
  value: PropValueBoxShadow;
}

export interface CustomPropertyMargin {
  id: string;
  type: 'custom';
  dataType: typeof CUSTOM_PROPERTY.MARGIN;
  value: PropValueMargin;
}

export interface CustomPropertyPadding {
  id: string;
  type: 'custom';
  dataType: typeof CUSTOM_PROPERTY.PADDING;
  value: PropValuePadding;
}

export type FieldProperty =
  | SystemProperty
  | CustomProperty;
