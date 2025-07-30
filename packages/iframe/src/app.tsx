import { FormBuilder, useFormBuilder, useWatchSchema } from '@efie-form/builder';
import type { Client } from '@efie-form/core';
import { useEffect, useRef } from 'react';

function App() {
  const editorRef = useRef<Client | undefined>(undefined);
  const {
    getSchema,
    resetSchema,
    setFieldNameEditable,
    setFormInputs,
    setHeight,
    setIsInputReusable,
    setMaxHistories,
  } = useFormBuilder();

  return <FormBuilder />;
}

export default App;
