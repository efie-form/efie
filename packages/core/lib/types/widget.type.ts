export const WidgetType = {
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

export type WidgetType = (typeof WidgetType)[keyof typeof WidgetType];

interface WidgetBase {
  label: string;
}

export interface TextWidget extends WidgetBase {
  type: typeof WidgetType.TEXT;
}

export interface NumberWidget extends WidgetBase {
  type: typeof WidgetType.NUMBER;
  min?: number;
  max?: number;
}

export interface RangeWidget extends WidgetBase {
  type: typeof WidgetType.RANGE;
  min?: number;
  max?: number;
  step?: number;
}

export interface SwitchWidget extends WidgetBase {
  type: typeof WidgetType.SWITCH;
  defaultValue: boolean;
}

export interface OptionsWidget extends WidgetBase {
  type: typeof WidgetType.OPTIONS;
  defaultOptions: { label: string; value: string; name: string }[];
}

export interface FourSideWidget extends WidgetBase {
  type: typeof WidgetType.FOUR_SIDE;
  sides: {};
}

export interface BoxShadowWidget extends WidgetBase {
  type: typeof WidgetType.BOX_SHADOW;
}

export interface ColorWidget extends WidgetBase {
  type: typeof WidgetType.COLOR;
  defaultColor: string;
}

export interface SizeWidget extends WidgetBase {
  type: typeof WidgetType.SIZE;
  defaultValue: number;
}

export interface CountryWidget extends WidgetBase {
  type: typeof WidgetType.COUNTRY;
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
