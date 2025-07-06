import type { FormField } from '@efie-form/core';
import type { ElementType, ReactNode } from 'react';

interface FormFieldProps<T = unknown> {
  value: T;
  onChange: (value: T) => void;
}

interface BaseFieldProps {
  id: string;
  field: FormField;

}

export interface ShortTextFieldProps extends BaseFieldProps, FormFieldProps<string> {
  placeholder?: string;
  fieldLabel?: string;
}

export interface LongTextFieldProps extends BaseFieldProps, FormFieldProps<string> {
  placeholder?: string;
  fieldLabel?: string;
}

export interface NumberFieldProps extends BaseFieldProps, FormFieldProps<number | string> {
  placeholder?: string;
  fieldLabel?: string;
}

export interface SingleChoiceFieldProps extends BaseFieldProps, FormFieldProps<string> {
  fieldLabel?: string;
  options: Array<{ label: string; value: string }>;
}

export interface MultipleChoicesFieldProps extends BaseFieldProps, FormFieldProps<string[]> {
  fieldLabel?: string;
  options: Array<{ label: string; value: string }>;
}

export interface DateFieldProps extends BaseFieldProps, FormFieldProps<Date | string> {
  fieldLabel?: string;
}

export interface TimeFieldProps extends BaseFieldProps, FormFieldProps<string> {
  fieldLabel?: string;
}

export interface DateTimeFieldProps extends BaseFieldProps, FormFieldProps<Date | string> {
  fieldLabel?: string;
}

export interface FileFieldProps extends BaseFieldProps, FormFieldProps<File | File[] | undefined> {
  fieldLabel?: string;
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
}

export interface ButtonFieldProps extends BaseFieldProps {
  label: string;
  buttonType?: 'submit' | 'button';
  onClick?: () => void;
}

export type DividerFieldProps = BaseFieldProps;

export interface HeadingFieldProps extends BaseFieldProps {
  content: string;
}

export interface ImageFieldProps extends BaseFieldProps {
  src: string;
  alt?: string;
}

export interface BlockFieldProps extends BaseFieldProps {
  children: ReactNode;
}

export interface RowFieldProps extends BaseFieldProps {
  children: ReactNode;
}

export interface ColumnFieldProps extends BaseFieldProps {
  children: ReactNode;
  width: string;
}

export interface PageFieldProps extends BaseFieldProps {
  children: ReactNode;
}

export type FieldPropsMap = {
  shortText: ElementType<ShortTextFieldProps>;
  longText: ElementType<LongTextFieldProps>;
  number: ElementType<NumberFieldProps>;
  singleChoice: ElementType<SingleChoiceFieldProps>;
  multipleChoices: ElementType<MultipleChoicesFieldProps>;
  date: ElementType<DateFieldProps>;
  time: ElementType<TimeFieldProps>;
  dateTime: ElementType<DateTimeFieldProps>;
  file: ElementType<FileFieldProps>;
  button: ElementType<ButtonFieldProps>;
  divider: ElementType<DividerFieldProps>;
  heading: ElementType<HeadingFieldProps>;
  image: ElementType<ImageFieldProps>;
  row: ElementType<RowFieldProps>;
  column: ElementType<ColumnFieldProps>;
  block: ElementType<BlockFieldProps>;
  page: ElementType<PageFieldProps>;
};

export type FieldType = keyof FieldPropsMap;

export type FieldProps<T extends FieldType> = T extends 'shortText'
  ? ShortTextFieldProps
  : T extends 'longText'
    ? LongTextFieldProps
    : T extends 'number'
      ? NumberFieldProps
      : T extends 'singleChoice'
        ? SingleChoiceFieldProps
        : T extends 'multipleChoices'
          ? MultipleChoicesFieldProps
          : T extends 'date'
            ? DateFieldProps
            : T extends 'time'
              ? TimeFieldProps
              : T extends 'dateTime'
                ? DateTimeFieldProps
                : T extends 'file'
                  ? FileFieldProps
                  : T extends 'button'
                    ? ButtonFieldProps
                    : T extends 'divider'
                      ? DividerFieldProps
                      : T extends 'heading'
                        ? HeadingFieldProps
                        : T extends 'image'
                          ? ImageFieldProps
                          : T extends 'row'
                            ? RowFieldProps
                            : T extends 'column'
                              ? ColumnFieldProps
                              : T extends 'block'
                                ? BlockFieldProps
                                : T extends 'page'
                                  ? PageFieldProps
                                  : never;

export type ComponentRegistry = {
  [K in FieldType]: React.ComponentType<FieldProps<K>>;
};
