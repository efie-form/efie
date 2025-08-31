import { type NumberFormField, PropertyType } from '@efie-form/core';
import type { ElementType } from 'react';
import { createElement } from 'react';
import type { NumberFieldProps } from '../../types/field-props';

interface NumberProviderProps {
  field: NumberFormField;
  Component?: ElementType<NumberFieldProps>;
  value?: number | string;
  onChange?: (value: number | string) => void;
}

function NumberProvider({
  field,
  Component,
  value = '',
  onChange = () => {},
}: NumberProviderProps) {
  if (!Component) return null;

  const label = field.props.find((prop) => prop.type === PropertyType.LABEL);
  const placeholder = field.props.find((prop) => prop.type === PropertyType.PLACEHOLDER);

  return createElement(Component, {
    id: field.id,
    field,
    value,
    onChange,
    fieldLabel: label?.value || '',
    placeholder: placeholder?.value || '',
  } satisfies NumberFieldProps);
}

export default NumberProvider;
