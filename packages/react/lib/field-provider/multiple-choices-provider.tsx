import type { ElementType } from 'react';
import { createElement } from 'react';
import { PropertyType, type MultipleChoiceFormField } from '@efie-form/core';
import type { MultipleChoicesFieldProps } from '../../types/field-props';

interface MultipleChoicesProviderProps {
  field: MultipleChoiceFormField;
  Component?: ElementType<MultipleChoicesFieldProps>;
  value?: string[];
  onChange?: (value: string[]) => void;
}

function MultipleChoicesProvider({
  field,
  Component,
  value = [],
  onChange = () => {},
}: MultipleChoicesProviderProps) {
  if (!Component) return <></>;

  const label = field.props.find(prop => prop.type === PropertyType.LABEL);
  const options = field.props.find(prop => prop.type === PropertyType.OPTIONS);

  return createElement(Component, {
    id: field.id,
    field,
    value,
    onChange,
    fieldLabel: label?.value || '',
    options: options?.value
      ? options.value.map(opt => ({
          label: opt.label,
          value: opt.value,
        }))
      : [],
  } satisfies MultipleChoicesFieldProps);
}

export default MultipleChoicesProvider;
