import type { ElementType } from 'react';
import { createElement } from 'react';
import type { ButtonFieldProps } from '../../types/field-props';
import { PropertyType, type ButtonFormField } from '@efie-form/core';

interface ButtonProviderProps {
  field: ButtonFormField;
  Component?: ElementType<ButtonFieldProps>;
}

function ButtonProvider({ field, Component }: ButtonProviderProps) {
  if (!Component) return <></>;

  const label = field.props.find(prop => prop.type === PropertyType.LABEL);

  return createElement(Component, {
    id: field.id,
    field,
    label: label?.value || '',
    buttonType: 'button',
    onClick: () => {
      // Default button click handler - should be overridden by component
    },
  } satisfies ButtonFieldProps);
}

export default ButtonProvider;
