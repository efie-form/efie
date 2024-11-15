import type { DateFieldProps } from '@efie-form/react/types/FieldProps.ts';

function DateField({ id, label }: DateFieldProps) {
  return (
    <div className="efie-date efie-form-field col">
      <label htmlFor={id} className="efie-field-label">
        {label}
      </label>
      <div className="efie-input-wrapper">
        <input type="date" id={id} />
      </div>
    </div>
  );
}

export default DateField;
