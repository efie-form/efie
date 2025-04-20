import type { NumberFieldProps } from '@efie-form/react';
import { TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';

function NumberField({ id, fieldLabel, placeholder, name }: NumberFieldProps) {
  const { register } = useFormContext();

  return (
    <div>
      <div className="efie-input-wrapper">
        <TextField
          id={id}
          {...register(name)}
          size="small"
          placeholder={placeholder}
          fullWidth
          variant="outlined"
          type="number"
          label={fieldLabel}
        />
      </div>
    </div>
  );
}

export default NumberField;
