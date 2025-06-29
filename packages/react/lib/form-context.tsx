import { createContext, useContext } from 'react';

export interface FormContextProps {
  page: string;
  setPage: (page: FormContextProps['page']) => void;
}

export const FormContext = createContext<FormContextProps>({
  page: '',
  setPage: () => {},
});

export function useFormContext(): FormContextProps {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
}
