import { type LongTextFormField, PropertyType } from '@efie-form/core';
import type { ElementType } from 'react';
import { createElement } from 'react';
import type { LongTextFieldProps } from '../../types/field-props';
import { useFieldCondition } from '../hooks/use-field-condition';

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
  const { isVisible, isRequired, isHidden, createChangeHandler } = useFieldCondition(field.sys.id);

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
    id: field.sys.id,
    field,
    value,
    onChange: handleChange,
    fieldLabel: label?.value || '',
    placeholder: placeholder?.value || '',
    required: isRequired,
    hidden: isHidden,
  } satisfies LongTextFieldProps);
}

export default LongTextProvider;
