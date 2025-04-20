import type { ShortTextFieldProps } from '@efie-form/react';
import { TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';

function ShortTextField({ id, fieldLabel, placeholder, name }: ShortTextFieldProps) {
  const { register } = useFormContext();

  return (
    <div>
      <TextField
        {...register(name)}
        id={id}
        size="small"
        placeholder={placeholder}
        fullWidth
        variant="outlined"
        label={fieldLabel}
      />
    </div>
  );
}

export default ShortTextField;
