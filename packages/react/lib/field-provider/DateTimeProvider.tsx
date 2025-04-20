import type { ElementType } from 'react';
import { createElement } from 'react';
import type { DateTimeFieldProps } from '../../types/FieldProps';
import { PropertyType, type DateTimeFormField } from '@efie-form/core';

interface DateTimeProviderProps {
  field: DateTimeFormField;
  Component?: ElementType<DateTimeFieldProps>;
}

function DateTimeProvider({ field, Component }: DateTimeProviderProps) {
  if (!Component) return <></>;

  const label = field.props.find(prop => prop.type === PropertyType.LABEL);
  const required = field.props.find(prop => prop.type === PropertyType.REQUIRED);

  return createElement(Component, {
    id: field.id,
    name: field.form.key || field.id,
    fieldLabel: label?.value || '',
    required: required?.value || false,
    disabled: false,
  });
}

export default DateTimeProvider;
