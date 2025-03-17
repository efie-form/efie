import type { FormFieldType } from '../InputType';

export interface BuilderCustomInputShortText {
  id: string;
  type: typeof FormFieldType.SHORT_TEXT;
  label: string;
  key: string;
}

export interface BuilderCustomInputLongText {
  id: string;
  type: typeof FormFieldType.LONG_TEXT;
  label: string;
  key: string;
}

export interface BuilderCustomInputNumber {
  id: string;
  type: typeof FormFieldType.NUMBER;
  label: string;
  key: string;
}

export interface BuilderCustomInputSingleChoice {
  id: string;
  type: typeof FormFieldType.SINGLE_CHOICE;
  label: string;
  key: string;
}

export interface BuilderCustomInputMultipleChoices {
  id: string;
  type: typeof FormFieldType.MULTIPLE_CHOICES;
  label: string;
  key: string;
}

export interface BuilderCustomInputDate {
  id: string;
  type: typeof FormFieldType.DATE;
  label: string;
  key: string;
}

export interface BuilderCustomInputTime {
  id: string;
  type: typeof FormFieldType.TIME;
  label: string;
  key: string;
}

export interface BuilderCustomInputDateTime {
  id: string;
  type: typeof FormFieldType.DATE_TIME;
  label: string;
  key: string;
}

export interface BuilderCustomInputFile {
  id: string;
  type: typeof FormFieldType.FILE;
  label: string;
  key: string;
}

export type BuilderCustomInput =
  | BuilderCustomInputShortText
  | BuilderCustomInputLongText
  | BuilderCustomInputNumber
  | BuilderCustomInputSingleChoice
  | BuilderCustomInputMultipleChoices
  | BuilderCustomInputDate
  | BuilderCustomInputTime
  | BuilderCustomInputDateTime
  | BuilderCustomInputFile;
