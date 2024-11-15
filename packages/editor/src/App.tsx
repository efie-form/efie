import FormBuilder from './components/FormBuilder.tsx';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import type { FormSchema } from '@efie-form/core';
import { Editor } from '@efie-form/core';
import { useEffect, useState } from 'react';

function App() {
  const methods = useForm<FormSchema>({
    defaultValues: {
      version: 'v1',
      form: {
        fields: [],
      },
    },
  });
  const { reset, control, getValues } = methods;
  const [editor, setEditor] = useState<Editor | null>(null);
  const watchAllFields = useWatch({
    control,
  });

  useEffect(() => {
    if (editor) return;
    setEditor(new Editor());
  }, [editor]);

  useEffect(() => {
    if (!editor || editor.isLoaded) return;
    editor.init();
    editor.setOnDataReset(reset);
  }, [editor, reset]);

  useEffect(() => {
    if (!editor) return;
    editor.setValue(getValues());
    console.log(getValues());
  }, [watchAllFields, editor, getValues]);

  return (
    <>
      <FormProvider {...methods}>
        <FormBuilder />
      </FormProvider>
    </>
  );
}

export default App;
