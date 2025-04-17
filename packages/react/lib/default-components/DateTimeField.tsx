import type { DateTimeFieldProps } from '../../types/FieldProps';

/**
 * Default DateTime Field component
 * 
 * A date and time picker input field
 */
function DateTimeField({
  id,
  value,
  onChange,
  label,
  required,
  disabled,
  errors,
}: DateTimeFieldProps) {
  const formatDateTime = (date: Date) => {
    return date.toISOString().slice(0, 16);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    onChange(newDate);
  };

  return (
    <div className="efie-field-container">
      <label htmlFor={id} className="efie-field-label">
        {label}
        {required && <span className="efie-field-required">*</span>}
      </label>
      <input
        id={id}
        type="datetime-local"
        value={formatDateTime(value)}
        onChange={handleChange}
        disabled={disabled}
        className="efie-field-input"
      />
      {errors?.message && (
        <div className="efie-field-error">{errors.message}</div>
      )}
    </div>
  );
}

export default DateTimeField;
