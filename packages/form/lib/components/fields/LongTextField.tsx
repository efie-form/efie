import type { LongTextFieldProps } from '@efie-form/react/types/FieldProps.ts';

function LongTextField({ id, label, placeholder }: LongTextFieldProps) {
  return (
    <div className="efie-short-text efie-form-field col">
      <label htmlFor={id} className="efie-field-label">
        {label}
      </label>
      <div className="efie-input-wrapper">
        <input type="text" id={id} placeholder={placeholder} />
      </div>
    </div>
  );
}

export default LongTextField;
