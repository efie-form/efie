import type { ElementType } from 'react';
import { createElement } from 'react';
import type { DateFieldProps } from '../../types/field-props';
import { PropertyType, type DateFormField } from '@efie-form/core';

interface DateProviderProps {
  field: DateFormField;
  Component?: ElementType<DateFieldProps>;
  value?: Date | string;
  onChange?: (value: Date | string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  validation?: DateFieldProps['validation'];
}

function DateProvider({
  field,
  Component,
  value = '',
  onChange = () => {},
  onBlur,
  onFocus,
  validation,
}: DateProviderProps) {
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
  } satisfies DateFieldProps);
}

export default DateProvider;
