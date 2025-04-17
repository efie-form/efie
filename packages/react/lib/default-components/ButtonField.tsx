import type { ButtonFieldProps } from '../../types/FieldProps';

/**
 * Default Button Field component
 * 
 * A button element
 */
function ButtonField({
  id,
  label,
}: ButtonFieldProps) {
  return (
    <button
      id={id}
      type="button"
      className="efie-field-button"
      style={{
        padding: '0.5rem 1rem',
        backgroundColor: '#4f46e5',
        color: 'white',
        border: 'none',
        borderRadius: '0.25rem',
        cursor: 'pointer',
      }}
    >
      {label}
    </button>
  );
}

export default ButtonField;
