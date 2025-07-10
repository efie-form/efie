import type { NumberFieldProps } from '@efie-form/react';
import { TextField } from '@mui/material';

function NumberField({ id, fieldLabel, placeholder }: NumberFieldProps) {
  return (
    <div>
      <TextField
        id={id}
        sx={{
          marginTop: '1rem',
        }}
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
