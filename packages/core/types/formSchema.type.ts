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

export interface OptionType {
  label: string;
  value: string;
}

export interface FormFieldSingleChoice {
  id: string;
  type: 'singleChoice';
  props: {
    label: string;
    options: OptionType[];
    required: boolean;
    isValueDifferent: boolean;
  };
}

export interface FormFieldMultipleChoices {
  id: string;
  type: 'multipleChoices';
  props: {
    label: string;
    options: OptionType[];
    required: boolean;
    isValueDifferent: boolean;
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
    accept: string;
    multiple: boolean;
  };
}

export interface FormFieldDivider {
  id: string;
  type: 'divider';
  props: {
    color: string;
    width: number;
    style: 'solid' | 'dashed' | 'dotted';
  };
}

export interface FormFieldHeader {
  id: string;
  type: 'header';
  props: {
    text: string;
    tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    textAlign: 'left' | 'center' | 'right';
    color: string;
    font: {
      size: number;
      unit: 'px' | 'em' | 'rem';
      weight: number;
    };
  };
}

export interface FormFieldParagraph {
  id: string;
  type: 'paragraph';
  props: {
    text: string;
    textAlign: 'left' | 'center' | 'right';
    color: string;
    font: {
      size: number;
      unit: 'px' | 'em' | 'rem';
      weight: number;
    };
  };
}

export interface FormFieldImage {
  id: string;
  type: 'image';
  props: {
    src: string;
    alt: string;
    textAlign: 'left' | 'center' | 'right';
    objectFit: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
    width: {
      value: number;
      autoWidth: boolean;
    };
  };
}

export interface FormFieldRow {
  id: string;
  type: 'row';
  children: FormFieldColumn[];
}

export interface FormFieldColumn {
  id: string;
  type: 'column';
  props: {
    width: number;
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
  | FormFieldMultipleChoices
  | FormFieldDate
  | FormFieldTime
  | FormFieldDateTime
  | FormFieldFile
  | FormFieldDivider
  | FormFieldHeader
  | FormFieldParagraph
  | FormFieldImage
  | FormFieldRow
  | FormFieldColumn
  | FormFieldBlock;

export type FormFieldType = FormField['type'];
