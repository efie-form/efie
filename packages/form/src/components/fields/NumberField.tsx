import type { NumberFieldProps } from '@efie-form/react/types/FieldProps.ts';

function NumberField({ id, label, placeholder }: NumberFieldProps) {
  return (
    <div className="efie-number efie-form-field col">
      <label htmlFor={id} className="efie-field-label">
        {label}
      </label>
      <div className="efie-input-wrapper">
        <input type="number" id={id} placeholder={placeholder} />
      </div>
    </div>
  );
}

export default NumberField;
