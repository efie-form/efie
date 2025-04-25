export interface TextValue {
  type: string;
  value: string;
}

export interface NumberValue {
  type: string;
  value: number;
}

export interface RangeValue {
  type: string;
  min: number;
  max: number;
  step: number;
}

export interface SwitchValue {
  type: string;
  value: boolean;
}

export interface OptionsValue {
  type: string;
  value: { label: string; value: string }[];
}

export interface FourSideValue {
  type: string;
  sides: {};
}

export interface ColorValue {
  type: string;
  rgba: {
    r: number;
    g: number;
    b: number;
    a: number;
  };
}

export type PropValue =
  | TextValue
  | NumberValue
  | RangeValue
  | SwitchValue
  | OptionsValue
  | FourSideValue
  | ColorValue;
