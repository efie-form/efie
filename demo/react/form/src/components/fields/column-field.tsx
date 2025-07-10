import type { ColumnFieldProps } from '@efie-form/react';

function ColumnField({ children, width }: ColumnFieldProps) {
  return (
    <div
      style={{
        width,
      }}
    >
      {children}
    </div>
  );
}

export default ColumnField;
