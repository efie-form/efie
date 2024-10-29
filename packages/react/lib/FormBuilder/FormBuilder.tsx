import React, { forwardRef } from 'react';

interface FormBuilderProps {
  json: string;
}

export const FormBuilder = forwardRef<HTMLIFrameElement, FormBuilderProps>(
  (props, ref) => {
    return <iframe ref={ref} />;
  }
);
