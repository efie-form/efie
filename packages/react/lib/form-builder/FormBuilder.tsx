import React, {
  forwardRef,
  RefObject,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { type FormSchema, BuilderExternal } from '@efie-form/core';

const DIV_ID = 'efie-form-builder';

interface FormBuilderProps {
  ref: RefObject<FormBuilderRef>;
  options?: FormBuilderOptions;
  onReady?: () => void;
}

interface FormBuilderOptions {
  inputFields?: string[];
  hiddenFields?: string[];
}
export interface FormBuilderRef {
  loadSchema: (schema: FormSchema) => void;
  getSchema: () => FormSchema;
}

const FormBuilder = forwardRef<FormBuilderRef, FormBuilderProps>(
  ({ onReady, options }, ref) => {
    const [editor] = useState<BuilderExternal>(
      new BuilderExternal({
        id: DIV_ID,
      })
    );

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
      if (!editor || isLoaded) return;

      setIsLoaded(true);
      onReady?.();
    }, [editor, isLoaded]);

    useImperativeHandle(ref, () => {
      return {
        loadSchema: (schema) => {
          console.log('loaded schema', schema);
          editor.loadSchema(schema);
        },
        getSchema: () => {
          return editor.getValue();
        },
      };
    });

    return <div id={DIV_ID} style={{ height: '100%' }} />;
  }
);

export default FormBuilder;
