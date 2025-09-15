import { PropertyType, type SingleChoiceFormField } from '@efie-form/core';
import type { ElementType } from 'react';
import { createElement } from 'react';
import type { SingleChoiceFieldProps } from '../../types/field-props';
import { useFieldCondition } from '../hooks/use-field-condition';

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
  const options = field.props.find(
    (
      prop,
    ): prop is {
      type: typeof PropertyType.OPTIONS;
      value: Array<{ label: string; value: string }>;
    } => prop.type === PropertyType.OPTIONS,
  );

  // Enhanced onChange handler that processes conditions
  const handleChange = createChangeHandler(onChange);

  return createElement(Component, {
    id: field.sys.id,
    field,
    value,
    onChange: handleChange,
    fieldLabel: label?.value || '',
    options: options?.value
      ? options.value.map((opt) => ({
          label: opt.label,
          value: opt.value,
        }))
      : [],
    required: isRequired,
    hidden: isHidden,
  } satisfies SingleChoiceFieldProps);
}

export default SingleChoiceProvider;
