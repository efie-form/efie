import type { JSONContent } from '@tiptap/core';
import type { Size } from './formSchema.type';
import type { TextAlign, ObjectFit, ButtonType } from './formSchema.constant';

// Label property
export interface LabelProperty {
  type: 'label';
  value: string | JSONContent;
}

// Placeholder property
export interface PlaceholderProperty {
  type: 'placeholder';
  value: string;
}

// Default value properties
export interface StringDefaultValueProperty {
  type: 'defaultValue';
  stringValue: string;
}

export interface NumberDefaultValueProperty {
  type: 'defaultValue';
  numberValue: number;
}

export interface ArrayDefaultValueProperty {
  type: 'defaultValue';
  arrayValue: string[];
}

// Required property
export interface RequiredProperty {
  type: 'required';
  value: boolean;
  errorMessage?: string; // e.g., "This field is required"
}

// Min/Max properties
export interface MinProperty {
  type: 'min';
  value: number;
  errorMessage?: string; // e.g., "Value must be at least {value}"
}

export interface MaxProperty {
  type: 'max';
  value: number;
  errorMessage?: string; // e.g., "Value must be at most {value}"
}

// Format property
export interface FormatProperty {
  type: 'format';
  value: string;
  errorMessage?: string; // e.g., "Please enter a valid {format} format"
}

// File properties
export interface AcceptProperty {
  type: 'accept';
  value: string;
  errorMessage?: string; // e.g., "File type not allowed. Allowed types: {value}"
}

export interface MultipleProperty {
  type: 'multiple';
  value: boolean;
  errorMessage?: string; // e.g., "Please select at least one option"
}

// Choice properties
export interface OptionsProperty {
  type: 'options';
  value: { label: string; value: string }[];
  errorMessage?: string; // e.g., "Please select a valid option"
  isValueDifferent?: boolean;
}

// Layout properties
export interface GapProperty {
  type: 'gap';
  value: Size;
}

export interface WidthProperty {
  type: 'width';
  value: Size;
}

// Content properties
export interface TagProperty {
  type: 'tag';
  value: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export interface TextAlignProperty {
  type: 'textAlign';
  value: TextAlign;
}

export interface ColorProperty {
  type: 'color';
  value: string;
}

export interface FontSizeProperty {
  type: 'fontSize';
  value: Size;
}

export interface FontWeightProperty {
  type: 'fontWeight';
  value: number;
}

// Image properties
export interface SrcProperty {
  type: 'src';
  value: string;
  errorMessage?: string; // e.g., "Invalid image URL"
}

export interface AltProperty {
  type: 'alt';
  value: string;
  errorMessage?: string; // e.g., "Please provide an alt text for accessibility"
}

export interface ObjectFitProperty {
  type: 'objectFit';
  value: ObjectFit;
}

export interface AutoWidthProperty {
  type: 'autoWidth';
  value: boolean;
}

// Button properties
export interface ButtonTypeProperty {
  type: 'btnType';
  value: ButtonType;
}

export interface FullWidthProperty {
  type: 'fullWidth';
  value: boolean;
}

export interface BgColorProperty {
  type: 'bgColor';
  value: string;
}

export interface AlignProperty {
  type: 'align';
  value: TextAlign;
}

// Divider properties
export interface HeightProperty {
  type: 'height';
  value: Size;
}

export interface StyleProperty {
  type: 'style';
  value: {
    display?: 'block' | 'inline-block' | 'flex' | 'grid';
    flexDirection?: 'row' | 'column';
    alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
    justifyContent?:
      | 'flex-start'
      | 'flex-end'
      | 'center'
      | 'space-between'
      | 'space-around'
      | 'space-evenly';
  };
}

// Union type of all property definitions
export type PropertyDefinition =
  | LabelProperty
  | PlaceholderProperty
  | StringDefaultValueProperty
  | NumberDefaultValueProperty
  | ArrayDefaultValueProperty
  | RequiredProperty
  | MinProperty
  | MaxProperty
  | FormatProperty
  | AcceptProperty
  | MultipleProperty
  | OptionsProperty
  | GapProperty
  | WidthProperty
  | TagProperty
  | TextAlignProperty
  | ColorProperty
  | FontSizeProperty
  | FontWeightProperty
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
