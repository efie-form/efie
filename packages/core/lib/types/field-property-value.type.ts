import type { JSONContent } from '@tiptap/core';
import type { Color, Size } from './common.type';

export type PropValueString = string;
export type PropValueNumber = number;
export type PropValueBoolean = boolean;
export type PropValueColor = Color;
export type PropValueSize = Size;
export type PropValueAccept = {
  formats: string[];
  allowAll: boolean;
};
export type PropValueOptions = {
  label: string;
  value: string;
}[];

type Direction = 'top' | 'right' | 'bottom' | 'left';
export type PropValueMargin = Record<Direction, Size>;
export type PropValuePadding = Record<Direction, Size>;

export interface BoxShadow {
  x: Size;
  y: Size;
  blur: Size;
  spread: Size;
  color: Color;
  inset: boolean;
}
export type PropValueBoxShadow = BoxShadow[];

type Corner = 'topLeft' | 'topRight' | 'bottomRight' | 'bottomLeft';
export type BorderRadius = Size | Size[];
export type PropValueBorderRadius = Record<Corner, BorderRadius>;

export type PropValueJsonContent = {
  jsonContent: JSONContent;
};

export type PropValue =
  | PropValueString
  | PropValueNumber
  | PropValueBoolean
  | PropValueColor
  | PropValueSize
  | PropValueAccept
  | PropValueOptions
  | PropValueMargin
  | PropValuePadding
  | PropValueBoxShadow
  | PropValueBorderRadius
  | PropValueJsonContent;
