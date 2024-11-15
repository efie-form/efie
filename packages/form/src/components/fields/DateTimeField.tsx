import type { DateTimeFieldProps } from '@efie-form/react/types/FieldProps.ts';

function DateTimeField({ id, label }: DateTimeFieldProps) {
  return (
    <div className="efie-date-time efie-form-field col">
      <label htmlFor={id} className="efie-field-label">
        {label}
      </label>
      <div className="efie-input-wrapper">
        <input type="datetime-local" id={id} />
      </div>
    </div>
  );
}

export default DateTimeField;
