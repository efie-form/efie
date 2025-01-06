import FormBuilder from './layouts/FormBuilder.tsx';
import type { FormSchema } from '@efie-form/core';
import { BuilderInternal } from '@efie-form/core';
import { useEffect, useState } from 'react';
import { useSettingsStore } from './lib/state/settings.state.ts';
import { useSchemaStore } from './lib/state/schema.state.ts';

function App() {
  const [editor, setEditor] = useState<BuilderInternal | null>(null);
  const { setPage } = useSettingsStore();
  const { setSchema, schema } = useSchemaStore();

  useEffect(() => {
    if (editor) return;
    setEditor(new BuilderInternal());
  }, [editor]);

  useEffect(() => {
    if (!editor || editor.isLoaded) return;
    editor.init();
    editor.setOnDataReset((data) => {
      setSchema(data);
      resetPage(data);
    });
  }, [editor]);

  useEffect(() => {
    if (!editor || !schema) return;
    editor.setValue(schema);
    console.log(schema);
  }, [schema]);

  useEffect(() => {
    if (!schema) return;
    resetPage(schema);
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
      <FormBuilder height={editor?.height || undefined} />
    </>
  );
}

export default App;
