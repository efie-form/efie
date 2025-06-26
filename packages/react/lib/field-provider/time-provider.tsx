import type { ElementType } from 'react';
import { createElement } from 'react';
import type { TimeFieldProps } from '../../types/field-props';
import { PropertyType, type TimeFormField } from '@efie-form/core';

interface TimeProviderProps {
  field: TimeFormField;
  Component?: ElementType<TimeFieldProps>;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  validation?: TimeFieldProps['validation'];
}

function TimeProvider({
  field,
  Component,
  value = '',
  onChange = () => {},
  onBlur,
  onFocus,
  validation,
}: TimeProviderProps) {
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
  } satisfies TimeFieldProps);
}

export default TimeProvider;
