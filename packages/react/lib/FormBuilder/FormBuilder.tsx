import React, { forwardRef, useEffect, useState } from 'react';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { type FormSchema, Wrapper } from '@efie-form/core';

const DIV_ID = 'efie-form-builder';

interface FormBuilderProps {
  value?: FormSchema;
  onChange?: (value: FormSchema) => void;
}

const FormBuilder = forwardRef<Wrapper, FormBuilderProps>(
  ({ onChange, value }) => {
    const [json, setJson] = useControllableState({
      prop: value,
      onChange,
      defaultProp: {
        version: 'v1',
        form: {
          fields: [],
        },
      },
    });
    const [editor, setEditor] = useState<Wrapper | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
      if (editor) return;
      setEditor(
        new Wrapper({
          id: DIV_ID,
        })
      );
    }, [editor]);

    useEffect(() => {
      if (!editor || !json) return;
      editor.resetValue(json);
    }, [editor, json]);

    useEffect(() => {
      if (!editor || isLoaded) return;

      setIsLoaded(true);
      editor.init();
      editor?.setOnValueChange(setJson);
    }, [editor, isLoaded, setJson]);

    return <div id={DIV_ID} />;
  }
);

export default FormBuilder;
