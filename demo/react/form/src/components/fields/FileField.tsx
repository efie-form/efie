import type { FileFieldProps } from '@efie-form/react';

function FileField({ id, fieldLabel }: FileFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="efie-field-label">
        {fieldLabel}
      </label>
      <input type="file" id={id} />
    </div>
  );
}

export default FileField;
