import type { ElementType } from 'react';
import { createElement } from 'react';
import type { DateFieldProps } from '../../types/field-props';
import { PropertyType, type DateFormField } from '@efie-form/core';

interface DateProviderProps {
  field: DateFormField;
  Component?: ElementType<DateFieldProps>;
}

function DateProvider({ field, Component }: DateProviderProps) {
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

export default DateProvider;
