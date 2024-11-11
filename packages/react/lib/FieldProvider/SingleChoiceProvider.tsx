import type { ComponentType } from 'react';
import { createElement } from 'react';
import type { SingleChoiceFieldProps } from '../../types/FieldProps';
import type { FormFieldSingleChoice } from '@efie-form/core';

interface SingleChoiceProviderProps {
  field: FormFieldSingleChoice;
  Component: ComponentType<SingleChoiceFieldProps>;
}

function SingleChoiceProvider({ field, Component }: SingleChoiceProviderProps) {
  return createElement(Component, {
    errors: {
      message: '',
    },
    value: '',
    onChange: () => ``,
    label: field.props.label,
    required: field.props.required,
    disabled: false,
    options: field.props.options,
  });
}

export default SingleChoiceProvider;
