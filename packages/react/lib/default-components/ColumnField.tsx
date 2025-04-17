import type { ColumnFieldProps } from '../../types/FieldProps';

/**
 * Default Column Field component
 * 
 * A vertical container for layout
 */
function ColumnField({
  id,
  children,
  width,
}: ColumnFieldProps) {
  return (
    <div
      id={id}
      className="efie-field-column"
      style={{
        width,
        padding: '0 0.5rem',
      }}
    >
      {children}
    </div>
  );
}

export default ColumnField;
