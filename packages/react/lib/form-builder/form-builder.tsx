import { Client, type CustomInputDef, type FormSchema } from '@efie-form/core';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

const DIV_ID = 'efie-form-builder';

interface FormBuilderProps {
  height: number;
  formInputs?: CustomInputDef[];
  schema?: FormSchema;
  formKeyNonEditable?: boolean;
  inputNonReusable?: boolean;
  maxHistories?: number;
  onSchemaChange?: (schema: FormSchema) => void;
  iframeSrc?: string;
}

export interface FormBuilderRef {
  getSchema: () => Promise<FormSchema>;
  setSchema: (schema: FormSchema) => void;
}

const FormBuilder = forwardRef<FormBuilderRef, FormBuilderProps>(
  (
    {
      height,
      formInputs = [],
      schema,
      formKeyNonEditable = false,
      inputNonReusable = false,
      maxHistories = 50,
      onSchemaChange,
      iframeSrc = 'http://localhost:3074', // Default iframe src
    },
    ref,
  ) => {
    const clientRef = useRef<Client | null>(null);
    const [isIframeLoaded, setIsIframeLoaded] = useState(false);

    useImperativeHandle(ref, () => ({
      getSchema: async () => {
        if (clientRef.current) {
          return await clientRef.current.getSchema();
        }
        throw new Error('Form builder not initialized');
      },
      setSchema: (newSchema: FormSchema) => {
        if (clientRef.current) {
          clientRef.current.setSchema(newSchema);
        }
      },
    }));

    useEffect(() => {
      // Initialize the Client for communication with iframe
      console.log('FormBuilder: Initializing client');
      const client = new Client({
        onSchemaChange,
      });

      clientRef.current = client;

      return () => {
        client.destroy();
        clientRef.current = null;
      };
    }, [onSchemaChange]);

    useEffect(() => {
      if (isIframeLoaded && clientRef.current) {
        // Set initial configuration
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
    }, [
      isIframeLoaded,
      height,
      formInputs,
      schema,
      formKeyNonEditable,
      inputNonReusable,
      maxHistories,
    ]);

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
          src={iframeSrc}
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

export default FormBuilder;
