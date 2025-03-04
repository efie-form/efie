import type { ElementType } from 'react';
import React, { createElement } from 'react';
import type { SingleChoiceFieldProps } from '../../types/FieldProps';
import type { FormFieldSingleChoice } from '@efie-form/core';

interface SingleChoiceProviderProps {
  field: FormFieldSingleChoice;
  Component?: ElementType<SingleChoiceFieldProps>;
}

function SingleChoiceProvider({ field, Component }: SingleChoiceProviderProps) {
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
    options: field.props.options,
  });
}

export default SingleChoiceProvider;
