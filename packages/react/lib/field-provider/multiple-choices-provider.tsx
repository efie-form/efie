import type { ElementType } from 'react';
import { createElement } from 'react';
import type { MultipleChoicesFieldProps } from '../../types/field-props';
import { PropertyType, type MultipleChoiceFormField } from '@efie-form/core';

interface MultipleChoicesProviderProps {
  field: MultipleChoiceFormField;
  Component?: ElementType<MultipleChoicesFieldProps>;
  value?: string[];
  onChange?: (value: string[]) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  validation?: MultipleChoicesFieldProps['validation'];
}

function MultipleChoicesProvider({
  field,
  Component,
  value = [],
  onChange = () => {},
  onBlur,
  onFocus,
  validation,
}: MultipleChoicesProviderProps) {
  if (!Component) return <></>;

  const label = field.props.find(prop => prop.type === PropertyType.LABEL);
  const required = field.props.find(prop => prop.type === PropertyType.REQUIRED);
  const options = field.props.find(prop => prop.type === PropertyType.OPTIONS);

  return createElement(Component, {
    id: field.id,
    field,
    value,
    onChange,
    onBlur,
    onFocus,
    validation,
    style: {},
    required: required?.value || false,
    disabled: false,
    // Field-specific props
    fieldLabel: label?.value || '',
    options: options?.value
      ? options.value.map(opt => ({
          optionLabel: opt.label,
          value: opt.value,
        }))
      : [],
  } satisfies MultipleChoicesFieldProps);
}

export default MultipleChoicesProvider;
