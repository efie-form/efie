import type { ElementType } from 'react';
import { createElement } from 'react';
import type { SingleChoiceFieldProps } from '../../types/field-props';
import { PropertyType, type SingleChoiceFormField } from '@efie-form/core';

interface SingleChoiceProviderProps {
  field: SingleChoiceFormField;
  Component?: ElementType<SingleChoiceFieldProps>;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  validation?: SingleChoiceFieldProps['validation'];
}

function SingleChoiceProvider({
  field,
  Component,
  value = '',
  onChange = () => {},
  onBlur,
  onFocus,
  validation,
}: SingleChoiceProviderProps) {
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
  } satisfies SingleChoiceFieldProps);
}

export default SingleChoiceProvider;
