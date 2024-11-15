import type { ElementType } from 'react';
import { createElement } from 'react';
import type { FormFieldShortText } from '@efie-form/core';
import type { ShortTextFieldProps } from '../../types/FieldProps';

interface ShortTextProviderProps {
  field: FormFieldShortText;
  Component?: ElementType<ShortTextFieldProps>;
}

function ShortTextProvider({ field, Component }: ShortTextProviderProps) {
  if (!Component) return null;

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

export default ShortTextProvider;
