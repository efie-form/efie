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

    // Initialize BuilderExternal once
    useEffect(() => {
      builderRef.current = new BuilderExternal({
        id: DIV_ID,
        onReady: () => {
          setTimeout(() => {
            onReady?.();
          }, 0);
        },
      });

      return () => {
        builderRef.current = null;
      };
    }, []);

    // Update height when prop changes
    useEffect(() => {
      builderRef.current?.setHeight(height);
    }, [height]);

    // Expose methods via ref with proper ready state check
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
      [] // Important: update ref when ready state changes
    );

    return (
      <div
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
