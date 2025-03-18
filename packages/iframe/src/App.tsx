import { useEffect, useRef } from 'react';
import {
  FormBuilder,
  useFormBuilder,
  useWatchSchema,
} from '@efie-form/builder';
import { Builder } from '@efie-form/core';

function App() {
  const editorRef = useRef<Builder | undefined>(undefined);
  const { getSchema, setFormInputs, resetSchema, setHeight } = useFormBuilder();

  useWatchSchema((schema) => {
    if (!editorRef.current) return;

    editorRef.current.setValue(schema);
  });

  useEffect(() => {
    if (!editorRef.current) {
      initializeFormBuilder();
    }

    return () => {
      editorRef.current = undefined;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function initializeFormBuilder() {
    const editor = new Builder({
      onDataRequest: getSchema,
      onDataReset: resetSchema,
      onHeightChange: (height) => {
        setHeight(height);
      },
      onFormInputsChange: (formInputs) => {
        setFormInputs(formInputs);
      },
      onInitialized: ({ formInputs, height, schema }) => {
        setFormInputs(formInputs);
        setHeight(height);
        if (schema) resetSchema(schema);
      },
    });
    editorRef.current = editor;
  }

  return <FormBuilder />;
}

export default App;
