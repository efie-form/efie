import type { FormFieldType } from '../constants/field-type';

export interface ShortTextDef {
  id: string;
  type: typeof FormFieldType.SHORT_TEXT;
  label: string;
}

export interface LongTextDef {
  id: string;
  type: typeof FormFieldType.LONG_TEXT;
  label: string;
}

export interface NumberDef {
  id: string;
  type: typeof FormFieldType.NUMBER;
  label: string;
}

export interface SingleChoiceDef {
  id: string;
  type: typeof FormFieldType.SINGLE_CHOICE;
  label: string;
}

export interface MultipleChoicesDef {
  id: string;
  type: typeof FormFieldType.MULTIPLE_CHOICES;
  label: string;
}

export interface DateDef {
  id: string;
  type: typeof FormFieldType.DATE;
  label: string;
}

export interface TimeDef {
  id: string;
  type: typeof FormFieldType.TIME;
  label: string;
}

export interface DateTimeDef {
  id: string;
  type: typeof FormFieldType.DATE_TIME;
  label: string;
}

export interface FileDef {
  id: string;
  type: typeof FormFieldType.FILE;
  label: string;
}

export type CustomInputDef =
  | ShortTextDef
  | LongTextDef
  | NumberDef
  | SingleChoiceDef
  | MultipleChoicesDef
  | DateDef
  | TimeDef
  | DateTimeDef
  | FileDef;
