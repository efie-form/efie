import type { FormFieldType } from '../lib/InputType';

export interface BuilderCustomInputShortText {
  id: string;
  type: typeof FormFieldType.SHORT_TEXT;
  label: string;
}

export interface BuilderCustomInputLongText {
  id: string;
  type: typeof FormFieldType.LONG_TEXT;
  label: string;
}

export interface BuilderCustomInputNumber {
  id: string;
  type: typeof FormFieldType.NUMBER;
  label: string;
}

export interface BuilderCustomInputSingleChoice {
  id: string;
  type: typeof FormFieldType.SINGLE_CHOICE;
  label: string;
}

export interface BuilderCustomInputMultipleChoices {
  id: string;
  type: typeof FormFieldType.MULTIPLE_CHOICES;
  label: string;
}

export interface BuilderCustomInputDate {
  id: string;
  type: typeof FormFieldType.DATE;
  label: string;
}

export interface BuilderCustomInputTime {
  id: string;
  type: typeof FormFieldType.TIME;
  label: string;
}

export interface BuilderCustomInputDateTime {
  id: string;
  type: typeof FormFieldType.DATE_TIME;
  label: string;
}

export interface BuilderCustomInputFile {
  id: string;
  type: typeof FormFieldType.FILE;
  label: string;
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
