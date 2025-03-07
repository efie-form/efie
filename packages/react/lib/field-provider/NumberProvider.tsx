import type { ElementType } from 'react';
import React, { createElement } from 'react';
import type { NumberFieldProps } from '../../types/FieldProps';
import type { FormFieldNumber } from '../../../core-old';

interface NumberProviderProps {
  field: FormFieldNumber;
  Component?: ElementType<NumberFieldProps>;
}

function NumberProvider({ field, Component }: NumberProviderProps) {
  if (!Component) return <></>;

  return createElement(Component, {
    id: field.id,
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
