import { FileFieldProps } from '@efie-form/react';

function FileField({ id, label }: FileFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="efie-field-label">
        {label}
      </label>
      <input type="file" id={id} />
    </div>
  );
}

export default FileField;
