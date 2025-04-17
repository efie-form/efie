import type { DateFieldProps } from '../../types/FieldProps';

/**
 * Default Date Field component
 * 
 * A date picker input field
 */
function DateField({
  id,
  value,
  onChange,
  label,
  required,
  disabled,
  errors,
}: DateFieldProps) {
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
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
        type="date"
        value={formatDate(value)}
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

export default DateField;
