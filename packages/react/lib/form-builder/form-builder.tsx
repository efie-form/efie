import type { RefObject } from 'react';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { Iframe, type CustomInputDef, type FormSchema } from '@efie-form/core';

const DIV_ID = 'efie-form-builder';

interface FormBuilderProps {
  ref: RefObject<FormBuilderRef>;
  height: number;
  formInputs?: CustomInputDef[];
  schema?: FormSchema;
  formKeyNonEditable?: boolean;
  inputNonReusable?: boolean;
  maxHistories?: number;
}

export interface FormBuilderRef {
  getSchema: () => FormSchema;
}

const FormBuilder = forwardRef<FormBuilderRef, FormBuilderProps>(
  (
    { height, formInputs, schema, formKeyNonEditable, inputNonReusable, maxHistories },
    ref,
  ) => {
    const builderRef = useRef<Iframe | undefined>();
    const containerRef = useRef<HTMLDivElement>(null);
    const formInputDetectsChanges = formInputs?.map(
      input => `${input.id}-${input.type}`,
    );

    // Initialize Iframe once
    useEffect(() => {
      // Only create new instance if one doesn't exist
      if (!builderRef.current && containerRef.current) {
        builderRef.current = new Iframe({
          id: DIV_ID,
          formInputs,
          height,
          schema,
          formKeyNonEditable,
          inputNonReusable,
          maxHistories,
        });
      }

      // Cleanup only when component unmounts
      return () => {
        if (builderRef.current) {
          // Clean up the iframe
          const container = document.querySelector(`#${DIV_ID}`);
          if (container) {
            container.innerHTML = '';
          }
          builderRef.current = undefined;
        }
      };
    }, [
      formInputs,
      height,
      formInputDetectsChanges,
      schema,
      formKeyNonEditable,
      inputNonReusable,
      maxHistories,
    ]);

    // Update height when prop changes
    useEffect(() => {
      if (builderRef.current) {
        builderRef.current.setHeight(height);
      }
    }, [height]);

    // Expose methods via ref
    useImperativeHandle(
      ref,
      () => ({
        getSchema: () => {
          return builderRef.current?.getValue() as FormSchema;
        },
      }),
      [],
    );

    useEffect(() => {
      if (!builderRef.current || !formInputs) return;
      builderRef.current.setFormInputs(formInputs);
    }, [formInputs, formInputDetectsChanges]);

    return (
      <div
        ref={containerRef}
        id={DIV_ID}
        style={{
          height: `${height}px`,
          width: '100%',
          overflow: 'hidden',
        }}
      />
    );
  },
);

export default FormBuilder;
