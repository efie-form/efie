import type { ShortTextFieldProps } from '@efie-form/react';
import { TextField } from '@mui/material';

function ShortTextField({ id, fieldLabel, placeholder, required }: ShortTextFieldProps) {
  // const { register } = useFormContext();

  return (
    <TextField
      id={id}
      size="small"
      placeholder={placeholder}
      fullWidth
      variant="outlined"
      label={fieldLabel}
      required={required}
    />
  );
}

export default ShortTextField;
