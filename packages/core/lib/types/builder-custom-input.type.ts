import type { FieldType } from '../constants/field-type';

export interface ShortTextDef {
  id: string;
  type: typeof FieldType.SHORT_TEXT;
  label: string;
}

export interface LongTextDef {
  id: string;
  type: typeof FieldType.LONG_TEXT;
  label: string;
}

export interface NumberDef {
  id: string;
  type: typeof FieldType.NUMBER;
  label: string;
}

export interface SingleChoiceDef {
  id: string;
  type: typeof FieldType.SINGLE_CHOICE;
  label: string;
}

export interface MultipleChoicesDef {
  id: string;
  type: typeof FieldType.MULTIPLE_CHOICES;
  label: string;
}

export interface DateDef {
  id: string;
  type: typeof FieldType.DATE;
  label: string;
}

export interface TimeDef {
  id: string;
  type: typeof FieldType.TIME;
  label: string;
}

export interface DateTimeDef {
  id: string;
  type: typeof FieldType.DATE_TIME;
  label: string;
}

export interface FileDef {
  id: string;
  type: typeof FieldType.FILE;
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
