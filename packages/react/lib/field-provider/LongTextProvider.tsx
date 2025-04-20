import type { ElementType } from 'react';
import { createElement } from 'react';
import type { LongTextFieldProps } from '../../types/FieldProps';
import { PropertyType, type LongTextFormField } from '@efie-form/core';

interface LongTextProviderProps {
  field: LongTextFormField;
  Component?: ElementType<LongTextFieldProps>;
}

function LongTextProvider({ field, Component }: LongTextProviderProps) {
  if (!Component) return <></>;

  const label = field.props.find(prop => prop.type === PropertyType.LABEL);
  const placeholder = field.props.find(prop => prop.type === PropertyType.PLACEHOLDER);
  const required = field.props.find(prop => prop.type === PropertyType.REQUIRED);

  return createElement(Component, {
    id: field.id,
    name: field.form.key || '',
    errors: {
      message: '',
    },
    fieldLabel: label?.value || '',
    required: required?.value || false,
    disabled: false,
    placeholder: placeholder?.value || '',
  });
}

export default LongTextProvider;
