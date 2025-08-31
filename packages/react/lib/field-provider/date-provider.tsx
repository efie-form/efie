import { type DateFormField, PropertyType } from '@efie-form/core';
import type { ElementType } from 'react';
import { createElement } from 'react';
import type { DateFieldProps } from '../../types/field-props';

interface DateProviderProps {
  field: DateFormField;
  Component?: ElementType<DateFieldProps>;
  value?: Date | string;
  onChange?: (value: Date | string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
}

function DateProvider({ field, Component, value = '', onChange = () => {} }: DateProviderProps) {
  if (!Component) return null;

  const label = field.props.find((prop) => prop.type === PropertyType.LABEL);

  return createElement(Component, {
    id: field.id,
    field,
    value,
    onChange,
    fieldLabel: label?.value || '',
  } satisfies DateFieldProps);
}

export default DateProvider;
