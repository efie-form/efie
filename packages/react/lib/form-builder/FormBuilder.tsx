import type { RefObject } from 'react';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import {
  type FormSchema,
  type BuilderCustomInput,
  BuilderExternal,
} from '@efie-form/core';

const DIV_ID = 'efie-form-builder';

interface FormBuilderProps {
  ref: RefObject<FormBuilderRef>;
  options?: FormBuilderOptions;
  onReady?: () => void;
  height: number;
  formInputs?: BuilderCustomInput[];
  schema?: FormSchema;
}

interface FormBuilderOptions {
  inputFields?: string[];
  hiddenFields?: string[];
}

export interface FormBuilderRef {
  getSchema: () => FormSchema;
}

const FormBuilder = forwardRef<FormBuilderRef, FormBuilderProps>(
  ({ onReady, height, formInputs, schema }, ref) => {
    const builderRef = useRef<BuilderExternal | undefined>();
    const containerRef = useRef<HTMLDivElement>(null);
    const formInputDetectsChanges = formInputs?.map(
      (input) => `${input.id}-${input.type}`
    );

    // Initialize BuilderExternal once
    useEffect(() => {
      // Only create new instance if one doesn't exist
      if (!builderRef.current && containerRef.current) {
        builderRef.current = new BuilderExternal({
          id: DIV_ID,
          onReady: () => {
            onReady?.();
          },
          formInputs,
          height,
          schema,
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
    }, [onReady, formInputs, height, formInputDetectsChanges, schema]); // Empty dependency array to run only once

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
      []
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
  }
);

export default FormBuilder;
