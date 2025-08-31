import type { FormSchema, JsonValue } from '@efie-form/core';
import {
  type FieldState,
  RuleEngine,
  type RuleEngineResult,
  type RuleEvaluationContext,
} from '@efie-form/core';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export interface UseRuleEngineOptions {
  schema: FormSchema;
  fieldValues: Record<string, JsonValue>;
  fieldStates?: Partial<Record<string, Partial<FieldState>>>;
  environmentVariables?: Record<string, JsonValue>;
  debounceMs?: number;
}

export interface UseRuleEngineResult {
  fieldUpdates: RuleEngineResult['fieldUpdates'];
  customActions: RuleEngineResult['customActions'];
  isEvaluating: boolean;
  getFieldRequired: (fieldId: string) => boolean;
  getFieldVisible: (fieldId: string) => boolean;
}

/**
 * React hook for efficient rule evaluation and field state management.
 * Automatically debounces rule evaluation and tracks field state changes.
 */
export function useRuleEngine({
  schema,
  fieldValues,
  fieldStates = {},
  environmentVariables = {},
  debounceMs = 100,
}: UseRuleEngineOptions): UseRuleEngineResult {
  const ruleEngine = useRef<RuleEngine>(new RuleEngine());
  const [lastResult, setLastResult] = useState<RuleEngineResult>({
    fieldUpdates: [],
    customActions: [],
  });
  const [isEvaluating, setIsEvaluating] = useState(false);
  const debounceTimerRef = useRef<NodeJS.Timeout>();

  // Track computed field states
  const computedFieldStates = useMemo(() => {
    const states: Record<string, FieldState> = {};

    for (const [fieldId, value] of Object.entries(fieldValues)) {
      const customState = fieldStates[fieldId] || {};
      states[fieldId] = {
        value,
        touched: customState.touched ?? false,
        dirty: customState.dirty ?? false,
        valid: customState.valid ?? true,
        visible: customState.visible ?? true,
        enabled: customState.enabled ?? true,
        required: customState.required ?? false,
        ...customState,
      };
    }

    return states;
  }, [fieldValues, fieldStates]);

  // Update schema when it changes
  useEffect(() => {
    ruleEngine.current.updateSchema(schema);
  }, [schema]);

  // Create evaluation context
  const evaluationContext = useMemo((): RuleEvaluationContext => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    return {
      fields: computedFieldStates,
      env: environmentVariables,
      now,
      today,
    };
  }, [computedFieldStates, environmentVariables]);

  // Debounced rule evaluation
  const evaluateRules = useCallback(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    setIsEvaluating(true);

    debounceTimerRef.current = setTimeout(() => {
      try {
        const result = ruleEngine.current.evaluateRules(evaluationContext);
        setLastResult(result);
      } catch (error) {
        console.error('Rule evaluation error:', error);
        setLastResult({ fieldUpdates: [], customActions: [] });
      } finally {
        setIsEvaluating(false);
      }
    }, debounceMs);
  }, [evaluationContext, debounceMs]);

  // Trigger evaluation when context changes
  useEffect(() => {
    evaluateRules();

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [evaluateRules]);

  // Helper functions to get current field states
  const getFieldRequired = useCallback(
    (fieldId: string): boolean => {
      // Check if any rule update sets this field as required
      const ruleUpdate = lastResult.fieldUpdates.find(
        (update) => update.fieldId === fieldId && update.required !== undefined,
      );

      if (ruleUpdate && ruleUpdate.required !== undefined) {
        return ruleUpdate.required;
      }

      // Fall back to current state
      return computedFieldStates[fieldId]?.required ?? false;
    },
    [lastResult.fieldUpdates, computedFieldStates],
  );

  const getFieldVisible = useCallback(
    (fieldId: string): boolean => {
      // Check if any rule update sets this field's visibility
      const ruleUpdate = lastResult.fieldUpdates.find(
        (update) => update.fieldId === fieldId && update.visible !== undefined,
      );

      if (ruleUpdate && ruleUpdate.visible !== undefined) {
        return ruleUpdate.visible;
      }

      // Fall back to current state
      return computedFieldStates[fieldId]?.visible ?? true;
    },
    [lastResult.fieldUpdates, computedFieldStates],
  );

  return {
    fieldUpdates: lastResult.fieldUpdates,
    customActions: lastResult.customActions,
    isEvaluating,
    getFieldRequired,
    getFieldVisible,
  };
}

/**
 * Simplified hook for when you only need required/visibility status
 */
export function useFieldRuleState(
  fieldId: string,
  ruleEngine: UseRuleEngineResult,
): {
  required: boolean;
  visible: boolean;
  hidden: boolean;
} {
  const required = ruleEngine.getFieldRequired(fieldId);
  const visible = ruleEngine.getFieldVisible(fieldId);

  return {
    required,
    visible,
    hidden: !visible,
  };
}
