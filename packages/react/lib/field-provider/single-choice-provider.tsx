import { PropertyType, type SingleChoiceFormField } from '@efie-form/core';
import type { ElementType } from 'react';
import { createElement } from 'react';
import type { SingleChoiceFieldProps } from '../../types/field-props';

interface SingleChoiceProviderProps {
  field: SingleChoiceFormField;
  Component?: ElementType<SingleChoiceFieldProps>;
  value?: string;
  onChange?: (value: string) => void;
}

function SingleChoiceProvider({
  field,
  Component,
  value = '',
  onChange = () => {},
}: SingleChoiceProviderProps) {
  if (!Component) return null;

  const label = field.props.find((prop) => prop.type === PropertyType.LABEL);
  const options = field.props.find((prop) => prop.type === PropertyType.OPTIONS);

  return createElement(Component, {
    id: field.id,
    field,
    value,
    onChange,
    fieldLabel: label?.value || '',
    options: options?.value
      ? options.value.map((opt) => ({
          label: opt.label,
          value: opt.value,
        }))
      : [],
  } satisfies SingleChoiceFieldProps);
}

export default SingleChoiceProvider;
