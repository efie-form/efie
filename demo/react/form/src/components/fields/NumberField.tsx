import type { NumberFieldProps } from '@efie-form/react';
import { TextField } from '@mui/material';

function NumberField({ id, fieldLabel, placeholder }: NumberFieldProps) {
  return (
    <div>
      <div className="efie-input-wrapper">
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
    </div>
  );
}

export default NumberField;
