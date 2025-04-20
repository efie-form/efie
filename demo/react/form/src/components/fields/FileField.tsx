import type { FileFieldProps } from '@efie-form/react';
import { useFormContext } from 'react-hook-form';

function FileField({ id, fieldLabel, name }: FileFieldProps) {
  const { register } = useFormContext();

  return (
    <div>
      <label htmlFor={id} className="efie-field-label">
        {fieldLabel}
      </label>
      <input
        {...register(name)}
        type="file"
        id={id}
      />
    </div>
  );
}

export default FileField;
