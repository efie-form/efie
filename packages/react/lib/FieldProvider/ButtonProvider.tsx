import type { ElementType } from 'react';
import { createElement } from 'react';
import type { ButtonFieldProps } from '../../types/FieldProps';
import type { FormFieldButton } from '@efie-form/core';

interface ButtonProviderProps {
  field: FormFieldButton;
  Component?: ElementType<ButtonFieldProps>;
}

function ButtonProvider({ field, Component }: ButtonProviderProps) {
  if (!Component) return null;

  return createElement(Component, {
    id: field.id,
    label: field.props.label,
  });
}

export default ButtonProvider;
