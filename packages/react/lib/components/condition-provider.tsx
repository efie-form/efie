import type { JsonValue } from '@efie-form/core';
import { createContext, type ReactNode, useContext } from 'react';

interface ConditionContextValue {
  isFieldHidden: (fieldId: string) => boolean;
  isFieldVisible: (fieldId: string) => boolean;
  isFieldRequired: (fieldId: string) => boolean;
  isFieldOptional: (fieldId: string) => boolean;
  getCustomActions: () => Array<{ id: string; type: string; name: string; input?: JsonValue }>;
  processFormChange: (fieldId: string, value: JsonValue) => void;
}

const ConditionContext = createContext<ConditionContextValue | null>(null);

interface ConditionProviderProps {
  children: ReactNode;
  value: ConditionContextValue;
}

export function ConditionProvider({ children, value }: ConditionProviderProps) {
  return <ConditionContext.Provider value={value}>{children}</ConditionContext.Provider>;
}

export function useConditionContext(): ConditionContextValue {
  const context = useContext(ConditionContext);
  if (!context) {
    // Return no-op functions if no condition provider is available
    return {
      isFieldHidden: () => false,
      isFieldVisible: () => true,
      isFieldRequired: () => false,
      isFieldOptional: () => true,
      getCustomActions: () => [],
      processFormChange: () => {},
    };
  }
  return context;
}

export default ConditionProvider;
