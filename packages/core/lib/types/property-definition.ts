import type {
  HeadingTag,
} from '../constants/form-schema.constant';
import type { PropertyType } from '../constants/form-schema.constant';
import type { PropValueAccept, PropValueBoolean, PropValueBorderRadius, PropValueBoxShadow, PropValueButtonAction, PropValueColor, PropValueMargin, PropValueNumber, PropValueOptions, PropValuePadding, PropValueSize, PropValueString } from './field-property-value.type';
import type { JSONContent } from '@tiptap/core';

// Label property
export interface LabelProperty {
  type: typeof PropertyType.LABEL;
  value: PropValueString;
}

// Placeholder property
export interface PlaceholderProperty {
  type: typeof PropertyType.PLACEHOLDER;
  value: PropValueString;
}

// Required property
export interface RequiredProperty {
  type: typeof PropertyType.REQUIRED;
  value: PropValueBoolean;
}

// File properties
export interface AcceptProperty {
  type: typeof PropertyType.ACCEPT;
  value: PropValueAccept;
}

export interface MaxFilesProperty {
  type: typeof PropertyType.MAX_FILES;
  value: PropValueNumber;
}

// Choice properties
export interface OptionsProperty {
  type: typeof PropertyType.OPTIONS;
  value: PropValueOptions;
}

// Layout properties
export interface WidthProperty {
  type: typeof PropertyType.WIDTH;
  value: PropValueSize;
}

// Content properties
export interface TagProperty {
  type: typeof PropertyType.TAG;
  value: HeadingTag;
}

export interface TextAlignProperty {
  type: typeof PropertyType.TEXT_ALIGN;
  value: PropValueString;
}

export interface ColorProperty {
  type: typeof PropertyType.COLOR;
  value: PropValueColor;
}

export interface FontSizeProperty {
  type: typeof PropertyType.FONT_SIZE;
  value: PropValueSize;
}

export interface FontWeightProperty {
  type: typeof PropertyType.FONT_WEIGHT;
  value: PropValueNumber;
}

export interface ButtonActionProperty {
  type: typeof PropertyType.BUTTON_ACTION;
  value: PropValueButtonAction;
}

// Image properties
export interface SrcProperty {
  type: typeof PropertyType.SRC;
  value: PropValueString;
}

export interface AltProperty {
  type: typeof PropertyType.ALT;
  value: PropValueString;
}

export interface ObjectFitProperty {
  type: typeof PropertyType.OBJECT_FIT;
  value: PropValueString;
}
export interface BgColorProperty {
  type: typeof PropertyType.BACKGROUND_COLOR;
  value: PropValueColor;
}

// Divider properties
export interface HeightProperty {
  type: typeof PropertyType.HEIGHT;
  value: PropValueSize;
}

// Container properties
export interface MarginProperty {
  type: typeof PropertyType.MARGIN;
  value: PropValueMargin;
}

export interface PaddingProperty {
  type: typeof PropertyType.PADDING;
  value: PropValuePadding;
}

export interface BoxShadowProperty {
  type: typeof PropertyType.BOX_SHADOW;
  value: PropValueBoxShadow;
}

export interface BorderRadiusProperty {
  type: typeof PropertyType.BORDER_RADIUS;
  value: PropValueBorderRadius;
}

export interface BorderStyleProperty {
  type: typeof PropertyType.BORDER_STYLE;
  value: PropValueString;
}

export interface BorderWidthProperty {
  type: typeof PropertyType.BORDER_WIDTH;
  value: PropValueSize;
}

export interface BorderColorProperty {
  type: typeof PropertyType.BORDER_COLOR;
  value: PropValueColor;
}

export interface ContentProperty {
  type: typeof PropertyType.CONTENT;
  value: {
    jsonContent: JSONContent;
  };
}

export interface PageNameProperty {
  type: typeof PropertyType.PAGE_NAME;
  value: PropValueString;
}

// Union type of all property definitions
export type PropertyDefinition =
  | LabelProperty
  | PlaceholderProperty
  | RequiredProperty
  | AcceptProperty
  | OptionsProperty
  | WidthProperty
  | TagProperty
  | TextAlignProperty
  | ColorProperty
  | FontSizeProperty
  | SrcProperty
  | AltProperty
  | MaxFilesProperty
  | ObjectFitProperty
  | BgColorProperty
  | HeightProperty
  | MarginProperty
  | PaddingProperty
  | BoxShadowProperty
  | BorderRadiusProperty
  | BorderStyleProperty
  | BorderWidthProperty
  | BorderColorProperty
  | ContentProperty
  | PageNameProperty
  | FontWeightProperty
  | ButtonActionProperty;
