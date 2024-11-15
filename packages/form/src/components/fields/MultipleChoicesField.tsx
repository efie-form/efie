import type { MultipleChoicesFieldProps } from '@efie-form/react/types/FieldProps.ts';

function MultipleChoicesField({
  id,
  label,
  options,
}: MultipleChoicesFieldProps) {
  return (
    <div className="efie-multiple-choices efie-form-field col">
      <label htmlFor={id} className="efie-field-label">
        {label}
      </label>
      <div className="options">
        {options.map((option) => (
          <div className="item">
            <input
              name={id}
              type="radio"
              id={`${id}-${option.value}`}
              value={option.value}
            />
            <label htmlFor={`${id}-${option.value}`}>{option.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MultipleChoicesField;
