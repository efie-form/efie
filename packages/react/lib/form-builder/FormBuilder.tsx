import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { type FormSchema, BuilderExternal } from '@efie-form/core';

const DIV_ID = 'efie-form-builder';

interface FormBuilderProps {
  value?: FormSchema;
  onChange?: (value: FormSchema) => void;
  height?: number;
}

const FormBuilder = forwardRef<BuilderExternal, FormBuilderProps>(
  ({ onChange, value, height }, ref) => {
    const [editor, setEditor] = useState<BuilderExternal>();
    const [isLoaded, setIsLoaded] = useState(false);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    useEffect(() => {
      if (editor) return;
      setEditor(
        new BuilderExternal({
          id: DIV_ID,
        })
      );
    }, [editor]);

    useEffect(() => {
      if (!editor || !value || isDataLoaded) return;
      editor.resetValue(value);
      setIsDataLoaded(true);
    }, [editor, value]);

    useEffect(() => {
      if (!editor || !height) return;
      editor.setHeight(height);
    }, [editor, height]);

    useEffect(() => {
      if (!editor || isLoaded) return;

      setIsLoaded(true);
      editor.init();
      if (onChange) editor?.setOnValueChange(onChange);
    }, [editor, isLoaded, onChange]);

    useImperativeHandle(ref, () => {
      if (!editor) throw new Error('Editor is not initialized');
      return editor;
    });

    return <div id={DIV_ID} style={{ display: 'flex' }} />;
  }
);

export default FormBuilder;
