import type { DividerFieldProps } from '@efie-form/react';

function DividerField({ style }: DividerFieldProps) {
  return (
    <div
      style={{
        borderStyle: style,
      }}
    />
  );
}

export default DividerField;
