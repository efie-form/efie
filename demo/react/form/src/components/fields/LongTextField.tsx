import { LongTextFieldProps } from '@efie-form/react';
import { TextField } from '@mui/material';

function LongTextField({ id, label, placeholder }: LongTextFieldProps) {
  return (
    <TextField
      id={id}
      size="small"
      placeholder={placeholder}
      fullWidth
      variant="outlined"
      multiline
      rows={4}
      label={label}
    />
  );
}

export default LongTextField;
