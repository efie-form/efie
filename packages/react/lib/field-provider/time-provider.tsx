import { PropertyType, type TimeFormField } from '@efie-form/core';
import type { ElementType } from 'react';
import { createElement } from 'react';
import type { TimeFieldProps } from '../../types/field-props';

interface TimeProviderProps {
  field: TimeFormField;
  Component?: ElementType<TimeFieldProps>;
  value?: string;
  onChange?: (value: string) => void;
}

function TimeProvider({ field, Component, value = '', onChange = () => {} }: TimeProviderProps) {
  if (!Component) return <></>;

  const label = field.props.find((prop) => prop.type === PropertyType.LABEL);

  return createElement(Component, {
    id: field.id,
    field,
    value,
    onChange,
    fieldLabel: label?.value || '',
  } satisfies TimeFieldProps);
}

export default TimeProvider;
