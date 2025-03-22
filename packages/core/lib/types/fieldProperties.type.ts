import type { JSONContent } from '@tiptap/core';
import type { Size } from './formSchema.type';
import type { TextAlign, ObjectFit, ButtonType } from './formSchema.constant';
import type { PropertyType } from './formSchema.constant';

// Label property
export interface LabelProperty {
  type: typeof PropertyType.LABEL;
  value: string | JSONContent;
}

// Placeholder property
export interface PlaceholderProperty {
  type: typeof PropertyType.PLACEHOLDER;
  value: string;
}

// Default value properties
export interface StringDefaultValueProperty {
  type: typeof PropertyType.DEFAULT_VALUE;
  stringValue: string;
}

export interface NumberDefaultValueProperty {
  type: typeof PropertyType.DEFAULT_VALUE;
  numberValue: number;
}

export interface ArrayDefaultValueProperty {
  type: typeof PropertyType.DEFAULT_VALUE;
  arrayValue: string[];
}

// Required property
export interface RequiredProperty {
  type: typeof PropertyType.REQUIRED;
  value: boolean;
  errorMessage?: string; // e.g., "This field is required"
}

// Min/Max properties
export interface MinProperty {
  type: typeof PropertyType.MIN;
  value: number;
  errorMessage?: string; // e.g., "Value must be at least {value}"
}

export interface MaxProperty {
  type: typeof PropertyType.MAX;
  value: number;
  errorMessage?: string; // e.g., "Value must be at most {value}"
}

// Format property
export interface FormatProperty {
  type: typeof PropertyType.FORMAT;
  value: string;
  errorMessage?: string; // e.g., "Please enter a valid {format} format"
}

// File properties
export interface AcceptProperty {
  type: typeof PropertyType.ACCEPT;
  value: string;
  errorMessage?: string; // e.g., "File type not allowed. Allowed types: {value}"
}

export interface MultipleProperty {
  type: typeof PropertyType.MULTIPLE;
  value: boolean;
  errorMessage?: string; // e.g., "Please select at least one option"
}

// Choice properties
export interface OptionsProperty {
  type: typeof PropertyType.OPTIONS;
  value: { label: string; value: string }[];
  errorMessage?: string; // e.g., "Please select a valid option"
  isValueDifferent?: boolean;
}

// Layout properties
export interface GapProperty {
  type: typeof PropertyType.GAP;
  value: Size;
}

export interface WidthProperty {
  type: typeof PropertyType.WIDTH;
  value: Size;
}

// Content properties
export interface TagProperty {
  type: typeof PropertyType.TAG;
  value: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export interface TextAlignProperty {
  type: typeof PropertyType.TEXT_ALIGN;
  value: TextAlign;
}

export interface ColorProperty {
  type: typeof PropertyType.COLOR;
  value: string;
}

export interface FontSizeProperty {
  type: typeof PropertyType.FONT;
  value: Size;
}

export interface FontWeightProperty {
  type: typeof PropertyType.FONT;
  value: number;
}

// Image properties
export interface SrcProperty {
  type: typeof PropertyType.SRC;
  value: string;
  errorMessage?: string; // e.g., "Invalid image URL"
}

export interface AltProperty {
  type: typeof PropertyType.ALT;
  value: string;
  errorMessage?: string; // e.g., "Please provide an alt text for accessibility"
}

export interface ObjectFitProperty {
  type: typeof PropertyType.OBJECT_FIT;
  value: ObjectFit;
}

export interface AutoWidthProperty {
  type: typeof PropertyType.AUTO_WIDTH;
  value: boolean;
}

// Button properties
export interface ButtonTypeProperty {
  type: typeof PropertyType.BTN_TYPE;
  value: ButtonType;
}

export interface FullWidthProperty {
  type: typeof PropertyType.FULL_WIDTH;
  value: boolean;
}

export interface BgColorProperty {
  type: typeof PropertyType.BG_COLOR;
  value: string;
}

export interface AlignProperty {
  type: typeof PropertyType.ALIGN;
  value: TextAlign;
}

// Divider properties
export interface HeightProperty {
  type: typeof PropertyType.HEIGHT;
  value: Size;
}

export interface StyleProperty {
  type: typeof PropertyType.STYLE;
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

// Container properties
export interface MarginProperty {
  type: typeof PropertyType.MARGIN;
  value: Size;
}

export interface PaddingProperty {
  type: typeof PropertyType.PADDING;
  value: Size;
}

export interface DisplayProperty {
  type: typeof PropertyType.DISPLAY;
  value: 'block' | 'inline-block' | 'flex' | 'grid';
}

export interface FlexDirectionProperty {
  type: typeof PropertyType.FLEX_DIRECTION;
  value: 'row' | 'column';
}

export interface AlignItemsProperty {
  type: typeof PropertyType.ALIGN_ITEMS;
  value: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
}

export interface JustifyContentProperty {
  type: typeof PropertyType.JUSTIFY_CONTENT;
  value:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
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
  | StyleProperty
  | MarginProperty
  | PaddingProperty
  | DisplayProperty
  | FlexDirectionProperty
  | AlignItemsProperty
  | JustifyContentProperty;
