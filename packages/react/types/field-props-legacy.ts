import type { ElementType, ReactNode, CSSProperties } from 'react';
import type { FormField } from '@efie-form/core';

interface ValidationError {
  code: string;
  message: string;
}

interface ValidationState {
  isValid: boolean;
  errors: ValidationError[];
  isRequired: boolean;
  isDisabled: boolean;
}

interface ProcessedStyles {
  container?: CSSProperties;
  label?: CSSProperties;
  input?: CSSProperties;
  error?: CSSProperties;
  [key: string]: CSSProperties | undefined;
}

interface LayoutContext {
  isInRow: boolean;
  isInColumn: boolean;
  containerWidth: number;
}

interface ThemeConfig {
  spacing: 'tight' | 'normal' | 'loose';
  colorScheme: 'light' | 'dark';
}

interface BaseFieldProps<T = unknown> {
  // Field identification
  id: string;
  field: FormField;

  // Form state management
  value: T;
  onChange: (value: T) => void;
  onBlur?: () => void;
  onFocus?: () => void;

  // Validation
  validation?: ValidationState;

  // Processed styles (all margin, padding, colors converted to CSS)
  style: ProcessedStyles;

  // Layout context
  layout?: LayoutContext;

  // Theme context
  theme?: ThemeConfig;

  // Common field properties
  required?: boolean;
  disabled?: boolean;
}

export interface ShortTextFieldProps extends BaseFieldProps<string> {
  // Field-specific props (automatically extracted from schema)
  fieldLabel?: string;
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
}

export interface LongTextFieldProps extends BaseFieldProps<string> {
  // Field-specific props
  fieldLabel?: string;
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  rows?: number;
}

export interface NumberFieldProps extends BaseFieldProps<number | string> {
  // Field-specific props
  fieldLabel?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
}

export interface SingleChoiceFieldProps extends BaseFieldProps<string> {
  // Field-specific props
  fieldLabel?: string;
  options: {
    optionLabel: string;
    value: string;
  }[];
}

export interface MultipleChoicesFieldProps extends BaseFieldProps<string[]> {
  // Field-specific props
  fieldLabel?: string;
  options: {
    optionLabel: string;
    value: string;
  }[];
}

export interface DateFieldProps extends BaseFieldProps<Date | string> {
  // Field-specific props
  fieldLabel?: string;
  minDate?: Date | string;
  maxDate?: Date | string;
  dateFormat?: string;
}

export interface TimeFieldProps extends BaseFieldProps<string> {
  // Field-specific props
  fieldLabel?: string;
  minTime?: string;
  maxTime?: string;
  timeFormat?: '12h' | '24h';
}

export interface DateTimeFieldProps extends BaseFieldProps<Date | string> {
  // Field-specific props
  fieldLabel?: string;
  minDateTime?: Date | string;
  maxDateTime?: Date | string;
  dateTimeFormat?: string;
}

export interface FileFieldProps extends BaseFieldProps<File[] | File | null> {
  // Field-specific props
  fieldLabel?: string;
  accept?: string[];
  multiple?: boolean;
  maxFiles?: number;
  maxFileSize?: number; // in bytes
}

// Static field interfaces (no form state management needed)
interface BaseStaticFieldProps {
  // Field identification
  id: string;
  fieldId: string;
  field: FormField;

  // Processed styles
  style: ProcessedStyles;

  // Layout context
  layout?: LayoutContext;

  // Theme context
  theme?: ThemeConfig;
}

export interface DividerFieldProps extends BaseStaticFieldProps {
  // Field-specific props (processed from schema)
  dividerColor?: string;
  dividerWidth?: number;
  dividerStyle?: 'solid' | 'dashed' | 'dotted';
}

export interface HeadingFieldProps extends BaseStaticFieldProps {
  // Field-specific props (processed from schema)
  content: string; // Rich text content processed from schema
  headingTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  textAlign?: 'left' | 'center' | 'right';
  font?: {
    size: number;
    unit: 'px' | 'em' | 'rem';
    weight: number;
  };
}

export interface ImageFieldProps extends BaseStaticFieldProps {
  // Field-specific props (processed from schema)
  src: string;
  alt: string;
}

// Layout field interfaces (handle children rendering)
interface BaseLayoutFieldProps {
  // Field identification
  id: string;
  field: FormField;

  // Children components (automatically rendered by library)
  children: ReactNode;

  // Processed styles
  style: ProcessedStyles;

  // Layout context
  layout?: LayoutContext;

  // Theme context
  theme?: ThemeConfig;
}

export interface RowFieldProps extends BaseLayoutFieldProps {
  // Field-specific props (processed from schema)
  gap?: string | number;
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
}

export interface ColumnFieldProps extends BaseLayoutFieldProps {
  // Field-specific props (processed from schema)
  columnWidth?: string;
  gap?: string | number;
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
}

export interface BlockFieldProps extends BaseLayoutFieldProps {
  // Field-specific props (processed from schema, but also available in style.container)
  blockBorderRadius?: string;
  blockBoxShadow?: string;
  blockBackgroundColor?: string;
  blockColor?: string;
  blockPadding?: string;
  blockMargin?: string;
}

export interface PageFieldProps extends BaseLayoutFieldProps {
  // Field-specific props
  pageName?: string;
}

// Action field interfaces
export interface ButtonFieldProps extends BaseStaticFieldProps {
  // Field-specific props
  content: string; // Button text/content processed from schema
  buttonType?: 'button' | 'submit' | 'reset';
  onClick?: () => void; // Library provides appropriate handler

  // Action configuration (from schema)
  action?: {
    type: 'submit' | 'reset' | 'custom';
    target?: string;
    customHandler?: string;
  };
}

// Component registry types for better type safety
export interface ComponentRegistryOptions {
  // Global theme configuration
  theme?: ThemeConfig;

  // Global style overrides
  globalStyles?: Partial<ProcessedStyles>;

  // Custom validation message formatters
  validationMessageFormatter?: (error: ValidationError) => string;

  // Event handlers
  onFieldChange?: (fieldId: string, value: unknown) => void;
  onValidationChange?: (fieldId: string, validation: ValidationState) => void;
}

// Field props map for component registry
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
  heading: ElementType<HeadingFieldProps>;
  image: ElementType<ImageFieldProps>;
  row: ElementType<RowFieldProps>;
  column: ElementType<ColumnFieldProps>;
  block: ElementType<BlockFieldProps>;
  page: ElementType<PageFieldProps>;
  button: ElementType<ButtonFieldProps>;
}

// Utility types for better developer experience
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
                                : T extends 'button'
                                  ? ButtonFieldProps
                                  : never;

// Component registry creator type
export type ComponentRegistry = {
  [K in FieldType]: ElementType<FieldProps<K>>;
};

// Form submission data type
export type FormData = Record<string, unknown>;

// Form event handlers
export interface FormEventHandlers {
  onSubmit?: (data: FormData) => void | Promise<void>;
  onFieldChange?: (fieldId: string, value: unknown) => void;
  onValidationChange?: (fieldId: string, validation: ValidationState) => void;
  onFormStateChange?: (formData: FormData) => void;
}

/*
Short text

*/
