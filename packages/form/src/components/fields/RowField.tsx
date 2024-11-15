import type { RowFieldProps } from '@efie-form/react/types/FieldProps.ts';

function RowField({ children }: RowFieldProps) {
  return <div className="efie-row">{children}</div>;
}

export default RowField;
