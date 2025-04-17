import { createContext, useContext, ReactNode } from 'react';
import { useFormState, type FormState, type FormStateOptions } from './useFormState';

// Create context for form state
const FormStateContext = createContext<FormState | null>(null);

interface FormStateProviderProps extends FormStateOptions {
  children: ReactNode;
}

/**
 * Provider component for form state
 * 
 * Wraps a form with form state management
 */
export function FormStateProvider({
  children,
  initialValues,
  onChange,
  validate,
}: FormStateProviderProps) {
  const formState = useFormState({
    initialValues,
    onChange,
    validate,
  });

  return (
    <FormStateContext.Provider value={formState}>
      {children}
    </FormStateContext.Provider>
  );
}

/**
 * Hook to access form state from context
 * 
 * @returns Form state object
 * @throws Error if used outside of FormStateProvider
 */
export function useFormStateContext(): FormState {
  const context = useContext(FormStateContext);
  
  if (!context) {
    throw new Error('useFormStateContext must be used within a FormStateProvider');
  }
  
  return context;
}
