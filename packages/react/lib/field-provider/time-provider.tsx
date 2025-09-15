import { PropertyType, type TimeFormField } from '@efie-form/core';
import type { ElementType } from 'react';
import { createElement } from 'react';
import type { TimeFieldProps } from '../../types/field-props';
import { useFieldCondition } from '../hooks/use-field-condition';

interface TimeProviderProps {
  field: TimeFormField;
  Component?: ElementType<TimeFieldProps>;
  value?: string;
  onChange?: (value: string) => void;
}

function TimeProvider({ field, Component, value = '', onChange = () => {} }: TimeProviderProps) {
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

  // Enhanced onChange handler that processes conditions
  const handleChange = createChangeHandler(onChange);

  return createElement(Component, {
    id: field.sys.id,
    field,
    value,
    onChange: handleChange,
    fieldLabel: label?.value || '',
    required: isRequired,
    hidden: isHidden,
  } satisfies TimeFieldProps);
}

export default TimeProvider;
