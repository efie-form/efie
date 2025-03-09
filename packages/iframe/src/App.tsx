import { useEffect, useRef, useState } from 'react';
import {
  FormBuilder,
  BuilderInternal,
  FormSchema,
  useSettingsStore,
  useSchemaStore,
} from '@efie-form/core';

function App() {
  const editorRef = useRef<BuilderInternal | undefined>(undefined);
  const { setPage, clearPage, setFormInputs } = useSettingsStore();
  const { setSchema, schema, currentHistoryIndex } = useSchemaStore();
  const [initialized, setInitialized] = useState(false);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    function resetSchema(data: FormSchema) {
      setSchema(data);
      const firstPage = data.form.fields.find((field) => field.type === 'page');
      if (firstPage) {
        setPage(firstPage.id);
      }
    }

    if (!editorRef.current) {
      const editor = new BuilderInternal({
        onDataRequest: () => schema,
        onDataReset: resetSchema,
        onHeightChange: (height) => {
          setHeight(height);
        },
        onFormInputsChange: (formInputs) => {
          setFormInputs(formInputs);
        },
        onInitialized: ({ formInputs, height, schema }) => {
          setInitialized(true);
          setFormInputs(formInputs);
          setHeight(height);
          if (schema) resetSchema(schema);
        },
      });
      editorRef.current = editor;
    }

    return () => {
      editorRef.current = undefined;
    };
  }, [setSchema, setPage, clearPage, setFormInputs]);

  // Handle schema updates
  useEffect(() => {
    if (editorRef.current && schema) {
      editorRef.current.setValue(schema);
    }
  }, [currentHistoryIndex, schema]);

  return <FormBuilder height={height} />;
}

export default App;
