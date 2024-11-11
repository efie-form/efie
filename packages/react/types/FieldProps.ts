import type { ElementType, ReactNode } from 'react';

export interface ShortTextFieldProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  required: boolean;
  disabled: boolean;
  placeholder?: string;
  // visible: boolean;
  errors?: {
    message: string;
  };
}

export interface LongTextFieldProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  required: boolean;
  disabled: boolean;
  placeholder?: string;
  // visible: boolean;
  errors?: {
    message: string;
  };
}

export interface NumberFieldProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  required: boolean;
  disabled: boolean;
  placeholder?: string;
  // visible: boolean;
  min?: number;
  max?: number;
  errors?: {
    message: string;
  };
}

export interface SingleChoiceFieldProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  required: boolean;
  disabled: boolean;
  options: {
    label: string;
    value: string;
  }[];
  // visible: boolean;
  errors?: {
    message: string;
  };
}

export interface MultipleChoicesFieldProps {
  value: string[];
  onChange: (value: string[]) => void;
  label: string;
  required: boolean;
  disabled: boolean;
  options: {
    label: string;
    value: string;
  }[];
  // visible: boolean;
  errors?: {
    message: string;
  };
}

export interface DateFieldProps {
  value: Date;
  onChange: (value: Date) => void;
  label: string;
  required: boolean;
  disabled: boolean;
  // visible: boolean;
  errors?: {
    message: string;
  };
}

export interface TimeFieldProps {
  value: Date;
  onChange: (value: Date) => void;
  label: string;
  required: boolean;
  disabled: boolean;
  // visible: boolean;
  errors?: {
    message: string;
  };
}

export interface DateTimeFieldProps {
  value: Date;
  onChange: (value: Date) => void;
  label: string;
  required: boolean;
  disabled: boolean;
  // visible: boolean;
  errors?: {
    message: string;
  };
}

export interface FileFieldProps {
  value: File;
  onChange: (value: File) => void;
  label: string;
  required: boolean;
  disabled: boolean;
  accept: string;
  multiple: boolean;
  // visible: boolean;
  errors?: {
    message: string;
  };
}

export interface DividerFieldProps {
  // visible: boolean;
  color: string;
  width: number;
  style: 'solid' | 'dashed' | 'dotted';
}

export interface HeaderFieldProps {
  // visible: boolean;
  value: string;
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  textAlign: 'left' | 'center' | 'right';
  font: {
    size: number;
    unit: 'px' | 'em' | 'rem';
    weight: number;
  };
}

export interface ParagraphFieldProps {
  // visible: boolean;
  value: string;
  textAlign: 'left' | 'center' | 'right';
  font: {
    size: number;
    unit: 'px' | 'em' | 'rem';
    weight: number;
  };
}

export interface ImageFieldProps {
  // visible: boolean;
  src: string;
  alt: string;
  objectFit: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
  textAlign: 'left' | 'center' | 'right';
  width: string;
  height: string;
}

export interface RowFieldProps {
  // visible: boolean;
  children: ReactNode;
}

export interface ColumnFieldProps {
  // visible: boolean;
  children: ReactNode;
  width: string;
}

export interface BlockFieldProps {
  // visible: boolean;
  children: ReactNode;
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
}
