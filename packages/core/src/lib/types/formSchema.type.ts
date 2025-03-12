import type { FormFieldType } from '@lib/InputType';
import type { JSONContent } from '@tiptap/core';

export interface BorderRadius {
  topLeft: number;
  topRight: number;
  bottomRight: number;
  bottomLeft: number;
}

interface Border {
  width: number;
  color: string;
  radius: BorderRadius;
}

// interface Size {
//   value: number;
//   unit: 'px' | 'em' | 'rem' | '%';
// }

export interface Padding {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface Margin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface BoxShadow {
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
  inset: boolean;
}

interface Font {
  size: number;
  unit: 'px' | 'em' | 'rem';
  weight: number;
}

export interface FormSchema {
  version: string;
  form: {
    fields: FormField[];
  };
}

export interface FormFieldShortText {
  id: string;
  type: typeof FormFieldType.SHORT_TEXT;
  props: {
    label: string;
    placeholder: string;
    required: boolean;
    container: {
      margin: Margin;
      padding: Padding;
      border: Border;
    };
  };
}

export interface FormFieldLongText {
  id: string;
  type: typeof FormFieldType.LONG_TEXT;
  props: {
    label: string;
    placeholder: string;
    required: boolean;
    container: {
      margin: Margin;
      padding: Padding;
      border: Border;
    };
  };
}

export interface FormFieldNumber {
  id: string;
  type: typeof FormFieldType.NUMBER;
  props: {
    label: string;
    placeholder: string;
    required: boolean;
    min?: number;
    max?: number;
    container: {
      margin: Margin;
      padding: Padding;
      border: Border;
    };
  };
}

export interface OptionType {
  label: string;
  value: string;
}

export interface FormFieldSingleChoice {
  id: string;
  type: typeof FormFieldType.SINGLE_CHOICE;
  props: {
    label: string;
    options: OptionType[];
    required: boolean;
    isValueDifferent: boolean;
    container: {
      margin: Margin;
      padding: Padding;
      border: Border;
    };
  };
}

export interface FormFieldMultipleChoices {
  id: string;
  type: typeof FormFieldType.MULTIPLE_CHOICES;
  props: {
    label: string;
    options: OptionType[];
    required: boolean;
    isValueDifferent: boolean;
    container: {
      margin: Margin;
      padding: Padding;
      border: Border;
    };
  };
}

export interface FormFieldDate {
  id: string;
  type: typeof FormFieldType.DATE;
  props: {
    label: string;
    required: boolean;
    container: {
      margin: Margin;
      padding: Padding;
      border: Border;
    };
  };
}

export interface FormFieldTime {
  id: string;
  type: typeof FormFieldType.TIME;
  props: {
    label: string;
    required: boolean;
    container: {
      margin: Margin;
      padding: Padding;
      border: Border;
    };
  };
}

export interface FormFieldDateTime {
  id: string;
  type: typeof FormFieldType.DATE_TIME;
  props: {
    label: string;
    required: boolean;
    container: {
      margin: Margin;
      padding: Padding;
      border: Border;
    };
  };
}

export interface FormFieldFile {
  id: string;
  type: typeof FormFieldType.FILE;
  props: {
    label: string;
    required: boolean;
    accept: string;
    multiple: boolean;
    container: {
      margin: Margin;
      padding: Padding;
      border: Border;
    };
  };
}

export interface FormFieldDivider {
  id: string;
  type: typeof FormFieldType.DIVIDER;
  props: {
    color: string;
    width: number;
    height: number;
    style: 'solid' | 'dashed' | 'dotted';
  };
}

export interface FormFieldHeader {
  id: string;
  type: typeof FormFieldType.HEADER;
  props: {
    content: JSONContent;
    tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    textAlign: 'left' | 'center' | 'right';
    color: string;
    font: Font;
  };
}

export interface FormFieldParagraph {
  id: string;
  type: typeof FormFieldType.PARAGRAPH;
  props: {
    content: JSONContent;
    textAlign: 'left' | 'center' | 'right';
    color: string;
    font: Font;
  };
}

export interface FormFieldImage {
  id: string;
  type: typeof FormFieldType.IMAGE;
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
  type: typeof FormFieldType.ROW;
  props: {
    gap: number;
  };
  children: FormField[];
}

export interface FormFieldColumn {
  id: string;
  type: typeof FormFieldType.COLUMN;
  props: {
    width: number;
  };
  children: FormField[];
}

export interface FormFieldBlock {
  id: string;
  type: typeof FormFieldType.BLOCK;
  children: FormField[];
  props: {
    padding: Padding;
    margin: Margin;
    boxShadow: BoxShadow[];
    border: Border;
    bgColor: string;
    color: string;
  };
}

export interface FormFieldButton {
  id: string;
  type: typeof FormFieldType.BUTTON;
  props: {
    label: string;
    color: string;
    bgColor: string;
    btnType: 'submit' | 'button';
    fullWidth: boolean;
    font: Font;
    border: Border;
    padding: Padding;
    align: 'left' | 'center' | 'right';
  };
}

export interface FormFieldPage {
  id: string;
  type: typeof FormFieldType.PAGE;
  children: FormField[];
  props: {
    name: string;
  };
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
  | FormFieldBlock
  | FormFieldButton
  | FormFieldPage;
