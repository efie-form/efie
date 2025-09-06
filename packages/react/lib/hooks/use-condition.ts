import type { FormSchema, JsonValue } from '@efie-form/core';
import { type ActionResult, Condition, type FieldState } from '@efie-form/core';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface UseConditionProps {
  schema: FormSchema;
  initialFieldStates?: Partial<FieldState>;
  env?: Record<string, JsonValue>;
}

interface ConditionState {
  hidden: Set<string>;
  visible: Set<string>;
  required: Set<string>;
  optional: Set<string>;
  customActions: Array<{ id: string; type: string; name: string; input?: JsonValue }>;
}

export function useCondition({ schema, initialFieldStates = {}, env }: UseConditionProps) {
  const { watch } = useFormContext();

  const conditionRef = useRef<Condition>();
  const lastFormValuesRef = useRef<Record<string, JsonValue>>({});
  const [conditionState, setConditionState] = useState<ConditionState>({
    hidden: new Set(),
    visible: new Set(),
    required: new Set(),
    optional: new Set(),
    customActions: [],
  });

  // Initialize condition engine
  useEffect(() => {
    conditionRef.current = new Condition({ schema });
  }, [schema]);

  // Update schema when it changes
  useEffect(() => {
    if (conditionRef.current) {
      conditionRef.current.updateSchema(schema);
    }
  }, [schema]);

  // Create field states with default values - memoized properly
  const createFieldStates = useCallback((): FieldState => {
    const fieldStates: FieldState = {};

    for (const field of schema.form.fields) {
      fieldStates[field.id] = {
        touched: false,
        dirty: false,
        valid: true, // Would need validation integration
        visible: true,
        enabled: true,
        required: false,
        ...initialFieldStates[field.id],
      };
    }

    return fieldStates;
  }, [schema, initialFieldStates]); // Use schema instead of schema.form.fields

  // Convert ActionResult to ConditionState - Reset state instead of accumulating
  const updateConditionState = useCallback((actionResult: ActionResult) => {
    setConditionState({
      hidden: new Set(actionResult.hidden),
      visible: new Set(actionResult.visible),
      required: new Set(actionResult.required),
      optional: new Set(actionResult.optional),
      customActions: [...actionResult.custom],
    });
  }, []);

  // Process form changes
  const processFormChange = useCallback(
    (fieldId: string, value: JsonValue) => {
      if (!conditionRef.current) return;

      const fieldStates = createFieldStates();
      const formValues = lastFormValuesRef.current;
      const actionResult = conditionRef.current.onChange(
        fieldId,
        value,
        formValues,
        fieldStates,
        env,
      );
      updateConditionState(actionResult);
    },
    [createFieldStates, env, updateConditionState],
  );

  // Initial evaluation on mount only
  useEffect(() => {
    if (!conditionRef.current) return;

    const fieldStates = createFieldStates();
    const formValues = watch();
    lastFormValuesRef.current = formValues;

    const actionResult = conditionRef.current.evaluateAll(formValues, fieldStates, env);
    updateConditionState(actionResult);
  }, [watch, createFieldStates, env, updateConditionState]);

  // Watch for form changes without causing infinite re-renders
  useEffect(() => {
    const subscription = watch((value) => {
      if (!conditionRef.current) return;

      // Only update if values actually changed
      if (JSON.stringify(value) === JSON.stringify(lastFormValuesRef.current)) {
        return;
      }

      lastFormValuesRef.current = value;
      const fieldStates = createFieldStates();
      const actionResult = conditionRef.current.evaluateAll(value, fieldStates, env);
      updateConditionState(actionResult);
    });

    return () => subscription.unsubscribe();
  }, [watch, createFieldStates, env, updateConditionState]);

  // Helper functions for field providers
  const isFieldHidden = useCallback(
    (fieldId: string): boolean => {
      return conditionState.hidden.has(fieldId) && !conditionState.visible.has(fieldId);
    },
    [conditionState.hidden, conditionState.visible],
  );

  const isFieldVisible = useCallback(
    (fieldId: string): boolean => {
      return !isFieldHidden(fieldId);
    },
    [isFieldHidden],
  );

  const isFieldRequired = useCallback(
    (fieldId: string): boolean => {
      return conditionState.required.has(fieldId) && !conditionState.optional.has(fieldId);
    },
    [conditionState.required, conditionState.optional],
  );

  const isFieldOptional = useCallback(
    (fieldId: string): boolean => {
      return conditionState.optional.has(fieldId) || !isFieldRequired(fieldId);
    },
    [conditionState.optional, isFieldRequired],
  );

  const getCustomActions = useCallback(() => {
    return conditionState.customActions;
  }, [conditionState.customActions]);

  return {
    // State queries
    isFieldHidden,
    isFieldVisible,
    isFieldRequired,
    isFieldOptional,
    getCustomActions,

    // Manual trigger (can be used for special cases)
    processFormChange,

    // Raw state (for debugging or advanced use cases)
    conditionState,
  };
}

export default useCondition;
