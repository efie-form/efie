import type { DividerFieldProps } from '@efie-form/react';

function DividerField({ id }: DividerFieldProps) {
  return (
    <div
      id={id}
      style={{
        height: '1px',
        borderColor: '#AFAFAF',
        borderWidth: '1px',
      }}
    />
  );
}

export default DividerField;
