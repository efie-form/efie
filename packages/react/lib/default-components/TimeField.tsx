import type { TimeFieldProps } from '../../types/FieldProps';

/**
 * Default Time Field component
 * 
 * A time picker input field
 */
function TimeField({
  id,
  value,
  onChange,
  label,
  required,
  disabled,
  errors,
}: TimeFieldProps) {
  const formatTime = (date: Date) => {
    return date.toTimeString().split(' ')[0].substring(0, 5);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [hours, minutes] = e.target.value.split(':').map(Number);
    const newDate = new Date(value);
    newDate.setHours(hours);
    newDate.setMinutes(minutes);
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
        type="time"
        value={formatTime(value)}
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

export default TimeField;
