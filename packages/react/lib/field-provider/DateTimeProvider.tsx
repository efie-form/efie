import type { ElementType } from 'react';
import { createElement } from 'react';
import type { DateTimeFieldProps } from '../../types/FieldProps';
import type { FormFieldDateTime } from '@efie-form/core';

interface DateTimeProviderProps {
  field: FormFieldDateTime;
  Component?: ElementType<DateTimeFieldProps>;
}

function DateTimeProvider({ field, Component }: DateTimeProviderProps) {
  if (!Component) return <></>;

  return createElement(Component, {
    id: field.id,
    value: new Date(),
    onChange: () => new Date(),
    label: field.props.label,
    required: field.props.required,
    disabled: false,
  });
}

export default DateTimeProvider;
