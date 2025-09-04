import type { ReactElement, ReactNode } from 'react';
import { FormContext, type FormContextProps } from '../form-context';
import { isReact19OrHigher } from '../utils/react-version';

interface FormProviderProps extends FormContextProps {
  children: ReactNode;
}

/**
 * Context provider that works with both React 18 and React 19+
 * In React 19+, Context can be used directly without .Provider
 * In React 18, we need to use Context.Provider
 */
export function FormProvider({ children, ...contextValue }: FormProviderProps): ReactElement {
  if (isReact19OrHigher()) {
    // @ts-expect-error - React 19+ allows using Context directly
    return <FormContext value={contextValue}>{children}</FormContext>;
  }

  // React 18 requires using .Provider
  return <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>;
}
