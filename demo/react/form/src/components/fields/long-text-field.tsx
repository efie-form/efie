import type { LongTextFieldProps } from '@efie-form/react';
import { TextField } from '@mui/material';

function LongTextField({ id, fieldLabel, placeholder }: LongTextFieldProps) {
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
      multiline
      rows={4}
      label={fieldLabel}
    />
  );
}

export default LongTextField;
