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
}

function DateTimeProvider({
  field,
  Component,
  value = '',
  onChange = () => {},
}: DateTimeProviderProps) {
  if (!Component) return <></>;

  const label = field.props.find(prop => prop.type === PropertyType.LABEL);

  return createElement(Component, {
    id: field.id,
    field,
    value,
    onChange,
    fieldLabel: label?.value || '',
  } satisfies DateTimeFieldProps);
}

export default DateTimeProvider;
