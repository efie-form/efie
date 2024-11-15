import type { TimeFieldProps } from '@efie-form/react/types/FieldProps.ts';

function TimeField({ id, label }: TimeFieldProps) {
  return (
    <div className="efie-time efie-form-field col">
      <label htmlFor={id} className="efie-field-label">
        {label}
      </label>
      <div className="efie-input-wrapper">
        <input type="time" id={id} />
      </div>
    </div>
  );
}

export default TimeField;
