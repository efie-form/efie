import FormBuilder from './components/FormBuilder.tsx';
import { FormProvider, useForm } from 'react-hook-form';
import type { FormSchema } from './types/formSchema.ts';

function App() {
  const methods = useForm<FormSchema>({
    defaultValues: {
      version: 'v1',
      form: {
        fields: [],
      },
    },
  });

  return (
    <FormProvider {...methods}>
      <FormBuilder />
    </FormProvider>
  );
}

export default App;
