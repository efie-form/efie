import type { ElementType } from 'react';
import { createElement } from 'react';
import type { NumberFieldProps } from '../../types/field-props';
import { PropertyType, type NumberFormField } from '@efie-form/core';

interface NumberProviderProps {
  field: NumberFormField;
  Component?: ElementType<NumberFieldProps>;
  value?: number | string;
  onChange?: (value: number | string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  validation?: NumberFieldProps['validation'];
}

function NumberProvider({
  field,
  Component,
  value = '',
  onChange = () => {},
  onBlur,
  onFocus,
  validation,
}: NumberProviderProps) {
  if (!Component) return <></>;

  const label = field.props.find(prop => prop.type === PropertyType.LABEL);
  const placeholder = field.props.find(prop => prop.type === PropertyType.PLACEHOLDER);
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
    placeholder: placeholder?.value || '',
  } satisfies NumberFieldProps);
}

export default NumberProvider;
