import type { LongTextFieldProps } from '../../types/FieldProps';

/**
 * Default Long Text Field component
 * 
 * A textarea for longer text entries
 */
function LongTextField({
  id,
  value,
  onChange,
  label,
  required,
  disabled,
  placeholder,
  errors,
}: LongTextFieldProps) {
  return (
    <div className="efie-field-container">
      <label htmlFor={id} className="efie-field-label">
        {label}
        {required && <span className="efie-field-required">*</span>}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="efie-field-textarea"
        rows={4}
      />
      {errors?.message && (
        <div className="efie-field-error">{errors.message}</div>
      )}
    </div>
  );
}

export default LongTextField;
