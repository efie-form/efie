import type { ElementType } from 'react';
import { createElement } from 'react';
import { PropertyType, type ShortTextFormField } from '@efie-form/core';
import type { ShortTextFieldProps } from '../../types/field-props';

interface ShortTextProviderProps {
  field: ShortTextFormField;
  Component?: ElementType<ShortTextFieldProps>;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  validation?: ShortTextFieldProps['validation'];
}

function ShortTextProvider({
  field,
  Component,
  value = '',
  onChange = () => {},
  onBlur,
  onFocus,
  validation,
}: ShortTextProviderProps) {
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
  } satisfies ShortTextFieldProps);
}

export default ShortTextProvider;
