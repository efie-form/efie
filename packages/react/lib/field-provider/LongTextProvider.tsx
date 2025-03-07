import type { ElementType } from 'react';
import React, { createElement } from 'react';
import type { LongTextFieldProps } from '../../types/FieldProps';
import type { FormFieldLongText } from '../../../core-old';

interface LongTextProviderProps {
  field: FormFieldLongText;
  Component?: ElementType<LongTextFieldProps>;
}

function LongTextProvider({ field, Component }: LongTextProviderProps) {
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

export default LongTextProvider;
