import React from 'react';
import type { ContainerFieldProps } from '@efie-form/react/types/FieldProps.ts';

function ContainerField({ children }: ContainerFieldProps) {
  return (
    <div
      className="efie-form-container"
      style={{
        '--color-primary': '#3f83f8',
      }}
    >
      {children}
    </div>
  );
}

export default ContainerField;
