import type { FormField } from '@efie-form/core';
import type { CSSProperties, ElementType, ReactNode } from 'react';

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
  hyperlink?: {
    href: string;
    target?: '_self' | '_blank' | '_parent' | '_top';
  };
  onClick?: () => void;
}

export type DividerFieldProps = BaseFieldProps;

export interface RenderNodeProps {
  children?: ReactNode;
}

export interface RenderTextProps {
  text: string;
  style?: CSSProperties;
}

export interface RenderLinkProps {
  href: string;
  target?: string;
  rel?: string;
  children: ReactNode;
}

export interface RenderParagraphProps {
  style?: CSSProperties;
  children: ReactNode;
}

export interface RenderDocProps {
  children: ReactNode;
}

export interface RenderHeadingProps {
  level: number;
  style?: CSSProperties;
  children: ReactNode;
}

export interface RenderMarkProps {
  children: ReactNode;
}

export interface RenderContentOptions {
  text: (props: RenderTextProps) => ReactNode;
  link: (props: RenderLinkProps) => ReactNode;
  paragraph: (props: RenderParagraphProps) => ReactNode;
  heading: (props: RenderHeadingProps) => ReactNode;
  doc: (props: RenderDocProps) => ReactNode;
  // marks
  superscript: (props: RenderMarkProps) => ReactNode;
  subscript: (props: RenderMarkProps) => ReactNode;
  bold: (props: RenderMarkProps) => ReactNode;
  italic: (props: RenderMarkProps) => ReactNode;
  underline: (props: RenderMarkProps) => ReactNode;
  strike: (props: RenderMarkProps) => ReactNode;
  bulletList: (props: RenderNodeProps) => ReactNode;
  orderedList: (props: RenderNodeProps) => ReactNode;
  listItem: (props: RenderNodeProps) => ReactNode;
}

export interface HeadingFieldProps extends BaseFieldProps {
  render: (options?: Partial<RenderContentOptions>) => ReactNode;
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
