import type { FileFieldProps } from '@efie-form/react/types/FieldProps.ts';

function FileField({ id, label }: FileFieldProps) {
  return (
    <div className="efie-file efie-form-field col">
      <label htmlFor={id} className="efie-field-label">
        {label}
      </label>
      <input type="file" id={id} />
    </div>
  );
}

export default FileField;
