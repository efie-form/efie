import type { ElementType } from 'react';
import { createElement } from 'react';
import type { DateTimeFieldProps } from '../../types/field-props';
import { PropertyType, type DateTimeFormField } from '@efie-form/core';

interface DateTimeProviderProps {
  field: DateTimeFormField;
  Component?: ElementType<DateTimeFieldProps>;
  value?: Date | string;
  onChange?: (value: Date | string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  validation?: DateTimeFieldProps['validation'];
}

function DateTimeProvider({
  field,
  Component,
  value = '',
  onChange = () => {},
  onBlur,
  onFocus,
  validation,
}: DateTimeProviderProps) {
  if (!Component) return <></>;

  const label = field.props.find(prop => prop.type === PropertyType.LABEL);
  const required = field.props.find(prop => prop.type === PropertyType.REQUIRED);

  return createElement(Component, {
    id: field.id,
    field,
    value,
    onChange,
    onBlur,
    onFocus,
    validation,
    style: {},
    required: required?.value || false,
    disabled: false,
    // Field-specific props
    fieldLabel: label?.value || '',
  } satisfies DateTimeFieldProps);
}

export default DateTimeProvider;
