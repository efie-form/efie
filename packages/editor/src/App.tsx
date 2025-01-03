import FormBuilder from './layouts/FormBuilder.tsx';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import type { FormSchema } from '@efie-form/core';
import { BuilderInternal } from '@efie-form/core';
import { useEffect, useState } from 'react';
import { useSettingsStore } from './lib/state/settings.state.ts';
import defaultSchema from './lib/defaultSchema.ts';

function App() {
  const methods = useForm<FormSchema>({
    defaultValues: defaultSchema,
  });
  const { reset, control, getValues } = methods;
  const [editor, setEditor] = useState<BuilderInternal | null>(null);
  const watchAllFields = useWatch({
    control,
  });
  const { setPage } = useSettingsStore();

  useEffect(() => {
    if (editor) return;
    setEditor(new BuilderInternal());
  }, [editor]);

  useEffect(() => {
    if (!editor || editor.isLoaded) return;
    editor.init();
    editor.setOnDataReset((data) => {
      reset(data);
      resetPage(data);
    });
  }, [editor, reset]);

  useEffect(() => {
    if (!editor) return;
    editor.setValue(getValues());
  }, [watchAllFields]);

  useEffect(() => {
    const fields = getValues();
    resetPage(fields);
  }, []);

  const resetPage = (data: FormSchema) => {
    const pages = data.form.fields.filter((field) => field.type === 'page');
    if (pages.length === 0) {
      return setPage(null);
    }
    setPage(pages[0].id);
  };

  return (
    <>
      <FormProvider {...methods}>
        <FormBuilder height={editor?.height || undefined} />
      </FormProvider>
    </>
  );
}

export default App;
