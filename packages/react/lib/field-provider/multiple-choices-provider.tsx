import type { ElementType } from 'react';
import { createElement } from 'react';
import type { MultipleChoicesFieldProps } from '../../types/field-props';
import { PropertyType, type MultipleChoiceFormField } from '@efie-form/core';

interface MultipleChoicesProviderProps {
  field: MultipleChoiceFormField;
  Component?: ElementType<MultipleChoicesFieldProps>;
}

function MultipleChoicesProvider({
  field,
  Component,
}: MultipleChoicesProviderProps) {
  if (!Component) return <></>;

  const label = field.props.find(prop => prop.type === PropertyType.LABEL);
  const required = field.props.find(prop => prop.type === PropertyType.REQUIRED);
  const options = field.props.find(prop => prop.type === PropertyType.OPTIONS);

  return createElement(Component, {
    id: field.id,
    name: field.form.key || field.id,
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

export default MultipleChoicesProvider;
