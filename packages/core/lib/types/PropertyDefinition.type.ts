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
}

// Label property
export interface LabelProperty extends BaseProperty {
  type: 'label';
  value: string | JSONContent;
}

// Placeholder property
export interface PlaceholderProperty extends BaseProperty {
  type: 'placeholder';
  value: string;
}

// Default value properties
export interface StringDefaultValueProperty extends BaseProperty {
  type: 'defaultValue';
  stringValue: string;
}

export interface NumberDefaultValueProperty extends BaseProperty {
  type: 'defaultValue';
  numberValue: number;
}

export interface ArrayDefaultValueProperty extends BaseProperty {
  type: 'defaultValue';
  arrayValue: string[];
}

// Required property
export interface RequiredProperty extends BaseProperty {
  type: 'required';
  value: boolean;
}

// Validation property
export interface ValidationProperty extends BaseProperty {
  type: 'validation';
  rules: ValidationSchema[];
}

// Min/Max properties
export interface MinProperty extends BaseProperty {
  type: 'min';
  value: number;
}

export interface MaxProperty extends BaseProperty {
  type: 'max';
  value: number;
}

// Format property
export interface FormatProperty extends BaseProperty {
  type: 'format';
  value: string;
}

// File properties
export interface AcceptProperty extends BaseProperty {
  type: 'accept';
  value: string;
}

export interface MultipleProperty extends BaseProperty {
  type: 'multiple';
  value: boolean;
}

// Choice properties
export interface OptionsProperty extends BaseProperty {
  type: 'options';
  value: { label: string; value: string }[];
}

export interface IsValueDifferentProperty extends BaseProperty {
  type: 'isValueDifferent';
  value: boolean;
}

// Layout properties
export interface GapProperty extends BaseProperty {
  type: 'gap';
  value: Size;
}

export interface WidthProperty extends BaseProperty {
  type: 'width';
  value: Size;
}

// Content properties
export interface TagProperty extends BaseProperty {
  type: 'tag';
  value: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export interface TextAlignProperty extends BaseProperty {
  type: 'textAlign';
  value: TextAlign;
}

export interface ColorProperty extends BaseProperty {
  type: 'color';
  value: string;
}

export interface FontSizeProperty extends BaseProperty {
  type: 'fontSize';
  value: Size;
}

export interface FontWeightProperty extends BaseProperty {
  type: 'fontWeight';
  value: number;
}

// Image properties
export interface SrcProperty extends BaseProperty {
  type: 'src';
  value: string;
}

export interface AltProperty extends BaseProperty {
  type: 'alt';
  value: string;
}

export interface ObjectFitProperty extends BaseProperty {
  type: 'objectFit';
  value: ObjectFit;
}

export interface AutoWidthProperty extends BaseProperty {
  type: 'autoWidth';
  value: boolean;
}

// Button properties
export interface ButtonTypeProperty extends BaseProperty {
  type: 'btnType';
  value: ButtonType;
}

export interface FullWidthProperty extends BaseProperty {
  type: 'fullWidth';
  value: boolean;
}

export interface BgColorProperty extends BaseProperty {
  type: 'bgColor';
  value: string;
}

export interface AlignProperty extends BaseProperty {
  type: 'align';
  value: TextAlign;
}

// Divider properties
export interface HeightProperty extends BaseProperty {
  type: 'height';
  value: Size;
}

export interface StyleProperty extends BaseProperty {
  type: 'style';
  value: DividerStyle;
}

// Union type of all property definitions
export type PropertyDefinition =
  | LabelProperty
  | PlaceholderProperty
  | StringDefaultValueProperty
  | NumberDefaultValueProperty
  | ArrayDefaultValueProperty
  | RequiredProperty
  | ValidationProperty
  | MinProperty
  | MaxProperty
  | FormatProperty
  | AcceptProperty
  | MultipleProperty
  | OptionsProperty
  | IsValueDifferentProperty
  | GapProperty
  | WidthProperty
  | TagProperty
  | TextAlignProperty
  | ColorProperty
  | SrcProperty
  | AltProperty
  | ObjectFitProperty
  | AutoWidthProperty
  | ButtonTypeProperty
  | FullWidthProperty
  | BgColorProperty
  | AlignProperty
  | HeightProperty
  | StyleProperty;
