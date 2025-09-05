import { PropertyType, type ShortTextFormField } from '@efie-form/core';
import type { ElementType } from 'react';
import { createElement } from 'react';
import type { ShortTextFieldProps } from '../../types/field-props';

interface ShortTextProviderProps {
  field: ShortTextFormField;
  Component?: ElementType<ShortTextFieldProps>;
  value?: string;
  onChange?: (value: string) => void;
}

function ShortTextProvider({
  field,
  Component,
  value = '',
  onChange = () => {},
}: ShortTextProviderProps) {
  if (!Component) return null;

  const label = field.props.find(
    (prop): prop is { type: typeof PropertyType.LABEL; value: string } =>
      prop.type === PropertyType.LABEL,
  );
  const placeholder = field.props.find(
    (prop): prop is { type: typeof PropertyType.PLACEHOLDER; value: string } =>
      prop.type === PropertyType.PLACEHOLDER,
  );

  return createElement(Component, {
    id: field.id,
    field,
    value,
    onChange,
    fieldLabel: label?.value || '',
    placeholder: placeholder?.value || '',
  } satisfies ShortTextFieldProps);
}

export default ShortTextProvider;
