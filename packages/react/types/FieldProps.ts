import type { ElementType, ReactNode } from 'react';

interface Error {
  message: string;
}

export interface ShortTextFieldProps {
  id: string;
  fieldLabel: string;
  required: boolean;
  disabled: boolean;
  placeholder?: string;
  // visible: boolean;
  errors?: Error;
}

export interface LongTextFieldProps {
  id: string;
  fieldLabel: string;
  required: boolean;
  disabled: boolean;
  placeholder?: string;
  // visible: boolean;
  errors?: Error;
}

export interface NumberFieldProps {
  id: string;
  fieldLabel: string;
  required: boolean;
  disabled: boolean;
  placeholder?: string;
  // visible: boolean;
  min?: number;
  max?: number;
  errors?: Error;
}

export interface SingleChoiceFieldProps {
  id: string;
  fieldLabel: string;
  required: boolean;
  disabled: boolean;
  options: {
    optionLabel: string;
    value: string;
  }[];
  // visible: boolean;
  errors?: Error;
}

export interface MultipleChoicesFieldProps {
  id: string;
  fieldLabel: string;
  required: boolean;
  disabled: boolean;
  options: {
    optionLabel: string;
    value: string;
  }[];
  // visible: boolean;
  errors?: Error;
}

export interface DateFieldProps {
  id: string;
  fieldLabel: string;
  required: boolean;
  disabled: boolean;
  // visible: boolean;
  errors?: Error;
}

export interface TimeFieldProps {
  id: string;
  fieldLabel: string;
  required: boolean;
  disabled: boolean;
  // visible: boolean;
  errors?: Error;
}

export interface DateTimeFieldProps {
  id: string;
  fieldLabel: string;
  required: boolean;
  disabled: boolean;
  // visible: boolean;
  errors?: Error;
}

export interface FileFieldProps {
  id: string;
  fieldLabel: string;
  required: boolean;
  disabled: boolean;
  accept: string;
  multiple: boolean;
  // visible: boolean;
  errors?: Error;
}

export interface DividerFieldProps {
  id: string;
  // visible: boolean;
  dividerColor: string;
  dividerWidth: number;
  dividerStyle: 'solid' | 'dashed' | 'dotted';
}

export interface HeaderFieldProps {
  id: string;
  // visible: boolean;
  text: string;
  headingTag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  textAlign: 'left' | 'center' | 'right';
  font: {
    size: number;
    unit: 'px' | 'em' | 'rem';
    weight: number;
  };
}

export interface ParagraphFieldProps {
  id: string;
  // visible: boolean;
  text: string;
  textAlign: 'left' | 'center' | 'right';
  font: {
    size: number;
    unit: 'px' | 'em' | 'rem';
    weight: number;
  };
}

export interface ImageFieldProps {
  id: string;
  // visible: boolean;
  src: string;
  alt: string;
  objectFit: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
  textAlign: 'left' | 'center' | 'right';
  imageWidth: string;
  imageHeight: string;
}

export interface RowFieldProps {
  id: string;
  // visible: boolean;
  children: ReactNode;
}

export interface ColumnFieldProps {
  id: string;
  // visible: boolean;
  children: ReactNode;
  columnWidth: string;
}

export interface BlockFieldProps {
  id: string;
  // visible: boolean;
  children: ReactNode;
  blockBorderRadius?: string;
  blockBoxShadow?: string;
  blockBackgroundColor?: string;
  blockColor?: string;
  blockPadding?: string;
  blockMargin?: string;
}

export interface PageFieldProps {
  id: string;
  // visible: boolean;
  children: ReactNode;
}

export interface ButtonFieldProps {
  id: string;
  // visible: boolean;
  buttonLabel: string;
}

export interface FieldPropsMap {
  shortText: ElementType<ShortTextFieldProps>;
  longText: ElementType<LongTextFieldProps>;
  number: ElementType<NumberFieldProps>;
  singleChoice: ElementType<SingleChoiceFieldProps>;
  multipleChoices: ElementType<MultipleChoicesFieldProps>;
  date: ElementType<DateFieldProps>;
  time: ElementType<TimeFieldProps>;
  dateTime: ElementType<DateTimeFieldProps>;
  file: ElementType<FileFieldProps>;
  divider: ElementType<DividerFieldProps>;
  header: ElementType<HeaderFieldProps>;
  paragraph: ElementType<ParagraphFieldProps>;
  image: ElementType<ImageFieldProps>;
  row: ElementType<RowFieldProps>;
  column: ElementType<ColumnFieldProps>;
  block: ElementType<BlockFieldProps>;
  page: ElementType<PageFieldProps>;
  button: ElementType<ButtonFieldProps>;
}
