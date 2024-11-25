import FormBuilder from './components/FormBuilder.tsx';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import type { FormSchema } from '@efie-form/core';
import { Editor } from '@efie-form/core';
import { useEffect, useState } from 'react';
import { generateId } from './lib/utils.ts';

const defaultValues: FormSchema = {
  version: 'v1',
  form: {
    fields: [
      {
        id: generateId(10),
        type: 'page',
        children: [
          {
            id: generateId(10),
            type: 'block',
            children: [],
            props: {
              padding: {
                bottom: 8,
                left: 8,
                right: 8,
                top: 8,
              },
              border: {
                radius: {
                  bottomLeft: 0,
                  bottomRight: 0,
                  topLeft: 0,
                  topRight: 0,
                },
              },
            },
          },
        ],
        props: {
          name: 'Page 1',
        },
      },
    ],
  },
};

function App() {
  const methods = useForm<FormSchema>({
    defaultValues,
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
