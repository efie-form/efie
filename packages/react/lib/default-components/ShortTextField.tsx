import type { ShortTextFieldProps } from '../../types/FieldProps';

/**
 * Default Short Text Field component
 * 
 * A simple input field for short text entries
 */
function ShortTextField({
  id,
  value,
  onChange,
  label,
  required,
  disabled,
  placeholder,
  errors,
}: ShortTextFieldProps) {
  return (
    <div className="efie-field-container">
      <label htmlFor={id} className="efie-field-label">
        {label}
        {required && <span className="efie-field-required">*</span>}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="efie-field-input"
      />
      {errors?.message && (
        <div className="efie-field-error">{errors.message}</div>
      )}
    </div>
  );
}

export default ShortTextField;
