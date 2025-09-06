import type { JsonValue } from '@efie-form/core';
import { useCallback } from 'react';
import { useConditionContext } from '../components/condition-provider';

export function useFieldCondition(fieldId: string) {
  const { isFieldVisible, isFieldRequired, processFormChange } = useConditionContext();

  // Enhanced onChange handler that processes conditions
  const createChangeHandler = useCallback(
    <T extends JsonValue>(originalOnChange?: (value: T) => void) => {
      return (value: T) => {
        originalOnChange?.(value);
        processFormChange(fieldId, value);
      };
    },
    [fieldId, processFormChange],
  );

  return {
    isVisible: isFieldVisible(fieldId),
    isRequired: isFieldRequired(fieldId),
    isHidden: !isFieldVisible(fieldId),
    createChangeHandler,
  };
}

export default useFieldCondition;
