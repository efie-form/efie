import type { ShortTextFieldProps } from '@efie-form/react';
import { TextField } from '@mui/material';

function ShortTextField({ id, fieldLabel, placeholder }: ShortTextFieldProps) {
  return (
    <TextField
      sx={{
        marginTop: '1rem',
      }}
      id={id}
      size="small"
      placeholder={placeholder}
      fullWidth
      variant="outlined"
      label={fieldLabel}
    />
  );
}

export default ShortTextField;
