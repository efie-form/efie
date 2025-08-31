import { Client, type CustomInputDef, type FormSchema, getDefaultSchema } from '@efie-form/core';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

const DIV_ID = 'efie-form-builder';

export interface FormBuilderProps {
  height: number;
  formInputs?: CustomInputDef[];
  formKeyNonEditable?: boolean;
  inputNonReusable?: boolean;
  maxHistories?: number;
  a: string;
}

export interface FormBuilderRef {
  getSchema: () => FormSchema;
  setSchema: (schema: FormSchema) => void;
}

const FormBuilder = forwardRef<FormBuilderRef, FormBuilderProps>(
  (
    {
      height,
      formInputs = [],
      formKeyNonEditable = false,
      inputNonReusable = false,
      maxHistories = 50,
    },
    ref,
  ) => {
    const clientRef = useRef<Client | null>(null);
    const [schema, setSchema] = useState<FormSchema>(getDefaultSchema('v1'));
    const [isIframeLoaded, setIsIframeLoaded] = useState(false);

    useImperativeHandle(ref, () => ({
      getSchema: () => schema,
      setSchema: (newSchema: FormSchema) => {
        if (!clientRef.current) return;
        // clientRef.current.setSchema(newSchema);
        setSchema(newSchema);
      },
    }));

    useEffect(() => {
      const client = new Client({
        onReady,
        onSchemaChange: (newSchema) => {
          setSchema(newSchema);
        },
      });

      clientRef.current = client;

      return () => {
        client.cleanup();
        clientRef.current = null;
      };
    }, [schema]);

    // Update height when it changes
    useEffect(() => {
      if (isIframeLoaded && clientRef.current) {
        clientRef.current.setHeight(height);
      }
    }, [height, isIframeLoaded]);

    // Update form inputs when they change
    useEffect(() => {
      if (isIframeLoaded && clientRef.current) {
        clientRef.current.setFormInputs(formInputs);
      }
    }, [formInputs, isIframeLoaded]);

    const handleIframeLoad = () => {
      setIsIframeLoaded(true);
    };

    useEffect(() => {
      if (isIframeLoaded && clientRef.current) {
        clientRef.current.setFieldNameEditable(!formKeyNonEditable);
      }
    }, [formKeyNonEditable]);

    useEffect(() => {
      if (!isIframeLoaded || !clientRef.current) return;
      clientRef.current.setMaxHistories(maxHistories);
    }, [maxHistories]);

    useEffect(() => {
      if (!isIframeLoaded || !clientRef.current) return;
      clientRef.current.setInputReusable(!inputNonReusable);
    }, [inputNonReusable]);

    function onReady() {
      if (!clientRef.current) return;

      clientRef.current.setHeight(height);
      clientRef.current.setFormInputs(formInputs);
      clientRef.current.setFieldNameEditable(!formKeyNonEditable);
      clientRef.current.setInputReusable(!inputNonReusable);
      clientRef.current.setMaxHistories(maxHistories);

      // Set initial schema if provided
      if (schema) {
        clientRef.current.setSchema(schema);
      }
    }

    return (
      <div
        style={{
          height: `${height}px`,
          width: '100%',
          overflow: 'hidden',
        }}
      >
        <iframe
          id={DIV_ID}
          src="http://localhost:3074"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
          }}
          onLoad={handleIframeLoad}
          title="Efie Form Builder"
        />
      </div>
    );
  },
);

FormBuilder.displayName = 'FormBuilder';

export { FormBuilder };
