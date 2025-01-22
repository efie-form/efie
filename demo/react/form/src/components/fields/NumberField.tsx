import { NumberFieldProps } from '@efie-form/react';
import { TextField } from '@mui/material';

function NumberField({ id, label, placeholder }: NumberFieldProps) {
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
          label={label}
        />
      </div>
    </div>
  );
}

export default NumberField;
