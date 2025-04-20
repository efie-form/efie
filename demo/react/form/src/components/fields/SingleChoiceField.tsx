import type { SingleChoiceFieldProps } from '@efie-form/react';
import { MenuItem, Select } from '@mui/material';

function SingleChoiceField({ fieldLabel, id, options }: SingleChoiceFieldProps) {
  return (
    <div>
      <Select
        id={id}
        size="small"
        value=""
        fullWidth
        variant="outlined"
        label={fieldLabel}
      >
        {options.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.optionLabel}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}

export default SingleChoiceField;
