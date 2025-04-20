import type { LongTextFieldProps } from '@efie-form/react';
import { TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';

function LongTextField({ id, fieldLabel, placeholder, name }: LongTextFieldProps) {
  const { register } = useFormContext();

  return (
    <TextField
      id={id}
      {...register(name)}
      size="small"
      placeholder={placeholder}
      fullWidth
      variant="outlined"
      multiline
      rows={4}
      label={fieldLabel}
    />
  );
}

export default LongTextField;
