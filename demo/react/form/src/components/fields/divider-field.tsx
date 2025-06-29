import type { DividerFieldProps } from '@efie-form/react';

function DividerField({ fieldId }: DividerFieldProps) {
  return (
    <div
      id={fieldId}
      style={{
        height: '1px',
        borderColor: '#AFAFAF',
        borderWidth: '1px',
      }}
    />
  );
}

export default DividerField;
