import type { NumberFieldProps } from '../../types/FieldProps';

/**
 * Default Number Field component
 * 
 * An input field for numeric values
 */
function NumberField({
  id,
  value,
  onChange,
  label,
  required,
  disabled,
  placeholder,
  min,
  max,
  errors,
}: NumberFieldProps) {
  return (
    <div className="efie-field-container">
      <label htmlFor={id} className="efie-field-label">
        {label}
        {required && <span className="efie-field-required">*</span>}
      </label>
      <input
        id={id}
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        min={min}
        max={max}
        className="efie-field-input"
      />
      {errors?.message && (
        <div className="efie-field-error">{errors.message}</div>
      )}
    </div>
  );
}

export default NumberField;
