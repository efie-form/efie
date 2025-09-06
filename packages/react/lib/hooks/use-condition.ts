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
  const isUpdatingRef = useRef(false);
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

  // Create field states with default values using the Condition class
  const createFieldStates = useCallback((): FieldState => {
    if (!conditionRef.current) {
      // Fallback for when condition is not yet initialized
      const fieldStates: FieldState = {};
      for (const field of schema.form.fields) {
        fieldStates[field.id] = {
          touched: false,
          dirty: false,
          valid: true,
          visible: true,
          enabled: true,
          required: false,
          ...initialFieldStates[field.id],
        };
      }
      return fieldStates;
    }

    return conditionRef.current.createDefaultFieldStates(initialFieldStates);
  }, [schema, initialFieldStates]);

  // Convert ActionResult to ConditionState - Merge with initial field states
  const updateConditionState = useCallback(
    (actionResult: ActionResult, fieldStates?: FieldState) => {
      if (isUpdatingRef.current) return; // Prevent cascading updates

      isUpdatingRef.current = true;

      // Start with current rule-based results
      const hidden = new Set(actionResult.hidden);
      const visible = new Set(actionResult.visible);
      const required = new Set(actionResult.required);
      const optional = new Set(actionResult.optional);

      // If we have field states, merge the initial states for fields not affected by rules
      if (fieldStates) {
        for (const [fieldId, state] of Object.entries(fieldStates)) {
          // Only set initial state if this field is not already affected by rules
          if (!hidden.has(fieldId) && !visible.has(fieldId)) {
            if (!state.visible) {
              hidden.add(fieldId);
            } else {
              visible.add(fieldId);
            }
          }

          if (!required.has(fieldId) && !optional.has(fieldId)) {
            if (state.required) {
              required.add(fieldId);
            } else {
              optional.add(fieldId);
            }
          }
        }
      }

      setConditionState({
        hidden,
        visible,
        required,
        optional,
        customActions: [...actionResult.custom],
      });

      // Reset the flag in the next tick
      setTimeout(() => {
        isUpdatingRef.current = false;
      }, 0);
    },
    [],
  );

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
      updateConditionState(actionResult, fieldStates);
    },
    [createFieldStates, env, updateConditionState],
  );

  // Initial evaluation on mount and schema change
  useEffect(() => {
    if (!conditionRef.current) return;

    const fieldStates = createFieldStates();
    const formValues = watch();
    lastFormValuesRef.current = formValues;

    // Evaluate rules and merge with initial field states
    const actionResult = conditionRef.current.evaluateAll(formValues, fieldStates, env);
    updateConditionState(actionResult, fieldStates);
  }, [createFieldStates, env, updateConditionState]); // Removed initializeConditionState since we don't need it anymore

  // Watch for form changes without causing infinite re-renders
  useEffect(() => {
    const subscription = watch((value) => {
      if (!conditionRef.current || isUpdatingRef.current) return;

      // Only update if values actually changed
      if (JSON.stringify(value) === JSON.stringify(lastFormValuesRef.current)) {
        return;
      }

      lastFormValuesRef.current = value;
      const fieldStates = createFieldStates();
      const actionResult = conditionRef.current.evaluateAll(value, fieldStates, env);
      updateConditionState(actionResult, fieldStates);
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
