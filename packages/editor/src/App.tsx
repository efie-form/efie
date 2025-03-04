import FormBuilder from './layouts/FormBuilder.tsx';
import type { FormSchema } from '@efie-form/core';
import { BuilderInternal } from '@efie-form/core';
import { useEffect, useRef, useState } from 'react';
import { useSettingsStore } from './lib/state/settings.state.ts';
import { useSchemaStore } from './lib/state/schema.state.ts';

function App() {
  const editorRef = useRef<BuilderInternal | undefined>(undefined);
  const { setPage, clearPage } = useSettingsStore();
  const { setSchema, schema, currentHistoryIndex } = useSchemaStore();
  const [height, setHeight] = useState(0);

  useEffect(() => {
    function resetPage(data: FormSchema) {
      const pages = data.form.fields.filter((field) => field.type === 'page');
      if (pages.length === 0) {
        return clearPage();
      }
      setPage(pages[0].id);
    }

    if (!editorRef.current) {
      const editor = new BuilderInternal({
        onDataRequest: () => schema,
        onDataReset: (data) => {
          setSchema(data);
          resetPage(data);
        },
        onHeightChange: (height) => {
          setHeight(height);
        },
      });
      editorRef.current = editor;
    }

    return () => {
      editorRef.current = undefined;
    };
  }, [schema, setSchema, setPage, clearPage]);

  useEffect(() => {
    if (!editorRef.current) return;
    editorRef.current.loaded();
  }, []);

  // Handle schema updates
  useEffect(() => {
    if (editorRef.current && schema) {
      editorRef.current.setValue(schema);
    }
  }, [currentHistoryIndex, schema]);

  return <FormBuilder height={height} />;
}

export default App;
