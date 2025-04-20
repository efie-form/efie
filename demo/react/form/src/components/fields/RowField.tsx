import type { RowFieldProps } from '@efie-form/react';

function RowField({ children }: RowFieldProps) {
  return <div className="flex gap-4">{children}</div>;
}

export default RowField;
