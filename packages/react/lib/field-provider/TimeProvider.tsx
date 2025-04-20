import type { ElementType } from 'react';
import { createElement } from 'react';
import type { TimeFieldProps } from '../../types/FieldProps';
import { PropertyType, type TimeFormField } from '@efie-form/core';

interface TimeProviderProps {
  field: TimeFormField;
  Component?: ElementType<TimeFieldProps>;
}

function TimeProvider({ field, Component }: TimeProviderProps) {
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

export default TimeProvider;
