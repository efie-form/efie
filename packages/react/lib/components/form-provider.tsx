import type { ReactElement, ReactNode } from 'react';
import { createElement } from 'react';
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
    // React 19+ allows using Context directly as a provider
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return createElement(FormContext as any, contextValue, children);
  }

  // React 18 requires using .Provider
  return createElement(FormContext.Provider, { value: contextValue }, children);
}
