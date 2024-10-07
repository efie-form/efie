export interface FormSchema {
  version: string;
  form: {
    fields: FormField[];
  };
}

export interface FormFieldShortText {
  id: string;
  type: 'shortText';
  props: {
    label: string;
    placeholder: string;
    required: boolean;
  };
}

export interface FormFieldLongText {
  id: string;
  type: 'longText';
  props: {
    label: string;
    placeholder: string;
    required: boolean;
  };
}

export interface FormFieldNumber {
  id: string;
  type: 'number';
  props: {
    label: string;
    placeholder: string;
    required: boolean;
    min: number | null;
    max: number | null;
  };
}

export interface FormFieldSingleChoice {
  id: string;
  type: 'singleChoice';
  props: {
    label: string;
    options: string[];
    required: boolean;
  };
}

export interface FormFieldMultipleChoice {
  id: string;
  type: 'multipleChoice';
  props: {
    label: string;
    options: string[];
    required: boolean;
  };
}

export interface FormFieldDate {
  id: string;
  type: 'date';
  props: {
    label: string;
    required: boolean;
  };
}

export interface FormFieldTime {
  id: string;
  type: 'time';
  props: {
    label: string;
    required: boolean;
  };
}

export interface FormFieldDateTime {
  id: string;
  type: 'dateTime';
  props: {
    label: string;
    required: boolean;
  };
}

export interface FormFieldFile {
  id: string;
  type: 'file';
  props: {
    label: string;
    required: boolean;
  };
}

export interface FormFieldDivider {
  id: string;
  type: 'divider';
}

export interface FormFieldHeader {
  id: string;
  type: 'header';
  props: {
    value: string;
  };
}

export interface FormFieldParagraph {
  id: string;
  type: 'paragraph';
  props: {
    value: string;
  };
}

export interface FormFieldImage {
  id: string;
  type: 'image';
  props: {
    src: string;
  };
}

export interface FormFieldVideo {
  id: string;
  type: 'video';
  props: {
    src: string;
  };
}

export interface FormFieldColumns {
  id: string;
  type: 'columns';
  props: {
    columns: number;
    order: string[][];
  };
  children: FormField[];
}

export interface FormFieldBlock {
  id: string;
  type: 'block';
  children: FormField[];
}

export type FormField =
  | FormFieldShortText
  | FormFieldLongText
  | FormFieldNumber
  | FormFieldSingleChoice
  | FormFieldMultipleChoice
  | FormFieldDate
  | FormFieldTime
  | FormFieldDateTime
  | FormFieldFile
  | FormFieldDivider
  | FormFieldHeader
  | FormFieldParagraph
  | FormFieldImage
  | FormFieldVideo
  | FormFieldColumns
  | FormFieldBlock;

export type FormFieldType = FormField['type'];
