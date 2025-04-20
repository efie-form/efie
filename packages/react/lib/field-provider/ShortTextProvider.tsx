import type { ElementType } from 'react';
import { createElement } from 'react';
import { PropertyType, type ShortTextFormField } from '@efie-form/core';
import type { ShortTextFieldProps } from '../../types/FieldProps';

interface ShortTextProviderProps {
  field: ShortTextFormField;
  Component?: ElementType<ShortTextFieldProps>;
}

function ShortTextProvider({ field, Component }: ShortTextProviderProps) {
  if (!Component) return <></>;

  const label = field.props.find(prop => prop.type === PropertyType.LABEL);
  const placeholder = field.props.find(prop => prop.type === PropertyType.PLACEHOLDER);
  const required = field.props.find(prop => prop.type === PropertyType.REQUIRED);

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
  });
}

export default ShortTextProvider;
