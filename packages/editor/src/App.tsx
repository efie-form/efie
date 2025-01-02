import FormBuilder from './layouts/FormBuilder.tsx';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import type { FormSchema } from '@efie-form/core';
import { Editor } from '@efie-form/core';
import { useEffect, useState } from 'react';
import { useSettingsStore } from './lib/state/settings.state.ts';
import defaultSchema from './lib/defaultSchema.ts';

function App() {
  const methods = useForm<FormSchema>({
    defaultValues: defaultSchema,
  });
  const { reset, control, getValues } = methods;
  const [editor, setEditor] = useState<Editor | null>(null);
  const watchAllFields = useWatch({
    control,
  });
  const { setPage } = useSettingsStore();

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

  useEffect(() => {
    const fields = getValues('form.fields');
    const pages = fields.filter((field) => field.type === 'page');
    if (pages.length === 0) {
      return setPage(null);
    }
    setPage(pages[0].id);
  }, []);

  return (
    <>
      <FormProvider {...methods}>
        <FormBuilder />
      </FormProvider>
    </>
  );
}

export default App;
