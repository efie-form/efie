import { FormBuilder, useFormBuilder, useWatchSchema } from '@efie-form/builder';
import { Builder } from '@efie-form/core';
import { useEffect, useRef } from 'react';

function App() {
  const editorRef = useRef<Builder | undefined>(undefined);
  const {
    getSchema,
    setFormInputs,
    resetSchema,
    setHeight,
    setFormKeyEditable,
    setIsInputReusable,
    setMaxHistories,
  } = useFormBuilder();

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
  }, [initializeFormBuilder]);

  function initializeFormBuilder() {
    editorRef.current = new Builder({
      onDataRequest: getSchema,
      onDataReset: resetSchema,
      onHeightChange: (height) => {
        setHeight(height);
      },
      onFormInputsChange: (formInputs) => {
        setFormInputs(formInputs);
      },
      onInitialized: ({
        formInputs,
        height,
        schema,
        formKeyNonEditable,
        inputNonReusable,
        maxHistories,
      }) => {
        setFormInputs(formInputs);
        setHeight(height);
        if (schema) resetSchema(schema);
        if (formKeyNonEditable) setFormKeyEditable(false);
        if (inputNonReusable) setIsInputReusable(false);
        if (maxHistories) setMaxHistories(maxHistories);
      },
    });
  }

  return <FormBuilder />;
}

export default App;
