import type { ElementType } from 'react';
import { createElement } from 'react';
import type { SingleChoiceFieldProps } from '../../types/FieldProps';
import { PropertyType, type SingleChoiceFormField } from '@efie-form/core';

interface SingleChoiceProviderProps {
  field: SingleChoiceFormField;
  Component?: ElementType<SingleChoiceFieldProps>;
}

function SingleChoiceProvider({ field, Component }: SingleChoiceProviderProps) {
  if (!Component) return <></>;

  const label = field.props.find(prop => prop.type === PropertyType.LABEL);
  const required = field.props.find(prop => prop.type === PropertyType.REQUIRED);
  const options = field.props.find(prop => prop.type === PropertyType.OPTIONS);

  return createElement(Component, {
    id: field.id,
    errors: {
      message: '',
    },
    fieldLabel: label?.value || '',
    required: required?.value || false,
    disabled: false,
    options: options?.value
      ? options.value.map(opt => ({
          optionLabel: opt.label,
          value: opt.value,
        }))
      : [],
  });
}

export default SingleChoiceProvider;
