import type { ElementType } from 'react';
import React, { createElement } from 'react';
import type { ButtonFieldProps } from '../../types/FieldProps';
import type { FormFieldButton } from '../../../core-old';

interface ButtonProviderProps {
  field: FormFieldButton;
  Component?: ElementType<ButtonFieldProps>;
}

function ButtonProvider({ field, Component }: ButtonProviderProps) {
  if (!Component) return <></>;

  return createElement(Component, {
    id: field.id,
    label: field.props.label,
  });
}

export default ButtonProvider;
