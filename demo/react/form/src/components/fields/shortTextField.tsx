import type { ShortTextFieldProps } from '@efie-form/react';
import { TextField } from '@mui/material';

function ShortTextField({ id, fieldLabel, placeholder }: ShortTextFieldProps) {
  return (
    <div>
      <div className="efie-input-wrapper">
        <TextField
          id={id}
          size="small"
          placeholder={placeholder}
          fullWidth
          variant="outlined"
          label={fieldLabel}
        />
      </div>
    </div>
  );
}

export default ShortTextField;
