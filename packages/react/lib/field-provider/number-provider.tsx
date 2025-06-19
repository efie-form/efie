import type { ElementType } from 'react';
import { createElement } from 'react';
import type { NumberFieldProps } from '../../types/field-props';
import { PropertyType, type NumberFormField } from '@efie-form/core';

interface NumberProviderProps {
  field: NumberFormField;
  Component?: ElementType<NumberFieldProps>;
}

function NumberProvider({ field, Component }: NumberProviderProps) {
  if (!Component) return <></>;

  const label = field.props.find(prop => prop.type === PropertyType.LABEL);
  const placeholder = field.props.find(prop => prop.type === PropertyType.PLACEHOLDER);
  const required = field.props.find(prop => prop.type === PropertyType.REQUIRED);
  const min = field.props.find(prop => prop.type === PropertyType.MIN);
  const max = field.props.find(prop => prop.type === PropertyType.MAX);

  return createElement(Component, {
    id: field.id,
    name: field.form.key || field.id,
    errors: {
      message: '',
    },
    fieldLabel: label?.value || '',
    required: required?.value || false,
    disabled: false,
    placeholder: placeholder?.value || '',
    min: min?.value,
    max: max?.value,
  });
}

export default NumberProvider;
