import type { MultipleChoicesFieldProps } from '../../types/FieldProps';

/**
 * Default Multiple Choices Field component
 * 
 * A checkbox group for selecting multiple options
 */
function MultipleChoicesField({
  id,
  value,
  onChange,
  label,
  required,
  disabled,
  options,
  errors,
}: MultipleChoicesFieldProps) {
  const handleChange = (optionValue: string, checked: boolean) => {
    if (checked) {
      onChange([...value, optionValue]);
    } else {
      onChange(value.filter((v) => v !== optionValue));
    }
  };

  return (
    <div className="efie-field-container">
      <div className="efie-field-label">
        {label}
        {required && <span className="efie-field-required">*</span>}
      </div>
      <div className="efie-field-checkbox-group">
        {options.map((option) => (
          <div key={option.value} className="efie-field-checkbox-option">
            <input
              id={`${id}-${option.value}`}
              type="checkbox"
              value={option.value}
              checked={value.includes(option.value)}
              onChange={(e) => handleChange(option.value, e.target.checked)}
              disabled={disabled}
              className="efie-field-checkbox"
            />
            <label
              htmlFor={`${id}-${option.value}`}
              className="efie-field-checkbox-label"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {errors?.message && (
        <div className="efie-field-error">{errors.message}</div>
      )}
    </div>
  );
}

export default MultipleChoicesField;
