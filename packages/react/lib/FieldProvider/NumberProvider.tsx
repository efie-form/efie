import type { ComponentType } from 'react';
import { createElement } from 'react';
import type { NumberFieldProps } from '../../types/FieldProps';
import type { FormFieldNumber } from '@efie-form/core';

interface NumberProviderProps {
  field: FormFieldNumber;
  Component: ComponentType<NumberFieldProps>;
}

function NumberProvider({ field, Component }: NumberProviderProps) {
  return createElement(Component, {
    errors: {
      message: '',
    },
    value: '',
    onChange: () => ``,
    label: field.props.label,
    required: field.props.required,
    disabled: false,
    placeholder: field.props.placeholder,
  });
}

export default NumberProvider;
