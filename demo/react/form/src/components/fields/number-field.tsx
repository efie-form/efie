import type { NumberFieldProps } from '@efie-form/react';
import { TextField } from '@mui/material';

function NumberField({ id, fieldLabel, placeholder }: NumberFieldProps) {
  return (
    <div>
      <TextField
        id={id}
        size="small"
        placeholder={placeholder}
        fullWidth
        variant="outlined"
        type="number"
        label={fieldLabel}
      />
    </div>
  );
}

export default NumberField;
