import type { JSONContent } from '@tiptap/core';
import type { Size } from './formSchema.type';
import type { ValidationSchema } from './formSchema.type';
import type {
  TextAlign,
  ObjectFit,
  ButtonType,
  DividerStyle,
} from '../Constants';

// Base property interface with common fields
export interface BaseProperty {
  type: string;
  label: string;
  isRequired?: boolean;
}

// Text property
export interface TextProperty extends BaseProperty {
  type: 'text';
  placeholder?: string;
  defaultValue?: string;
  validation?: ValidationSchema[];
}

// Name property
export interface NameProperty extends BaseProperty {
  type: 'name';
  placeholder?: string;
  defaultValue?: string;
  validation?: ValidationSchema[];
}

// Email property
export interface EmailProperty extends BaseProperty {
  type: 'email';
  placeholder?: string;
  defaultValue?: string;
  validation?: ValidationSchema[];
}

// Number property
export interface NumberProperty extends BaseProperty {
  type: 'number';
  placeholder?: string;
  defaultValue?: number;
  min?: number;
  max?: number;
  validation?: ValidationSchema[];
}

// Choice property
export interface ChoiceProperty extends BaseProperty {
  type: 'choice';
  options: { label: string; value: string }[];
  defaultValue?: string;
  isValueDifferent?: boolean;
  validation?: ValidationSchema[];
}

// Choices property (multiple)
export interface ChoicesProperty extends BaseProperty {
  type: 'choices';
  options: { label: string; value: string }[];
  defaultValue?: string[];
  isValueDifferent?: boolean;
  validation?: ValidationSchema[];
}

// Date property
export interface DateProperty extends BaseProperty {
  type: 'date';
  format?: string;
  defaultValue?: string;
  validation?: ValidationSchema[];
}

// Time property
export interface TimeProperty extends BaseProperty {
  type: 'time';
  format?: string;
  defaultValue?: string;
  validation?: ValidationSchema[];
}

// DateTime property
export interface DateTimeProperty extends BaseProperty {
  type: 'date_time';
  format?: string;
  defaultValue?: string;
  validation?: ValidationSchema[];
}

// File property
export interface FileProperty extends BaseProperty {
  type: 'file';
  accept?: string;
  multiple?: boolean;
  defaultValue?: File[];
  validation?: ValidationSchema[];
}

// Content property (for rich text)
export interface ContentProperty extends BaseProperty {
  type: 'content';
  content: JSONContent;
  defaultValue?: JSONContent;
  validation?: ValidationSchema[];
}

// Image property
export interface ImageProperty extends BaseProperty {
  type: 'image';
  src?: string;
  alt?: string;
  textAlign?: TextAlign;
  objectFit?: ObjectFit;
  width?: {
    value: Size;
    autoWidth: boolean;
  };
  defaultValue?: string;
  validation?: ValidationSchema[];
}

// Button property
export interface ButtonProperty {
  type: 'button';
  label?: string;
  color?: string;
  bgColor?: string;
  btnType?: ButtonType;
  fullWidth?: boolean;
  font?: {
    size: Size;
    weight: number;
  };
  align?: TextAlign;
  defaultValue?: string;
  validation?: ValidationSchema[];
  isRequired?: boolean;
}

// Divider property
export interface DividerProperty extends BaseProperty {
  type: 'divider';
  color?: string;
  width?: Size;
  height?: Size;
  style?: DividerStyle;
  defaultValue?: string;
  validation?: ValidationSchema[];
}

// Layout properties
export interface RowProperty extends BaseProperty {
  type: 'row';
  gap?: Size;
  width?: Size;
  defaultValue?: string;
  validation?: ValidationSchema[];
}

export interface ColumnProperty extends BaseProperty {
  type: 'column';
  gap?: Size;
  width?: Size;
  defaultValue?: string;
  validation?: ValidationSchema[];
}

export interface BlockProperty extends BaseProperty {
  type: 'block';
  gap?: Size;
  width?: Size;
  defaultValue?: string;
  validation?: ValidationSchema[];
}

// Page property
export interface PageProperty extends BaseProperty {
  type: 'page';
  name?: string;
  defaultValue?: string;
  validation?: ValidationSchema[];
}

// Form field specific properties
export interface TaxProperty extends BaseProperty {
  type: 'tax';
  placeholder?: string;
  defaultValue?: string;
  validation?: ValidationSchema[];
}

export interface AddressProperty extends BaseProperty {
  type: 'address';
  placeholder?: string;
  defaultValue?: string;
  validation?: ValidationSchema[];
}

export interface CityProperty extends BaseProperty {
  type: 'city';
  placeholder?: string;
  defaultValue?: string;
  validation?: ValidationSchema[];
}

export interface StateProperty extends BaseProperty {
  type: 'state';
  placeholder?: string;
  defaultValue?: string;
  validation?: ValidationSchema[];
}

export interface ZipProperty extends BaseProperty {
  type: 'zip';
  placeholder?: string;
  defaultValue?: string;
  validation?: ValidationSchema[];
}

// Union type of all property definitions
export type PropertyDefinition =
  | TextProperty
  | NameProperty
  | EmailProperty
  | NumberProperty
  | ChoiceProperty
  | ChoicesProperty
  | DateProperty
  | TimeProperty
  | DateTimeProperty
  | FileProperty
  | ContentProperty
  | ImageProperty
  | ButtonProperty
  | DividerProperty
  | RowProperty
  | ColumnProperty
  | BlockProperty
  | PageProperty
  | TaxProperty
  | AddressProperty
  | CityProperty
  | StateProperty
  | ZipProperty;
