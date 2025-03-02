import type { ShortTextFieldProps } from '@efie-form/react';
import { TextField } from '@mui/material';

function ShortTextField({ id, label, placeholder }: ShortTextFieldProps) {
  return (
    <div>
      <div className="efie-input-wrapper">
        <TextField
          id={id}
          size="small"
          placeholder={placeholder}
          fullWidth
          variant="outlined"
          label={label}
        />
      </div>
    </div>
  );
}

export default ShortTextField;
