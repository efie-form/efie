import type { DividerFieldProps } from '@efie-form/react';

function DividerField({ dividerStyle }: DividerFieldProps) {
  return (
    <div
      style={{
        borderStyle: dividerStyle,
      }}
    />
  );
}

export default DividerField;
