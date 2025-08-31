import type { FormSchema, JsonValue } from '@efie-form/core';
import type { ReactNode } from 'react';
import { createContext, useContext, useMemo } from 'react';
import { type UseRuleEngineResult, useRuleEngine } from '../hooks/use-rule-engine';

interface FormRuleContextValue {
  ruleEngine: UseRuleEngineResult | null;
}

const FormRuleContext = createContext<FormRuleContextValue>({
  ruleEngine: null,
});

export interface FormRuleProviderProps {
  children: ReactNode;
  schema: FormSchema;
  fieldValues: Record<string, JsonValue>;
  fieldStates?: Record<string, { touched?: boolean; dirty?: boolean; valid?: boolean }>;
  environmentVariables?: Record<string, JsonValue>;
  debounceMs?: number;
}

/**
 * Provider that manages rule engine state for a form
 */
export function FormRuleProvider({
  children,
  schema,
  fieldValues,
  fieldStates = {},
  environmentVariables = {},
  debounceMs = 100,
}: FormRuleProviderProps) {
  const ruleEngine = useRuleEngine({
    schema,
    fieldValues,
    fieldStates,
    environmentVariables,
    debounceMs,
  });

  const contextValue = useMemo(
    () => ({
      ruleEngine,
    }),
    [ruleEngine],
  );

  return <FormRuleContext.Provider value={contextValue}>{children}</FormRuleContext.Provider>;
}

/**
 * Hook to access the rule engine from any component within FormRuleProvider
 */
export function useFormRuleContext(): UseRuleEngineResult | null {
  const context = useContext(FormRuleContext);
  return context.ruleEngine;
}

/**
 * Hook to get field-specific rule state
 */
export function useFieldRuleState(fieldId: string) {
  const ruleEngine = useFormRuleContext();

  if (!ruleEngine) {
    return {
      required: false,
      visible: true,
      hidden: false,
    };
  }

  const required = ruleEngine.getFieldRequired(fieldId);
  const visible = ruleEngine.getFieldVisible(fieldId);

  return {
    required,
    visible,
    hidden: !visible,
  };
}
