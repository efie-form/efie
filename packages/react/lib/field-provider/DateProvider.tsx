import type { ElementType } from 'react';
import { createElement } from 'react';
import type { DateFieldProps } from '../../types/FieldProps';
import type { FormFieldDate } from '@efie-form/core';

interface DateProviderProps {
  field: FormFieldDate;
  Component?: ElementType<DateFieldProps>;
}

function DateProvider({ field, Component }: DateProviderProps) {
  if (!Component) return null;

  return createElement(Component, {
    id: field.id,
    value: new Date(),
    onChange: () => new Date(),
    label: field.props.label,
    required: field.props.required,
    disabled: false,
  });
}

export default DateProvider;
