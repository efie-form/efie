import type { RowFieldProps } from '../../types/FieldProps';

/**
 * Default Row Field component
 * 
 * A horizontal container for layout
 */
function RowField({
  id,
  children,
}: RowFieldProps) {
  return (
    <div
      id={id}
      className="efie-field-row"
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
      }}
    >
      {children}
    </div>
  );
}

export default RowField;
