import type { ElementType } from 'react';
import React, { createElement } from 'react';
import type { MultipleChoicesFieldProps } from '../../types/FieldProps';
import type { FormFieldMultipleChoices } from '../../../core-old';

interface MultipleChoicesProviderProps {
  field: FormFieldMultipleChoices;
  Component?: ElementType<MultipleChoicesFieldProps>;
}

function MultipleChoicesProvider({
  field,
  Component,
}: MultipleChoicesProviderProps) {
  if (!Component) return <></>;

  return createElement(Component, {
    id: field.id,
    errors: {
      message: '',
    },
    value: [],
    onChange: () => [],
    label: field.props.label,
    required: field.props.required,
    disabled: false,
    options: field.props.options,
  });
}

export default MultipleChoicesProvider;
