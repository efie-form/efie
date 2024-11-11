import type { ElementType } from 'react';
import { createElement } from 'react';
import type { LongTextFieldProps } from '../../types/FieldProps';
import type { FormFieldLongText } from '@efie-form/core';

interface LongTextProviderProps {
  field: FormFieldLongText;
  Component?: ElementType<LongTextFieldProps>;
}

function LongTextProvider({ field, Component }: LongTextProviderProps) {
  if (!Component) return null;

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

export default LongTextProvider;
