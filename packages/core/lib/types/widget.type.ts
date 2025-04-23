export const WidgetFormat = {
  TEXT: 'text',
  NUMBER: 'number',
  RANGE: 'range',
  SWITCH: 'switch',
  OPTIONS: 'options',
  FOUR_SIDE: 'fourSide',
  BOX_SHADOW: 'boxShadow',
  COLOR: 'color',
  SIZE: 'size',
  COUNTRY: 'country',
} as const;

export type WidgetFormat = (typeof WidgetFormat)[keyof typeof WidgetFormat];

interface WidgetBase {
  label: string;
  name: string;
  tag?: string;
}

export interface TextWidget extends WidgetBase {
  format: typeof WidgetFormat.TEXT;
}

export interface NumberWidget extends WidgetBase {
  format: typeof WidgetFormat.NUMBER;
  min?: number;
  max?: number;
}

export interface RangeWidget extends WidgetBase {
  format: typeof WidgetFormat.RANGE;
  min?: number;
  max?: number;
  step?: number;
}

export interface SwitchWidget extends WidgetBase {
  format: typeof WidgetFormat.SWITCH;
  defaultValue: boolean;
}

export interface OptionsWidget extends WidgetBase {
  format: typeof WidgetFormat.OPTIONS;
  defaultOptions: { label: string; value: string }[];
}

export interface FourSideWidget extends WidgetBase {
  format: typeof WidgetFormat.FOUR_SIDE;
  allName: string;
  sides: {
    label: string;
    name: string;
  }[];
}

export interface BoxShadowWidget extends WidgetBase {
  format: typeof WidgetFormat.BOX_SHADOW;
}

export interface ColorWidget extends WidgetBase {
  format: typeof WidgetFormat.COLOR;
  defaultColor: string;
}

export interface SizeWidget extends WidgetBase {
  format: typeof WidgetFormat.SIZE;
  defaultValue: number;
}

export interface CountryWidget extends WidgetBase {
  format: typeof WidgetFormat.COUNTRY;
  defaultCountry: string;
}

export type Widget =
  | TextWidget
  | NumberWidget
  | RangeWidget
  | SwitchWidget
  | OptionsWidget
  | FourSideWidget
  | BoxShadowWidget
  | ColorWidget
  | SizeWidget
  | CountryWidget;
