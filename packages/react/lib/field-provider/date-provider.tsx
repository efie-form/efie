import { type DateFormField, PropertyType } from '@efie-form/core';
import type { ElementType } from 'react';
import { createElement } from 'react';
import type { DateFieldProps } from '../../types/field-props';
import { useConditionContext } from '../components/condition-provider';
import { useFieldCondition } from '../hooks/use-field-condition';

interface DateProviderProps {
  field: DateFormField;
  Component?: ElementType<DateFieldProps>;
  value?: Date | string;
  onChange?: (value: Date | string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
}

function DateProvider({ field, Component, value = '', onChange = () => {} }: DateProviderProps) {
  const { isVisible, isRequired, isHidden } = useFieldCondition(field.id);
  const { processFormChange } = useConditionContext();

  if (!Component) return null;

  // Check if field should be visible
  if (!isVisible) {
    return null;
  }

  const label = field.props.find(
    (prop): prop is { type: typeof PropertyType.LABEL; value: string } =>
      prop.type === PropertyType.LABEL,
  );

  const conditionAwareOnChange = (value: Date | string) => {
    onChange(value);
    // Process conditions with serializable value
    const serializableValue = value instanceof Date ? value.toISOString() : value;
    processFormChange(field.id, serializableValue);
  };

  return createElement(Component, {
    id: field.id,
    field,
    value,
    onChange: conditionAwareOnChange,
    fieldLabel: label?.value || '',
    required: isRequired,
    hidden: isHidden,
  } satisfies DateFieldProps);
}

export default DateProvider;
