import { PropertyType, type ShortTextFormField } from '@efie-form/core';
import type { ElementType } from 'react';
import { createElement } from 'react';
import type { ShortTextFieldProps } from '../../types/field-props';
import { useFieldCondition } from '../hooks/use-field-condition';

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
  const { isVisible, isRequired, isHidden, createChangeHandler } = useFieldCondition(field.id);

  if (!Component) return null;

  // Check if field should be visible
  if (!isVisible) {
    return null;
  }

  const label = field.props.find(
    (prop): prop is { type: typeof PropertyType.LABEL; value: string } =>
      prop.type === PropertyType.LABEL,
  );
  const placeholder = field.props.find(
    (prop): prop is { type: typeof PropertyType.PLACEHOLDER; value: string } =>
      prop.type === PropertyType.PLACEHOLDER,
  );

  // Enhanced onChange handler that processes conditions
  const handleChange = createChangeHandler(onChange);

  return createElement(Component, {
    id: field.id,
    field,
    value,
    onChange: handleChange,
    fieldLabel: label?.value || '',
    placeholder: placeholder?.value || '',
    required: isRequired,
    hidden: isHidden,
  } satisfies ShortTextFieldProps);
}

export default ShortTextProvider;
