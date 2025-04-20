import type { ColumnFieldProps } from '@efie-form/react';

function ColumnField({ children, columnWidth }: ColumnFieldProps) {
  return (
    <div
      style={{
        width: columnWidth,
      }}
    >
      {children}
    </div>
  );
}

export default ColumnField;
