export interface TextValue {
  type: string;
  value: string;
}

export interface NumberValue {
  type: string;
  value: number;
}

export interface RangeWidget {
  type: string;
  min: number;
  max: number;
  step: number;
}

export interface SwitchWidget {
  type: string;
  value: boolean;
}

export interface OptionsWidget {
  type: string;
  value: { label: string; value: string }[];
}

export interface FourSideWidget {
  type: string;
  sides: {};
}

export type PropValue =
  | TextValue
  | NumberValue
  | RangeWidget
  | SwitchWidget
  | OptionsWidget
  | FourSideWidget;
