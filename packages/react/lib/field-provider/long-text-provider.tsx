import type { ElementType } from 'react';
import { createElement } from 'react';
import type { LongTextFieldProps } from '../../types/field-props';
import { PropertyType, type LongTextFormField } from '@efie-form/core';

interface LongTextProviderProps {
  field: LongTextFormField;
  Component?: ElementType<LongTextFieldProps>;
  value?: string;
  onChange?: (value: string) => void;
}

function LongTextProvider({
  field,
  Component,
  value = '',
  onChange = () => {},
}: LongTextProviderProps) {
  if (!Component) return <></>;

  const label = field.props.find(prop => prop.type === PropertyType.LABEL);
  const placeholder = field.props.find(prop => prop.type === PropertyType.PLACEHOLDER);

  return createElement(Component, {
    id: field.id,
    field,
    value,
    onChange,
    fieldLabel: label?.value || '',
    placeholder: placeholder?.value || '',
  } satisfies LongTextFieldProps);
}

export default LongTextProvider;
