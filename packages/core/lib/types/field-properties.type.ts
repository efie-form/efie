import type { JSONContent } from '@tiptap/core';
import type { Size } from './form-schema.type';
import type {
  TextAlign,
  ObjectFit,
  ButtonType,
  HeadingTag,
} from './form-schema.constant';
import type { PropertyType } from './form-schema.constant';
import type { Color } from './common.type';

// Label property
export interface LabelProperty {
  type: typeof PropertyType.LABEL;
  value: string; // JSONContent;
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
  allowAll: boolean;
  formats?: string[];
  errorMessage?: string; // e.g., "File type not allowed. Allowed types: {value}"
}

export interface MultipleProperty {
  type: typeof PropertyType.MULTIPLE;
  value: boolean;
  min?: number;
  max?: number;
  errorMessage?: string;
}

export interface MaxFilesProperty {
  type: typeof PropertyType.MAX_FILES;
  value: number;
  errorMessage?: string;
}

// Choice properties
export interface OptionsProperty {
  type: typeof PropertyType.OPTIONS;
  value: { label: string; value: string }[];
  errorMessage?: string; // e.g., "Please select a valid option"
}

// Layout properties
export interface GapProperty {
  type: typeof PropertyType.GAP;
  value: Size;
}

export interface WidthProperty {
  type: typeof PropertyType.WIDTH;
  value: Size;
  autoWidth: boolean;
}

export interface NameProperty {
  type: typeof PropertyType.NAME;
  value: string;
}

// Content properties
export interface TagProperty {
  type: typeof PropertyType.TAG;
  value: HeadingTag;
}

export interface TextAlignProperty {
  type: typeof PropertyType.TEXT_ALIGN;
  value: TextAlign;
}

export interface ColorProperty {
  type: typeof PropertyType.COLOR;
  value: Color;
}

export interface FontSizeProperty {
  type: typeof PropertyType.FONT_SIZE;
  value: Size;
}

export interface FontWeightProperty {
  type: typeof PropertyType.FONT_WEIGHT;
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

export interface ContentProperty {
  type: typeof PropertyType.CONTENT;
  value: {
    jsonContent: JSONContent;
  };
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
  value: Color;
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

export interface Margin {
  top: Size;
  right: Size;
  bottom: Size;
  left: Size;
}

export interface Padding {
  top: Size;
  right: Size;
  bottom: Size;
  left: Size;
}

// Container properties
export interface MarginProperty {
  type: typeof PropertyType.MARGIN;
  value: Margin;
}

export interface PaddingProperty {
  type: typeof PropertyType.PADDING;
  value: Padding;
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

export interface BoxShadow {
  x: Size;
  y: Size;
  blur: Size;
  spread: Size;
  color: string;
  inset: boolean;
}
export interface BoxShadowProperty {
  type: typeof PropertyType.BOX_SHADOW;
  value: BoxShadow[];
}

export interface BorderRadiusProperty {
  type: typeof PropertyType.BORDER_RADIUS;
  value: {
    topLeft: Size;
    topRight: Size;
    bottomLeft: Size;
    bottomRight: Size;
  };
}

export interface BorderWidthProperty {
  type: typeof PropertyType.BORDER_WIDTH;
  value: Size;
}

export interface BorderColorProperty {
  type: typeof PropertyType.BORDER_COLOR;
  value: Color;
}

export interface BorderStyleProperty {
  type: typeof PropertyType.BORDER_STYLE;
  value: string;
}

export interface DividerHeightProperty {
  type: typeof PropertyType.DIVIDER_HEIGHT;
  value: Size;
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
  | MaxFilesProperty
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
  | JustifyContentProperty
  | ContentProperty
  | BoxShadowProperty
  | BorderRadiusProperty
  | BorderWidthProperty
  | BorderColorProperty
  | BorderStyleProperty
  | NameProperty
  | DividerHeightProperty;
