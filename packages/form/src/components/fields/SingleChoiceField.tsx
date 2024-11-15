import type { SingleChoiceFieldProps } from '@efie-form/react/types/FieldProps.ts';

function SingleChoiceField({ label, id, options }: SingleChoiceFieldProps) {
  return (
    <div className="efie-single-choice efie-form-field col">
      <label htmlFor={id} className="efie-field-label">
        {label}
      </label>
      <div className="options">
        {options.map((option) => (
          <div className="item">
            <input
              type="checkbox"
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

export default SingleChoiceField;
