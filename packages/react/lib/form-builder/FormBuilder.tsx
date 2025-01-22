import React, {
  forwardRef,
  RefObject,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { type FormSchema, BuilderExternal } from '@efie-form/core';

const DIV_ID = 'efie-form-builder';

interface FormBuilderProps {
  ref: RefObject<FormBuilderRef>;
  options?: FormBuilderOptions;
  onReady?: () => void;
  height: number;
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
  ({ onReady, options, height }, ref) => {
    const builderRef = useRef<BuilderExternal | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Initialize BuilderExternal once
    useEffect(() => {
      // Only create new instance if one doesn't exist
      if (!builderRef.current && containerRef.current) {
        builderRef.current = new BuilderExternal({
          id: DIV_ID,
          onReady: () => {
            onReady?.();
          },
        });
      }

      // Cleanup only when component unmounts
      return () => {
        if (builderRef.current) {
          // Clean up the iframe
          const container = document.getElementById(DIV_ID);
          if (container) {
            container.innerHTML = '';
          }
          builderRef.current = null;
        }
      };
    }, []); // Empty dependency array to run only once

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
        loadSchema: (schema: FormSchema) => {
          builderRef.current?.loadSchema(schema);
        },
        getSchema: () => {
          return builderRef.current?.getValue() as FormSchema;
        },
      }),
      []
    );

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
