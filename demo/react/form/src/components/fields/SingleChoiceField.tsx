import { SingleChoiceFieldProps } from '@efie-form/react';
import { MenuItem, Select } from '@mui/material';

function SingleChoiceField({ label, id, options }: SingleChoiceFieldProps) {
  return (
    <div>
      <Select
        id={id}
        size="small"
        value={''}
        fullWidth
        variant="outlined"
        label={label}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}

export default SingleChoiceField;
