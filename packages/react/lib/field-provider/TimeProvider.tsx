import type { ElementType } from 'react';
import { createElement } from 'react';
import type { TimeFieldProps } from '../../types/FieldProps';
import type { FormFieldTime } from '@efie-form/core';

interface TimeProviderProps {
  field: FormFieldTime;
  Component?: ElementType<TimeFieldProps>;
}

function TimeProvider({ field, Component }: TimeProviderProps) {
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

export default TimeProvider;
