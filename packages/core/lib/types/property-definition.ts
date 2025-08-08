import type { CustomPropertyType, PropertyType } from '../property-type';
import type {
  PropValueAccept,
  PropValueAddressField,
  PropValueBoolean,
  PropValueButtonAction,
  PropValueColor,
  PropValueJsonContent,
  PropValueNumber,
  PropValueOptions,
  PropValueSize,
  PropValueString,
} from './field-property-value.type';

export type FieldCustomProp =
  | FieldCustomPropString
  | FieldCustomPropNumber
  | FieldCustomPropColor
  | FieldCustomPropBoolean
  | FieldCustomPropSize
  | FieldCustomPropSelect;

export type FieldSystemProp =
  | FieldSystemPropLabel
  | FieldSystemPropPlaceholder
  | FieldSystemPropImageSrc
  | FieldSystemPropFieldName
  | FieldSystemPropRequired
  | FieldSystemPropOptions
  | FieldSystemPropAccept
  | FieldSystemPropColumnWidth
  | FieldSystemPropHeadingContent
  | FieldSystemPropButtonAction
  | FieldSystemPropPageName
  | FieldSystemPropAddressField;

export interface FieldSystemPropLabel {
  type: typeof PropertyType.LABEL;
  value: PropValueString;
}

export interface FieldSystemPropPlaceholder {
  type: typeof PropertyType.PLACEHOLDER;
  value: PropValueString;
}

export interface FieldSystemPropImageSrc {
  type: typeof PropertyType.IMAGE_SRC;
  value: PropValueString;
}

export interface FieldSystemPropFieldName {
  type: typeof PropertyType.FIELD_NAME;
  value: PropValueString;
}

export interface FieldSystemPropRequired {
  type: typeof PropertyType.REQUIRED;
  value: PropValueBoolean;
}

export interface FieldSystemPropOptions {
  type: typeof PropertyType.OPTIONS;
  value: PropValueOptions;
}

export interface FieldSystemPropAccept {
  type: typeof PropertyType.ACCEPT;
  value: PropValueAccept;
}

export interface FieldSystemPropColumnWidth {
  type: typeof PropertyType.COLUMN_WIDTH;
  value: PropValueSize;
}

export interface FieldSystemPropHeadingContent {
  type: typeof PropertyType.HEADING_CONTENT;
  value: PropValueJsonContent;
}

export interface FieldSystemPropButtonAction {
  type: typeof PropertyType.BUTTON_ACTION;
  value: PropValueButtonAction;
}

export interface FieldSystemPropPageName {
  type: typeof PropertyType.PAGE_NAME;
  value: PropValueString;
}

export interface FieldSystemPropAddressField {
  type: typeof PropertyType.ADDRESS_FIELD;
  value: PropValueAddressField;
}

/**
 * Custom properties for form fields.
 */
export interface FieldCustomPropString {
  id: string;
  type: typeof PropertyType.CUSTOM;
  dataType: typeof CustomPropertyType.TEXT;
  value: PropValueString;
}

export interface FieldCustomPropSelect {
  id: string;
  type: typeof PropertyType.CUSTOM;
  dataType: typeof CustomPropertyType.SELECT;
  value: PropValueString;
}

export interface FieldCustomPropNumber {
  id: string;
  type: typeof PropertyType.CUSTOM;
  dataType: typeof CustomPropertyType.NUMBER;
  value: PropValueNumber;
}

export interface FieldCustomPropColor {
  id: string;
  type: typeof PropertyType.CUSTOM;
  dataType: typeof CustomPropertyType.COLOR;
  value: PropValueColor;
}

export interface FieldCustomPropBoolean {
  id: string;
  type: typeof PropertyType.CUSTOM;
  dataType: typeof CustomPropertyType.BOOLEAN;
  value: PropValueBoolean;
}

export interface FieldCustomPropSize {
  id: string;
  type: typeof PropertyType.CUSTOM;
  dataType: typeof CustomPropertyType.SIZE;
  value: PropValueSize;
}

export type PropertyDefinition = FieldSystemProp | FieldCustomProp;
