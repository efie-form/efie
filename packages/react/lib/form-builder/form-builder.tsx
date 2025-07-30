import { Builder, type CustomInputDef, type FormSchema } from '@efie-form/core';
import type { RefObject } from 'react';
import { forwardRef } from 'react';

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
  ({ height, formInputs, schema, formKeyNonEditable, inputNonReusable, maxHistories }, ref) => {
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
  },
);

export default FormBuilder;
