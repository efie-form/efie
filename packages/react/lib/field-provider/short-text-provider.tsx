import { PropertyType, type ShortTextFormField } from '@efie-form/core';
import type { ElementType } from 'react';
import { createElement } from 'react';
import type { ShortTextFieldProps } from '../../types/field-props';
import type { UseRuleEngineResult } from '../hooks/use-rule-engine';

interface ShortTextProviderProps {
  field: ShortTextFormField;
  Component?: ElementType<ShortTextFieldProps>;
  value?: string;
  onChange?: (value: string) => void;
  ruleEngine?: UseRuleEngineResult;
}

function ShortTextProvider({
  field,
  Component,
  value = '',
  onChange = () => {},
  ruleEngine,
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
  const requiredProp = field.props.find(
    (prop): prop is { type: typeof PropertyType.REQUIRED; value: boolean } =>
      prop.type === PropertyType.REQUIRED,
  );

  // Use rule engine to determine field state if available
  const isRequired = ruleEngine?.getFieldRequired(field.id) ?? requiredProp?.value ?? false;
  const isVisible = ruleEngine?.getFieldVisible(field.id) ?? true;

  return createElement(Component, {
    id: field.id,
    field,
    value,
    onChange,
    fieldLabel: label?.value || '',
    placeholder: placeholder?.value || '',
    required: isRequired,
    hidden: !isVisible,
  } satisfies ShortTextFieldProps);
}

export default ShortTextProvider;
