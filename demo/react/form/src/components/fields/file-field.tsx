import type { FileFieldProps } from '@efie-form/react';

function FileField({ id, fieldLabel }: FileFieldProps) {
  return (
    <div>
      <label htmlFor={id}>
        {fieldLabel}
      </label>
      <input
        type="file"
        id={id}
      />
    </div>
  );
}

export default FileField;
