import type { SingleChoiceFieldProps } from '../../types/FieldProps';

/**
 * Default Single Choice Field component
 * 
 * A radio button group for selecting a single option
 */
function SingleChoiceField({
  id,
  value,
  onChange,
  label,
  required,
  disabled,
  options,
  errors,
}: SingleChoiceFieldProps) {
  return (
    <div className="efie-field-container">
      <div className="efie-field-label">
        {label}
        {required && <span className="efie-field-required">*</span>}
      </div>
      <div className="efie-field-radio-group">
        {options.map((option) => (
          <div key={option.value} className="efie-field-radio-option">
            <input
              id={`${id}-${option.value}`}
              type="radio"
              name={id}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              disabled={disabled}
              className="efie-field-radio"
            />
            <label
              htmlFor={`${id}-${option.value}`}
              className="efie-field-radio-label"
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

export default SingleChoiceField;
